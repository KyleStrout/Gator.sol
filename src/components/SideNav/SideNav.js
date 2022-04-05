import React from "react";
// Material Components
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNavAccordion from "../SideNavAccordion";
//Custom Theme
import { useTheme } from "@mui/styles";
const SideNavDrawer = styled(Drawer)(() => ({
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "12rem",
    boxSizing: "border-box",
    top: "4rem",
    height: "100%",
  },
}));

export default function SideNav() {
  const theme = useTheme();
  return (
    <SideNavDrawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.sideNavAccordion,
          color: theme.palette.textColor,
        },
      }}
    >
      <SideNavAccordion />
    </SideNavDrawer>
  );
}
