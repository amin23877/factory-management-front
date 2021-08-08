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
import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";

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
            { field: "index", headerName: "Sort" },
            { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row.ItemId.name, width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "quantity", headerName: "QTY", width: 90 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
            { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row.quantity, width: 200 },
        ],
        []
    );

    const noteCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 120,
            },
            { field: "creator", headerName: "Creator", width: 180 },
            { field: "subject", headerName: "Subject", width: 300 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    const docCols = useMemo<GridColDef[]>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 120,
            },
            {
                field: "EmployeeId",
                headerName: "Creator",
                valueFormatter: (params) => params.row?.employee?.username,
                width: 120,
            },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "id", headerName: "ID", width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            {
                field: "type",
                headerName: "File Type",
                valueFormatter: (params) => fileType(params.row?.path),
                width: 120,
            },
        ],
        []
    );

    const activityCols = useMemo<GridColumns>(
        // Entry Date	Quote ID	Project Name	Quoted By	Requested By	Note

        () => [
            { field: "startTime", headerName: "Entry Date", width: 150, type: "date" },
            { field: "number", headerName: "Quote ID", flex: 1 },
            { field: "project", headerName: "Project Name", flex: 1 },
            { field: "quotedBy", headerName: "Quoted By", flex: 1 },
            { field: "requestedBy", headerName: "Requested By", flex: 1 },
            { field: "note", headerName: "Note" },
        ],
        []
    );

    return (
        <Box>
            <EditForm selectedQuote={selectedQuote} />
            <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Line Item" />
                <Tab label="Document" />
                <Tab label="Quote history" />
                <Tab label="Note" />
                <Tab label="Auditing" />
            </Tabs>
            <Box p={2}>
                {activeTab === 0 && (
                    <BaseDataGrid cols={LICols} rows={lineItems} onRowSelected={onLISelected} height={300} />
                )}
                {activeTab === 1 && (
                    <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={300} />
                )}
                {activeTab === 2 && (
                    <BaseDataGrid cols={activityCols} rows={activities} onRowSelected={() => {}} height={300} />
                )}
                {activeTab === 3 && (
                    <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />
                )}
                {/* {activeTab === 2 && (
                    <BaseDataGrid cols={LSCols} rows={lineServices} onRowSelected={onLSSelected} height={300} />
                )} */}
                {activeTab === 4 && <div>Auditing</div>}
            </Box>
        </Box>
    );
}
