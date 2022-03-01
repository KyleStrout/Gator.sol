import React from 'react';
import { orange, blue } from "@mui/material/colors";

export const themes = ({
    light: {
        codeEditor: 'vs-light',
        backgroundColor: 'white',
        backgroundColorSecondary: 'white',
        textColor: '',
        fontColor: 'black',
        topBar: '#1976d2',
        compileButton: '#9c27b0',
        deployButton: '#A4A4A4',
        buttonsbackground: 'white',
        landingPageBigBox: 'gray',
        sideNavAccordion: 'white',

    },
    dark: {
        codeEditor: 'vs-dark',
        backgroundColor: 'gray',
        backgroundColorSecondary: 'black',
        textColor: '',
        fontColor: 'white',
        topBar: '#003366',
        compileButton: '#5d3264',
        deployButton: 'black',
        buttonsbackground: 'gray',
        landingPageBigBox: 'white',
        sideNavAccordion: 'gray',
        
    },
  });
  

export const ThemeContext = React.createContext({
    customTheme: themes.dark,
    setCustomTheme: () => { }
  })



