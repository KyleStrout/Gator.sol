import React, { useRef, useState, useEffect } from "react";
// Material Components
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNavAccordion from "../SideNavAccordion";
//Custom Theme
import {ThemeContext, themes} from '../ThemeContext';

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
  const { customTheme, setCustomTheme } = React.useContext(ThemeContext)
  return (
    <SideNavDrawer variant="permanent" anchor="left" PaperProps={{ sx: {backgroundColor: customTheme.backgroundColor}}}>
      <SideNavAccordion />
    </SideNavDrawer>
  );
}
