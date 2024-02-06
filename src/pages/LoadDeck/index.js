import { Button, Container, LinearProgress, TextField } from "@mui/material";
import "./styles.css";
import { useEffect, useState } from "react";
import { fetchArchidektDeck, fetchScryfallCard } from "../../utils/archidekt";

const LoadDeck = () => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const fetchDeck = () => {
    console.log("Fetching deck");
    fetchArchidektDeck(url)
      .then((d) => {
        console.log("Deck fetched");
        setDeck(d);
      })
      .catch(() => {
        console.log("Error fetching deck");
        setIsLoading(false);
      });
  };

  const fetchCard = (index) => {
    if (index === deck.cards.length) {
      console.log("All cards fetched");
      setIsLoading(false);
      setProgress(0);
      return;
    } else {
      setProgress(index + 1);
    }

    console.log("Fetching Card");
    const archidekt_card = deck.cards[index];

    fetchScryfallCard(
      archidekt_card.card.oracleCard.name,
      archidekt_card.card.edition.editioncode,
      archidekt_card.card.collectorNumber,
      "es"
    ).then((c) => {
      console.log("Card fetched");
      setCards(cards.push(c));
      fetchCard(index + 1, deck.cards.length);
    });
  };

  const handleSearch = () => {
    setIsLoading(true);
    fetchDeck();
  };

  useEffect(() => {
    if (deck !== null) fetchCard(0);
  }, [deck]);

  return (
    <Container maxWidth="xl">
      <TextField
        label="Archidekt Deck URL"
        variant="outlined"
        onChange={handleUrlChange}
      />
      <Button variant="contained" disabled={isLoading} onClick={handleSearch}>
        Search
      </Button>
      {isLoading && deck !== null ? (
        <LinearProgress
          variant="determinate"
          value={(+progress / +deck.cards.length) * 100}
        />
      ) : null}
    </Container>
  );
};

export default LoadDeck;
