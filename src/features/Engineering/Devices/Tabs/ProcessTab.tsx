import { Box } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { AddRounded } from "@material-ui/icons";
import { IProcess } from "api/process";
import BaseDataGrid from "app/BaseDataGrid";
import Button from "app/Button";
import { LockButton, LockProvider, useLock } from "common/Lock";
import { formatTimestampToDate } from "logic/date";
import React, { useMemo, useState } from "react";
import useSWR from "swr";
import AddProcessModal from "../Process/AddProcessModal";
import EditProcessModal from "../Process/EditProcessModal";

function ProcessTabContent({ type, ItemId }: { type: string; ItemId: string }) {
  const { lock } = useLock();
  const [addProcess, setAddProcess] = useState(false);
  const [editProcess, setEditProcess] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<IProcess>();

  const processCols = useMemo<GridColDef[]>(
    () => [
      { field: "title", headerName: "Title", width: 120 },
      { field: "description", headerName: "Description", flex: 1 },
      { field: "realeased", headerName: "Released", width: 80, type: "boolean" },
      {
        field: "realeasedDate",
        headerName: "Released Date",
        width: 120,
        valueFormatter: (data) => formatTimestampToDate(data.row.realeasedDate),
      },
      {
        field: "revisionDate",
        headerName: "Rev. Date",
        width: 120,
        valueFormatter: (data) => formatTimestampToDate(data.row.revisionDate),
      },
    ],
    []
  );

  const { data: processes } = useSWR(`/process?ItemId=${ItemId}&type=${type}`);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Button
          onClick={() => {
            setAddProcess(true);
          }}
          variant="outlined"
          style={{ marginBottom: "10px" }}
          startIcon={<AddRounded />}
          disabled={lock}
        >
          Process
        </Button>
        <LockButton />
      </Box>
      <BaseDataGrid
        height={"calc(100% - 100px)"}
        cols={processCols}
        rows={processes?.result || []}
        onRowSelected={(d) => {
          setSelectedProcess(d);
          setEditProcess(true);
        }}
      />
      <AddProcessModal
        open={addProcess}
        onClose={() => {
          setAddProcess(false);
        }}
        type={type}
        ItemId={ItemId}
      />
      {selectedProcess && (
        <EditProcessModal
          process={selectedProcess}
          open={editProcess}
          onClose={() => {
            setEditProcess(false);
            setSelectedProcess(undefined);
          }}
          type={type}
          ItemId={ItemId}
        />
      )}
    </>
  );
}

export default function ProcessTab({ type, ItemId }: { type: string; ItemId: string }) {
  return (
    <LockProvider>
      <ProcessTabContent type={type} ItemId={ItemId} />
    </LockProvider>
  );
}
