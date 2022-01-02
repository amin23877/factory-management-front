import React from "react";
import { Dialog, DialogTitle, Box, IconButton, DialogProps } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

interface IDialog extends DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    closeOnClickOut?: boolean;
}

export default function MyDialog({ closeOnClickOut, open, title, onClose, ...props }: IDialog) {
    return (
        <Dialog open={open} onClose={closeOnClickOut === undefined || closeOnClickOut ? onClose : () => {}} {...props}>
            <Box
                style={{ backgroundColor: "#ededed" }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={1}
            >
                <DialogTitle>{title}</DialogTitle>
                <div style={{ flexGrow: 1 }} />
                <IconButton onClick={onClose}>
                    <CloseRounded />
                </IconButton>
            </Box>
            <Box m={1} height="100%">
                {props.children}
            </Box>
        </Dialog>
    );
}
