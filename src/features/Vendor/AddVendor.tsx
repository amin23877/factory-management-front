import React from "react";

import Dialog from "../../app/Dialog";
import { AddVendorForm } from "./Forms";

export default function VendorDialog({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} title="Add new vendor">
            <AddVendorForm
                onDone={() => {
                    onDone();
                    onClose();
                }}
            />
        </Dialog>
    );
}
