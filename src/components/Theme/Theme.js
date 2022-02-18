import { createTheme } from "@mui/material/styles";
//import { ThemeProvider } from "@mui/material/core";
import { deepOrange, blue, grey } from "@mui/material/colors";

const Theme = createTheme({
  root: {
    color: grey[500],
  },
  palette: {
    background: {
      default: grey[500],
      paper: grey[500],
    },
    primary: {
      light: grey[400],
      main: blue[900],
    },
    secondary: {
      main: deepOrange[600],
    },
  },
});

export default Theme;
