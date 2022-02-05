import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

export default function Navbar() {
  let navigate = useNavigate();

  let web3;
  const connectToWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
    } else {
      console.log("please install meta mask");
    }
  };

  return (
    <AppBar position="sticky" sx={{ height: "4rem" }}>
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
        <Button
          color="inherit"
          onClick={() => {
            connectToWallet();
          }}
        >
          Connect to Wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
}
