// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import React, { useEffect, useState } from "react";

// Custom Components
import SectionContent from "../SectionContent";
import SectionInteraction from "../SectionInteraction";

// Custom Theme
import { useTheme } from "@mui/styles";

const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "calc(100vh - 4rem)",
  justifyContent: "center",
  alignItems: "start",
  overflow: "hidden",
}));

export default function SectionPage(props) {
  const theme = useTheme();
  return (
    <SectionPageContainer
      id="section-page-container"
      sx={{
        backgroundColor: theme.palette.backgroundColor,
      }}
    >
      <SectionContent
        id="section-content"
        sx={{
          backgroundColor: theme.palette.backgroundColor,
        }}
        contentUrl={props.contentUrl}
      ></SectionContent>
      {props.hasCodeEditor && (
        <SectionInteraction
          id="section-interaction"
          sx={{
            backgroundColor: theme.palette.backgroundColor,
          }}
          hasCodeEditor={props.hasCodeEditor}
          defaultCode={props.defaultCode}
        ></SectionInteraction>
      )}
      {props.secondaryContentUrl && (
        <SectionContent
          id="section-secondary-content"
          contentUrl={props.secondaryContentUrl}
        ></SectionContent>
      )}
    </SectionPageContainer>
  );
}
