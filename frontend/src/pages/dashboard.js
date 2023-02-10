import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAuthState } from "../context/context";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { ApiConstants } from "../util/ApiConstants";
import { RestApiService } from "../util/RestApiService";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Popover, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import borrowButtonModal from "../components/borrowButtonModal";
import { color } from "@mui/system";
import { useHistory } from "react-router-dom";
import BorrowButtonModal from "../components/borrowButtonModal";

const menuItem = [
  { title: "Filter", icon: <FilterAltIcon />, type: "filter" },
  { title: "History", icon: <HistoryIcon />, type: "history" },
  { title: "Logout", icon: <LogoutIcon />, type: "logout" },
];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Dashboard() {
  const userDetails = useAuthState();
  const [listData, setListData] = React.useState([]);
  const [popOver, setPopOver] = React.useState(false);
  const [borrow, setBorrow] = React.useState(true);
  const [bookCopyData, setBookCopyData] = React.useState();
  const history = useHistory();

  //Borrow book copies popOver
  const borrowClick = (data) => {
    console.log(data.title);
    setBookCopyData(data);
    //setBorrow(true)
    //history.push("/dashboard/book/"+id)
  };

  const borrowClose = (event) => {
    setBorrow(null);
  };

  //menu popOver
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setPopOver(event.currentTarget);
  };

  const handleClose = () => {
    setPopOver(null);
  };

  const open = Boolean(popOver);
  const id = open ? "simple-popover" : undefined;
  const searchBooks = async (e) => {
    if (e.target.value.length > 2) {
      //console.log(e.target.value);
      await RestApiService.post(
        ApiConstants.getBooks,
        {
          Authorization: "any-auth-token",
        },
        {
          search: e.target.value,
        }
      ).then((result) => {
        setListData(result["data"]);
        // console.log(listData);
      });
    }
  };

  const handleButton = (type) => {
    if (type === "filter") {
      console.log("filter");
    }
    if (type === "history") {
      setListData(null);
      console.log("history");
    }
    if (type === "logout") {
      console.log("logout");
    }
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ backgroundColor: "gainsboro", height: "100%" }}
    >
      <AppBar position="static">
        <Toolbar style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <IconButton aria-label="menu" onClick={handleClick}>
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={popOver}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {menuItem.map((el) => {
                return (
                  <div key={el.type}>
                    <Button
                      onClick={() => handleButton(el.type)}
                      style={{ color: "black" }}
                    >
                      {el.icon}
                      <div>{el.title}</div>
                    </Button>
                  </div>
                );
              })}
            </Popover>
            Hi {userDetails.userDetail.loginPayload.firstname}&nbsp;
            {userDetails.userDetail.loginPayload.lastname}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Books"
              onChange={(e) => searchBooks(e)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: "0",
        }}
      >
        {listData?.map((e, i) => {
          return (
            <div key={i} style={{ margin: "15px", display: "flex" }}>
              <Card key={e.id} style={{ width: "635px" }}>
                <CardContent style={{ height: "95px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt={e.title}
                      src={e.image}
                      style={{ width: "60px", height: "70px" }}
                    ></img>
                    <div id="bookInfo">
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <Tooltip title={e.author} placement="top-start">
                          <span
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              width: "180px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {e.author}
                          </span>
                        </Tooltip>
                      </Typography>

                      <Typography variant="h6" component="div">
                        <Tooltip title={e.title} placement="bottom-start">
                          <span
                          // style={{
                          //   textOverflow: "ellipsis",
                          //   overflow: "hidden",
                          //   width: "250px",
                          //   whiteSpace: "nowrap"
                          // }}
                          >
                            {e.title}
                          </span>
                        </Tooltip>
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <CardActions>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <BorrowButtonModal
                      e={e}
                      userDetail={userDetails.userDetail.loginPayload}
                    />
                    <Typography
                      color="text.secondary"
                      style={
                        e.available ? { color: "green" } : { color: "red" }
                      }
                    >
                      {e.available ? "Available" : "Not Available"}
                    </Typography>
                  </div>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </Box>
  );
}
