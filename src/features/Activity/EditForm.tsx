import React, { useState, useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { IActivity } from "../../api/activity";

import EditActivityForm from "./Forms";

import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import { formatTimestampToDate } from "../../logic/date";

export default function EditForm({
    selectedActivity,
    onDone,
    notes,
    docs,
    onNoteSelected,
    onDocSelected,
}: {
    selectedActivity: IActivity;
    onDone: () => void;
    notes: any;
    docs: any;
    onNoteSelected: (d: any) => void;
    onDocSelected: (d: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);

    const noteCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 120,
            },
            {
                field: "creator",
                headerName: "Creator",
                width: 180,
                valueFormatter: (params) => params.row?.EmployeeId?.username,
            },
            { field: "subject", headerName: "Subject", width: 300 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    const docCols = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    return (
        <Box>
            <EditActivityForm init={selectedActivity} onDone={onDone} />

            <BasePaper style={{ marginTop: "1em" }}>
                <Box>
                    <Tabs
                        style={{ marginBottom: 10 }}
                        value={activeTab}
                        textColor="primary"
                        onChange={(e, nv) => setActiveTab(nv)}
                    >
                        <Tab label="Notes" />
                        <Tab label="Documents" />
                    </Tabs>
                    {activeTab === 0 && (
                        <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={250} />
                    )}
                    {activeTab === 1 && (
                        <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={250} />
                    )}
                </Box>
            </BasePaper>
        </Box>
    );
}
