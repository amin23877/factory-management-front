import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { DeleteRounded, AddRounded, RemoveRounded } from "@material-ui/icons";
import { DataGrid, GridColumns } from "@material-ui/data-grid";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import Toast from "app/Toast";

import { get } from "api";
import { IItem } from "api/items";
import { createJobRecord } from "api/jobrecord";
import { IUnit } from "api/units";
import { mutate } from "swr";

export default function AddModal({
  unit,
  parent,
  open,
  onClose,
}: {
  unit: IUnit;
  parent?: { _id: string; Component: string };
  open: boolean;
  onClose: () => void;
}) {
  const [selectedItems, setSelectedItems] = useState<{ item: IItem; usage: number }[]>([]);
  const [itemName, setItemName] = useState<string>();
  const [itemNo, setItemNo] = useState<string>();
  const [keywords, setKeywords] = useState<string>();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<{ data: IItem[]; count: number }>({ data: [], count: 0 });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const queryObj = {
        ...(itemName && { startsWithname: itemName }),
        ...(itemNo && { startsWithno: itemNo }),
        ...(keywords && { containDescription: keywords }),
        page: String(page),
      };
      const query = new URLSearchParams(queryObj);
      get(`/item?${query}`)
        .then((d) => {
          setItems({ data: d.result || [], count: d.total || 0 });
        })
        .catch((e) => console.log(e));
    }, 250);

    return () => clearTimeout(t);
  }, [itemName, itemNo, keywords, page]);

  useEffect(() => {
    if (!open) {
      setSelectedItems([]);
    }
  }, [open]);

  const handleAddItem = useCallback(
    (item: IItem) => {
      const index = selectedItems.findIndex((i) => i.item.id === item.id);
      if (index > -1) {
        setSelectedItems((p) => {
          const temp = p.concat();
          temp[index] = { ...temp[index], usage: temp[index].usage + 1 };
          return temp;
        });
      } else {
        setSelectedItems((p) => p.concat([{ item, usage: 1 }]));
      }
    },
    [selectedItems]
  );

  const handleRemove = (item: IItem) => {
    const index = selectedItems.findIndex((i) => i.item.id === item.id);
    if (index > -1) {
      setSelectedItems((p) => {
        const temp = p.concat();
        if (temp[index].usage > 1) {
          temp[index] = { ...temp[index], usage: temp[index].usage - 1 };
          return temp;
        } else if (temp[index].usage === 1) {
          return temp.filter((i) => i.item.id !== item.id);
        }
        return temp;
      });
    }
  };

  const handleDeleteItem = (item: IItem) => {
    setSelectedItems((p) => p.filter((i) => i.item.id !== item.id));
  };

  const handleSubmit = async () => {
    try {
      setCreating(true);

      await Promise.all(
        selectedItems.map(async (item) => {
          try {
            await createJobRecord({
              ItemId: item.item.id,
              JOBId: unit.JOBId,
              parentRec: parent?._id || null,
              usage: item.usage,
            });
          } catch (error) {
            console.log(error);
          }
        })
      );
      Toast("Records created successfully", "success");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      mutate(`/unit/${unit.id}/jobrecords`);
      setCreating(false);
    }
  };

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
              color="secondary"
              disabled={creating}
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => handleAddItem(p.row as IItem)}
            >
              Add
            </Button>
          </Box>
        ),
      },
    ],
    [creating, handleAddItem]
  );

  return (
    <Dialog
      title={parent ? `Add Job Record to ${parent.Component}` : "Add Job Record"}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
    >
      <Box style={{ margin: "0.5em 2em", gap: 8 }} display="flex" height="75vh">
        <Box flex={3}>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" style={{ gap: 8 }} mb={2}>
            <TextField
              disabled={creating}
              style={{ flex: 1 }}
              label="Item Name"
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              disabled={creating}
              style={{ flex: 1 }}
              label="Item Number"
              onChange={(e) => setItemNo(e.target.value)}
            />
            <TextField
              disabled={creating}
              style={{ flex: 1 }}
              label="Keywords"
              onChange={(e) => setKeywords(e.target.value)}
            />
          </Box>
          <div style={{ height: "90%" }}>
            <DataGrid
              columns={cols}
              rows={items.data || []}
              pagination
              paginationMode="server"
              rowCount={items.count || 0}
              onPageChange={({ page }) => setPage(page + 1)}
            />
          </div>
        </Box>
        <Box flex={2}>
          <Paper style={{ height: "100%" }}>
            <Typography variant="h6" style={{ padding: 8, paddingTop: 16 }}>
              Selected Items
            </Typography>
            <List style={{ height: "80%", overflow: "auto" }}>
              {selectedItems.map((i) => (
                <ListItem key={i.item.id}>
                  <ListItemText primary={i.item.no} secondary={i.item.name} />
                  <ListItemSecondaryAction>
                    <Box display="flex" alignItems="center">
                      <IconButton disabled={creating} onClick={() => handleAddItem(i.item)}>
                        <AddRounded />
                      </IconButton>
                      <Typography>{i.usage}</Typography>
                      <IconButton disabled={creating} onClick={() => handleRemove(i.item)}>
                        <RemoveRounded />
                      </IconButton>
                      <IconButton
                        disabled={creating}
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteItem(i.item)}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Button
              disabled={creating}
              kind="add"
              fullWidth
              style={{ width: "93%", margin: "0 12px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Paper>
        </Box>
      </Box>
    </Dialog>
  );
}
