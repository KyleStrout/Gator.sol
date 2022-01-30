import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SideNav from "../SideNav";
import Button from "@mui/material/Button";

function About() {
  return (
    <div>
      <Container>
        <Typography variant="h2">About</Typography>
        <SideNav />
        <Button color="secondary" variant="contained">
          Hello
        </Button>
      </Container>
    </div>
  );
}

export default About;
