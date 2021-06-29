import React, { Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Backdrop, Box, CssBaseline, useTheme } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import { TopAppBar } from "../app/TopAppBar";
import MainNav from "../app/Drawer";
import MyBackdrop from "../app/Backdrop";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
const Unit = React.lazy(() => import("../pages/Unit"));
const Page404 = React.lazy(() => import("../pages/404"));

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: "54px",
        BorderBottom: "1px solid gray",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        backgroundColor: "#fefefe",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


export default function PanelRouter() {
    const [isOpen, setIsOpen] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(220);
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ display: "flex" }} className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <div style={{ color: '#202731' }}>
                            <MenuIcon />
                        </div>
                    </IconButton>
                    {/* <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography> */}
                    <TopAppBar drawerWidth={drawerWidth} />
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}
                    style={{
                        backgroundColor: '#202731',

                    }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <div style={{ color: 'white' }}> <ChevronLeftIcon /> </div> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <MainNav
                    isOpen={isOpen}
                    onToggle={() => {
                        setIsOpen((prev) => !prev);
                        setDrawerWidth((prev) => (prev === 240 ? 60 : 240));
                    }}
                    width={drawerWidth}
                    closeIt={handleDrawerClose}
                >
                    <div>

                    </div>
                </MainNav>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {/* <div className={classes.drawerHeader} /> */}
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
                            <Route exact path="/panel/unit" component={Unit} />

                            <Route exact path="*" component={Page404} />
                        </Switch>
                    </Suspense>
                </Box>
            </main>
            {/* </MainNav> */}
        </div>
    );
}
