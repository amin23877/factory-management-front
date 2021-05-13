import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getToken } from "../api";

import LoginPage from "../pages/Login";
import PanelRouter from "./Panel";

export default function BaseRouter() {
    const isAuthenticated = Boolean(getToken());

    return (
        <Switch>
            <Route exact path="/">
                {isAuthenticated ? <Redirect to="/panel" /> : <Redirect to="/login" />}
            </Route>
            <Route path="/panel">{isAuthenticated ? <PanelRouter /> : <Redirect to="/panel" />}</Route>
            <Route exact path="/login">
                {isAuthenticated ? <Redirect to="/panel" /> : <LoginPage />}
            </Route>
            <Route exact path="*">
                <h1>Error 404</h1>
            </Route>
        </Switch>
    );
}
