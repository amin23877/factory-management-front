import React, { useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BaseDataGrid from "../../../app/BaseDataGrid";

import EditForm from "./EditForm";

import { ISO } from "../../../api/so";
import useSWR from "swr";

export default function EditTab({
    selectedSo,
    onLineItemSelected,
    onLineServiceSelected,
    onNoteSelected,
    onDocSelected,
}: {
    selectedSo: ISO;
    onLineItemSelected: (a: any) => void;
    onLineServiceSelected: (a: any) => void;
    onNoteSelected: (a: any) => void;
    onDocSelected: (a: any) => void;
}) {
    const { data: notes } = useSWR(selectedSo && selectedSo.id ? `/note/so/${selectedSo.id}` : null);
    const { data: documents } = useSWR(selectedSo && selectedSo.id ? `/document/so/${selectedSo.id}` : null);
    const { data: lineItems } = useSWR(selectedSo && selectedSo.id ? `/lineitem?SOId=${selectedSo.id}` : null);
    const { data: lineServices } = useSWR(selectedSo && selectedSo.id ? `/lineservice?SOId=${selectedSo.id}` : null);

    const [activeTab, setActiveTab] = useState(0);

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

    return (
        <div>
            <Box>
                <EditForm selectedSo={selectedSo} />
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
                <BaseDataGrid cols={LICols} rows={lineItems || []} onRowSelected={onLineItemSelected} height={300} />
            )}
            {activeTab === 1 && (
                <BaseDataGrid
                    cols={LSCols}
                    rows={lineServices || []}
                    onRowSelected={onLineServiceSelected}
                    height={300}
                />
            )}
            {activeTab === 2 && (
                <BaseDataGrid cols={noteCols} rows={notes || []} onRowSelected={onNoteSelected} height={300} />
            )}
            {activeTab === 3 && (
                <BaseDataGrid cols={docCols} rows={documents || []} onRowSelected={onDocSelected} height={300} />
            )}
        </div>
    );
}
