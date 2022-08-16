import React, { useCallback, useMemo, useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { SearchRounded, ClearRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { deleteBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

import ShowBomRecordsButton from "./ShowBomRecordsButton";
import NewBaseDataGrid from "app/NewDataGrid";
import { useLock } from "common/Lock";
import Confirm from "common/Confirm";

export default function PartsTable({ bomId, onEdit }: { bomId: string; onEdit?: (bomRecordId: string) => void }) {
  const [refresh, setRefresh] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");
  const history = useHistory();
  const { lock } = useLock();

  const handleDelete = useCallback((id: string) => {
    Confirm({
      onConfirm: async () => {
        try {
          await deleteBomRecord(id);
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
      { name: "no", header: "NO.", render: ({ data }: any) => data?.ItemId?.no },
      { name: "name", header: "Name", render: ({ data }: any) => data?.ItemId?.name },
      { name: "description", header: "Description", flex: 1, render: ({ data }: any) => data?.ItemId?.description },
      { name: "usage", header: "Usage", defaultWidth: 100 },
      { name: "fixedQty", header: "Fixed Qty", defaultWidth: 100 },
      {
        name: "actions",
        header: "",
        render: ({ data }: any) => {
          return (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div
                onClick={() => {
                  if (phone) {
                    history.push(`/panel/inventory/items/${data?.ItemId?.id}`);
                  } else {
                    openRequestedSinglePopup({ url: `/panel/inventory/items/${data?.ItemId?.id}` });
                  }
                }}
              >
                <SearchRounded style={{ fontSize: "1.6rem", color: "#426792", cursor: "pointer" }} />
              </div>
              <div
                style={{ margin: "0 10px" }}
                onClick={() => {
                  if (!lock) {
                    handleDelete(data.id);
                  }
                }}
              >
                <ClearRounded
                  style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "#e71414", cursor: lock ? "auto" : "pointer" }}
                />
              </div>
              <ShowBomRecordsButton bomRecord={data} />
            </div>
          );
        },
      },
    ],
    [handleDelete, history, lock, phone]
  );

  return (
    <NewBaseDataGrid url={`/bomrecord?BOMId=${bomId}`} columns={columns} onRowSelected={() => {}} refresh={refresh} />
  );
}
