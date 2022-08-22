import { Box, Tooltip } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { deleteProcess, IProcess } from "api/process";
import NewDataGrid from "app/NewDataGrid";
import Button from "app/Button";
import { LockButton, LockProvider, useLock } from "common/Lock";
import { formatTimestampToDate } from "logic/date";
import React, { useCallback, useMemo, useState } from "react";
import AddProcessModal from "../Process/AddProcessModal";
import EditProcessModal from "../Process/EditProcessModal";
import Confirm from "common/Confirm";
import Toast from "app/Toast";
import { mutate } from "swr";
import TasksModal from "../Process/TasksModal";

import { ReactComponent as NarrowIcon } from "assets/icons/tableIcons/narrowDown.svg";
import { ReactComponent as SettingIcon } from "assets/icons/tableIcons/setting.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/tableIcons/delete.svg";

function ProcessTabContent({ type, ItemId }: { type: string; ItemId: string }) {
  const { lock } = useLock();
  const [addProcess, setAddProcess] = useState(false);
  const [openTasksModal, setOpenTasksModal] = useState(false);
  const [editProcess, setEditProcess] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<IProcess>();
  const [refresh, setRefresh] = useState(0);

  const handleDelete = useCallback(
    (id: string) => {
      Confirm({
        onConfirm: async () => {
          try {
            await deleteProcess(id);
            Toast("Process deleted", "success");
          } catch (error) {
            console.log(error);
          } finally {
            mutate(`/process?ItemId=${ItemId}&type=${type}`);
            setRefresh((v) => v + 1);
          }
        },
      });
    },
    [ItemId, type]
  );

  const processCols = useMemo(
    () => [
      {
        name: "title",
        header: "Title",
        minWidth: 200,
        render: ({ data }: any) => {
          return (
            <Box display="flex" alignItems="center" style={{ gap: 4 }}>
              <div
                onClick={() => {
                  setOpenTasksModal(true);
                  setSelectedProcess(data);
                }}
              >
                <NarrowIcon />
              </div>
              <div
                onClick={() => {
                  if (!lock) {
                    setEditProcess(true);
                    setSelectedProcess(data);
                  }
                }}
              >
                <SettingIcon />
              </div>
              <div
                onClick={() => {
                  if (!lock) {
                    handleDelete(data.id);
                  }
                }}
              >
                <DeleteIcon />
              </div>
              <div>
                <Tooltip title={data.title}>
                  <span>{data.title}</span>
                </Tooltip>
              </div>
            </Box>
          );
        },
      },
      { name: "description", header: "Description", flex: 1 },
      {
        name: "realeasedDate",
        header: "Released Date",
        width: 120,
        render: ({ data }: any) => formatTimestampToDate(data.realeasedDate),
      },
      {
        name: "revisionDate",
        header: "Rev. Date",
        width: 120,
        render: ({ data }: any) => formatTimestampToDate(data.revisionDate),
      },
      { name: "realeased", header: "Released", width: 80, type: "boolean" },
    ],
    [handleDelete, lock]
  );

  return (
    <>
      {selectedProcess && (
        <LockProvider>
          <TasksModal
            open={openTasksModal}
            onClose={() => {
              setOpenTasksModal(false);
            }}
            type={type}
            process={selectedProcess}
          />
        </LockProvider>
      )}
      <AddProcessModal
        open={addProcess}
        onClose={() => {
          setAddProcess(false);
          setRefresh((v) => v + 1);
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
            setRefresh((v) => v + 1);
          }}
          type={type}
          ItemId={ItemId}
        />
      )}
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
      <NewDataGrid
        columns={processCols}
        url={`/process?ItemId=${ItemId}&type=${type}`}
        onRowSelected={() => {}}
        refresh={refresh}
      />
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
