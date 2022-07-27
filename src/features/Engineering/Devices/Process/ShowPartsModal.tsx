import React, { useMemo } from "react";
import Dialog from "app/Dialog";
import useSWR from "swr";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";
import { Tooltip } from "@material-ui/core";

interface IEditTaskModal {
  open: boolean;
  onClose: () => void;
  TaskId: string;
}
export default function ShowPartsModal({ open, onClose, TaskId }: IEditTaskModal) {
  const { data: task } = useSWR(`/task/${TaskId}`);
  const cols = useMemo<GridColumns>(
    () => [
      {
        headerName: "Part Name",
        field: "name",
        width: 160,
        renderCell: (p: any) => (
          <Tooltip title={String(p.value)}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>
              {String(p.value)}
            </span>
          </Tooltip>
        ),
      },
      { field: "no", headerName: "Part NO.", width: 140 },
      {
        field: "description",
        headerName: "Part Description",
        flex: 1,
      },
    ],
    []
  );
  return (
    <>
      <Dialog title={`Related Parts`} open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <BaseDataGrid rows={task?.relatedParts || []} cols={cols} />
      </Dialog>
    </>
  );
}
