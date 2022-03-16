import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { AddRounded } from "@material-ui/icons";
import useSWR from "swr";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import DocumentModal from "./DocumentModal";

import { formatTimestampToDate } from "logic/date";
import { fileType } from "logic/fileType";

const columns: GridColumns = [
  {
    field: "date",
    headerName: "Date",
    valueFormatter: ({ row }) => formatTimestampToDate(row?.createdAt),
    width: 120,
  },
  {
    field: "creator",
    headerName: "Creator",
    width: 120,
  },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "id",
    headerName: "ID",
    width: 100,
    valueFormatter: ({ row }) => row?.no,
  },
  { field: "description", headerName: "Description", flex: 1 },
  {
    field: "type",
    headerName: "File Type",
    valueFormatter: ({ row }) => fileType(row?.path),
    width: 120,
  },
];

export default function DocumentTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/document/${model}/${itemId}`);
  const [modal, setModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState();

  return (
    <>
      <DocumentModal
        open={modal}
        onClose={() => setModal(false)}
        model={model}
        itemId={itemId}
        docData={selectedDocument}
      />
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
            setSelectedDocument(r);
            setModal(true);
          }}
        />
      </Box>
    </>
  );
}
