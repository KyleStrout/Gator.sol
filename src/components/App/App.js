import About from "../About";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import CourseHome from "../CourseHome";
import SectionPage from "../SectionPage";
import course from "../../data/course.js";
import { AddressProvider } from "../AddressContext";
import { ContractProvider } from "../ContractContext";
import Navbar from "../Navbar";

import WarningDialog from "../WarningDialog";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "../ThemeContext";

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

  const [mode, setMode] = React.useState("light");
  const theme = getTheme(mode);

  const [onWrongNetwork, setOnWrongNetwork] = React.useState(false);

  function checkNetwork() {
    // if not on rinekby network, show warning
    // if window.ethereum
    if (window !== "undefined" && window.ethereum) {
      window.ethereum.request({ method: "eth_chainId" }).then((chainId) => {
        if (chainId !== "0x4") {
          setOnWrongNetwork(true);
        } else {
          setOnWrongNetwork(false);
        }
      });

      window.ethereum.on("networkChanged", (networkId) => {
        console.log("here");
        if (networkId !== "0x4") {
          setOnWrongNetwork(true);
        } else {
          setOnWrongNetwork(false);
        }
      });
    }
  }

  React.useEffect(() => {
    checkNetwork();
  });

  return (
    <ThemeProvider theme={theme}>
      <AddressProvider value={value}>
        <ContractProvider value={contractValue}>
          <AppContainer id="app-container">
            <Navbar setMode={setMode} />

            <WarningDialog
              warning="Incorrect Network"
              open={onWrongNetwork}
              message="Please open metamask and switch network to 'Rinekby'"
              handleClose={() => {
                if (checkNetwork()) {
                  setOnWrongNetwork(false);
                }
              }}
            />
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
                          secondaryContentUrl={section.secondaryContentUrl}
                          hasCodeEditor={section.hasCodeEditor}
                          defaultCode={section.defaultCode}
                          answerCode={section.answerCode}
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
