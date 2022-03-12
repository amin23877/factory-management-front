import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectSession } from "../features/Session/sessionsSlice";
import LoginPage from "../pages/Login";
import PanelRouter from "./Panel";

import { getToken } from "../api";

export default function BaseRouter() {
  const session = useSelector(selectSession);
  const isAuthenticated = Boolean(getToken()) || session.status === "Authorized";

  return (
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/panel" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/panel">{isAuthenticated ? <PanelRouter /> : <Redirect to="/login" />}</Route>
      <Route exact path="/login">
        {isAuthenticated ? <Redirect to="/panel" /> : <LoginPage />}
      </Route>
      <Route exact path="*">
        <h1>Error 404</h1>
      </Route>
    </Switch>
  );
}
