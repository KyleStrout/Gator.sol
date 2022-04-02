import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.js";
import AddressContext from "../AddressContext";

import OnboardingButton from "../Metamask";

import { useTheme } from "@mui/styles";

import { sessionStorage } from "../ThemeContext/index.js";
export default function Navbar() {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(false);
  let navigate = useNavigate();

  const { setAddress } = React.useContext(AddressContext);

  React.useEffect(() => {
    sessionStorage.setItem("themeMode", checked ? "dark" : "light");
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

  React.useEffect(() => {
    connectToWallet();
  });

  return (
    <AppBar
      position="sticky"
      sx={{ height: "4rem", backgroundColor: theme.palette.topBar }}
    >
      <Toolbar>
        <Typography
          color={theme.palette.textColor}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Button
            sx={{
              color: theme.palette.textColor,
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
