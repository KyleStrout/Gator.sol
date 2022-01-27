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
import { positions } from "@mui/system";

function SideNav(props) {
  const drawerWidth = 75;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let navigate = useNavigate();

  const menuItems = [
    {
      key: 0,
      icon: <HomeIcon color="primary" />,
      path: "/home",
    },
    {
      key: 1,
      icon: <FormatListBulletedIcon color="primary" />,
      path: "/course-home",
    },
  ];

  const drawer = (
    <Box>
      <Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.key} onClick={() => navigate(item.path)}>
              <ListItemIcon size="large">{item.icon}</ListItemIcon>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
      }}
    >
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
            height: "calc(100%)",
            width: drawerWidth,
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
