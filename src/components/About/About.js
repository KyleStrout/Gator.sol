import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SideNav from "../SideNav";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import CodeEditor from "../CodeEditor";

const ContentContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "fit-content",
  maxHeight: "calc(100% - 2rem)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  overflow: "scroll",
  border: "1px solid black",
  padding: "1rem",
  margin: "0.5rem 1rem",
}));

function About() {
  return (
    <div>
      <ContentContainer>
        <Typography variant="h2">About</Typography>
        <CodeEditor />
      </ContentContainer>
    </div>
  );
}

export default About;
