import React from "react";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";

const Message = ({ direction }: { direction: "right" | "left" }) => {
    return (
        <Box my={1} display="flex" style={{ justifyContent: direction === "right" ? "flex-end" : "flex-start" }}>
            <Paper style={{ display: "inline-flex", backgroundColor: direction === "right" ? "#ff980070" : "white" }}>
                <ListItem style={{ direction: direction === "right" ? "rtl" : "ltr" }}>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText>test</ListItemText>
                </ListItem>
            </Paper>
        </Box>
    );
};

export default function ChatList({ user }: { user: any }) {
    return (
        <Box height="100%">
            <Paper>
                <Box p={2}>
                    <Typography style={{ textAlign: "center" }} variant="h6">
                        {user}
                    </Typography>
                </Box>
            </Paper>
            <Paper elevation={2} style={{ margin: "8px 0", height: 390, overflowY: "auto" }}>
                <Box p={2} height="100%">
                    <List>
                        <Message direction="right" />
                        <Message direction="left" />
                        <Message direction="right" />
                        <Message direction="left" />
                        <Message direction="right" />
                        <Message direction="left" />
                        <Message direction="right" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                        <Message direction="left" />
                    </List>
                </Box>
            </Paper>
        </Box>
    );
}
