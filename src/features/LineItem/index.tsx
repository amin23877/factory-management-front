import React from "react";

import Box from "@material-ui/core/Box";

import Dialog from "../../app/Dialog";
import Form from "./Form";
import { IPurchasePOLine } from "../../api/purchasePO";

export default function AddLineItemModal({
    open,
    onClose,
    onDone,
    record,
    recordId,
    selectedLine,
}: {
    selectedLine?: IPurchasePOLine;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    record: "purchaseSO" | "purchasePO";
    recordId: number;
}) {
    return (
        <Dialog open={open} onClose={onClose} title={`Add new line item to ${record === "purchasePO" ? "purchase po" : "purchase so"}`}>
            <Box p={2}>
                <Form
                    initialValues={selectedLine}
                    onDone={() => {
                        onDone();
                        onClose();
                    }}
                    recordId={recordId}
                    record={record}
                />
            </Box>
        </Dialog>
    );
}
