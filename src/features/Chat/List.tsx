import React from "react";
import { Avatar, Badge, Box, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@material-ui/core";

import ChatAdapter, { userType } from "../../logic/Chat";
import { colors } from "./Modal";

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
    const { username } = socket.getSocketAuth() as any;
    // console.log(users);

    return (
        <Paper style={{ background: colors.secondary, color: "white" }}>
            <Box m={1}>
                {/* <Typography>Employee List</Typography> */}
                <List>
                    {users.map(
                        (user) =>
                            user.username !== username && (
                                <ListItem
                                    key={user.userID}
                                    button
                                    selected={user.username === value}
                                    onClick={() => onChange(user)}
                                >
                                    <ListItemAvatar>
                                        <Badge color="primary" variant="dot" invisible={!Boolean(user.hasNewMessages)}>
                                            <Avatar>{user.username[0]}</Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText>{user.username}</ListItemText>
                                </ListItem>
                            )
                    )}
                </List>
            </Box>
        </Paper>
    );
}
