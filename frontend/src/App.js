import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { useAuthState } from "./context/context";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Search from "./pages/search";

function App() {
  const userDetails = useAuthState();
  return (
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
  );
}

export default App;
