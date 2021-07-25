import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";

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

    const LICols: GridColDef[] = useMemo(
        () => [
            { field: "index" },
            {
                field: "Item",
                valueFormatter: (r) => r.row.ItemId.name,
            },
            { field: "description", width: 200 },
            { field: "quantity" },
            { field: "price" },
            { field: "tax" },
        ],
        []
    );

    const LSCols: GridColDef[] = useMemo(
        () => [
            { field: "ServiceId" },
            { field: "LineItemRecordId", width: 200 },
            { field: "quantity" },
            { field: "price" },
            { field: "tax" },
        ],
        []
    );

    const noteCols: GridColDef[] = useMemo(
        () => [
            { field: "subject", headerName: "Subject" },
            { field: "url", headerName: "URL" },
            { field: "note", headerName: "Note", width: 300 },
        ],
        []
    );

    const docCols: GridColDef[] = useMemo(
        () => [
            { field: "name", headerName: "Name" },
            { field: "description", headerName: "Description", width: 250 },
            { field: "createdAt", headerName: "Created at", width: 300 },
        ],
        []
    );

    const activityCols: GridColDef[] = useMemo(
        () => [
            { field: "name" },
            { field: "subject" },
            { field: "location" },
            { field: "startTime", width: 180 },
            { field: "endTime", width: 180 },
            // {
            //     field: "ActivityPriority",
            //     valueFormatter: (data) => {
            //         console.log(data);
            //         return data;
            //     },
            //     width: 180,
            // },
            { field: "ActivityStatus", valueFormatter: (data) => data.row.ActivityStatus?.name, width: 180 },
            { field: "notes" },
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
