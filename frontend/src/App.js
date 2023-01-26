import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import SignUp from './pages/signup';

function App() {
  return (
    <div>
     <Switch>
      <Route path={'/'} exact>
        <Login/>
      </Route>
      <Route path={'/signup'} exact>
        <SignUp/>
      </Route>
      <Route path={'/dashboard'} exact>
        <Dashboard/>
      </Route>
     </Switch>
    </div>
  );
}

export default App;
