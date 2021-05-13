import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Box, useTheme } from "@material-ui/core";

import { TopAppBar } from "../app/TopAppBar";
import MainNav from "../app/Drawer";

import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Clients from "../pages/Clients";
import Sales from "../pages/Sales";
import Inventory from "../pages/Inventory";
import Settings from "../pages/Settings";
import Roles from "../pages/Roles";
import Projects from "../pages/Project";
import Activity from "../pages/Activity";
import Service from "../pages/FieldService";
import Vendros from "../pages/Vandors";
import Purchase from "../pages/Purchase";
import Page404 from "../pages/404";

export default function PanelRouter() {
    const [isOpen, setIsOpen] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(220);
    const theme = useTheme();

    return (
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
                    <div style={theme.mixins.toolbar as any} />
                    <Switch>
                        <Route exact path="/panel" component={Home} />
                        <Route exact path="/panel/dashboard" component={Dashboard} />
                        <Route exact path="/panel/clients" component={Clients} />
                        <Route exact path="/panel/sales" component={Sales} />
                        <Route exact path="/panel/inventory" component={Inventory} />
                        <Route exact path="/panel/settings" component={Settings} />
                        <Route exact path="/panel/roles" component={Roles} />
                        <Route exact path="/panel/projects" component={Projects} />
                        <Route exact path="/panel/activity" component={Activity} />
                        <Route exact path="/panel/vendor" component={Vendros} />
                        <Route exact path="/panel/fieldservice" component={Service} />
                        <Route exact path="/panel/purchase" component={Purchase} />
                        <Route exact path="*" component={Page404} />
                    </Switch>
                </Box>
            </MainNav>
        </div>
    );
}
