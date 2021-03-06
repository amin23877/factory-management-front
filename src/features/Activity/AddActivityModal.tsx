import React from "react";

import { ActivityInit } from "../../api/activity";

import AddActivityForm from "./Forms";
import Dialog from "../../app/Dialog";

export default function AddActivityModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} title="Add new activity" maxWidth="sm">
            <AddActivityForm
                open={open}
                init={ActivityInit}
                onDone={() => {
                    onDone();
                    onClose();
                }}
            />
        </Dialog>
    );
}
