import { Box, Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "start",
        marginTop: "2vh",
        height: "96vh",
        padding: "5px",
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
