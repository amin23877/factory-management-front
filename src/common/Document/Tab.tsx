import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";

import { formatTimestampToDate } from "logic/date";
import { INote } from "api/note";
import DocumentModal from "./Modal";
import { fileType } from "logic/fileType";

const columns: GridColumns = [
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
  { field: "number", headerName: "Number", width: 200 },
  { field: "description", headerName: "Description", flex: 1 },
  {
    field: "type",
    headerName: "File Type",
    valueFormatter: (params) => fileType(params.row?.path),
    width: 120,
  },
];

export default function DocumentTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/document/${model}/${itemId}`);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<INote>();

  return (
    <>
      <DocumentModal open={addModal} onClose={() => setAddModal(false)} model={model} itemId={itemId} data={selected} />
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          style={{ margin: "4px 0" }}
          onClick={() => setAddModal(true)}
        >
          Add
        </Button>
        <BaseDataGrid
          cols={columns}
          rows={data || []}
          onRowSelected={(r) => {
            setSelected(r);
            setAddModal(true);
          }}
        />
      </Box>
    </>
  );
}
