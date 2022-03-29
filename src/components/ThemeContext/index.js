import React from 'react';
import { orange, blue } from "@mui/material/colors";

export const themes = ({
    light: {
        codeEditor: 'vs-light',
        backgroundColor: 'white',
        backgroundColorSecondary: 'white',
        textColor: 'black',
        fontColor: 'black',
        topBar: '#1976d2',
        compileButton: '#9c27b0',
        deployButton: '#A4A4A4',
        buttonsbackground: 'white',
        landingPageBigBox: 'gray',
        sideNavAccordion: 'white',
        border: "0.5rem solid #f0f0f0"

    },
    dark: {
        codeEditor: 'vs-dark',
        backgroundColor: 'gray',
        backgroundColorSecondary: 'black',
        textColor: 'white',
        fontColor: 'white',
        topBar: '#003366',
        compileButton: '#5d3264',
        deployButton: 'black',
        buttonsbackground: 'gray',
        landingPageBigBox: 'white',
        sideNavAccordion: 'gray',
        border: '0.5rem solid #000000'
        
    },
  });
  

export const ThemeContext = React.createContext({
    customTheme: themes.dark,
    setCustomTheme: () => { }
  })



