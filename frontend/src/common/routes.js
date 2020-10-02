import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './protectedRoute';

import Login from "./../Auth/models/Login";
import Signup from "./../Auth/models/Signup";

export default function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route path="/signup-admin">
                <Signup type="admin" />
            </Route>
            
            <ProtectedRoute path="/signup-staff" component={props => <Signup type="staff" />} />

            <Route path="/">
                <Login />
            </Route>
        </Switch>
    </Router>
  );
}
  