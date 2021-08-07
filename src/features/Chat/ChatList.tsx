import React, { useRef } from "react";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { messageType, userType } from "../../logic/Chat";
import { ChevronLeft } from "@material-ui/icons";

import CustomScrollbars from "../../app/CustomScroll";
import ChatForm from "./Form";

import { colors } from "./Drawer";
import Scrollbars from "react-custom-scrollbars";
import { useEffect } from "react";

const Message = ({ user, message }: { message: messageType; user: userType }) => {
    const isSent = message.from === user.username;

    return (
        <Box m={1} display="flex" style={{ justifyContent: !isSent ? "flex-end" : "flex-start" }}>
            <Box display="inline-flex">
                <ListItem style={{ direction: isSent ? "ltr" : "rtl" }}>
                    <ListItemAvatar>
                        <Avatar>{message.from[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        style={{
                            padding: "8px",
                            borderRadius: 8,
                            backgroundColor: isSent ? colors.highlight : colors.light,
                        }}
                    >
                        {message.content}
                    </ListItemText>
                </ListItem>
            </Box>
        </Box>
    );
};

export default function ChatList({
    user,
    messages,
    handleSendMessage,
    handleBack,
}: {
    messages: messageType[];
    user: userType;
    handleSendMessage: (content: string) => void;
    handleBack: () => void;
}) {
    const messagesList = useRef<Scrollbars | null>();

    useEffect(() => {
        if (messagesList.current) {
            messagesList.current.scrollToBottom();
        }
    }, [messages, user]);

    return (
        <Box height="100%" border="2px solid #eaedf1" borderRadius={4}>
            <Box display="flex" alignItems="center" style={{ background: "#f4f5f9", color: colors.textColor }}>
                <IconButton onClick={handleBack}>
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6">{user.username}</Typography>
            </Box>
            <Box style={{ backgroundColor: "#f9fafc" }} height="84.2%">
                <CustomScrollbars ref={(e) => (messagesList.current = e)} thumbColor="#c1c1c1" height={390}>
                    <List>
                        {messages.map((message) => (
                            <Message key={message._id} user={user} message={message} />
                        ))}
                    </List>
                </CustomScrollbars>
            </Box>
            <ChatForm onPrivateMessage={handleSendMessage} />
        </Box>
    );
}
