import React from "react";

import Box from "@material-ui/core/Box";

import Dialog from "../../app/Dialog";
import Form from "./Form";
import { ILineItem } from "../../api/lineItem";

export default function AddLineItemModal({
    open,
    onClose,
    onDone,
    record,
    recordId,
    selectedLine,
}: {
    selectedLine?: ILineItem;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    record: "purchaseSO" | "purchasePO";
    recordId: string;
}) {
    return (
        <Dialog open={open} onClose={onClose} title={`Add new line item to ${record === "purchasePO" ? "purchase order" : "sales order"}`}>
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
