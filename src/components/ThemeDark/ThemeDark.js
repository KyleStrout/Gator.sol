import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, blue } from "@mui/material/colors";

const baseTheme = createMuiTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif"
  }
})

const themeDark = createMuiTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#26a27b"
    },
    secondary: {
      main: "#fafafa"
    }
  }
})

const themeLight = createMuiTheme({
  ...baseTheme,
  palette: {
    type: "light",
    primary: {
      main: "#fafafa"
    },
    secondary: {
      main: "#26a27b"
    }
  }
})

export default {themeDark, themeLight};
