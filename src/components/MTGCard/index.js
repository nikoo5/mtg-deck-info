import { Box, Tab, Tabs } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TabPanel from "../TabPanel";

const MTGCard = ({ name, image, textEnglish, textSpanish }) => {
  const [language, setLanguage] = useState("en");

  const handleLangChange = (event, newValue) => {
    setLanguage(newValue);
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardMedia component="img" height="250" src={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
          }}
        >
          <TabPanel index="en" value={language}>
            {textEnglish}
          </TabPanel>
          <TabPanel index="es" value={language}>
            {textSpanish}
          </TabPanel>
        </Box>
        <Tabs
          value={language}
          onChange={handleLangChange}
          orientation="horizontal"
          centered
          sx={{ minHeight: "unset" }}
        >
          {textEnglish !== undefined && textEnglish !== "" ? (
            <Tab
              label="English"
              value="en"
              sx={{ minHeight: "unset", padding: "6px 8px" }}
            />
          ) : null}
          {textSpanish !== undefined && textSpanish !== "" ? (
            <Tab
              label="Spanish"
              value="es"
              sx={{ minHeight: "unset", padding: "6px 8px" }}
            />
          ) : null}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MTGCard;
