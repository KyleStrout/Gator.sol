import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SideNav from "../SideNav";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import CodeEditor from "../CodeEditor";
import EditorContent from "../EditorContent";
import SectionContent from "../SectionContent";

const ContentContainer = styled(Box)(() => ({
  width: "100%-(12rem)",
  marginLeft: "12rem",
  height: "100%",
  backgroundColor: "lightblue",
  flexDirection: "row",
}));

function About() {
  return (
    //<SectionContent></SectionContent>
    <ContentContainer>
      <SectionContent></SectionContent>
      <EditorContent></EditorContent>
    </ContentContainer>

    // hello world
  );
}

export default About;
