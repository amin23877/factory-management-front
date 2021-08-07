import React, { useCallback, useState, useMemo, useEffect } from "react";

import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import makeStyles from "@material-ui/styles/makeStyles";

import EmployeeList from "./List";
import ChatList from "./ChatList";

import ChatAdapter, { messageType, userType } from "../../logic/Chat";
import ProfileInfo from "./ProfileInfo";
import { chatDrawerWidth } from "../../Router/Panel";

export const colors = {
    textColor: "#484848",
    main: "#ffff",
    secondary: "#f9fafc",
    light: "#afbbc7",
    highlight: "#fff",
};

const useStyles = makeStyles((theme: any) => ({
    drawer: {
        width: chatDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: chatDrawerWidth + 20,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
}));

export default function ChatDrawer({ onClose, open }: { open: boolean; onClose: () => void }) {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState<userType>();
    const [users, setUsers] = useState<userType[]>([]);
    const [messages, setMessages] = useState<messageType[]>([]);

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
        <Drawer
            anchor="right"
            variant="persistent"
            open={open}
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Box m={1} display="flex" flexDirection="column">
                <ProfileInfo onClose={onClose} />
                {!selectedUser ? (
                    <EmployeeList
                        users={users}
                        socket={ChatSocket}
                        // value={selectedUser?.username || undefined}
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
                ) : (
                    <Box display="flex" flexDirection="column" height={670}>
                        <div style={{ flexGrow: 1 }}>
                            <ChatList
                                messages={messages}
                                user={selectedUser}
                                handleSendMessage={handleSendMessage}
                                handleBack={() => setSelectedUser(undefined)}
                            />
                        </div>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}
