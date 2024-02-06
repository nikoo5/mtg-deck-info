import { useEffect, useState } from "react";
import cardsJson from "./cards.json";
import MTGCard from "../../components/MTGCard";
import "./styles.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Container } from "@mui/material";
import Layout from "../../components/Layout";
import LoadDeck from "../LoadDeck";

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log(cards);
    // setCards(cardsJson);
  }, []);

  const handleLoadCards = (c) => {
    setCards(c);
  };

  return (
    <Layout>
      <LoadDeck onLoadCards={handleLoadCards} />
      <Container maxWidth="xl" sx={{ marginTop: "10px" }}>
        <Grid container spacing={2}>
          {cards.map((c, index) => (
            <Grid key={index}>
              <MTGCard
                name={c.name}
                image={c.image_uris.art_crop}
                textEnglish={c.oracle_text}
                textSpanish={c.printed_text}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default App;
