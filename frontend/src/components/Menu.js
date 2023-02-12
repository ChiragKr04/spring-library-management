import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";
const menuItem = [
  { title: "Home", icon: <Home />, type: "home" },
  { title: "History", icon: <HistoryIcon />, type: "history" },
  { title: "Filter", icon: <FilterAltIcon />, type: "filter" },
  { title: "Logout", icon: <LogoutIcon />, type: "logout" },
];
export default function MenuDrawer({ user, changeScreen }) {
  const [state, setState] = React.useState({
    left: false,
  });
  const menuOption = (choice) => {
    if (choice == "Home") {
      changeScreen(0);
    } else if (choice == "History") {
      changeScreen(1);
    } else if (choice == "Filter") {
      changeScreen(2);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <IconButton aria-label="menu" />
      <Divider />
      <List>
        {menuItem.map((element, index) => (
          <ListItem key={element.type} disablePadding>
            <ListItemButton onClick={() => { menuOption(element.title); }}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <span>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            aria-label="menu"
            style={{ color: "white" }}
            onClick={toggleDrawer(anchor, true)}
          >
            {/* {anchor} */}
            <MenuIcon></MenuIcon>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </span>
  );
}
