import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles, themeProvider } from "@mui/material";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function LandingPage(props) {
  return (
    <div>
      <Container>
        <Typography variant="h2">Landing Page</Typography>
      </Container>
    </div>
  );
}

export default LandingPage;
