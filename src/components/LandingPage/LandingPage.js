import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import React, { useRef, useState, useEffect } from "react";
//Custom Theme
import {ThemeContext, themes} from '../ThemeContext';
const LandingContainer = styled((props) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      justifyContent: "space-around",
      alignItems: "center",
      display: "flex",
    }}
    {...props}
  ></Box>
))(() => {});

function LandingPage() {
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext)
  let navigate = useNavigate();
  return (
    <LandingContainer
    sx = {{
      backgroundColor: customTheme.backgroundColor
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "15rem",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Typography mb={3} color={customTheme.textColor}>
          Welcome to our project. The goal is to learn about the blockchain!
        </Typography>
        <Button
        sx = {{
          color: "white"
        }}
          onClick={() => {
            // navigate to the course home page
            navigate("/course");
          }}
          variant="contained"
        >
          Start Course
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "40rem",
          height: "30rem",
          borderRadius: "2.5rem",
          backgroundColor: customTheme.landingPageBigBox,
        }}
      ></Box>
    </LandingContainer>
  );
}

export default LandingPage;
