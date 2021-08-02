import React, { useMemo } from "react";
import { GridColDef } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";

import BaseDataGrid from "../../../app/BaseDataGrid";
import Dialog from "../../../app/Dialog";

import { FieldService, Purchasing } from "./Forms";

interface IModal {
    open: boolean;
    onClose: () => void;
    help?: any;
}

export const FieldModal = ({ open, onClose, help }: IModal) => {
    // Date	Ticket ID	Subject	Staff	Category	Contact	Status

    const THCols: GridColDef[] = useMemo(
        () => [
            { field: "date", headerName: "Date", flex: 2 },
            { field: "so", headerName: "Ticket ID", flex: 1 },
            { field: "unit", headerName: "Subject", flex: 1 },
            { field: "device", headerName: "Staff", flex: 3 },
            { field: "note", headerName: "Category", flex: 1 },
            { field: "EA", headerName: "Contact", flex: 1 },
            { field: "priority", headerName: "Status", flex: 1 },
        ],
        []
    );
    return (
        <Dialog title="Edit Field Service Help" open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <FieldService help={help} onClose={onClose} />
            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                <Tabs>
                    <Tab label="Ticket History" />
                </Tabs>
                <div style={{ flexGrow: 1 }} />
            </Box>
            <BaseDataGrid rows={[] || []} cols={THCols} height={300} />
        </Dialog>
    );
};
export const PurchaseModal = ({ open, onClose, help }: IModal) => {
    return (
        <Dialog title="Edit Purchase Help" open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Purchasing help={help} onClose={onClose} />
        </Dialog>
    );
};
