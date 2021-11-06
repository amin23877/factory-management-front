import React, { useRef, useEffect } from "react";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { messageType, userType } from "../../logic/Chat/ChatAdapter";
import { ChevronLeft } from "@material-ui/icons";

import ChatForm from "./Form";
import { host } from '../../host'
import { colors } from "./Drawer";

const Message = ({ user, message }: { message: messageType; user: userType }) => {
    const isSent = message.from === user.username;
    if (message.hasFile) {
        console.log(message.fileAddress?.split("public")[1]);
    }
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
                        {message.hasFile && (
                            <img
                                src={`http://${host}` + message.fileAddress?.split("public")[1]}
                                alt=""
                                style={{ width: 100, height: 100, objectFit: "cover", margin: 8, borderRadius: 16 }}
                            />
                        )}
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
    const messagesList = useRef<HTMLElement | null>();

    useEffect(() => {
        if (messagesList.current) {
            messagesList.current.scrollTo({ top: messagesList.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages, user]);

    return (
        <Box border="2px solid #eaedf1" borderRadius={4}>
            <Box display="flex" alignItems="center" style={{ background: "#f4f5f9", color: colors.textColor }}>
                <IconButton onClick={handleBack}>
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6">{user.username}</Typography>
            </Box>
            <div
                ref={(e) => (messagesList.current = e)}
                style={{ backgroundColor: "#f9fafc", height: "520px", overflowY: "auto" }}
            >
                <List>
                    {messages.map((message) => (
                        <Message key={message._id} user={user} message={message} />
                    ))}
                </List>
            </div>
            <ChatForm onPrivateMessage={handleSendMessage} />
        </Box>
    );
}
