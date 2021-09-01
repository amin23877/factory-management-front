import React from "react";
import {
    Avatar,
    Badge,
    Box,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

import ChatAdapter, { userType } from "../../logic/Chat/ChatAdapter";
// import CustomScrollbars from "../../app/CustomScroll";
const colors = {
    textColor: "#484848",
    main: "#ffff",
    secondary: "#f9fafc",
    light: "#afbbc7",
    highlight: "#0b97d4",
};

const useStyles = makeStyles({
    selected: {
        backgroundColor: colors.secondary + " !important",
        border: "2px solid #eaedf1",
        borderRadius: 4,
    },
});

export default function EmployeeList({
    value,
    onChange,
    users,
    socket,
}: {
    socket: ChatAdapter;
    users: userType[];
    value?: string;
    onChange: (nu: userType) => void;
}) {
    const { username } = (socket.getSocketAuth() as any) || "";
    const classes = useStyles();
    // console.log(users);

    return (
        // <CustomScrollbars thumbColor="red" height={660}>
        <Box m={1} height={660}>
            <Box
                display="flex"
                alignItems="center"
                style={{ backgroundColor: colors.secondary, padding: "4px 8px" }}
                border="2px solid #eaedf1"
                borderRadius={4}
            >
                <InputBase placeholder="Search here..." style={{ flex: 1 }} />
                <IconButton>
                    <SearchRounded />
                </IconButton>
            </Box>
            <List>
                {users.map(
                    (user) =>
                        user.username !== username && (
                            <ListItem
                                key={user.userID}
                                button
                                selected={user.username === value}
                                onClick={() => onChange(user)}
                                classes={{ selected: classes.selected }}
                            >
                                <ListItemAvatar>
                                    <Badge color="primary" variant="dot" invisible={!Boolean(user.hasNewMessages)}>
                                        <Avatar>{user.username[0]}</Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography>{user.username}</Typography>
                                    <Typography variant="caption">test text</Typography>
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <Typography variant="caption">8:15</Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                )}
            </List>
        </Box>
        // </CustomScrollbars>
    );
}
