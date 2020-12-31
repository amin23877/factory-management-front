import React, { useState } from "react";
import {
    Drawer,
    BottomNavigation,
    BottomNavigationAction,
    List,
    ListItem,
    Hidden,
    ListItemIcon,
    makeStyles,
    useTheme,
    Typography,
    ListItemText,
} from "@material-ui/core";
import {
    AlternateEmailRounded,
    DashboardRounded,
    SendRounded,
    BorderColorRounded,
    SettingsRounded,
    HomeRounded,
    ChevronLeftRounded,
    ChevronRightRounded,
    FlashOnRounded,
    CalendarTodayRounded,
} from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";

import { Calendar } from "./Calendar";

const useStyles = makeStyles((theme) => ({
    btmNavSelectedItem: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

const drawerItems = [
    {
        name: "Home",
        link: "/",
        icon: <HomeRounded htmlColor="#bbb" />,
    },
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: <DashboardRounded htmlColor="#bbb" />,
    },
    {
        name: "Clients",
        link: "/clients",
        icon: <AlternateEmailRounded htmlColor="#bbb" />,
    },
    {
        name: "Sales",
        link: "/sales",
        icon: <SendRounded htmlColor="#bbb" />,
    },
    {
        name: "Inventory",
        link: "/inventory",
        icon: <BorderColorRounded htmlColor="#bbb" />,
    },
    {
        name: "Settings",
        link: "/settings",
        icon: <SettingsRounded htmlColor="#bbb" />,
    },
];

const MainDrawer = ({ width, isOpen, onToggle }: { width?: number; isOpen: boolean; onToggle: () => void }) => {
    const useStyles = makeStyles((theme) => ({
        toolbar: {
            ...theme.mixins.toolbar,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
        },
        drawerPaper: {
            overflow: "hidden",
            width,
            backgroundColor: theme.palette.secondary.main,
        },
    }));

    const theme = useTheme();
    const classes = useStyles();
    const location = useLocation();

    return (
        <nav style={{ width, flexShrink: 0 }}>
            <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.drawerPaper }} anchor="left">
                <div className={classes.toolbar}>
                    <Typography variant="h6">{isOpen ? "SOLUTIONS GENESIS" : <FlashOnRounded />}</Typography>
                </div>
                {/* <Divider /> */}
                <List>
                    {drawerItems.map((item, i) => (
                        <Link key={i} to={item.link} style={{ textDecoration: "none" }}>
                            <ListItem
                                button
                                style={{
                                    color: location.pathname === item.link ? theme.palette.warning.main : "#fff",
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText> {item.name} </ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                    {/* <Divider /> */}
                    <ListItem>{isOpen ? <Calendar /> : <CalendarTodayRounded htmlColor="#ccc" />}</ListItem>
                    {/* <Divider /> */}
                    <ListItem
                        button
                        onClick={onToggle}
                        style={{ justifyContent: isOpen ? "flex-end" : "flex-start", color: theme.palette.secondary.main }}
                    >
                        <ListItemIcon style={{ color: theme.palette.common.white }}>
                            {isOpen ? <ChevronLeftRounded /> : <ChevronRightRounded />}
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    );
};

const MainBottomNav = () => {
    const [active, setActive] = useState(0);
    const history = useHistory();
    const location = useLocation();

    const classes = useStyles();

    const theme = useTheme();

    return (
        <BottomNavigation
            color="primary"
            value={active}
            onChange={(e, nv) => setActive(nv)}
            style={{ width: "100%", position: "fixed", bottom: 0, zIndex: 100, backgroundColor: theme.palette.secondary.main }}
        >
            {drawerItems.slice(0, 4).map((item) => (
                <BottomNavigationAction
                    key={item.name}
                    classes={{ selected: classes.btmNavSelectedItem }}
                    style={{ color: item.link === location.pathname ? theme.palette.common.white : "gray" }}
                    label={item.name}
                    icon={item.icon}
                    onClick={() => history.push(item.link)}
                />
            ))}
        </BottomNavigation>
    );
};

export default function MainNavbar({
    width,
    isOpen,
    onToggle,
    children,
}: {
    width?: number;
    isOpen: boolean;
    onToggle: () => void;
    children: any;
}) {
    return (
        <>
            <Hidden only={["sm", "xs"]}>
                <MainDrawer onToggle={onToggle} width={width} isOpen={isOpen} />
            </Hidden>
            <Hidden mdUp>
                <MainBottomNav />
            </Hidden>
            {children}
        </>
    );
}
