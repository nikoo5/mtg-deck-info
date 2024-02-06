import axios from "axios";

const fetchArchidektDeck = async (url) => {
  const archidekt_regex =
    /https?:\/\/www\.archidekt\.com(\/api)?\/decks\/(\d+)\/.*/;

  if (
    url.match(archidekt_regex) !== null &&
    url.match(archidekt_regex)[2] !== undefined
  ) {
    const archidekt_deck_id = url.match(archidekt_regex)[2];
    const api_url = `https://archidekt.com/api/decks/${archidekt_deck_id}/small/`;

    try {
      const res = await axios.get(api_url);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {}
  }

  return null;
};

const fetchScryfallCard = async (name, code, number, lang = "es") => {
  const url = `https://api.scryfall.com/cards/${code}/${number}/${lang}`;

  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      const deck = res.data;
      return deck;
    }
  } catch (err) {}
};

export { fetchArchidektDeck, fetchScryfallCard };
