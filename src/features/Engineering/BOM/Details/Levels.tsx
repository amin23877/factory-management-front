import React, { useMemo, useState } from "react";
import { Box } from "@material-ui/core";

import NewDataGrid from "app/NewDataGrid";
import Button from "app/Button";
import DataGridAction from "common/DataGridAction";
import { LockButton, LockProvider } from "common/Lock";
import Confirm from "common/Confirm";
import { useLock } from "common/Lock";
import Toast from "app/Toast";

import LevelModal from "../../../Level/Modal";

import { splitLevelName } from "logic/levels";
import { clusterType } from "api/cluster";
import { deleteLevel, editLevel } from "api/level";

function LevelsContent({ selectedRow }: { selectedRow: clusterType }) {
  const [levelModal, setLevelsModal] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const { lock } = useLock();

  const handleEdit = async ({ columnId, value, data }: any) => {
    try {
      await editLevel(data.id, { [columnId]: value });

      Toast("Record updated", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh((p) => p + 1);
    }
  };

  const handleDelete = (id: string) => {
    Confirm({
      onConfirm: async () => {
        try {
          await deleteLevel(id);
        } catch (error) {
          console.log(error);
        } finally {
          setRefresh((p) => p + 1);
        }
      },
    });
  };

  const columns = useMemo(
    () => [
      { name: "name", header: "Name", render: ({ value }: any) => splitLevelName(value) },
      { name: "valid", header: "Valid Values", render: ({ value }: any) => value.join(","), flex: 1 },
      { name: "createdAt", header: "Date", type: "date", editable: false },
      {
        name: "actions",
        header: "",
        defaultWidth: 80,
        editable: false,
        render: ({ data }: any) => (
          <div>
            <DataGridAction icon="delete" onClick={() => data.id && handleDelete(data.id)} activeColor="red" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <LevelModal
        cluster={selectedRow}
        open={levelModal}
        onClose={() => setLevelsModal(false)}
        onDone={() => setRefresh((p) => p + 1)}
      />
      <Box display="flex" alignItems="center">
        <div style={{ marginBottom: 8, marginRight: "auto" }} />
        <Button kind="add" onClick={() => setLevelsModal(true)} disabled={lock}>
          Add Level
        </Button>
        <LockButton />
      </Box>
      <NewDataGrid
        style={{ height: "64vh" }}
        editable={!lock}
        rowHeight={30}
        url={`/level?clusterId=${selectedRow.id}`}
        columns={columns}
        refresh={refresh}
        onRowSelected={() => {}}
        onEditComplete={handleEdit}
      />
    </>
  );
}

export default function Levels({ selectedRow }: { selectedRow: clusterType }) {
  return (
    <LockProvider>
      <LevelsContent selectedRow={selectedRow} />
    </LockProvider>
  );
}
