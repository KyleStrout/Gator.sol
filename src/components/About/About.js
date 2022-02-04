import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CodeEditor from "../CodeEditor";

const ContentContainer = styled(Box)(() => ({
  width: "100%-(12rem)",
  marginLeft: "12rem",
  height: "100%",
  backgroundColor: "lightblue",
  flexDirection: "row",
}));

function About() {
  return (
    <ContentContainer>
      <Typography>Test stuff here if u want</Typography>
      <CodeEditor />
    </ContentContainer>
  );
}

export default About;
