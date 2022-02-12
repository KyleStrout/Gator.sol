import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import AddressContext from "../AddressContext";

export default function Navbar() {
  let navigate = useNavigate();

  const { address, setAddress } = React.useContext(AddressContext);

  const connectToWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let account = accounts[0];
      setAddress(account);

      window.ethereum.on("accountsChanged", (accounts) => {
        let account;
        if (accounts.length > 0) {
          account = accounts[0];
          console.log(`Using account ${account}`);
        } else {
          console.error("0 accounts.");
        }
        setAddress(account);
      });
      window.ethereum.on("connect", (info) => {
        console.log(`Connected to network ${info}`);
      });
      window.ethereum.on("disconnect", (info) => {
        console.log(`Disconnected from network ${info}`);
      });
    }
  };

  const WalletConnect = () => {
    if (address) {
      return (
        <Typography variant="h6" color="inherit">
          {address}
        </Typography>
      );
    } else {
      return (
        <Button
          color="inherit"
          onClick={() => {
            connectToWallet();
          }}
        >
          Connect to Wallet
        </Button>
      );
    }
  };

  React.useEffect(() => {
    connectToWallet();
  });

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
        <WalletConnect />
      </Toolbar>
    </AppBar>
  );
}
