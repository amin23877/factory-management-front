import React from "react";
import { Box, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";

import ChatAdapter, { userType } from "../../logic/Chat";

export default function EmployeeList({
    value,
    onChange,
    users,
    socket,
}: {
    socket: ChatAdapter;
    users: userType[];
    value: string;
    onChange: (e: any, nv: number) => void;
}) {
    const { username } = socket.getSocketAuth() as any;
    // console.log(users);

    return (
        <Paper>
            <Box m={1}>
                <Typography>Employee List</Typography>
                <List>
                    {users.map(
                        (user) =>
                            user.username !== username && (
                                <ListItem key={user.userID} button selected={user.username === value}>
                                    <ListItemText>{user.username}</ListItemText>
                                </ListItem>
                            )
                    )}
                </List>
            </Box>
        </Paper>
    );
}
