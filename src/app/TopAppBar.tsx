import React from "react";
import { Button, IconButton, Avatar, Box, InputBase } from "@material-ui/core";
import {
    ArrowDropDownRounded,
    NotificationsOutlined,
    HelpOutline,
    TvRounded,
    ChatRounded,
    SearchRounded,
} from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useSession } from "../features/Session/sessionsSlice";
import UPCToggle from "../components/UPC";

export const TopAppBar = ({
    isChatOpen,
    onOpenChatClicked,
}: {
    onOpenChatClicked: () => void;
    isChatOpen: boolean;
}) => {
    const phone = useMediaQuery("(max-width:600px)");
    const session = useSession();

    return (
        <Box flex={1} display="flex" alignItems="center">
            {phone ? (
                <div style={{ flexGrow: 1 }}></div>
            ) : (
                <>
                    <Button>
                        <Avatar>{session?.username[0]}</Avatar>
                        <span style={{ textAlign: "left", marginLeft: 10 }}>
                            <span style={{ fontSize: 12, fontWeight: 400, marginBottom: "auto" }}>
                                {session?.username}
                            </span>
                        </span>
                    </Button>
                    <div
                        style={{
                            flexGrow: 1,
                            backgroundColor: "rgb(245,245,245)",
                            display: "flex",
                            alignItems: "center",
                            margin: "0px 4em",
                            padding: "7px 5px ",
                            borderRadius: "0.6em",
                        }}
                    >
                        <div style={{ color: "#bbb" }}>
                            <SearchRounded />
                        </div>
                        <InputBase placeholder="Search..." fullWidth />
                    </div>
                </>
            )}

            <UPCToggle />
            {!phone && (
                <IconButton size="small" title="Help">
                    <HelpOutline style={{ marginRight: 3 }} />
                </IconButton>
            )}
            <IconButton size="small" title="Notifications">
                <NotificationsOutlined style={{ marginRight: 3 }} />
            </IconButton>
            {!phone && (
                <Button size="small">
                    <TvRounded style={{ marginRight: 3 }} />
                    Phazify
                    <ArrowDropDownRounded />
                </Button>
            )}
            {!isChatOpen && (
                <IconButton size="small" color="primary" onClick={onOpenChatClicked}>
                    <ChatRounded style={{ marginRight: 3 }} />
                </IconButton>
            )}
        </Box>
    );
};
