import React from "react";
import { Button, IconButton, Avatar, Box, TextField } from "@material-ui/core";
import { ArrowDropDownRounded, NotificationsOutlined, HelpOutline, TvRounded, ChatRounded } from "@material-ui/icons";

import { useSession } from "../features/Session/sessionsSlice";

export const TopAppBar = ({
    isChatOpen,
    onOpenChatClicked,
}: {
    onOpenChatClicked: () => void;
    isChatOpen: boolean;
}) => {
    const session = useSession();

    return (
        <Box flex={1} display="flex" alignItems="center">
            <Button>
                <Avatar>{session?.username[0]}</Avatar>
                <span style={{ textAlign: "left", marginLeft: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 400, marginBottom: "auto" }}>{session?.username}</span>
                </span>
            </Button>
            <TextField style={{ flexGrow: 1, margin: "0 4em" }} variant="filled" placeholder="Search..." />
            <IconButton size="small" title="Help">
                <HelpOutline style={{ marginRight: 3 }} />
            </IconButton>
            <IconButton size="small" title="Notifications">
                <NotificationsOutlined style={{ marginRight: 3 }} />
            </IconButton>
            <Button size="small">
                <TvRounded style={{ marginRight: 3 }} />
                Phazify
                <ArrowDropDownRounded />
            </Button>
            {!isChatOpen && (
                <IconButton color="primary" onClick={onOpenChatClicked}>
                    <ChatRounded />
                </IconButton>
            )}
        </Box>
    );
};
