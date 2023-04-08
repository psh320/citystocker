import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Copyright() {
  return (
    <Box
      width="100%"
      height={100}
      sx={{
        borderTop: "solid 1px #DFDFDF",
        marginY: 5,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
