import React, { useState, useEffect, useCallback, useMemo } from "react";
import { LinearProgress, Box, makeStyles } from "@material-ui/core";

import DataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import AddPartModal from "./AddPartModal";
import ChangePartModal from "./ChangePartModal/table";
import RenamePart from "./RenamePart";

import Button from "app/Button";
import Toast from "app/Toast";

import { getMatrix, postMatrixData, IMatrix, postColumn, getColumns } from "api/matrix";
import {
  extractLevels,
  extractColumns,
  extractPartNames,
  generateDataGridColumns,
  generateDataGridFilterValues,
  generateRows,
  extractEmptyColumns,
} from "logic/matrix";
import { clusterType } from "api/cluster";
import Confirm from "common/Confirm";
import { createItem } from "api/items";
import { LockProvider } from "common/Lock";

const useStyles = makeStyles({
  root: {
    "& .InovuaReactDataGrid__column-header": {
      background: "#202731",
      color: "#fff",
    },
    "& .no-device": {
      background: "#cccccc !important",
    },
  },
});

type ITableChangeCell = {
  ItemId: any;
  usage: number;
  location?: string;
  uom?: string;
  fixedQty?: boolean;
  columnId: any;
};

type ITableChangeRow = {
  device: string;
  cells: ITableChangeCell[];
};

