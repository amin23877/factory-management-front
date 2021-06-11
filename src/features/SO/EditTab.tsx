import React, { useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { BasePaper } from "../../app/Paper";
import BaseDataGrid from "../../app/BaseDataGrid";

import EditForm from "./EditForm";

import { ISO } from "../../api/so";

export default function EditTab({
    selectedSo,
    onDone,
    notes,
    docs,
    lineItems,
    lineServices,
    onLineItemSelected,
    onLineServiceSelected,
    onNoteSelected,
    onDocSelected,
}: {
    selectedSo: ISO;
    onDone: () => void;
    notes: any;
    docs: any;
    lineItems: any;
    lineServices: any;
    onLineItemSelected: (a: any) => void;
    onLineServiceSelected: (a: any) => void;
    onNoteSelected: (a: any) => void;
    onDocSelected: (a: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);

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

    const LICols: GridColDef[] = useMemo(
        () => [
            { field: "index" },
            { field: "ItemId" },
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

    return (
        <div>
            <Box>
                <EditForm selectedSo={selectedSo} onDone={onDone} />
            </Box>
            <Tabs
                style={{ margin: "1em 0" }}
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
            >
                <Tab label="Line Items" />
                <Tab label="Line Services" />
                <Tab label="Notes" />
                <Tab label="Documents" />
            </Tabs>
            {activeTab === 0 && (
                <BaseDataGrid cols={LICols} rows={lineItems} onRowSelected={onLineItemSelected} height={300} />
            )}
            {activeTab === 1 && (
                <BaseDataGrid cols={LSCols} rows={lineServices} onRowSelected={onLineServiceSelected} height={300} />
            )}
            {activeTab === 2 && (
                <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />
            )}
            {activeTab === 3 && <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={300} />}
        </div>
    );
}
