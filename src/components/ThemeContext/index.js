import React from 'react';
import { orange, blue } from "@mui/material/colors";

export const themes = ({
    light: {
        codeEditor: 'vs-light'

    },
    dark: {
        codeEditor: 'vs-dark'
    },
  });
  

export const ThemeContext = React.createContext({
    customTheme: themes.dark,
    setCustomTheme: () => { }
  })



