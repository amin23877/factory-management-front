import React, { useMemo, useState } from "react";
import { EditRounded } from "@material-ui/icons";
import { Box } from "@material-ui/core";

import NewDataGrid from "app/NewDataGrid";
import Button from "app/Button";
import { LockButton, LockProvider } from "common/Lock";
import Confirm from "common/Confirm";
import { useLock } from "common/Lock";

import LevelModal from "../../../Level/Modal";

import { splitLevelName } from "logic/levels";
import { clusterType } from "api/cluster";
import { deleteLevel } from "api/level";
import { IVals } from "common/Level/Form";
import { ReactComponent as DeleteIcon } from "assets/icons/tableIcons/delete.svg";

type dataType = {
  // clusterId: { id: string; clusterValue: string };
  // createdAt: number;
  // id: string;
  // name: string;
  // updatedAt: number;
  // valid: { value: string; uom: string; id: string };
  rowIndex: number;
  columnIndex: number;
  rowId: string;
  columnId: string;
  value?: any;
};

function LevelsContent({ selectedRow }: { selectedRow: clusterType }) {
  const [levelModal, setLevelsModal] = useState<boolean>(false);
  const [level, setLevel] = useState<dataType | null>();
  const [edit, setEdit] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const { lock } = useLock();

  const handleEdit = (data: dataType) => {
    setLevelsModal(true);
    setLevel(data);
    setEdit(true);
  };

  const handleDelete = (data: any) => {
    Confirm({
      text: `you are going to delete a Level with name ${splitLevelName(data.name)} !`,
      onConfirm: async () => {
        try {
          await deleteLevel(data.id);
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
      {
        name: "valid",
        header: "Valid Values",
        render: ({ data }: any) => {
          let temp = data.valid;
          temp = temp.map((val: IVals) => val.value + " " + val.uom);
          return temp.join(",");
        },
        flex: 1,
      },
      {
        name: "createdAt",
        header: "Date",
        type: "date",
        editable: false,
      },
      {
        name: "",
        header: "",
        type: "",
        width: 60,
        editable: false,
        render: ({ data }: any) => (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              onClick={() => !lock && data.id && handleEdit(data)}
              title="edit"
              style={lock ? { cursor: "not-allowed" } : { cursor: "pointer" }}
            >
              <EditRounded />
            </div>
            <div
              onClick={() => !lock && data.id && handleDelete(data)}
              style={lock ? { cursor: "not-allowed" } : { cursor: "pointer" }}
            >
              <DeleteIcon title="delete" />
            </div>
          </div>
        ),
      },
    ],
    [lock]
  );

  return (
    <>
      <LevelModal
        level={level}
        open={levelModal}
        onClose={() => setLevelsModal(false)}
        onDone={() => setRefresh((p) => p + 1)}
        edit={edit}
      />
      <Box display="flex" alignItems="center">
        <div style={{ marginBottom: 8, marginRight: "auto" }} />
        <Button
          kind="add"
          onClick={() => {
            setLevelsModal(true);
            setLevel(null);
            setEdit(false);
          }}
          disabled={lock}
        >
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
