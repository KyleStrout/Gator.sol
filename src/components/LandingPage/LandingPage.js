import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function LandingPage() {
  return (
    <Box
      sx={{
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "15rem",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Typography mb={3}>
          Welcome to our project. The goal is to learn about the blockchain!
        </Typography>
        <Button variant="contained"> Start Course </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "40rem",
          height: "30rem",
          borderRadius: "2.5rem",
          backgroundColor: "gray",
        }}
      ></Box>
    </Box>
  );
}

export default LandingPage;
