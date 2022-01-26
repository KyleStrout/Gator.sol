import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SideNav from "../SideNav";

function About() {
  return (
    <div>
      <Container>
        <Typography variant="h2">About</Typography>
        <SideNav />
      </Container>
    </div>
  );
}

export default About;
