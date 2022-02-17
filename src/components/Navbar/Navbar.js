import React, { useEffect, useContext, useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import OnboardButton from "../OnboardButton/";

import MetaMaskOnboarding from "@metamask/onboarding";

import AddressContext from "../AddressContext";

export default function Navbar() {
  let navigate = useNavigate();

  const { address, setAddress } = useContext(AddressContext);
  const [buttonText, setButtonText] = useState("Install MetaMask");
  const [isDisabled, setIsDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
  // window.ethereum.off is a breaking function where saving any change in the the file will cause the app to crash
  // documentation: https://docs.metamask.io/guide/onboarding-library.html#examples
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        console.log("MetaMask is installed with profile logged in");
        setButtonText(accounts[0]);
        setIsDisabled(true);
        setAddress(accounts[0]);
        onboarding.current.stopOnboarding();
      } else {
        console.log("MetaMask is installed and ready to connect");
        setButtonText("Connect to Wallet");
        setIsDisabled(false);
        console.log("here dude");
        if (!window.ethereum.chainId) {
          setTimeout(() => {
            window.location.reload();
          }, 10000);
        }
      }
    }
  }, [accounts]);
  // test yo
  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
      //setAddress(accounts[0]);
      // console.log("yo");
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      // console.log("yooooooooooooo");
      const acc = window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccount) => {
          handleNewAccounts(newAccount);
        });
      // console.log(acc);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        console.log("returning");
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  const WalletConnect = () => {
    return (
      <Button
        color="inherit"
        onClick={() => {
          if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
              .request({ method: "eth_requestAccounts" })
              .then((newAccounts) => setAccounts(newAccounts));
          } else {
            onboarding.current.startOnboarding();
          }
        }}
        disabled={isDisabled}
      >
        {buttonText}
      </Button>
    );
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
        <WalletConnect />
      </Toolbar>
    </AppBar>
  );
}
