import React from "react";

import Dialog from "../../../app/Dialog";
import { AddVendorForm } from "./Forms";

export default function VendorDialog({
    open,
    onClose,
    onDone,
    tech,
}: {
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    tech: boolean;
}) {
    return (
        <Dialog open={open} onClose={onClose} title="Add new vendor" maxWidth="md" fullWidth>
            <AddVendorForm
            tech={tech}
                onDone={() => {
                    onDone();
                    onClose();
                }}
            />
        </Dialog>
    );
}
