import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useAuthDispatch} from "../context/context"
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { RestApiService } from "../util/RestApiService";
import { loginUser } from "../context/action";

export default function LogIn() {
  const dispatch = useAuthDispatch();
  const [userId, setUserId] = React.useState("");
  const [password, setPassw] = React.useState("");
  const [error, setError] = React.useState("");
  let currentUser = {};
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const login = async () => {

    let payload = {
      userId,
      password
    }

    try {
      let response = await loginUser(dispatch,payload);
      if(response.message) {
        history.replace('/dashboard')
      }
      else{
        setError(response.error);
      }
    } catch (error) {
      
    }
    // try {
    //   await RestApiService.post(
    //     ApiConstants.login,{
    //       "Authorization": "any-auth-token",
    //     },
    //     {
    //       "userId":userId,
    //       "password":password
    //     }
    //   ).then(res =>{
    //     console.log(res)
    //   })
    // }
    // catch (e) {
    //   console.error(e)
    // }
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
            "url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Id"
              name="email"
              autoFocus
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassw(e.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Log In
            </Button>
            <p style={{color:"red"}}>{error}</p>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
