import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";

import NoteModal from "./Modal";
import Button from "app/Button";
import NewDataGrid from "app/NewDataGrid";

import { formatTimestampToDate } from "logic/date";
import { INote } from "api/note";

import { useLock } from "../Lock";

const columns = [
  {
    name: "createdAt",
    header: "Date",
    type: "date",
    minWidth: 120,
  },
  {
    name: "creator",
    header: "Creator",
    minWidth: 180,
    render: ({ data }: any) => data?.EmployeeId?.username,
  },
  { name: "subject", header: "Subject", minWidth: 300 },
  { name: "note", header: "Note", flex: 1, minWidth: 120 },
];

export default function NoteTab({ itemId, model }: { model: string; itemId: string }) {
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<INote>();
  const { lock } = useLock();

  return (
    <>
      <NoteModal
        open={addModal}
        onClose={() => {
          setAddModal(false);
          setSelected(undefined);
        }}
        model={model}
        itemId={itemId}
        data={selected}
      />
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
        <NewDataGrid
          columns={columns}
          url={`/notes/${model}/${itemId}`}
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
