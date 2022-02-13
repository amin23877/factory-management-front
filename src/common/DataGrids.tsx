import React, { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "app/BaseDataGrid";
import { fileType } from "logic/fileType";
import { formatTimestampToDate } from "logic/date";
import { INote } from "api/note";

export const NotesDataGrid = ({
  onNoteSelected,
  model,
  recordId,
}: {
  model: string;
  recordId: string;
  onNoteSelected: (a: any) => void;
}) => {
  const { data } = useSWR<INote[]>(`/note/${model}/${recordId}`);

  const noteCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
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

  return (
    <BaseDataGrid cols={noteCols} rows={data || []} onRowSelected={onNoteSelected} height={"calc(100% - 100px)"} />
  );
};

export const DocumentsDataGrid = ({
  model,
  recordId,
  onDocumentSelected,
}: {
  model: string;
  recordId: string;
  onDocumentSelected: (a: any) => void;
}) => {
  const { data } = useSWR<INote[]>(`/document/${model}/${recordId}`);

  const docCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
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

  return (
    <BaseDataGrid cols={docCols} rows={data || []} onRowSelected={onDocumentSelected} height={"calc(100% - 100px)"} />
  );
};
