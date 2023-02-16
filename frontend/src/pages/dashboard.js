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
import {
  Chip,
  CircularProgress,
  circularProgressClasses,
  Fab,
  Popover,
  Rating,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import borrowButtonModal from "../components/borrowButtonModal";
import { color } from "@mui/system";
import { useHistory } from "react-router-dom";
import BorrowButtonModal from "../components/borrowButtonModal";
import AlertStatus from "../components/alertStatus";
import MenuDrawer from "../components/Menu";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import FilterPage from "./FilterPage";

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
  const [mainBookData, setMainBookData] = React.useState([]);
  const [listData, setListData] = React.useState([]);
  const [popOver, setPopOver] = React.useState(false);
  const [responseOfBookIssue, setResponseOfBookIssue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  // State of response after login fetching it from history 
  const [userState, changeUserState] = React.useState(window.history.state);

  const setResponseOfBookIssueMethod = (response) => {
    setResponseOfBookIssue(response);
    //console.log(responseOfBookIssue);
  };

  const changePage = (pageIdx) => {
    setCurrentPage(pageIdx);
  };

  //menu popOver
  // const handleClick = (event) => {
  //   console.log(event.currentTarget);
  //   setPopOver(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setPopOver(null);
  // };

  // const open = Boolean(popOver);
  // const id = open ? "simple-popover" : undefined;
  const searchBooks = async (e) => {
    if (e.target.value.length >= 1) {
      //console.log(e.target.value);
      setIsLoading(true);
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
        setMainBookData(result["data"]);
        setIsLoading(false);
      });
    } else {
      getAllBooks();
    }
  };

  const getAllBooks = async () => {
    setIsLoading(true);
    await RestApiService.post(
      ApiConstants.getBooks,
      {
        Authorization: "any-auth-token",
      },
      {
        search: "all",
      }
    ).then((result) => {
      setListData(result["data"]);
      setMainBookData(result["data"]);
      setIsLoading(false);
    });
  };

  const changeBookDataOnFilter = (newBookData) => {
    console.log("changeBookDataOnFilter");
    console.log(newBookData);
    setListData(newBookData);
  }

  const setDataOnClearFilter = () => {
    setListData(mainBookData);
  }

  const logoutFunction = () => {
    changeUserState(null);
  }

  React.useEffect(() => {
    if (listData.length == 0) {
      getAllBooks();
    }
  }, []);

  // Check if user details are null send back to login page
  if (userState == undefined || userState == null) {
    history.replace("/");
  }

  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ /*backgroundColor: "gainsboro",*/ height: "100%" }}
    >
      <AppBar position="static">
        <Toolbar style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <MenuDrawer
              user={userState.state.loginPayload}
              changeScreen={changePage}
              logoutFunction={logoutFunction}
              currentPage={currentPage}
            />
            {/* <IconButton aria-label="menu" onClick={handleClick}>
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
            </Popover> */}
            Hi {userState.state.loginPayload.firstname}&nbsp;
            {userState.state.loginPayload.lastname}
          </Typography>
          {currentPage == 0 ? (
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
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
      {responseOfBookIssue && (
        <AlertStatus
          response={responseOfBookIssue}
          responseMethod={setResponseOfBookIssueMethod}
        />
      )}
      {currentPage == 0 ? (
        isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
                animationDuration: "550ms",
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: "round",
                },
              }}
              size={40}
              thickness={4}
            />
          </Box>
        ) : (
          <HomePage
            bookData={listData}
            constBookData={mainBookData}
            userDetails={userDetails.userDetail.loginPayload}
            setResponseOfBookIssueMethod={setResponseOfBookIssueMethod}
            changeBookDataOnFilter={changeBookDataOnFilter}
            setDataOnClearFilter={setDataOnClearFilter}
          />
        )
      ) : currentPage === 1 ? (
        <HistoryPage userDetails={userDetails.userDetail.loginPayload} />
      ) : (
        <FilterPage />
      )}
    </Box>
  );
}
