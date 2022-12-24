import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, FormControlLabel, Checkbox, Paper, Tooltip } from "@material-ui/core";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { MenuRounded } from "@material-ui/icons";

import LevelsMenu from "./LevelsMenu";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import { ObjectSelect } from "app/Inputs";

import AsyncCombo from "common/AsyncCombo";

import { get } from "api";
import { IItem } from "api/items";
import Toast from "app/Toast";
import { LockButton, useLock } from "common/Lock";

function ChangePartModal({
  open,
  row,
  partName,
  onClose,
  onDone,
  onDelete,
  addUsage,
  setAddUsage,
  newColumns,
  changes,
}: {
  row: any;
  partName: string;
  open: boolean;
  onClose: () => void;
  onDone: (data: any, part: any) => void;
  onDelete: (data: any) => void;
  addUsage: boolean;
  setAddUsage: (data: boolean) => void;
  newColumns: any;
  changes?: any;
}) {
  const { lock } = useLock();

  const [clusterId, setClusterId] = useState<string>();
  const [itemClass, setItemClass] = useState<string>("part");
  const [itemName, setItemName] = useState<string>();
  const [itemNo, setItemNo] = useState<string>();
  const [keywords, setKeywords] = useState<string>();

  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [levelFilters, setLevelFilters] = useState<{ [key: string]: string }>();

  const prevPart = row?.parts?.find((p: any) => p?.columnId?.name === partName) || null;
  const partChanges = changes?.find((p: any) => p?.device === row?.DeviceId);
  const newUsage = partChanges?.cells?.find((p: any) => p?.name === partName);

  const [fixedQty, setFixedQty] = useState(false);
  const [items, setItems] = useState<{ result: IItem[]; total: number }>();
  const [page, setPage] = useState<number>(1);

  const handleCellEditCommit = React.useCallback(
    (params, event) => {
      if (items) {
        let newArray: IItem[] = items.result.map((row: IItem) => {
          if (row.id === params.id) {
            return { ...row, usage: params.props.value };
          } else {
            return row;
          }
        });
        setItems((prev) => ({ result: newArray, total: prev?.total || 0 }));
      }
    },
    [items]
  );

  const handleSubmit = useCallback(
    (d: any) => {
      const prevCells = row?.parts?.map((p: any) => ({
        name: p?.name || undefined,
        ItemId: (p?.ItemId as any)?._id || p?.ItemId?.id,
        columnId: (p?.columnId as any)?._id || p?.columnId?.id,
        usage: p.usage,
      }));
      const index = prevCells.findIndex((p: any) => p.name === partName);
      let columnId = "";
      newColumns.map((i: any) => {
        if (i.name === partName) {
          columnId = i.id;
        }
        return 0;
      });
      if (index !== -1) {
        prevCells[index] = { ...d, name: partName, columnId };
      } else {
        prevCells.push({ ...d, name: partName, columnId });
      }
      const res = { device: row.DeviceId, cells: prevCells };

      onDone(res, { ...d, name: partName, rowId: row.id, partName, columnId });
    },
    [onDone, partName, row, newColumns]
  );

  const handleDelete = () => {
    const data = {
      device: row.DeviceId,
      cells: row?.parts?.filter((p: any) => p?.columnId?.name !== partName),
      rowId: row.id,
      partName,
    };

    onDelete(data);
  };

  useEffect(() => {
    get("/item", {
      params: {
        clusterId,
        ...(levelFilters || {}),
        ...(itemClass && { class: itemClass }),
        ...(itemNo && { no: itemNo }),
        ...(itemName && { startsWithname: itemName }),
        ...(keywords && { containDescription: keywords }),
        page: String(page),
      },
    })
      .then((d) => {
        let usage: IItem[] = d.result.map((i: IItem) => {
          if (prevPart && i.id === prevPart?.ItemId.id) {
            return { ...i, usage: newUsage?.usage ? newUsage?.usage : prevPart?.usage };
          } else {
            return i;
          }
        });
        setItems({ result: usage, total: d.total });
      })
      .catch((e) => console.log(e));
  }, [clusterId, itemClass, itemName, itemNo, keywords, levelFilters, newUsage, page, prevPart]);

  const cols = useMemo<GridColumns>(
    () => [
      {
        headerName: "Component Name",
        field: "name",
        width: 140,
        renderCell: (p: any) => (
          <Tooltip title={String(p.value)}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>
              {String(p.value)}
            </span>
          </Tooltip>
        ),
      },
      { field: "no", headerName: "Component", width: 140 },
      {
        field: "description",
        flex: 1,
        headerName: "Description",
      },
      { field: "usage", headerName: "Usage", width: 140, editable: lock ? false : true },
      {
        field: "",
        renderCell: (p: any) => (
          <Box display="flex" alignItems="center" flex={1}>
            <Button
              color={prevPart ? "primary" : "secondary"}
              variant="contained"
              style={{ marginLeft: "auto" }}
              disabled={lock}
              onClick={() => {
                if (p.row.usage > 0) {
                  handleSubmit({ usage: p?.row?.usage, fixedQty, ItemId: p?.row?.id, _itemNo: p?.row?.no });
                } else {
                  Toast("Double click on usage cell to change amount before submit", "error");
                }
              }}
            >
              {prevPart ? "Set" : "Add"}
            </Button>
          </Box>
        ),
      },
    ],
    [prevPart, handleSubmit, fixedQty, lock]
  );

  useEffect(() => {
    if (!open) {
      setFixedQty(false);
      setItemName(undefined);
      setItemNo(undefined);
    } else if (prevPart) {
      setFixedQty(prevPart.fixedQty);
      setItemName(prevPart.ItemId?.name);
      setItemNo(prevPart.ItemId?.no);
    }
  }, [open, prevPart]);

  return (
    <>
      <LevelsMenu
        onClose={() => setAnchorEl(undefined)}
        anchorEl={anchorEl}
        clusterId={clusterId}
        levelFilters={levelFilters}
        setLevelFilters={setLevelFilters}
      />
      <Dialog open={open} onClose={onClose} title={prevPart ? "Edit Part" : "Add part"} fullWidth maxWidth="md">
        <Box height="80vh" display="flex" flexDirection="column" style={{ gap: 8 }}>
          <Paper style={{ flex: 1, padding: "1em" }}>
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" style={{ gap: 8 }}>
              <TextField
                label="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                disabled={lock}
              />
              <TextField
                label="Item Number"
                value={itemNo}
                onChange={(e) => setItemNo(e.target.value)}
                disabled={lock}
              />
              <TextField
                label="Keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                disabled={lock}
              />
              <TextField label="Part number" disabled value={row["Device Number"]} fullWidth />
              <AsyncCombo
                label="Cluster"
                filterBy="clusterValue"
                getOptionLabel={(o) => o?.clusterValue || "No-Name"}
                getOptionSelected={(o, v) => o?.id === v?.id}
                url="/cluster"
                defaultParams={{ class: itemClass }}
                value={clusterId}
                onChange={(e, nv) => setClusterId(nv?.id)}
                disabled={lock}
              />
              <Button
                startIcon={<MenuRounded />}
                color="secondary"
                disabled={!clusterId || lock}
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
              >
                Levels
              </Button>

              <ObjectSelect
                label="Class"
                itemTitleField="label"
                itemValueField="value"
                items={[
                  { label: "Part", value: "part" },
                  { label: "Assembly", value: "assembly" },
                ]}
                value={itemClass}
                onChange={(e) => setItemClass(e.target.value)}
                disabled={lock}
              />
              <FormControlLabel
                style={{ margin: 0 }}
                name="fixedQty"
                placeholder="Fixed QTY"
                label="Fixed QTY"
                checked={fixedQty}
                onChange={(e, c) => setFixedQty(c)}
                control={<Checkbox />}
                disabled={lock}
              />
              <Box display={"flex"} alignItems="center" justifyContent={"center"}>
                <LockButton />
              </Box>
              {prevPart && (
                <Button kind="delete" onClick={handleDelete} style={{ gridColumn: "span 3" }} disabled={lock}>
                  Delete
                </Button>
              )}
            </Box>
          </Paper>
          <Paper style={{ flex: 3, padding: "1em" }}>
            <div style={{ height: "100%" }}>
              <DataGrid
                columns={cols}
                rows={items?.result || []}
                pagination
                paginationMode="server"
                rowCount={items?.total || 0}
                onPageChange={({ page }) => setPage(page + 1)}
                onEditCellChangeCommitted={handleCellEditCommit}
              />
            </div>
          </Paper>
        </Box>
      </Dialog>
    </>
  );
}

export default ChangePartModal;
