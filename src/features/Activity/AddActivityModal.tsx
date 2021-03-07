import React from "react";

import { ActivityInit } from "../../api/activity";

import AddActivityForm from "./Forms";
import Dialog from "../../app/Dialog";
import { Box } from "@material-ui/core";

export default function AddActivityModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} title="Add new activity" maxWidth="sm">
            <Box m={3}>
                <AddActivityForm
                    open={open}
                    init={ActivityInit}
                    onDone={() => {
                        onDone();
                        onClose();
                    }}
                />
            </Box>
        </Dialog>
    );
}
