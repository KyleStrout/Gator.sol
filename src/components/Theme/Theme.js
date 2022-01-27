import React from "react";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { orange, blue } from "@mui/material/colors";

const Theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: orange[400],
    },
  },
});

export default Theme;
