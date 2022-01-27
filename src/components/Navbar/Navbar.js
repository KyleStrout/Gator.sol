import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, height: "4rem" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => {
                navigate("/home");
              }}
              variant="text"
              color="inherit"
            >
              Blockchain Education
            </Button>
          </Typography>
          <Button color="inherit">Connect to Wallet</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
