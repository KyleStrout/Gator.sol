import { createTheme, responsiveFontSizes } from "@mui/material";

export const themes = {
  light: {
    codeEditor: "vs-light",
    backgroundColor: "white",
    backgroundColorSecondary: "white",
    textColor: "black",
    fontColor: "black",
    topBar: "#1976d2",
    compileButton: "#9c27b0",
    deployButton: "#A4A4A4",
    buttonsbackground: "white",
    landingPageBigBox: "gray",
    sideNavAccordion: "white",
    border: "0.5rem solid #f0f0f0",
    alternate: {
      main: "rgb(247, 249, 250)",
      dark: "#e8eaf6",
    },
    cardShadow: "rgba(23, 70, 161, .11)",
    type: "light",
    primary: {
      main: "#3f51b5",
      light: "rgb(71, 145, 219)",
      dark: "rgb(17, 82, 147)",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffb74d",
      main: "#f9b934",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    text: {
      primary: "#2d3748",
      secondary: "#718096",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#fff",
      default: "#fff",
      level2: "#f5f5f5",
      level1: "#fff",
      footer: "#1b1642",
    },
  },
  dark: {
    codeEditor: "vs-dark",
    backgroundColor: "gray",
    backgroundColorSecondary: "black",
    textColor: "white",
    fontColor: "white",
    topBar: "#003366",
    compileButton: "#5d3264",
    deployButton: "black",
    buttonsbackground: "gray",
    landingPageBigBox: "white",
    sideNavAccordion: "gray",
    border: "0.5rem solid #000000",
  },
};

/**
 * Returns the session storage object
 *
 * @returns {Object}
 */
export const sessionStorage =
  typeof window !== "undefined"
    ? window.sessionStorage
    : {
        getItem: () => undefined,
        setItem: () => undefined,
      };

const mode = sessionStorage.getItem("themeMode") || "light";

console.log("MODE HERE:", mode);
const theme = responsiveFontSizes(
  createTheme({
    palette: mode === "light" ? themes.light : themes.dark,
    layout: {
      contentWidth: 1236,
    },
    typography: {
      fontFamily: "Lato",
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    overrides: {
      MuiButton: {
        containedSecondary: {
          color: "white",
        },
      },
    },
  })
);

export default theme;
