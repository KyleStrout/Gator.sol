// Material Components
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import React, { useEffect, useState } from "react";

// Custom Components
import SectionContent from "../SectionContent";
import SectionInteraction from "../SectionInteraction";
import {ThemeContext, themes} from '../ThemeContext';

const SectionPageContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "calc(100vh - 4rem)",
  justifyContent: "center",
  alignItems: "start",
  overflow: "hidden",
}));

export default function SectionPage(props) {
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext)
  return (
    <SectionPageContainer id="section-page-container"
    sx={{
      backgroundColor: customTheme.backgroundColor,
    }}>

      <SectionContent
        id="section-content"
        sx={{
          backgroundColor: customTheme.backgroundColor,
        }}
        contentUrl={props.contentUrl}
      ></SectionContent>
      <SectionInteraction
        id="section-interaction"
        sx={{
          backgroundColor: customTheme.backgroundColor,
        }}
        hasCodeEditor={props.hasCodeEditor}
        defaultCode={props.defaultCode}
      ></SectionInteraction>
    </SectionPageContainer>
  );
}
