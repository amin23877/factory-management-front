import React, { Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Box, CssBaseline, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { TopAppBar } from "../app/TopAppBar";
import MainNav from "../app/Drawer";
import MyBackdrop from "../app/Backdrop";

import ChatDrawer from "../features/Chat/Drawer";

const Home = React.lazy(() => import("../pages/home"));
const Dashboard = React.lazy(() => import("../pages/HomeDashboard"));
const Sales = React.lazy(() => import("../pages/Sales"));
const Inventory = React.lazy(() => import("../pages/Inventory"));
const Settings = React.lazy(() => import("../pages/Settings"));
const Roles = React.lazy(() => import("../pages/Roles"));
const Projects = React.lazy(() => import("../pages/Project"));
const Activity = React.lazy(() => import("../pages/Activity"));
const Service = React.lazy(() => import("../pages/FieldService"));
// const Vendors = React.lazy(() => import("../pages/Vendors"));
const Purchase = React.lazy(() => import("../pages/Purchase"));
const Production = React.lazy(() => import("../pages/Production"));
const ShippingAndReceiVing = React.lazy(() => import("../pages/ShippingAndReceiVing"));
const Engineering = React.lazy(() => import("../pages/Engineering"));
const Page404 = React.lazy(() => import("../pages/404"));

const ItemDetails = React.lazy(() => import("../pages/ItemDetails"));
const DeviceDetails = React.lazy(() => import("../pages/DeviceDetails"));
const UnitDetails = React.lazy(() => import("../pages/UnitDetails"));
const QuoteDetails = React.lazy(() => import("../pages/QuoteDetails"));

const BomParts = React.lazy(() => import("../pages/BomParts"));
const JobParts = React.lazy(() => import("../pages/JobParts"));

const drawerWidth = 220;
export const chatDrawerWidth = 340;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: "54px",
        BorderBottom: "1px solid gray",
        boxShadow: "rgba(207, 171, 171, 0.08) 0px 4px 12px",
        backgroundColor: "#fefefe",
    },
    appBarShiftRight: {
        width: `calc(100% - ${chatDrawerWidth}px)`,
        marginRight: chatDrawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarShiftLeft: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        marginRight: -chatDrawerWidth,
    },
    contentShiftRight: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    contentShiftLeft: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PanelRouter() {
    const theme = useTheme();
    const classes = useStyles();

    const [mainDrawerOpen, setMainDrawerOpen] = useState(false);
    const [chatDrawerOpen, setChatDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setMainDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setMainDrawerOpen(false);
    };

    return (
        <div style={{ display: "flex" }} className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShiftLeft]: mainDrawerOpen,
                    [classes.appBarShiftRight]: chatDrawerOpen,
                })}
                style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, mainDrawerOpen && classes.hide)}
                    >
                        <div style={{ color: "#202731" }}>
                            <MenuIcon />
                        </div>
                    </IconButton>
                    <TopAppBar
                        isChatOpen={chatDrawerOpen}
                        onOpenChatClicked={() => {
                            setChatDrawerOpen(true);
                            setMainDrawerOpen(false);
                        }}
                    />
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={mainDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div
                    className={classes.drawerHeader}
                    style={{
                        backgroundColor: "#202731",
                    }}
                >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <div style={{ color: "white" }}>
                                <ChevronLeftIcon />
                            </div>
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <MainNav width={drawerWidth} closeIt={handleDrawerClose} />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShiftLeft]: mainDrawerOpen,
                    [classes.contentShiftRight]: chatDrawerOpen,
                })}
            >
                <Box style={{ flexGrow: 1, padding: "1em" }}>
                    <div style={theme.mixins.toolbar as any} />
                    <Suspense fallback={<MyBackdrop />}>
                        <Switch>
                            <Route exact path="/panel" component={Home} />
                            <Route exact path="/panel/dashboard" component={Dashboard} />
                            <Route exact path="/panel/sales" component={Sales} />
                            <Route exact path="/panel/inventory" component={Inventory} />
                            <Route exact path="/panel/settings" component={Settings} />
                            <Route exact path="/panel/roles" component={Roles} />
                            <Route exact path="/panel/projects" component={Projects} />
                            <Route exact path="/panel/activity" component={Activity} />
                            <Route exact path="/panel/fieldservice" component={Service} />
                            <Route exact path="/panel/purchase" component={Purchase} />
                            <Route exact path="/panel/production" component={Production} />
                            <Route exact path="/panel/shipping" component={ShippingAndReceiVing} />
                            <Route exact path="/panel/engineering" component={Engineering} />

                            <Route exact path="/panel/inventory/:itemId" component={ItemDetails} />
                            <Route exact path="/panel/engineering/:deviceId" component={DeviceDetails} />
                            <Route exact path="/panel/production/:unitNumber" component={UnitDetails} />
                            <Route exact path="/panel/sales/:quoteNumber" component={QuoteDetails} />

                            <Route exact path="/panel/bom/:bomId/parts" component={BomParts} />
                            <Route exact path="/panel/ubom/:bomId/parts" component={JobParts} />

                            <Route exact path="*" component={Page404} />
                        </Switch>
                    </Suspense>
                </Box>
            </main>

            <ChatDrawer open={chatDrawerOpen} onClose={() => setChatDrawerOpen(false)} />
        </div>
    );
}
