import { createTheme, responsiveFontSizes } from "@mui/material";

import { light, dark } from "./palette";

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

const theme = responsiveFontSizes(
  createTheme({
    palette: mode === "light" ? light : dark,
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
