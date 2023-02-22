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
import { Avatar, IconButton } from "@mui/material";
import { AdminPanelSettings, Home, Person } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
const menuItem = [
  { title: "Home", icon: <Home />, type: "home" },
  { title: "History", icon: <HistoryIcon />, type: "history" },
  { title: "Admin", icon: <AdminPanelSettings />, type: "admin" },
  { title: "Logout", icon: <LogoutIcon />, type: "logout" },
];
export default function MenuDrawer({ user, changeScreen, logoutFunction, currentPage }) {
  const [state, setState] = React.useState({
    left: false,
  });
  const history = useHistory();
  const menuOption = (choice) => {
    if (choice == "Home") {
      changeScreen(0);
    } else if (choice == "History") {
      changeScreen(1);
    } else if (choice == "Admin") {
      changeScreen(2);
    } else if (choice == "Logout") {
      logoutFunction();
      history.replace('/')
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

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

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
            <ListItemButton selected={currentPage === index} onClick={() => { menuOption(element.title); }}>
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
            <div style={{
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "center",
              margin: "10px",
            }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{
                  width: "100px",
                  height: "100px",
                }}
                {...stringAvatar(`${user.firstname} ${user.lastname}`)}
              />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <h2 style={{
                margin: "0"
              }}>{user.firstname}</h2>
              <h3 style={{
                margin: "0"
              }}>{user.lastname}</h3>
              <h5 style={{
                marginTop: "10px",
              }}>{user.userId}</h5>
            </div>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </span>
  );
}
