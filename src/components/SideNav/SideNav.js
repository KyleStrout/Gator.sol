// Material Components
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
// Custom Components
import SideNavAccordion from "../SideNavAccordion";

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
  return (
    <SideNavDrawer variant="permanent" anchor="left">
      <SideNavAccordion />
    </SideNavDrawer>
  );
}
