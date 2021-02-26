import React from "react";
import { AppBar, useMediaQuery, Toolbar, Button, Avatar } from "@material-ui/core";
import { ArrowDropDownRounded, NotificationsOutlined, HelpOutline, TvRounded } from "@material-ui/icons";

export const TopAppBar = ({ drawerWidth }: { drawerWidth?: number }) => {
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
