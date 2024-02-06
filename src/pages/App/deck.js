const axios = require("axios");
const fs = require("fs");

const url = "https://www.archidekt.com/decks/5775250/lcc_velociramptor";
const archidekt_regex =
  /https?:\/\/www\.archidekt\.com(\/api)?\/decks\/(\d+)\/.*/;

const log = (msg) => {
  console.log(`${msg}`);
};

const fetchArchidektDeck = async (id) => {
  const url = `https://archidekt.com/api/decks/${id}/small/`;

  log(`Fetching Archidekt Deck ID: ${id}`);
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      const deck = res.data;
      log(`  - Deck "${deck.name}" successfully fetched`);
      return deck;
    }
  } catch (err) {}
  log("  - There was an error trying to fetch the deck");
};

const fetchScryfallCard = async (name, code, number, lang = "es") => {
  const url = `https://api.scryfall.com/cards/${code}/${number}/${lang}`;

  log(
    `  - Fetching "${name}" [${code.toUpperCase()} #${number}] [${lang.toUpperCase()}]`
  );
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      const deck = res.data;
      log(`    - Card "${name}" successfully fetched`);
      return deck;
    }
  } catch (err) {}

  log("\tThere was an error trying to fetch the card");
};

const main = async () => {
  if (
    url.match(archidekt_regex) !== null &&
    url.match(archidekt_regex)[2] !== undefined
  ) {
    const archidekt_deck_id = url.match(archidekt_regex)[2];

    const cards = [];
    if (!fs.existsSync("cards.json")) {
      const archidekt_deck = await fetchArchidektDeck(archidekt_deck_id);

      for (const card of archidekt_deck.cards) {
        const scryfall_card = await fetchScryfallCard(
          card.card.oracleCard.name,
          card.card.edition.editioncode,
          card.card.collectorNumber,
          "es"
        );
        cards.push(scryfall_card);
      }

      fs.writeFileSync("cards.json", JSON.stringify(cards, null, "  "));
    } else {
      cards.push(...JSON.parse(fs.readFileSync("cards.json", "utf-8")));
      console.log(cards.length);
    }
  }
};

main();
