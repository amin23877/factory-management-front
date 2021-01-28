import React from "react";
import { Box, fade, AppBar, useMediaQuery, Toolbar, Button, IconButton, Typography, Avatar, makeStyles } from "@material-ui/core";
import { ArrowDropDownRounded, NotificationsOutlined, HelpOutline, TvRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        width: "60%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        backgroundColor: fade(theme.palette.common.black, 0.1),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.15),
        },
    },
    searchInput: {
        padding: "1em 2.5em",
        width: "100%",
    },
    searchRoot: {
        width: "100%",
    },
    searchIcon: {
        padding: "0 0.5em",
        position: "absolute",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export const TopAppBar = ({ drawerWidth }: { drawerWidth?: number }) => {
    const classes = useStyles();
    const matches = useMediaQuery("(max-width: 960px)");

    return (
        <AppBar
            position="fixed"
            elevation={0}
            style={{
                width: matches ? "100%" : `calc(100% - ${drawerWidth}px)`,
                marginLeft: matches ? "100%" : `calc(100% - ${drawerWidth}px)`,
            }}
            color="default"
        >
            <Toolbar>
                <Button>
                    <TvRounded style={{ marginRight: 5 }} />
                    Phazify
                    <ArrowDropDownRounded />
                </Button>
                <Button>
                    <HelpOutline style={{ marginRight: 5 }} />
                    Help
                </Button>
                <Button>
                    <NotificationsOutlined style={{ marginRight: 5 }} />
                    Alarms
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Button>
                    <span style={{ textAlign: "right", marginRight: 5 }}>
                        <span style={{ fontSize: 12 }}>Lorem ipsum</span>
                        <p style={{ fontSize: 10, margin: 0, padding: 0 }}>Product manager</p>
                    </span>
                    <Avatar>L</Avatar>
                </Button>
            </Toolbar>
        </AppBar>
    );
};
