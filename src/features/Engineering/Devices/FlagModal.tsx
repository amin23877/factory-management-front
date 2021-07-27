import React from "react";

import Dialog from "../../../app/Dialog";
import { General } from "./FlagForms";

interface IFlagModal {
    open: boolean;
    itemId: string;
    flag?: any;
    onClose: () => void;
}

export default function FlagModal({ open, onClose, itemId, flag }: IFlagModal) {
    return (
        <Dialog title="Flag" open={open} onClose={onClose}>
            <General onClose={onClose} itemId={itemId} flag={flag} />
        </Dialog>
    );
}
