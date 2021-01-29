import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme } from "./theme";

import { useAuth } from "./store";

import { TopAppBar } from "./app/TopAppBar";
import MainNav from "./app/Drawer";

import SplashScreen from "./pages/splash";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Clients from "./pages/Clients";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import Page404 from "./pages/404";

// Delete this after useing baseurl somewhere
import * as config from "./api/config";
console.log(config.BaseUrl);
// ---------------------------

function App() {
    const [isOpen, setIsOpen] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(220);
    const auth = useAuth();

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {auth?.employee === null ? (
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
