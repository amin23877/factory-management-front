import React, { useState, useMemo, useEffect } from "react";
import { Box, LinearProgress, makeStyles } from "@material-ui/core";

import Dialog from "../../app/Dialog";

import EmployeeList from "./List";
import ChatForm from "./Form";
import ChatList from "./ChatList";

import ChatAdapter, { messageType, userType } from "../../logic/Chat";
import { useCallback } from "react";

export const colors = {
    main: "#222831",
    secondary: "#393E46",
    light: "#00ADB5",
    highlight: "#EEEEEE",
};

const useStyles = makeStyles({
    modalRoot: {
        "& .MuiDialog-paper": {
            color: "white",
            backgroundColor: colors.main,
        },
        "& .MuiButtonBase-root": {
            color: "white",
        },
    },
});

export default function ChatModal({ onClose, open }: { open: boolean; onClose: () => void }) {
    const [selectedUser, setSelectedUser] = useState<userType>();
    const [users, setUsers] = useState<userType[]>([]);
    const [messages, setMessages] = useState<messageType[]>([]);

    const classes = useStyles();

    const handleUsers = useCallback((usersList: any[]) => {
        setUsers(usersList);
    }, []);

    const handleUserConnected = useCallback((user: any) => {
        setUsers((prev) => {
            let res = prev.slice();
            res.forEach((existingUser, i) => {
                if (existingUser.userID === user.userID) {
                    res[i].status = "online";
                    return;
                }

                res[i].hasNewMessages = false;
            });

            return res;
        });
    }, []);

    const handleUserDisconnected = useCallback((id: string) => {
        setUsers((prev) => {
            let res = prev.slice();
            res.forEach((user, i) => {
                if (ChatSocket.getSocketId() === id) {
                    res[i].status = "offline";
                }
            });

            return res;
        });
    }, []);

    const handlePrivateChat = ({ content, from, to }: { content: string; from: string; to: string }) => {
        console.log("handlePrivateChat", { content, from, to });

        setMessages((prev) => [...prev, { content, from, to } as any]);

        setUsers((prev) => {
            let fromSelf: boolean;
            const res = prev.slice();
            res.forEach((user, i) => {
                fromSelf = (ChatSocket.getSocketAuth() as any).username === from;
                if (user.username === (fromSelf ? to : from)) {
                    res[i].messages.push({
                        content,
                        from,
                        to,
                        fromSelf,
                    } as any);
                    if (user.username !== selectedUser?.username) {
                        res[i].hasNewMessages = true;
                    }
                }
            });

            console.log(res);

            return res;
        });
    };

    const ChatSocket = useMemo<ChatAdapter>(() => {
        const socket = new ChatAdapter(handleUsers, handleUserConnected, handleUserDisconnected, handlePrivateChat);

        return socket;
    }, []);

    useEffect(() => {
        if (ChatSocket && open) {
            ChatSocket.connect();
        }
    }, [ChatSocket, open]);

    if (!ChatSocket) {
        return <LinearProgress />;
    }

    const handleSendMessage = (content: string) => {
        if (selectedUser) {
            ChatSocket.sendPrivateMessage(content, selectedUser.username);
            const from = (ChatSocket.getSocketAuth() as any).username;
            setMessages((prev) => [...prev, { content, to: selectedUser.username, from } as any]);
        }
    };

    return (
        <Dialog className={classes.modalRoot} title="Chat" open={open} onClose={onClose} fullWidth maxWidth="lg">
            <Box m={2} height={530} display="grid" gridTemplateColumns="220px 1fr">
                <EmployeeList
                    users={users}
                    socket={ChatSocket}
                    value={selectedUser?.username}
                    onChange={(nu) => {
                        setSelectedUser(nu);
                        setUsers((prev) => {
                            let res = prev.slice();
                            const index = res.findIndex((u) => u.userID === nu.userID);
                            res[index].hasNewMessages = false;

                            return res;
                        });
                        setMessages(nu.messages);
                    }}
                />
                {selectedUser && (
                    <Box ml={1} display="flex" flexDirection="column">
                        <div style={{ flexGrow: 1 }}>
                            <ChatList messages={messages} user={selectedUser} />
                        </div>
                        <ChatForm onPrivateMessage={handleSendMessage} />
                    </Box>
                )}
            </Box>
        </Dialog>
    );
}
