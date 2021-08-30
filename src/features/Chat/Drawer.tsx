import React from "react";

import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import makeStyles from "@material-ui/styles/makeStyles";

import EmployeeList from "./List";
import ChatList from "./ChatList";

import ProfileInfo from "./ProfileInfo";
import { chatDrawerWidth } from "../../Router/Panel";
import { useChat } from "../../logic/Chat/ChatContext";

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
    const chatSocket = useChat();

    if (!chatSocket) {
        return <LinearProgress />;
    }

    const { ChatSocket, messages, users, selectedUser, setUsers, setSelectedUser, setMessages, sendPrivateMessage } =
        chatSocket;
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
                    <Box display="flex" flexDirection="column" maxHeight="650px">
                        <div style={{ flexGrow: 1 }}>
                            <ChatList
                                messages={messages}
                                user={selectedUser}
                                handleSendMessage={sendPrivateMessage}
                                handleBack={() => setSelectedUser(undefined)}
                            />
                        </div>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}
