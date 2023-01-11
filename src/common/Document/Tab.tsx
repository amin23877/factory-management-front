import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import useSWR from "swr";

import DocumentModal from "./Modal";
import Button from "app/Button";
import NewDataGrid from "app/NewDataGrid";

import { INote } from "api/note";
import { formatTimestampToDate } from "logic/date";
import { fileType } from "logic/fileType";

import { useLock } from "../Lock";

const columns = [
  { name: "createdAt", header: "Date", type: "date", width: 120 },
  { name: "creator", header: "Creator", width: 120 },
  { name: "name", header: "Name", flex: 1 },
  { name: "number", header: "Number", width: 100 },
  { name: "description", header: "Description", flex: 1 },
  { name: "type", header: "File Type", render: ({ data }: any) => fileType(data?.path), width: 120 },
];

export default function DocumentTab({ itemId, model }: { model: string; itemId: string }) {
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState<INote>();
  const [refresh, setRefresh] = useState(0);
  const { lock } = useLock();

  return (
    <>
      <DocumentModal
        open={addModal}
        onClose={() => {
          setAddModal(false);
          setSelected(undefined);
        }}
        model={model}
        itemId={itemId}
        data={selected}
        setRefresh={setRefresh}
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
          url={`/document/${model}/${itemId}`}
          onRowSelected={(r) => {
            if (!lock) {
              setSelected(r);
              setAddModal(true);
            }
          }}
          refresh={refresh}
          style={{ marginBottom: "10px" , height:"calc(100vh - 300px)" }}
        />
      </Box>
    </>
  );
}
