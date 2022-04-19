// react
import React from "react";

// Material UI Components
import { Box } from "@mui/material";
import { styled } from "@mui/styles";

// Custom Components
import CodeEditor from "../CodeEditor";
import OutputPanel from "../OutputPanel";

// Custom Theme
import { useTheme } from "@mui/styles";

const SectionInteractionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 5rem)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  fontFamily: "Lato",
}));

function SectionInteractionContent(props) {
  const theme = useTheme();

  if (props.hasCodeEditor) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: theme.palette.backgroundColor,
        }}
      >
        <CodeEditor
          defaultCode={props.defaultCode}
          answerCode={props.answerCode}
        />
        <Box
          sx={{
            height: "calc(50vh - 3.5rem)",
            width: "100%",
            backgroundColor: theme.palette.backgroundColor,
            borderBottom: theme.palette.backgroundColor,
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
          backgroundColor: theme.palette.backgroundColor,
        }}
      >
        <h1>Course Overview</h1>
      </Box>
    );
  }
}

export default function SectionInteraction(props) {
  const theme = useTheme();
  return (
    <SectionInteractionContainer
      id="section-interaction-conatainer"
      sx={{
        backgroundColor: theme.palette.backgroundColor,
        border: theme.palette.border,
      }}
    >
      <SectionInteractionContent
        id="section-interaction-content"
        sx={{
          backgroundColor: theme.palette.backgroundColor,
        }}
        hasCodeEditor={props.hasCodeEditor}
        defaultCode={props.defaultCode}
        answerCode={props.answerCode}
      ></SectionInteractionContent>
    </SectionInteractionContainer>
  );
}
