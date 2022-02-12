import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

import AddressContext from "../AddressContext";

export default function Navbar() {
  let navigate = useNavigate();

  const { address, setAddress } = React.useContext(AddressContext);

  let web3;
  const connectToWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      web3 = new Web3(window.ethereum);
      let account = accounts[0];
      console.log(account);
      setAddress(account);

      //window.ethereum.on("chainChanged", () => window.location.reload());

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          account = accounts[0];
          console.log(`Using account ${account}`);
        } else {
          console.error("0 accounts.");
        }
        setAddress(account);
      });
      // send account address to codeEditor.jsx?
      window.ethereum.on("connect", (info) => {
        console.log(`Connected to network ${info}`);
      });
      window.ethereum.on("disconnect", (info) => {
        console.log(`Disconnected from network ${info}`);
      });
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
