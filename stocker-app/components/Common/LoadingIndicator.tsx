import { Box, CircularProgress } from "@mui/material";

export const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};
