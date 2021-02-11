import React from "react";
import { Box, Button } from "@material-ui/core";

import Dialog from "../../app/Dialog";
import { Gradients } from "../../theme";

export default function Confirm({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} title="Confirm">
            <Box m={3} p={2}>
                <h3>Are you sure?</h3>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ background: Gradients.success, marginRight: "2em" }}
                        onClick={onConfirm}
                    >
                        Yes
                    </Button>
                    <Button color="primary" variant="contained" style={{ background: Gradients.error }} onClick={onClose}>
                        No
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}
