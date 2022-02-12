import LandingPage from "../LandingPage";
import About from "../About";
import React from "react";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import CourseHome from "../CourseHome";
import SectionPage from "../SectionPage";
import course from "../../data/course.js";
import theme from "../Theme";
import { AddressProvider } from "../AddressContext";

const AppContainer = styled(Box)(() => ({
  height: "100vh",
  width: `100%`,
}));

const AddressContext = React.createContext("");

function App() {
  const [address, setAddress] = React.useState("");
  const value = { address, setAddress };
  return (
    <ThemeProvider theme={theme}>
      <AddressProvider value={value}>
        <AppContainer id="app-container">
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
                    element={
                      <SectionPage
                        contentUrl={section.contentUrl}
                        hasCodeEditor={section.hasCodeEditor}
                        defaultCode={section.defaultCode}
                      />
                    }
                  />
                ))
              )}
            </Route>
          </Routes>
        </AppContainer>
      </AddressProvider>
    </ThemeProvider>
  );
}

export default App;
