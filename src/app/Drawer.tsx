import React, { useState } from "react";
import {
    Drawer,
    BottomNavigation,
    BottomNavigationAction,
    List,
    ListItem,
    Divider,
    Hidden,
    ListItemIcon,
    makeStyles,
    useTheme,
    ListItemText,
} from "@material-ui/core";
import {
    AlternateEmailRounded,
    AccountBoxRounded,
    DashboardRounded,
    SendRounded,
    BorderColorRounded,
    ExitToAppRounded,
    HomeRounded,
} from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";

import { useAuth } from "../store";
import Confirm from "../features/Modals/Confirm";

import phazifyLogo from "../assets/phazify.png";
import phocusLogo from "../assets/logo.png";
import drawerBg from "../assets/sidebar.png";

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
        name: "Roles",
        link: "/roles",
        icon: <AccountBoxRounded htmlColor="#bbb" />,
    },
];

const MainDrawer = ({ width, isOpen, onToggle }: { width?: number; isOpen: boolean; onToggle: () => void }) => {
    const useStyles = makeStyles((theme) => ({
        toolbar: {
            ...theme.mixins.toolbar,
            margin: "0.5em 1em",
        },
        drawerPaper: {
            overflow: "hidden",
            width,
            backgroundImage: `url(${drawerBg})`,
            backgroundPositionX: "center",
            backgroundSize: "cover",
        },
    }));

    const [confirm, setConfirm] = useState(false);
    const classes = useStyles();
    const location = useLocation();
    const auth = useAuth();

    return (
        <>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={auth.Logout} />
            <nav style={{ width, flexShrink: 0 }}>
                <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.drawerPaper }} anchor="left">
                    <div className={classes.toolbar} style={{ backgroundColor: "transparent" }}>
                        <img src={phocusLogo} alt="Phocus" style={{ width: "80%", height: "auto" }} />
                    </div>
                    <Divider />
                    <List style={{ marginBottom: "auto" }}>
                        {drawerItems.map((item, i) => (
                            <Link key={i} to={item.link} style={{ textDecoration: "none", border: "none", outline: "none" }}>
                                <ListItem
                                    style={{
                                        color: location.pathname === item.link ? "#fff" : "#848484",
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText> {item.name} </ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                        <ListItem
                            button
                            onClick={() => setConfirm(true)}
                            style={{
                                color: "#848484",
                            }}
                        >
                            <ListItemIcon
                                style={{
                                    color: "#848484",
                                }}
                            >
                                <ExitToAppRounded />
                            </ListItemIcon>
                            <ListItemText> Logout </ListItemText>
                        </ListItem>
                    </List>
                    {/* <Divider /> */}
                    <div style={{ textAlign: "center" }}>
                        <img
                            alt="Phazify"
                            src={phazifyLogo}
                            style={{ background: "rgba(145, 145, 145, 0.21)", padding: "0 1em", borderRadius: "0.4em" }}
                        />
                    </div>
                </Drawer>
            </nav>
        </>
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
