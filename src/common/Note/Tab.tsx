import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";

import { formatTimestampToDate } from "logic/date";
import { INote } from "api/note";
import NoteModal from "./Modal";

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

export default function NoteTab({ itemId, model, lock }: { model: string; itemId: string; lock?: boolean }) {
  const { data } = useSWR(`/note/${model}/${itemId}`);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<INote>();

  return (
    <>
      <NoteModal open={addModal} onClose={() => setAddModal(false)} model={model} itemId={itemId} data={selected} />
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          style={{ margin: "4px 0" }}
          onClick={() => setAddModal(true)}
          disabled={lock}
        >
          Add
        </Button>
        <BaseDataGrid
          cols={columns}
          rows={data || []}
          onRowSelected={(r) => {
            if (!lock) {
              setSelected(r);
              setAddModal(true);
            }
          }}
        />
      </Box>
    </>
  );
}
