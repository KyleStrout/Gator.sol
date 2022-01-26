import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Theme from "../Theme";
import ThemeProvider from "@mui/styles/ThemeProvider";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function SideNav(props) {
  const drawerWidth = 75;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let navigate = useNavigate();

  const drawer = (
    <div>
      <ThemeProvider theme={Theme}>
        <Toolbar>
          <Typography variant="sub2">
            <Button
              onClick={() => {
                navigate("/home");
              }}
            ></Button>
            Logo
          </Typography>
        </Toolbar>

        <Divider />
        <List>
          {[
            <HomeIcon fontSize="large" />,
            <FormatListBulletedIcon fontSize="large" />,
          ].map((icon, index) => (
            <ListItemButton
              onClick={() => {
                if (index == 0) {
                  navigate("/home");
                } else if (index == 1) {
                  navigate("/course-home");
                }
              }}
            >
              {/* Problem with icon alignment on sidebar */}
              <ListItemIcon sx={{ align: "right" }}>{icon}</ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </ThemeProvider>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "calc(100% - 4rem)",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideNav;
