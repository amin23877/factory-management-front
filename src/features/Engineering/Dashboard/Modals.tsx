import React from "react";

import Dialog from "../../../app/Dialog";
import { FieldService, Purchasing } from "./Forms";

interface IModal {
    open: boolean;
    onClose: () => void;
    help?: any;
}

export const FieldModal = ({ open, onClose, help }: IModal) => {
    return (
        <Dialog title="Edit Field Service Help" open={open} onClose={onClose}>
            <FieldService help={help} onClose={onClose} />
        </Dialog>
    );
};
export const PurchaseModal = ({ open, onClose, help }: IModal) => {
    return (
        <Dialog title="Edit Field Service Help" open={open} onClose={onClose}>
            <Purchasing help={help} onClose={onClose} />
        </Dialog>
    );
};
