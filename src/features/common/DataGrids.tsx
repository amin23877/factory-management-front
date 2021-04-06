import React from "react";
import { ColDef } from "@material-ui/data-grid";
import BaseDataGrid from "../../app/BaseDataGrid";

export const NotesDataGrid = ({ notes, onNoteSelected }: { notes: any[]; onNoteSelected: (a: any) => void }) => {
    const noteCols: ColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    return <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />;
};

export const DocumentsDataGrid = ({ documents, onDocumentSelected }: { documents: any[]; onDocumentSelected: (a: any) => void }) => {
    const docCols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    return <BaseDataGrid cols={docCols} rows={documents} onRowSelected={onDocumentSelected} height={300} />;
};
