import React from "react";
import {
    Box,
    fade,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Typography,
    InputBase,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    makeStyles,
} from "@material-ui/core";
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

    return (
        <AppBar
            position="fixed"
            style={{
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            }}
            color="default"
        >
            <Toolbar>
                <Button>
                    Platform Data
                    <ArrowDropDownRounded />
                </Button>
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
                <IconButton>
                    <HelpRounded />
                </IconButton>
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
