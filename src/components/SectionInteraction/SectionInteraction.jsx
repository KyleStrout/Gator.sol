// react
import React, { useEffect, useState } from "react";

// Material UI Components
import { Box } from "@mui/material";
import { styled } from "@mui/styles";

// Custom Components
import CodeEditor from "../CodeEditor";
import OutputPanel from "../OutputPanel";

import { ThemeContext, themes } from "../ThemeContext";

const SectionInteractionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 5rem)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  // backgroundColor: "white",
  // border: "0.5rem solid #f0f0f0",
}));

function SectionInteractionContent(props) {
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext);
  if (props.hasCodeEditor) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: customTheme.backgroundColor,
        }}
      >
        <CodeEditor defaultCode={props.defaultCode} />
        <Box
          sx={{
            height: "calc(50vh - 3.5rem)",
            width: "100%",
            backgroundColor: customTheme.backgroundColor,
            borderBottom: customTheme.backgroundColor,
          }}
        >
          <OutputPanel></OutputPanel>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          backgroundColor: customTheme.backgroundColor,
        }}
      >
        <h1>Section Interaction</h1>
      </Box>
    );
  }
}

export default function SectionInteraction(props) {
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext);
  return (
    <SectionInteractionContainer
      id="section-interaction-conatainer"
      sx={{
        backgroundColor: customTheme.backgroundColor,
        border: customTheme.border,
      }}
    >
      <SectionInteractionContent
        id="section-interaction-content"
        sx={{
          backgroundColor: customTheme.backgroundColor,
        }}
        hasCodeEditor={props.hasCodeEditor}
        defaultCode={props.defaultCode}
      ></SectionInteractionContent>
    </SectionInteractionContainer>
  );
}
