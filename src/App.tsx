import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme } from "./theme";

import { TopAppBar } from "./app/TopAppBar";
import { MainDrawer } from "./app/Drawer";

import SplashScreen from "./pages/splash";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Clients from "./pages/Clients";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import Page404 from "./pages/404";

function App() {
    const [loading, setLoading] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(240);
    const [isOpen, setIsOpen] = useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {loading ? (
                    <SplashScreen />
                ) : (
                    <div style={{ display: "flex" }}>
                        <TopAppBar drawerWidth={drawerWidth} />

                        <MainDrawer
                            isOpen={isOpen}
                            onToggle={() => {
                                setIsOpen((prev) => !prev);
                                setDrawerWidth((prev) => (prev === 240 ? 60 : 240));
                            }}
                            width={drawerWidth}
                        />

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
                    </div>
                )}
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
