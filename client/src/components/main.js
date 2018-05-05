// This file lays out the routes for the web-app
// @flow
import React from "react";
import {Route, Switch} from 'react-router-dom';
import Game from "../components/game/game";

/**
 * The body render of the react page created by a router selection
 */
const Main = () => {
  return (
    <Switch>
      <Route exact path="/Game" component={Game}/>
    </Switch>
  )
}

export default Main;