import React, { Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Backdrop, Box, useTheme } from "@material-ui/core";

import { TopAppBar } from "../app/TopAppBar";
import MainNav from "../app/Drawer";
import MyBackdrop from "../app/Backdrop";

const Home = React.lazy(() => import("../pages/home"));
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Clients = React.lazy(() => import("../pages/Clients"));
const Sales = React.lazy(() => import("../pages/Sales"));
const Inventory = React.lazy(() => import("../pages/Inventory"));
const Settings = React.lazy(() => import("../pages/Settings"));
const Roles = React.lazy(() => import("../pages/Roles"));
const Projects = React.lazy(() => import("../pages/Project"));
const Activity = React.lazy(() => import("../pages/Activity"));
const Service = React.lazy(() => import("../pages/FieldService"));
const Vendros = React.lazy(() => import("../pages/Vandors"));
const Purchase = React.lazy(() => import("../pages/Purchase"));
const Page404 = React.lazy(() => import("../pages/404"));

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
                    <Suspense fallback={<MyBackdrop />}>
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
                    </Suspense>
                </Box>
            </MainNav>
        </div>
    );
}
