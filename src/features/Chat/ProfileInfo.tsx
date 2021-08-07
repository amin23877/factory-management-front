import React from "react";
import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import { useSession } from "../Session/sessionsSlice";

export default function ProfileInfo({ onClose }: { onClose: () => void }) {
    const session = useSession();

    return (
        <Box display="flex" alignItems="center" m={1}>
            <Box flex={1}>
                <Avatar>{session?.username[0]}</Avatar>
            </Box>
            <Box ml={1} flex={4}>
                <Typography>{session?.username}</Typography>
                <Typography variant="caption">online</Typography>
            </Box>
            <IconButton onClick={onClose}>
                <CloseRounded />
            </IconButton>
        </Box>
    );
}
