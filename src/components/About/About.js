import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SideNav from "../SideNav";
import { ThemeProvider } from "@mui/styles";
import Theme from "../Theme";

function About() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <Container>
          <Typography variant="h2">About hi</Typography>
          <SideNav />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default About;
