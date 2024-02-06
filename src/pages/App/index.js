import { useEffect, useState } from "react";
import cardsJson from "./cards.json";
import MTGCard from "../../components/MTGCard";
import "./styles.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Container } from "@mui/material";

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(cardsJson);
  }, []);

  return (
    <Container maxWidth="xl">
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
  );
};

export default App;
