import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminSignUp from './pages/AdminSignUp'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <div>
      <Switch>
        <Route path={"/"} exact>
          <AdminLogin />
        </Route>
        <Route path={"/signup"} exact>
          <AdminSignUp />
        </Route>
        <Route path={"/home"} exact>
          <HomePage />
        </Route>
      </Switch>
    </div>
  )
}

