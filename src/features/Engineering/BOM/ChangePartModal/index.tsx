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
import AddUsageModal from "./AddUsageModal";

function ChangePartModal({
  open,
  row,
  partName,
  onClose,
  onDone,
  onDelete,
  addUsage,
  setAddUsage,
}: {
  row: any;
  partName: string;
  open: boolean;
  onClose: () => void;
  onDone: (data: any, part: any) => void;
  onDelete: (data: any) => void;
  addUsage: boolean;
  setAddUsage: (data: boolean) => void;
}) {
  const [clusterId, setClusterId] = useState<string>();
  const [itemClass, setItemClass] = useState<string>("part");
  const [itemName, setItemName] = useState<string>();
  const [itemNo, setItemNo] = useState<string>();
  const [keywords, setKeywords] = useState<string>();

  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [levelFilters, setLevelFilters] = useState<{ [key: string]: string }>();
  const prevPart = row?.parts?.find((p: any) => p.name === partName) || null;

  const [usage, setUsage] = useState(0);
  const [fixedQty, setFixedQty] = useState(false);
  const [items, setItems] = useState<{ result: IItem[]; total: number }>();
  const [page, setPage] = useState<number>(1);

  const [selectedItem, setSelectedItem] = useState<any>();

  const handleSubmit = useCallback(
    (d: any) => {
      const prevCells = row?.parts?.map((p: any) => ({
        name: p?.name || undefined,
        ItemId: (p?.ItemId as any)?._id || p?.ItemId?.id,
        usage: p.usage,
      }));
      const index = prevCells.findIndex((p: any) => p.name === partName);
      if (index !== -1) {
        prevCells[index] = { ...d, name: partName };
      } else {
        prevCells.push({ ...d, name: partName });
      }
      const res = { device: row.DeviceId, cells: prevCells };

      onDone(res, { ...d, name: partName, rowId: row.id, partName });
    },
    [onDone, partName, row]
  );

  const handleAddUsageModal = useCallback(
    (d: any) => {
      setSelectedItem(d);
      setAddUsage(true);
    },
    [setAddUsage]
  );

  const handleDelete = () => {
    const data = {
      device: row.DeviceId,
      cells: row?.parts?.filter((p: any) => p?.name !== partName),
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
        ...(itemNo && { startsWithno: itemNo }),
        ...(itemName && { startsWithname: itemName }),
        ...(keywords && { containDescription: keywords }),
        page: String(page),
      },
    })
      .then((d) => {
        setItems(d);
      })
      .catch((e) => console.log(e));
  }, [clusterId, itemClass, itemName, itemNo, keywords, levelFilters, page]);

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
        renderCell: (p: any) => (
          <Box display="flex" alignItems="center" flex={1}>
            <Tooltip title={String(p.value)} style={{ flexGrow: 1 }}>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                {String(p.value)}
              </span>
            </Tooltip>
            <Button
              color={prevPart ? "primary" : "secondary"}
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => {
                handleAddUsageModal({ usage, fixedQty, ItemId: p?.row?.id, _itemNo: p?.row?.no });
              }}
            >
              {prevPart ? "Set" : "Add"}
            </Button>
          </Box>
        ),
      },
    ],
    [prevPart, handleAddUsageModal, usage, fixedQty]
  );

  useEffect(() => {
    if (!open) {
      setUsage(0);
      setFixedQty(false);
      setItemName(undefined);
      setItemNo(undefined);
    } else if (prevPart) {
      setUsage(prevPart.usage);
      setFixedQty(prevPart.fixedQty);
      setItemName(prevPart.ItemId?.name);
      setItemNo(prevPart.ItemId?.no);
    }
  }, [open, prevPart]);

  return (
    <>
      {selectedItem && (
        <AddUsageModal
          open={addUsage}
          onClose={() => setAddUsage(false)}
          onDone={(usage) => {
            handleSubmit({ ...selectedItem, usage: usage });
          }}
          prevPart={prevPart}
        />
      )}
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
              <TextField label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
              <TextField label="Item Number" value={itemNo} onChange={(e) => setItemNo(e.target.value)} />
              <TextField label="Keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
              <TextField label="Part number" disabled value={row["Device Number"]} fullWidth />
              <AsyncCombo
                label="Cluster"
                filterBy="clusterValue"
                getOptionLabel={(o) => o?.clusterValue || "No-Name"}
                getOptionSelected={(o, v) => o?.id === v?.id}
                url="/cluster"
                defaultParams={{ class: itemClass }}
                value={clusterId}
                onChange={(e, nv) => nv?.id && setClusterId(nv?.id)}
              />
              <Button
                startIcon={<MenuRounded />}
                color="secondary"
                disabled={!clusterId}
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
              />
              <FormControlLabel
                style={{ margin: 0 }}
                name="fixedQty"
                placeholder="Fixed QTY"
                label="Fixed QTY"
                checked={fixedQty}
                onChange={(e, c) => setFixedQty(c)}
                control={<Checkbox />}
              />

              {prevPart && (
                <Button kind="delete" onClick={handleDelete} style={{ gridColumn: "span 3" }}>
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
              />
            </div>
          </Paper>
        </Box>
      </Dialog>
    </>
  );
}

export default ChangePartModal;
