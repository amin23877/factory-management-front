import React, { ReactNode } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function Snack({
    open,
    onClose,
    severity,
    children,
}: {
    open: boolean;
    onClose: () => void;
    severity?: "success" | "info" | "warning" | "error";
    children: ReactNode;
}) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity}>
                {children}
            </Alert>
        </Snackbar>
    );
}
