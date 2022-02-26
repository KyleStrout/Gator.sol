import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

import AddressContext from "../AddressContext";

import OnboardingButton from "../Metamask";

export default function Navbar() {
  let navigate = useNavigate();

  // const WalletConnect = () => {
  //   if (address) {
  //     return (
  //       <Typography variant="h6" color="inherit">
  //         {address}
  //       </Typography>
  //     );
  //   } else if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     return (
  //       <Button
  //         color="inherit"
  //         onClick={() => {
  //           connectToWallet();
  //         }}
  //       >
  //         Connect to Wallet
  //       </Button>
  //     );
  //   } else {
  //     const onboarding = new MetaMaskOnboarding();
  //     return (
  //       <Button
  //         color="inherit"
  //         onClick={() => {
  //           onboarding.startOnboarding();
  //         }}
  //       >
  //         Install Metamask
  //       </Button>
  //     );
  //   }
  // };

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
        <OnboardingButton />
      </Toolbar>
    </AppBar>
  );
}
