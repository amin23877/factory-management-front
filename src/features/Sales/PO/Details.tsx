import React, { useState, useMemo } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GridColumns } from "@material-ui/data-grid";

import EditForm from "./EditForm";
import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import { IPO } from "../../../api/po";

export default function Details({
    poData,
    onDone,
    notes,
    docs,
    onNoteSelected,
    onDocSelected,
}: {
    poData: IPO;
    onNoteSelected: (d: any) => void;
    onDocSelected: (d: any) => void;
    onDone: () => void;
    notes: any;
    docs: any;
}) {
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
    return (
        <BasePaper>
            <EditForm poData={poData} onDone={onDone} />
            <Tabs
                style={{ margin: "1em 0" }}
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
            >
                <Tab label="Notes" />
                <Tab label="Documents" />
            </Tabs>
            {activeTab === 0 && (
                <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />
            )}
            {activeTab === 1 && <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={300} />}
        </BasePaper>
    );
}
