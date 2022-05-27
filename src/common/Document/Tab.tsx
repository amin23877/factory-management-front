import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import DocumentModal from "./Modal";
import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";

import { INote } from "api/note";
import { formatTimestampToDate } from "logic/date";
import { fileType } from "logic/fileType";

import { LockButton, useLock, LockProvider } from "../Lock";

const columns: GridColumns = [
  {
    field: "date",
    headerName: "Date",
    valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
    width: 120,
  },
  {
    field: "creator",
    headerName: "Creator",
    // valueFormatter: (params) => params.row?.employee?.username,
    width: 120,
  },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "number", headerName: "Number", width: 100 },
  { field: "description", headerName: "Description", flex: 1 },
  {
    field: "type",
    headerName: "File Type",
    valueFormatter: (params) => fileType(params.row?.path),
    width: 120,
  },
];

function DocumentTabContent({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/document/${model}/${itemId}`);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<INote>();
  const { lock } = useLock();

  return (
    <>
      <DocumentModal open={addModal} onClose={() => setAddModal(false)} model={model} itemId={itemId} data={selected} />
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
          <LockButton />
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
      </Box>
    </>
  );
}

export default function DocumentTab({ itemId, model }: { model: string; itemId: string }) {
  return (
    <LockProvider>
      <DocumentTabContent itemId={itemId} model={model} />
    </LockProvider>
  );
}
