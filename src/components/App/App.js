import About from "../About";
import React from "react";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import CourseHome from "../CourseHome";
import SectionPage from "../SectionPage";
import course from "../../data/course.js";
import theme from "../Theme";
import { AddressProvider } from "../AddressContext";
import { ContractProvider } from "../ContractContext";
import Navbar from "../Navbar";

import DesktopApp from "../DesktopApp/";
const AppContainer = styled(Box)(() => ({
  height: "100vh",
  width: `100%`,
}));

function App() {
  const [address, setAddress] = React.useState("");
  const value = { address, setAddress };

  const [contractData, setContractData] = React.useState({});
  const contractValue = { contractData, setContractData };

  return (
    <ThemeProvider theme={theme}>
      <AddressProvider value={value}>
        <ContractProvider value={contractValue}>
          <AppContainer id="app-container">
            <Navbar />

            <Routes>
              <Route exact path="/" element={<DesktopApp />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/home" element={<DesktopApp />}></Route>
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
        </ContractProvider>
      </AddressProvider>
    </ThemeProvider>
  );
}

export default App;
