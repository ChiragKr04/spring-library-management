import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";

import { RestApiService } from "../util/RestApiService";
import { ApiConstants } from "../util/ApiConstants";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [mobileNo, setMobileNo] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [college, setCollege] = React.useState("");
  const [error, setError] = React.useState("");
  const history = useHistory();

  let response;

  const signup = async () => {
    try {
      await RestApiService.post(
        ApiConstants.signup,
        {
          Authorization: "any-auth-token",
        },
        {
          firstname: firstName,
          lastname: lastName,
          emailId: emailId,
          college: college,
          phoneNo: mobileNo,
          address: address,
        }
      ).then((result) => {
        response = JSON.parse(JSON.stringify(result["data"]));
        // // console.log("cu:"+currentUser);
        // console.log("result: "+JSON.stringify(result["data"]));
        if (!response.error) {
          history.replace("/");
        } else {
          setError(response.error);
        }
      });
    } catch (e) {}
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1509038937-0dd67150f035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1 }} style={{ backgroundColor: "#FF5733" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="first_name"
              label="First Name"
              type="text"
              id="first_name"
              autoFocus
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="last_name"
              label="Last Name"
              type="text"
              id="last_name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Id"
              name="email"
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="college_name"
              label="College Name"
              type="text"
              id="college_name"
              onChange={(e) => {
                setCollege(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="mobile_no"
              label="Mobile Number"
              type="tel"
              id="mobile_no"
              onChange={(e) => {
                setMobileNo(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="address"
              type="text"
              id="address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#FF5733" }}
              onClick={signup}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Have an account? Log In"}
                </Link>
                <p style={{ color: "red" }}>{error}</p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
