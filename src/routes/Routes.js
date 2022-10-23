import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch ,
  
} from "react-router-dom";
import { Board } from "../pages";

const RouteSwitcher = (props) => {
  return (
    <Router>
      <Switch >
      <Route exact path="/" element={<Board/>}
              />
      </Switch >
    </Router>
  );
};

export default RouteSwitcher;
