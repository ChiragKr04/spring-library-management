import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { useAuthState } from "./context/context";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Search from "./pages/search";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function App() {
  const userDetails = useAuthState();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF5733",
      },
      secondary: {
        main: "#FA2F2F",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route path={"/"} exact>
            <Login />
          </Route>
          <Route path={"/signup"} exact>
            <SignUp />
          </Route>
          <Route path={"/dashboard"}>
            <Dashboard />
          </Route>
          <Route path={"/search"}>
            <Search />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
