//import logo from "./logo.svg";
//import './App.css';
import LandingPage from "../LandingPage";
import About from "../About";
import React from "react";
import { ThemeProvider, makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
//import { Route, Switch, Link } from 'react-router-dom';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import { IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      secondary: "#ff5722",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container>
          <AppBar>
            <Toolbar>
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" color="#ff5722" align="center">
                Blockchain Education
              </Typography>
            </Toolbar>
          </AppBar>
        </Container>

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/home" element={<LandingPage />}></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
