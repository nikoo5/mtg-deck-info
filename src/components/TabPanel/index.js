import { Box, Typography } from "@mui/material";

const TabPanel = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={index}
      aria-labelledby={index}
      style={{ whiteSpace: "pre-wrap", height: 160, overflowY: "auto" }}
    >
      {value === index && (
        <Box sx={{ padding: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
