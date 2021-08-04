import React, { useState, useMemo, useEffect } from "react";
import { Box, LinearProgress } from "@material-ui/core";

import Dialog from "../../app/Dialog";

import EmployeeList from "./List";
import ChatForm from "./Form";
import ChatList from "./ChatList";

import ChatAdapter from "../../logic/Chat";

export default function ChatModal({ onClose, open }: { open: boolean; onClose: () => void }) {
    const [selectedUser, setSelectedUser] = useState<string>("ali");
    const [users, setUsers] = useState<any[]>([]);
    const [chats, setChats] = useState<any[]>([]);
    const [currentUsername, setCurrentUsername] = useState("");

    const handleUsers = (usersList: any[]) => {
        setUsers(usersList);
    };

    const handleUserConnected = (user: any) => {
        const usersCopy = users.slice();
        usersCopy.forEach((existingUser, i) => {
            if (existingUser.userID === user.userID) {
                usersCopy[i].status = "online";
                setUsers(usersCopy);
                return;
            }

            usersCopy[i].hasNewMessage = false;

            setUsers((prev) => [...prev, user]);
        });
    };

    const handleUserDisconnected = (id: string) => {
        const usersCopy = users.slice();
        usersCopy.forEach((user, i) => {
            if (ChatSocket.getSocketId() === id) {
                usersCopy[i].status = "offline";
            }
        });
    };

    const handlePrivateChat = ({ content, from, to }: { content: string; from: string; to: string }) => {
        const usersCopy = users.slice();
        let fromSelf: boolean;
        usersCopy.forEach((user, i) => {
            fromSelf = (ChatSocket.getSocketAuth() as any).username === from;
            if (user.username === (fromSelf ? to : from)) {
                usersCopy[i].messages.push({
                    content,
                    fromSelf,
                });
                if (user !== selectedUser) {
                    usersCopy[i].hasNewMessages = true;
                }
            }
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

        return () => ChatSocket.disconnect();
    }, [ChatSocket, open]);

    if (!ChatSocket) {
        return <LinearProgress />;
    }

    return (
        <Dialog title="Chat" open={open} onClose={onClose} fullWidth maxWidth="lg">
            <Box m={2} height={530} display="grid" gridTemplateColumns="220px 1fr">
                <EmployeeList
                    users={users}
                    socket={ChatSocket}
                    value={selectedUser}
                    onChange={(e, nv) => setSelectedUser(String(nv))}
                />
                <Box ml={1} display="flex" flexDirection="column">
                    <div style={{ flexGrow: 1 }}>
                        <ChatList user={selectedUser} />
                    </div>
                    <ChatForm />
                </Box>
            </Box>
        </Dialog>
    );
}
