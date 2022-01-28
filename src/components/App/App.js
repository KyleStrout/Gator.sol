//import logo from "./logo.svg";
//import './App.css';
import LandingPage from "../LandingPage";
import About from "../About";
import React from "react";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import CourseHome from "../CourseHome";
import CoursePage from "../CoursePage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      secondary: "#ff5722",
    },
  },
});

const AppContainer = styled((props) => (
  <Container disableGutters fluid {...props} />
))(() => ({
  height: `100%`,
  width: `100%`,
  maxWidth: `100% !important`,
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/home" element={<LandingPage />}></Route>
          <Route path="/course/*" element={<CourseHome />}>
            <Route
              path="blockchain"
              element={<CoursePage title="Blockchain" />}
            ></Route>
          </Route>
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
