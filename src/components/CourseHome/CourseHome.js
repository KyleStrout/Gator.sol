import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SideNavAccordion from "../SideNavAccordion";
import Container from "@mui/material/Container";
export default function CourseHome() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "12rem",
            boxSizing: "border-box",
            top: "4rem",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <SideNavAccordion />
      </Drawer>
      <Container></Container>
    </Box>
  );
}
