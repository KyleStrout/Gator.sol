//import logo from "./logo.svg";
//import './App.css';
import LandingPage from "../LandingPage";
import About from "../About";
import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import CourseHome from "../CourseHome";
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
    <Container fluid disableGutters>
      <ThemeProvider theme={theme}>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/home" element={<LandingPage />}></Route>
          <Route path="/course-home" element={<CourseHome />}></Route>
        </Routes>
      </ThemeProvider>
    </Container>
  );
}

export default App;