export default function MatrixTable({ cluster }: { cluster: clusterType }) {
  const [tableData, setTableData] = useState<IMatrix>();
  const [newColumns, setNewColumns] = useState();
  const classes = useStyles();

  const [addPart, setAddPart] = useState(false);
  const [changePart, setChangePart] = useState(false);
  const [renamePart, setRenamePart] = useState(false);

  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedPart, setSelectedPart] = useState<{ formerName: string; newName: string }>();
  const [selectedRowName, setSelectedRowName] = useState<string>();
  const [changes, setChanges] = useState<ITableChangeRow[]>([]);
  const [addUsage, setAddUsage] = useState<boolean>(false);

  const [tableColumns, setTableColumns] = useState<any[]>([]);
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [tableDefaultFilters, setTableDefaultFilters] = useState<any[] | null>(null);

  const levels = useMemo(() => {
    const exclude = ["fakeName", "device"];
    if (tableData) {
      const keySet = new Set<string>();
      tableData.forEach((td) => {
        Object.keys(td).forEach((k) => !exclude.includes(k) && keySet.add(k));
      });

      return Array.from(keySet);
    }

    return [];
  }, [tableData]);

  const refreshTableData = useCallback(async () => {
    try {
      const resp = await getMatrix(cluster.id);
      const res = await getColumns(cluster.id);
      setNewColumns(res.result);
      setTableData(resp);
    } catch (error) {
      console.log(error);
    }
  }, [cluster]);

  useEffect(() => {
    refreshTableData();
  }, [refreshTableData]);

  const handleChangePartName = useCallback((header: string) => {
    setSelectedPart({ formerName: header, newName: "" });
    setRenamePart(true);
  }, []);

  const handleAddDevice = useCallback(
    (row: any) => {
      Confirm({
        confirmText: "yes , add it",
        text: `Add Device with this Number: ${row["Device Number"]}`,
        onConfirm: async () => {
          try {
            const data = JSON.parse(JSON.stringify(row));
            delete data.id;
            delete data.DeviceId;
            data.name = row["Device Description"];
            data.action = true;
            await createItem({
              ...data,
              number: data["Device Number"],
              class: "device",
              clusterId: cluster.id,
              no: data["Device Number"],
            });
            Toast("Item created successfully", "success");
            refreshTableData();
          } catch (error) {
            console.log(error);
          }
        },
      });
    },
    [cluster.id, refreshTableData]
  );

  useEffect(() => {
    if (tableData) {
      const levels = extractLevels(tableData);
      let parts = extractPartNames(tableData);
      const emptyColumns = extractEmptyColumns(newColumns);
      parts = parts.concat(emptyColumns);
      const columns = generateDataGridColumns(
        extractColumns({ tableData, levels, parts }),
        handleChangePartName,
        handleAddDevice,
        levels
      );
      const rows = generateRows({ tableData, levels });

      const defaultFilterValues = generateDataGridFilterValues(extractColumns({ tableData, levels }));

      setTableColumns(columns);
      setTableRows(rows);
      setTableDefaultFilters(defaultFilterValues);
    }
  }, [handleAddDevice, handleChangePartName, tableData, newColumns]);

  const handleAddPart = async (name: string) => {
    const resp = await postColumn(cluster.id, name);
    if (resp) {
      refreshTableData();
      setAddPart(false);
    }
  };

  const handleChangePart = (d: ITableChangeRow, part: any) => {
    let row = { ...d };
    row.cells = d.cells.filter((i) => i.columnId !== part.columnId);
    row.cells.push(part);
    setChanges((prev) => {
      let clone = prev?.concat();
      const index = clone.findIndex((i) => i.device === row.device);
      if (index < 0) {
        clone.push(row);
      } else {
        clone[index].cells = [...clone[index].cells, ...row.cells];
      }
      return clone;
    });

    setTableRows((p: any) => {
      const clone = p.concat();
      if (clone[part.rowId]) {
        clone[part.rowId][part.partName] = part?._itemNo;
      } else {
        clone[part.rowId] = { partName: part?._itemNo };
      }

      return clone;
    });

    setChangePart(false);
    setAddUsage(false);
  };

  const submitChanges = async () => {
    try {
      await postMatrixData({ matrice: [...changes] });
      refreshTableData();
      Toast("Submitted", "success");
      setChanges([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePart = useCallback(
    (name: string) => {
      const changedRows = tableRows
        .filter((tr) => tr[name])
        .map((tr) => ({
          device: tr.DeviceId,
          cells: tr.parts
            .filter((p: any) => p.name !== name)
            .map((p: any) => ({
              ItemId: p.ItemId._id || p.ItemId.id,
              usage: p.usage || 1,
              name: p.name,
            })),
        }));
      setChanges(changedRows);

      setTableColumns((prev) => prev.filter((c) => c.name !== name));
      setRenamePart(false);
    },
    [tableRows]
  );

  const handleDeleteCell = useCallback((data: ITableChangeRow & { rowId: number; partName: string }) => {
    setChanges((prev) => {
      let clone = prev?.concat();
      const index = clone.findIndex((i) => i.device === data.device);

      if (index < 0) {
        clone.push(data);
      } else {
        clone[index].cells = data.cells;
      }
      clone.forEach((element) => {
        element.cells.forEach((i) => {
          i.ItemId = i.ItemId?.id;
          i.columnId = i.columnId?.id;
        });
      });
      return clone;
    });
    setTableRows((p: any) => {
      const clone = p.concat();
      clone[data.rowId][data.partName] = "";

      return clone;
    });

    setChangePart(false);
    setAddUsage(false);
  }, []);

  useEffect(() => {
    if (changes.length > 0) {
      window.onbeforeunload = function () {
        return "";
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [changes.length]);

  if (!tableData || !tableDefaultFilters) {
    return <LinearProgress />;
  }

  return (
    <>
      {selectedPart && (
        <RenamePart
          open={renamePart}
          onClose={() => setRenamePart(false)}
          initialValue={selectedPart}
          onDone={refreshTableData}
          onDelete={handleDeletePart}
          newColumns={newColumns}
        />
      )}
      <AddPartModal open={addPart} onClose={() => setAddPart(false)} onDone={handleAddPart} />
      {selectedRowName !== undefined && (
        <LockProvider>
          <ChangePartModal
            addUsage={addUsage}
            setAddUsage={setAddUsage}
            row={selectedRow}
            open={changePart}
            partName={selectedRowName}
            onDone={handleChangePart}
            onDelete={handleDeleteCell}
            onClose={() => {
              setChangePart(false);
              setAddUsage(false);
            }}
            newColumns={newColumns}
            changes={changes}
          />
        </LockProvider>
      )}

      <Box display="flex" alignItems="flex-top" width="100%">
        <Box width="100%">
          <Button variant="outlined" style={{ margin: "0.5em 0" }} onClick={() => setAddPart(true)}>
            Add Column
          </Button>
          <Button kind="add" style={{ margin: "0.5em" }} onClick={submitChanges} disabled={changes.length < 1}>
            Submit changes
          </Button>

          <Box display="flex" height="64vh">
            <DataGrid
              className={classes.root}
              rowHeight={20}
              columns={tableColumns}
              dataSource={tableRows}
              defaultFilterValue={tableDefaultFilters}
              pagination
              defaultLimit={250}
              rowClassName={({ data }: any) => {
                if (data?.DeviceId) {
                  return "";
                }

                return "no-device";
              }}
              // @ts-ignore
              onCellClick={(_, { data, id: partName }) => {
                if (
                  partName !== "Device Number" &&
                  partName !== "Device Description" &&
                  data?.DeviceId &&
                  !levels.includes(partName)
                ) {
                  setSelectedRowName(partName);
                  setSelectedRow(data);
                  setChangePart(true);
                }
              }}
              pageSizes={[50, 100, 250, 500]}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
