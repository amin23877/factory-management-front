import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import NoteModal from "./Modal";
import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import NewDataGrid from "app/NewDataGrid";

import { formatTimestampToDate } from "logic/date";
import { INote } from "api/note";

import { useLock } from "../Lock";

const columns = [
  {
    field: "date",
    headerName: "Date",
    valueFormatter: (params: any) => formatTimestampToDate(params.row?.date),
    width: 120,
  },
  {
    field: "creator",
    headerName: "Creator",
    width: 180,
    valueFormatter: (params: any) => params.row?.EmployeeId?.username,
  },
  { field: "subject", headerName: "Subject", width: 300 },
  { field: "note", headerName: "Note", flex: 1 },
];

export default function NoteTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/note/${model}/${itemId}`);

  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<INote>();
  const { lock } = useLock();

  return (
    <>
      <NoteModal open={addModal} onClose={() => setAddModal(false)} model={model} itemId={itemId} data={selected} />
      <Box>
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            startIcon={<AddRounded />}
            style={{ margin: "4px 0", marginRight: "auto" }}
            onClick={() => setAddModal(true)}
            disabled={lock}
          >
            Add
          </Button>
        </Box>
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
        {/* <NewDataGrid
          columns={columns}
          url={`/notes/${model}/${itemId}`}
          onRowSelected={(r) => {
            if (!lock) {
              setSelected(r);
              setAddModal(true);
            }
          }}
        /> */}
      </Box>
    </>
  );
}
