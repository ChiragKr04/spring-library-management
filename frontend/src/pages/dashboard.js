import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAuthState } from "../context/context";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { ApiConstants } from "../util/ApiConstants";
import { RestApiService } from "../util/RestApiService";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

//const [searchBook,setSerBook] = React.useState("")
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

  const searchBooks = async (e) => {
    if (e.target.value.length > 0) {
      console.log(e.target.value);
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
        console.log(listData);
      });
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
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
      {listData.map((e) => {
        return (
          <div style={{ margin: "15px" }}>
            <Card>
              <CardContent>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <img
                    src={e.image}
                    style={{ width: "60px", height: "70px" }}
                  ></img>
                  <div id="bookInfo">
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {e.author}
                    </Typography>

                    <Typography variant="h5" component="div">
                      {e.title}
                    </Typography>
                    <Typography sx={{ mb: 1.6 }} color="text.secondary">
                      {e.available ? "Available" : "Not Available"}
                    </Typography>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small">Borrow</Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </Box>
  );
}
