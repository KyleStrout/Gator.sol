import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.js";
import AddressContext from "../AddressContext";
import { ThemeContext, themes } from "../ThemeContext";

import OnboardingButton from "../Metamask";

export default function Navbar() {
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext);
  const [checked, setChecked] = React.useState(false);
  let navigate = useNavigate();

  const { address, setAddress } = React.useContext(AddressContext);

  React.useEffect(() => {
    const mode = checked ? themes.dark : themes.light;
    setCustomTheme(mode);
    console.log(customTheme);
  }, [checked]);

  function handleSwitchChange(event) {
    setChecked(event.target.checked);
  }
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
          sx={{
            color: customTheme.textColor,
          }}
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
    <AppBar
      position="sticky"
      sx={{ height: "4rem", backgroundColor: customTheme.topBar }}
    >
      <Toolbar>
        <Typography
          color={customTheme.textColor}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Button
            sx={{
              color: customTheme.textColor,
            }}
            onClick={() => {
              navigate("/home");
            }}
            variant="text"
          >
            Blockchain Education
          </Button>
        </Typography>
        <ThemeSwitch
          checked={checked}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <OnboardingButton />
      </Toolbar>
    </AppBar>
  );
}
