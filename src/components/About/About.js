import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CodeEditor from "../CodeEditor";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

function About() {
  return (
    <Container>
      <Typography align="center" variant="h3" marginTop="20px">
        About Blockchain Education
      </Typography>
      <Typography align="center" marginTop="20px">
        Dev Team: Jack Driscoll, Kyle Strout, Connor Wilson, Collin Naehr
      </Typography>
      <Box textAlign="center" marginTop="20px">
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          style={{ backgroundColor: "#2D333B" }}
          href="https://github.com/KyleStrout/Senior-Project"
        >
          GitHub Repo
        </Button>
      </Box>
      <Box marginTop="20px">
        <Typography>This project is about..</Typography>
        <Typography>What we did...</Typography>
      </Box>
    </Container>
  );
}

export default About;
