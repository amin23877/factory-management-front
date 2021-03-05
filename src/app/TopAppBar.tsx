import React from "react";
import { AppBar, useMediaQuery, Toolbar, Button, Avatar } from "@material-ui/core";
import { ArrowDropDownRounded, NotificationsOutlined, HelpOutline, TvRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/main.css";
const useStyles = makeStyles({
    container: {
        height: "54px",
        BorderBottom: "1px solid gray",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        backgroundColor: "#fefefe",
    },
    btn: {
        marginRight: "20px",
        marginLeft: "20px",
    },
    toolbar: {
        height: "54px",
    },
});

export const TopAppBar = ({ drawerWidth }: { drawerWidth?: number }) => {
    const matches = useMediaQuery("(max-width: 960px)");
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            elevation={0}
            style={{
                width: matches ? "100%" : `calc(100% - ${drawerWidth}px)`,
                marginLeft: matches ? "100%" : `calc(100% - ${drawerWidth}px)`,
            }}
            className={classes.container}
        >
            <Toolbar className={classes.toolbar}>
                <Button className={classes.btn}>
                    <Avatar>L</Avatar>
                    <span style={{ textAlign: "left", marginLeft: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 400, marginBottom: "auto" }}>Lorem ipsum</span>
                        <p style={{ fontSize: 10, margin: 0, padding: 0, fontWeight: 100 }}>Product manager</p>
                    </span>
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Button size="small" className={classes.btn}>
                    <HelpOutline style={{ marginRight: 3 }} />
                    Help
                </Button>
                <Button size="small" className={classes.btn}>
                    <NotificationsOutlined style={{ marginRight: 3 }} />
                    Alarms
                </Button>
                <Button size="small" className={classes.btn}>
                    <TvRounded style={{ marginRight: 3 }} />
                    Phasyfy
                    <ArrowDropDownRounded />
                </Button>
            </Toolbar>
        </AppBar>
    );
};
