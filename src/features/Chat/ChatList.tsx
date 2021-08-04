import React from "react";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";
import { messageType, userType } from "../../logic/Chat";
import { colors } from "./Modal";
import CustomScrollbars from "../../app/CustomScroll";

const Message = ({ user, message }: { message: messageType; user: userType }) => {
    const isSent = message.from === user.username;

    return (
        <Box my={1} display="flex" style={{ justifyContent: !isSent ? "flex-end" : "flex-start" }}>
            <Paper style={{ display: "inline-flex", backgroundColor: !isSent ? colors.highlight : colors.light }}>
                <ListItem style={{ direction: isSent ? "ltr" : "rtl" }}>
                    <ListItemAvatar>
                        <Avatar>{message.from[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText>{message.content}</ListItemText>
                </ListItem>
            </Paper>
        </Box>
    );
};

export default function ChatList({ user, messages }: { messages: messageType[]; user: userType }) {
    return (
        <Box height="100%">
            <Paper style={{ background: colors.secondary, color: "white" }}>
                <Box p={2}>
                    <Typography style={{ textAlign: "center" }} variant="h6">
                        {user.username}
                    </Typography>
                </Box>
            </Paper>
            <Paper elevation={2} style={{ height: "83%", background: colors.secondary, margin: "8px 0" }}>
                <CustomScrollbars height={390}>
                    <Box p={2} height="100%">
                        <List>
                            {messages.map((message) => (
                                <Message key={message._id} user={user} message={message} />
                            ))}
                        </List>
                    </Box>
                </CustomScrollbars>
            </Paper>
        </Box>
    );
}
