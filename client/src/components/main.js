// This file lays out the routes for the web-app
// @flow
import React from "react";
import {Route, Switch} from 'react-router-dom';
import AuthCheck from "./auth/auth-check";
import Game from "../components/game/game";
import Login from "../components/login/login";
import Home from "./home/home";

/**
 * The body render of the react page created by a router selection
 */
const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/game" render={() => <AuthCheck nextComponent={Game} />} />
      <Route exact path="/login" component={Login}/>
    </Switch>
  )
}

export default Main;