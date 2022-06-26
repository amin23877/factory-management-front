import React, { useMemo, useState, useCallback } from "react";
import { useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import DataGrid from "@inovua/reactdatagrid-community";
import { useStyle } from "app/NewDataGrid";

import Box from "@material-ui/core/Box";
import { AddRounded, CheckRounded, ClearRounded, DeleteRounded, EditRounded, SearchRounded } from "@material-ui/icons";

import Button from "app/Button";
import { deleteBom, IBom } from "api/bom";
import { IItem } from "api/items";
import { formatTimestampToDate } from "../../logic/date";
import { openRequestedSinglePopup } from "../../logic/window";

import BomModal from "./BomModal";
import BomRecordModal from "./BomRecordModal";
import { useLock, LockButton, LockProvider } from "common/Lock";
import Confirm from "common/Confirm";

const defaultFilterValues = [
  { name: "items", value: null, operator: "gt", type: "number" },
  { name: "no", value: "", operator: "startsWith", type: "string" },
  { name: "revDate", value: "", operator: "startsWith", type: "string" },
  { name: "name", value: "", operator: "startsWith", type: "string" },
  { name: "notes", value: "", operator: "startsWith", type: "string" },
  {
    name: "current",
    value: "",
    type: "boolean",
    operator: "startsWith",
  },
];

function ItemBomTableContent({ boms, item, mutateBoms }: { boms?: IBom[]; item: IItem; mutateBoms: () => void }) {
  const [bomModal, setBomModal] = useState(false);
  const [bomRecordModal, setBomRecordModal] = useState(false);
  const [selectedBom, setSelectedBom] = useState<IBom>();

  const classes = useStyle();
  const history = useHistory();
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  const handleDelete = useCallback(
    (id: string) => {
      Confirm({
        onConfirm: async () => {
          try {
            await deleteBom(id);
          } catch (error) {
            console.log(error);
          } finally {
            mutateBoms();
          }
        },
      });
    },
    [mutateBoms]
  );

  const columns = useMemo(
    () => [
      {
        name: "actions",
        header: "",
        defaultWidth: 80,
        render: ({ data }: any) => {
          return (
            <div
              onClick={() => {
                if (phone) {
                  history.push(`/panel/bom/${data.id}/parts`);
                } else {
                  openRequestedSinglePopup({ url: `/panel/bom/${data.id}/parts` });
                }
              }}
            >
              <SearchRounded style={{ fontSize: "1.6rem", color: "#426792", cursor: "pointer" }} />
            </div>
          );
        },
      },
      { name: "items", header: "Items", defaultWidth: 100 },
      { header: "Rev No.", name: "no", defaultWidth: 100 },
      {
        header: "Revision Date",
        name: "revDate",
        render: ({ data }: any) => formatTimestampToDate(data.updatedAt) || "",
      },
      { header: "Name", name: "name" },
      { header: "Note", name: "notes", flex: 1 },
      {
        header: "Current",
        name: "current",
        type: "boolean",
        defaultWidth: 100,
        render: ({ value, data }: any) => {
          return (
            <Box display="flex" alignItems="center" style={{ gap: 4 }}>
              <span>{value ? <CheckRounded /> : <ClearRounded />}</span>
              <div
                onClick={() => {
                  if (!lock) {
                    setSelectedBom(data);
                    setBomModal(true);
                  }
                }}
              >
                <EditRounded
                  style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "#426792", cursor: lock ? "auto" : "pointer" }}
                />
              </div>
              <div onClick={() => handleDelete(data.id)}>
                <DeleteRounded
                  style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "#e71414", cursor: lock ? "auto" : "pointer" }}
                />
              </div>
            </Box>
          );
        },
      },
    ],
    [handleDelete, history, lock, phone]
  );

  return (
    <>
      <BomModal open={bomModal} onClose={() => setBomModal(false)} item={item} initialValues={selectedBom} />
      {selectedBom && (
        <BomRecordModal open={bomRecordModal} onClose={() => setBomRecordModal(false)} bom={selectedBom} />
      )}
      <Box display="flex" alignItems="center">
        <Button
          startIcon={<AddRounded />}
          variant="outlined"
          onClick={() => {
            setSelectedBom(undefined);
            setBomModal(true);
          }}
          style={{ marginBottom: 8, marginRight: "auto" }}
          disabled={lock}
        >
          BOM
        </Button>
        <LockButton />
      </Box>
      <DataGrid
        className={classes.root}
        columns={columns}
        dataSource={boms || []}
        defaultFilterValue={defaultFilterValues}
        style={{ height: "100%" }}
      />
    </>
  );
}

export default function ItemBomTable({
  boms,
  item,
  mutateBoms,
}: {
  boms?: IBom[];
  item: IItem;
  mutateBoms: () => void;
}) {
  return (
    <LockProvider>
      <ItemBomTableContent boms={boms} item={item} mutateBoms={mutateBoms} />
    </LockProvider>
  );
}
