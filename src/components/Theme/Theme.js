import React from "react";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      secondary: "#ff5722",
    },
  },
});

function Theme() {
  return theme;
}

export default Theme;
