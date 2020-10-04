import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './protectedRoute';

import Login from "./../Auth/models/Login";
import Signup from "./../Auth/models/Signup";
import UserList from "./../User/models/ListUser";
import LeadsList from "./../Leads/models/ListLeads";

export default function App() {
  return (
    <Router basename="#">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route path="/signup-admin">
                <Signup type="admin" />
            </Route>
            <ProtectedRoute path="/logout" action="logout" component={props => <div>logout...</div>} />
            <ProtectedRoute path="/signup-staff" component={props => <Signup type="staff" />} />
            <ProtectedRoute path="/user-list" component={props => <UserList />} />
            <ProtectedRoute path="/leads-list" component={props => <LeadsList />} />

            <Route path="/">
                <Login />
            </Route>
        </Switch>
    </Router>
  );
}
  