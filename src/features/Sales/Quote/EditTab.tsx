import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";

import BaseDataGrid from "../../../app/BaseDataGrid";
import EditForm from "./EditForm";

import { IQuote } from "../../../api/quote";
import { IActivity } from "../../../api/activity";
import { INote } from "../../../api/note";
import { IDocument } from "../../../api/document";
import { ILineItem } from "../../../api/lineItem";
import { ILineService } from "../../../api/lineService";

export default function EditTab({
    selectedQuote,
    lineItems,
    lineServices,
    notes,
    docs,
    activities,
    onLSSelected,
    onLISelected,
    onNoteSelected,
    onDocSelected,
}: {
    selectedQuote: IQuote;
    notes: INote[];
    docs: IDocument[];
    lineItems: ILineItem[];
    lineServices: ILineService[];
    activities: IActivity[];
    onLISelected: (d: any) => void;
    onLSSelected: (d: any) => void;
    onNoteSelected: (d: any) => void;
    onDocSelected: (d: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "index", headerName: "Index" },
            { field: "ItemId", headerName: "Item", valueFormatter: (r) => r.row.ItemId.name, width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "quantity", headerName: "Quantity", width: 90 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
        ],
        []
    );

    const LSCols: GridColumns = useMemo(
        () => [
            { field: "ServiceId", headerName: "Service", valueFormatter: (r) => r.row.ServiceId.name, flex: 1 },
            // { field: "LineItemRecordId",  width: 200 },
            { field: "quantity", headerName: "Quantity", width: 100 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
        ],
        []
    );

    const noteCols = useMemo<GridColumns>(
        () => [
            { field: "subject", headerName: "Subject", width: 300 },
            { field: "url", headerName: "URL", width: 180 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    const docCols = useMemo<GridColumns>(
        () => [
            { field: "name", headerName: "Name", width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "createdAt", headerName: "Created At", type: "date", width: 300 },
        ],
        []
    );

    const activityCols = useMemo<GridColumns>(
        () => [
            { field: "name", headerName: "Name", flex: 1 },
            { field: "subject", headerName: "Subject", flex: 1 },
            { field: "location", headerName: "Location", width: 150 },
            { field: "startTime", headerName: "Start Time", width: 150, type: "date" },
            { field: "endTime", headerName: "End Time", width: 150, type: "date" },
            { field: "Activity Status", valueFormatter: (data) => data.row.ActivityStatus?.name, width: 180 },
            { field: "notes", headerName: "Notes" },
        ],
        []
    );

    return (
        <Box>
            <EditForm selectedQuote={selectedQuote} />

            <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Activities" />
                <Tab label="Line items" />
                <Tab label="Line services" />
                <Tab label="Notes" />
                <Tab label="Documents" />
            </Tabs>

            <Box p={2}>
                {activeTab === 0 && (
                    <BaseDataGrid cols={activityCols} rows={activities} onRowSelected={() => {}} height={300} />
                )}
                {activeTab === 1 && (
                    <BaseDataGrid cols={LICols} rows={lineItems} onRowSelected={onLISelected} height={300} />
                )}
                {activeTab === 2 && (
                    <BaseDataGrid cols={LSCols} rows={lineServices} onRowSelected={onLSSelected} height={300} />
                )}
                {activeTab === 3 && (
                    <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />
                )}
                {activeTab === 4 && (
                    <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={300} />
                )}
            </Box>
        </Box>
    );
}
