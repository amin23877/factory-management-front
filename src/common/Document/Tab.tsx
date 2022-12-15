import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import DocumentModal from "./Modal";
import Button from "app/Button";
import NewDataGrid from "app/NewDataGrid";
import BaseDataGrid from "app/BaseDataGrid";

import { INote } from "api/note";
import { formatTimestampToDate } from "logic/date";
import { fileType } from "logic/fileType";

import { useLock } from "../Lock";

const columns = [
  {
    name: "date",
    header: "Date",
    // valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
    width: 120,
  },
  {
    name: "creator",
    header: "Creator",
    width: 120,
  },
  { name: "name", header: "Name", flex: 1 },
  { name: "number", header: "Number", width: 100 },
  { name: "description", header: "Description", flex: 1 },
  {
    name: "type",
    header: "File Type",
    // valueFormatter: (params) => fileType(params.row?.path),
    width: 120,
  },
];

export default function DocumentTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/document/${model}/${itemId}`);
  console.log("data: ", data);

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
        </Box>
        {/* <BaseDataGrid
          cols={columns}
          rows={data || []}
          onRowSelected={(r) => {
            setSelected(r);
            setAddModal(true);
          }}
        /> */}
        <NewDataGrid
          columns={columns}
          url={`/documents/${model}/${itemId}`}
          onRowSelected={(r) => {
            if (!lock) {
              setSelected(r);
              setAddModal(true);
            }
          }}
          // style={{ marginBottom: "10px" }}
        />
      </Box>
    </>
  );
}
