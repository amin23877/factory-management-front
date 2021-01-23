import React from "react";
import { Box, Hidden, fade, AppBar, useMediaQuery, Toolbar, Button, IconButton, InputBase, Avatar, makeStyles } from "@material-ui/core";
import { ArrowDropDownRounded, NotificationsRounded, AppsRounded, HelpRounded, MoreVertRounded, SearchRounded } from "@material-ui/icons";

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
                <Hidden only="xs">
                    <Button>
                        Platform Data
                        <ArrowDropDownRounded />
                    </Button>
                </Hidden>
                <div style={{ flexGrow: 1 }} />
                <Box className={classes.search}>
                    <Box className={classes.searchIcon}>
                        <SearchRounded />
                    </Box>
                    <InputBase
                        placeholder="Search Something Here..."
                        classes={{
                            root: classes.searchRoot,
                            input: classes.searchInput,
                        }}
                    />
                </Box>
                <div style={{ flexGrow: 1 }} />
                <IconButton>
                    <NotificationsRounded />
                </IconButton>
                <IconButton>
                    <AppsRounded />
                </IconButton>
                <Hidden only="xs">
                    <IconButton>
                        <HelpRounded />
                    </IconButton>
                </Hidden>
                <IconButton>
                    <MoreVertRounded />
                </IconButton>
                <IconButton>
                    <Avatar>A</Avatar>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
