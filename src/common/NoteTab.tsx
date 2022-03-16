import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { AddRounded } from "@material-ui/icons";

import NoteModal from "./NoteModal";
import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";

import { formatTimestampToDate } from "logic/date";
import useSWR from "swr";

const columns: GridColumns = [
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
];

export default function NoteTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/note/${model}/${itemId}`);
  const [modal, setModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState();

  return (
    <>
      <NoteModal open={modal} onClose={() => setModal(false)} model={model} itemId={itemId} noteData={selectedNote} />
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          style={{ margin: "0.5em 0" }}
          onClick={() => setModal(true)}
        >
          Add
        </Button>
        <BaseDataGrid
          cols={columns}
          rows={data || []}
          onRowSelected={(r) => {
            setSelectedNote(r);
            setModal(true);
          }}
        />
      </Box>
    </>
  );
}
