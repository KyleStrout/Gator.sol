import LandingPage from "../LandingPage";
import About from "../About";
import React from "react";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import CourseHome from "../CourseHome";
import SectionPage from "../SectionPage";
import course from "../../data/course.js";
import theme from "../Theme";

const AppContainer = styled(Box)(() => ({
  height: `100%`,
  width: `100%`,
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
            {course.chapters.map((chapter) =>
              chapter.sections.map((section) => (
                <Route
                  path={`${chapter.url}/${section.url}`}
                  element={<SectionPage contentUrl={section.contentUrl} />}
                />
              ))
            )}
          </Route>
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
