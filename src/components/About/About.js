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
        About Gator.sol
      </Typography>
      <Typography variant="h5" align="center" marginTop="20px">
        Dev Team: Jack Driscoll, Kyle Strout, Connor Wilson, Collin Naehr
      </Typography>
      {/*<Box textAlign="center" marginTop="20px">
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          style={{ backgroundColor: "#2D333B" }}
          href="https://github.com/KyleStrout/Senior-Project"
        >
          GitHub Repo
        </Button>
      </Box>*/}
      <Box marginTop="2em">
        <Typography>
          Gator.sol is a platform for students to learn about blockchain, smart
          contracts, and Solidity. The goal is to provide a unique learning
          experience for students who wish to learn about developing smart
          contracts on the Ethereum blockchain by providing an engaging and
          interactive course. The course focuses on teaching three aspects of
          blockchain development. The first is general concepts of blockchain,
          the second is general concepts on smart contracts, and the third is
          hands on programming with Solidity. To our knowledge, this is the only
          course that offers a code editor where you can compile, deploy, and
          interact with smart contracts as you go.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
