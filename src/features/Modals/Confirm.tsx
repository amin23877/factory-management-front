import React from "react";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import Dialog from "../../app/Dialog";
import { Gradients } from "../../theme";

export default function Confirm({
    open,
    onClose,
    onConfirm,
    text,
}: {
    text?: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return (
        <Dialog open={open} onClose={onClose} title="Confirm" fullWidth={true} maxWidth="xs">
            <Box m={1} p={1}>
                <Typography variant="h6">Are you sure?</Typography>
                <Typography>{text}</Typography>
                <Box mt={2} display="flex" alignItems="center" justifyContent="flex-end">
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ background: Gradients.success, marginRight: "2em" }}
                        onClick={onClose}
                    >
                        NO
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ background: Gradients.error }}
                        onClick={onConfirm}
                    >
                        Yes
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}
