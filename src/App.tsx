import React, { useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { theme } from "./theme";

import { useAppDispatch } from "./store";

import { selectSession, getCurrentSession } from "./features/Session/sessionsSlice";
import { fetchQuotes } from "./features/Quote/quoteSlice";
import { fetchActivities } from "./features/Activity/activitySlice";
import { fetchPOs } from "./features/PO/poSlice";
import { fetchSOs } from "./features/SO/soSlice";

import "./styles/main.css";

import { TopAppBar } from "./app/TopAppBar";
import MainNav from "./app/Drawer";

import SplashScreen from "./pages/splash";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Clients from "./pages/Clients";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import Roles from "./pages/Roles";
import Projects from "./pages/Project";
import Activity from "./pages/Activity";
import Service from "./pages/Service";
import Page404 from "./pages/404";

// Delete this after useing baseurl somewhere
import * as config from "./api/config";
import Vendros from "./pages/Vandors";
import Purchase from "./pages/Purchase";
console.log(config.BaseUrl);
// ---------------------------

function App() {
    const [isOpen, setIsOpen] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(220);
    const session = useSelector(selectSession);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session.session !== null) {
            dispatch(fetchQuotes());
            dispatch(fetchActivities());
            dispatch(fetchPOs());
            dispatch(fetchSOs());
        }
    }, [session]);

    useEffect(() => {
        dispatch(getCurrentSession());
    }, []);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {session.session === null ? (
                    <SplashScreen />
                ) : (
                    <div style={{ display: "flex" }}>
                        <TopAppBar drawerWidth={drawerWidth} />

                        <MainNav
                            isOpen={isOpen}
                            onToggle={() => {
                                setIsOpen((prev) => !prev);
                                setDrawerWidth((prev) => (prev === 240 ? 60 : 240));
                            }}
                            width={drawerWidth}
                        >
                            <Box style={{ flexGrow: 1, padding: "1em" }}>
                                <div style={theme.mixins.toolbar} />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/dashboard" component={Dashboard} />
                                    <Route exact path="/clients" component={Clients} />
                                    <Route exact path="/sales" component={Sales} />
                                    <Route exact path="/inventory" component={Inventory} />
                                    <Route exact path="/settings" component={Settings} />
                                    <Route exact path="/roles" component={Roles} />
                                    <Route exact path="/projects" component={Projects} />
                                    <Route exact path="/activity" component={Activity} />
                                    <Route exact path="/vendor" component={Vendros} />
                                    <Route exact path="/service" component={Service} />
                                    <Route exact path="/purchase" component={Purchase} />
                                    <Route exact path="*" component={Page404} />
                                </Switch>
                            </Box>
                        </MainNav>
                    </div>
                )}
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
