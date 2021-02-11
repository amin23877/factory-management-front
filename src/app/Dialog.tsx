import React from "react";
import { Dialog, DialogTitle, Box, IconButton, DialogProps } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

interface IDialog extends DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
}

export default function MyDialog({ open, title, onClose, ...props }: IDialog) {
    return (
        <Dialog open={open} onClose={onClose} {...props}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mx={1}>
                <DialogTitle>{title}</DialogTitle>
                <div style={{ flexGrow: 1 }} />
                <IconButton onClick={onClose}>
                    <CloseRounded />
                </IconButton>
            </Box>
            <Box m={1}>{props.children}</Box>
        </Dialog>
    );
}
