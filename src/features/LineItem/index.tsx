import React from "react";

import Box from "@material-ui/core/Box";

import Dialog from "../../app/Dialog";
import Form from "./Form";
import { ILineItem } from "../../api/lineItem";
import { mutate } from "swr";

export default function AddLineItemModal({
    open,
    onClose,
    record,
    recordId,
    selectedLine,
    readOnly,
}: {
    selectedLine?: ILineItem;
    open: boolean;
    onClose: () => void;
    record: "purchaseSO" | "purchasePO" | "SO";
    recordId: string;
    readOnly?: boolean;
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title={`Add new line item to ${record === "purchasePO" ? "purchase order" : "sales order"}`}
        >
            <Box p={2}>
                <Form
                    initialValues={selectedLine}
                    recordId={recordId}
                    record={record}
                    readOnly={readOnly}
                    onDone={() => {
                        mutate(`/lineitem?${record}=${recordId}`);
                        onClose();
                    }}
                />
            </Box>
        </Dialog>
    );
}
