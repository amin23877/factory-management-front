import React, { useMemo } from "react";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import Dialog from "../../../app/Dialog";

import { FieldService, Purchasing } from "./Forms";
import { formatTimestampToDate } from "../../../logic/date";

interface IModal {
    open: boolean;
    onClose: () => void;
    help?: any;
}

export const FieldModal = ({ open, onClose, help }: IModal) => {
    const { data: tickets } = useSWR(`/ticket?ItemId=${help.item.id}`);

    const ticketHistoryCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                width: 180,
                type: "date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
            },
            {
                field: "id",
                headerName: "Ticket ID",
                width: 180,
            },
            { field: "subject", headerName: "Subject", flex: 1 },
            { field: "device", headerName: "Staff", flex: 2 },
            { field: "note", headerName: "Category", flex: 1 },
            {
                field: "EA",
                headerName: "Contact",
                flex: 1,
                valueFormatter: (params) => params.row?.ContactId?.name,
            },
            { field: "status", headerName: "Status", flex: 1 },
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
            <BaseDataGrid rows={tickets || []} cols={ticketHistoryCols} />
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
