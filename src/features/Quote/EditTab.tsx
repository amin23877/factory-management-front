import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";
import EditForm from "./EditForm";

import { IQuote } from "../../api/quote";

export default function EditTab({
    selectedQuote,
    onDone,
    lineItems,
    notes,
    docs,
    onLISelected,
    onNoteSelected,
    onDocSelected,
}: {
    notes: any;
    docs: any;
    selectedQuote: IQuote;
    onDone: () => void;
    lineItems: any;
    onLISelected: (d: any) => void;
    onNoteSelected: (d: any) => void;
    onDocSelected: (d: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);

    const LICols: ColDef[] = [
        { field: "index" },
        { field: "ItemId" },
        { field: "description", width: 200 },
        { field: "quantity" },
        { field: "price" },
        { field: "tax" },
    ];

    const noteCols: ColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    return (
        <Box>
            <EditForm selectedQuote={selectedQuote} onDone={onDone} />
            <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Line items" />
                <Tab label="Notes" />
                <Tab label="Documents" />
            </Tabs>
            <Box p={2}>
                {activeTab === 0 && <BaseDataGrid cols={LICols} rows={lineItems} onRowSelected={onLISelected} height={300} />}
                {activeTab === 1 && <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />}
                {activeTab === 2 && <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={300} />}
            </Box>
        </Box>
    );
}
