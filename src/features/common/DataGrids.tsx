import React, { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";
import { formatTimestampToDate } from "../../logic/date";

export const NotesDataGrid = ({ notes, onNoteSelected }: { notes: any[]; onNoteSelected: (a: any) => void }) => {
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

    return <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={300} />;
};

export const DocumentsDataGrid = ({
    documents,
    onDocumentSelected,
}: {
    documents: any[];
    onDocumentSelected: (a: any) => void;
}) => {
    const docCols = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        // { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    return <BaseDataGrid cols={docCols} rows={documents} onRowSelected={onDocumentSelected} height={300} />;
};
