import React, { useMemo, useState, useCallback } from "react";
import { Tooltip, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import DataGrid from "app/NewDataGrid";

import Box from "@material-ui/core/Box";
import { AddRounded } from "@material-ui/icons";

import { ReactComponent as NarrowIcon } from "assets/icons/tableIcons/narrowDown.svg";
import { ReactComponent as SettingIcon } from "assets/icons/tableIcons/setting.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/tableIcons/delete.svg";

import Button from "app/Button";
import { deleteBom, IBom } from "api/bom";
import { formatTimestampToDate } from "../../logic/date";
import { openRequestedSinglePopup } from "../../logic/window";

import BomModal from "./BomModal";
import BomRecordModal from "./BomRecordModal";
import { useLock } from "common/Lock";
import Confirm from "common/Confirm";
import { IItem } from "api/items";

export default function ItemBomTable({
  boms,
  item,
  mutateBoms,
}: {
  boms?: IBom[];
  item: IItem;
  mutateBoms: () => void;
}) {
  const [bomModal, setBomModal] = useState(false);
  const [bomRecordModal, setBomRecordModal] = useState(false);
  const [selectedBom, setSelectedBom] = useState<IBom>();
  const [refresh, setRefresh] = useState(1);

  const history = useHistory();
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  const handleDelete = useCallback((data: IBom) => {
    Confirm({
      text: `you are going to delete a BOM with name ${data.name} !`,
      onConfirm: async () => {
        try {
          await deleteBom(data.id);
        } catch (error) {
          console.log(error);
        } finally {
          setRefresh((p) => p + 1);
        }
      },
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "items",
        header: "Items",
        defaultWidth: 180,
        render: ({ data }: any) => {
          return (
            <Box display="flex" alignItems="center" style={{ gap: 4 }}>
              <div
                onClick={() => {
                  if (phone) {
                    history.push(`/panel/bom/${data.id}/parts`);
                  } else {
                    openRequestedSinglePopup({ url: `/panel/bom/${data.id}/parts` });
                  }
                }}
                style={{ cursor: lock ? "auto" : "pointer" }}
                title="details"
              >
                <NarrowIcon />
              </div>
              <div
                onClick={() => {
                  if (!lock) {
                    setSelectedBom(data);
                    setBomModal(true);
                  }
                }}
                title="edit"
                style={{ cursor: lock ? "auto" : "pointer" }}
              >
                <SettingIcon />
              </div>
              <div onClick={() => handleDelete(data)} title="delete" style={{ cursor: lock ? "auto" : "pointer" }}>
                <DeleteIcon />
              </div>
              <div>
                <Tooltip title={data.items}>
                  <span>{data.items}</span>
                </Tooltip>
              </div>
            </Box>
          );
        },
      },
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
        defaultWidth: 80,
      },
    ],
    [handleDelete, history, lock, phone]
  );

  return (
    <>
      <BomModal
        open={bomModal}
        onClose={() => setBomModal(false)}
        item={item}
        initialValues={selectedBom}
        setRefresh={setRefresh}
      />
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
      </Box>
      <DataGrid columns={columns} url={`/bom?ItemId=${item?.id}`} onRowSelected={() => {}} refresh={refresh} />
    </>
  );
}
