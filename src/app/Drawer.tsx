import React from "react";
import { Drawer, List, ListItem, ListItemIcon, makeStyles, useTheme, Divider, Typography, ListItemText } from "@material-ui/core";
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
import { Link, useLocation } from "react-router-dom";

import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export const MainDrawer = ({ width, isOpen, onToggle }: { width?: number; isOpen: boolean; onToggle: () => void }) => {
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
        calendarTile: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.warning.main,
            borderRadius: 15,
        },
        calendar: {
            color: "#fff",
            backgroundColor: theme.palette.secondary.main,
            border: `2px solid ${theme.palette.warning.main}`,
            borderRadius: 15,
        },
    }));

    const theme = useTheme();
    const classes = useStyles();
    const location = useLocation();

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

    return (
        <nav style={{ width, flexShrink: 0 }}>
            <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.drawerPaper }} anchor="left">
                <div className={classes.toolbar}>
                    <Typography variant="h6">{isOpen ? "SOLUTIONS GENESIS" : <FlashOnRounded />}</Typography>
                </div>
                <Divider />
                <List>
                    {drawerItems.map((item, i) => (
                        <Link to={item.link} style={{ textDecoration: "none" }}>
                            <ListItem
                                button
                                key={i}
                                style={{
                                    color: location.pathname === item.link ? theme.palette.warning.main : "#fff",
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText> {item.name} </ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                    <Divider />
                    <ListItem>
                        {isOpen ? (
                            <Calendar className={classes.calendar} showNavigation={false} tileClassName={classes.calendarTile} />
                        ) : (
                            <CalendarTodayRounded color="secondary" />
                        )}
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        onClick={onToggle}
                        style={{ justifyContent: isOpen ? "flex-end" : "flex-start", color: theme.palette.secondary.main }}
                    >
                        <ListItemIcon style={{ color: theme.palette.secondary.main }}>
                            {isOpen ? <ChevronLeftRounded /> : <ChevronRightRounded />}
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    );
};
