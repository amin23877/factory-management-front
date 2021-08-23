import React from "react";

import Box from "@material-ui/core/Box";

import Dialog from "../../app/Dialog";
import Form from "./Form";
import { ILineService, records } from "../../api/lineService";
import { mutate } from "swr";

export default function LineServiceModal({
    open,
    onClose,
    record,
    recordId,
    selectedLine,
    readOnly,
    mutateField,
}: {
    selectedLine?: ILineService;
    open: boolean;
    onClose: () => void;
    record: records;
    recordId: string;
    mutateField: "QuoteId" | "SOId";
    readOnly?: boolean;
}) {
    return (
        <Dialog open={open} onClose={onClose} title={`Add New Line Service`}>
            <Box p={2}>
                <Form
                    initialValues={selectedLine}
                    recordId={recordId}
                    record={record}
                    readOnly={readOnly}
                    onDone={() => {
                        mutate(`/lineservice?${mutateField}=${recordId}`);
                        onClose();
                    }}
                />
            </Box>
        </Dialog>
    );
}
