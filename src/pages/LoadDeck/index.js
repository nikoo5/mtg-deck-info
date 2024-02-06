import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchArchidektDeck, fetchScryfallCard } from "../../utils/archidekt";

import Searchicon from "@mui/icons-material/Search";

const LoadDeck = ({ onLoadCards = (deck) => {} }) => {
  const [loadingStatus, setLoadingStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const fetchDeck = () => {
    setLoadingStatus("Fetching deck from Archidekt...");
    fetchArchidektDeck(url)
      .then((d) => {
        if (d !== null) {
          setDeck(d);
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const fetchCard = (index) => {
    if (index === deck.cards.length) {
      setLoadingStatus("All cards fetched");
      onLoadCards(cards);
      setIsLoading(false);
      setProgress(0);
      setUrl("");
      setCards([]);
      return;
    } else {
      setProgress(index + 1);
    }

    const archidekt_card = deck.cards[index];
    setLoadingStatus(
      `[${String(index + 1).padStart(3, "0")}/${String(
        deck.cards.length
      ).padStart(3, "0")}] Fetching "${
        archidekt_card.card.oracleCard.name
      }" card from Scryfall...`
    );

    fetchScryfallCard(
      archidekt_card.card.oracleCard.name,
      archidekt_card.card.edition.editioncode,
      archidekt_card.card.collectorNumber,
      "es"
    )
      .then((c) => {
        setCards(cards.push(c));
        fetchCard(index + 1, deck.cards.length);
      })
      .catch((e) => {
        fetchScryfallCard(
          archidekt_card.card.oracleCard.name,
          archidekt_card.card.edition.editioncode,
          archidekt_card.card.collectorNumber,
          "en"
        )
          .then((c) => {
            setCards(cards.push(c));
            fetchCard(index + 1, deck.cards.length);
          })
          .catch((e) => {
            setCards([]);
            setDeck(null);
            setIsLoading(false);
            setProgress(0);
          });
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Archidekt Deck URL"
          variant="outlined"
          onChange={handleUrlChange}
          value={url}
          sx={{ width: "100%", maxWidth: "600px", marginRight: "2vw" }}
        />
        <Button
          variant="contained"
          disabled={isLoading}
          endIcon={<Searchicon />}
          onClick={handleSearch}
        >
          Find Deck
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && deck !== null ? (
          <>
            <Typography sx={{ marginTop: "20px" }}>{loadingStatus}</Typography>
            <LinearProgress
              variant="buffer"
              value={(+progress / +deck.cards.length) * 100}
              valueBuffer={(+progress / +deck.cards.length) * 100 + 2}
              sx={{ width: "100%", maxWidth: "700px" }}
            />
          </>
        ) : null}
      </Box>
    </>
  );
};

export default LoadDeck;
