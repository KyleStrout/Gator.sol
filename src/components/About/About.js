import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AppUL = styled("ul")(() => ({
  fontSize: "1.5rem",
}));
function About() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
      <Box
        marginTop="2em"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" align="center" marginBottom="1rem">
          Gator.sol is a platform for students to learn about blockchain, smart
          contracts, and Solidity.
        </Typography>
        <Typography variant="h4">Our mission:</Typography>
        <AppUL>
          <li>
            Provide a unique learning experience for students who wish to learn
            about developing smart contracts
          </li>
          <li>Create an engaging and interactive course</li>
        </AppUL>
        <Typography variant="h4">What you will learn:</Typography>
        <AppUL>
          <li>General concepts of blockchain</li>
          <li>General concepts of smart contracts</li>
          <li>Hands on programming with Solidity</li>
        </AppUL>
        <Typography variant="h5">
          To our knowledge, this is the only course that offers a code editor
          where you can compile, deploy, and interact with smart contracts as
          you go.
        </Typography>
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to the course
      </Button>
    </Container>
  );
}

export default About;
