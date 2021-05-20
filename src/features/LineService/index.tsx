import React from "react";

import Box from "@material-ui/core/Box";

import Dialog from "../../app/Dialog";
import Form from "./Form";
import { ILineService } from "../../api/lineService";

export default function AddLineServiceModal({
    open,
    onClose,
    onDone,
    record,
    recordId,
    selectedLine,
    readOnly,
}: {
    selectedLine?: ILineService;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    record: "Quote" | "SO";
    recordId: string;
    readOnly?: boolean;
}) {
    return (
        <Dialog open={open} onClose={onClose} title={`Add new line service to ${record}`}>
            <Box p={2}>
                <Form
                    initialValues={selectedLine}
                    recordId={recordId}
                    record={record}
                    readOnly={readOnly}
                    onDone={() => {
                        onDone();
                        onClose();
                    }}
                />
            </Box>
        </Dialog>
    );
}
