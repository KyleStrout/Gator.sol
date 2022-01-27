//import logo from "./logo.svg";
//import './App.css';
import LandingPage from "../LandingPage";
import About from "../About";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import CourseHome from "../CourseHome";
import "./App.css";
import Theme from "../Theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Navbar />

        <Box
          sx={{
            height: "calc(100% - 4rem)",
            width: "100%",
          }}
        >
          <Routes>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/home" element={<LandingPage />}></Route>
            <Route path="/course-home" element={<CourseHome />}></Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
