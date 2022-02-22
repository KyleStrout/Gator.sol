import MetaMaskOnboarding from "@metamask/onboarding";
import React from "react";

import AddressContext from "../AddressContext";

import Button from "@mui/material/Button";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";

export default function OnboardingButton() {
  const { address, setAddress } = React.useContext(AddressContext);

  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts] = React.useState([]);
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (address?.length > 0) {
        setButtonText(address);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [address, accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAddress(newAccounts[0]);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    }
  }, [setAddress]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      console.log("MetaMask is installed");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => setAddress(newAccounts[0]));
    } else {
      console.log("MetaMask is not installed");
      onboarding.current.startOnboarding();
    }
  };
  return (
    <Button color="inherit" disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </Button>
  );
}
