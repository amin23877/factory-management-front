import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

    const noteCols = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    return (
        <BasePaper>
            <EditForm poData={poData} onDone={onDone} />
            <Tabs style={{ margin: "1em 0" }} textColor="primary" value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Notes" />
                <Tab label="Documents" />
            </Tabs>
            {activeTab === 0 && <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />}
            {activeTab === 1 && <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={300} />}
        </BasePaper>
    );
}
