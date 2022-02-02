import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SideNav from "../SideNav";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

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
    </ContentContainer>
  );
}

export default About;
