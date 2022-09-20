import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import AddRounded from "@material-ui/icons/AddRounded";

import Modal from "./Modal";
import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";

import { formatTimestampToDate } from "logic/date";
import useSWR from "swr";
import { useLock } from "common/Lock";

const cols: GridColumns = [
  { field: "Date", valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt), width: 200 },
  { field: "ItemId", headerName: "Item Number", valueFormatter: (r) => r.row.ItemId.number, width: 200 },
  { field: "ItemId", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId.name, width: 200 },
  { field: "vendor", headerName: "Vendor P. NO.", flex: 1 },
  { field: "quantity", headerName: "QTY", width: 90 },
  { field: "uom", headerName: "UOM", width: 100 },
  { field: "note", headerName: "Note", width: 200 },
];

export default function ReceivingTab({ POId }: { POId: string }) {
  const { data, mutate } = useSWR(`/receive?POId=${POId}`);
  const [modal, setModal] = useState(false);
  const [selectedReceive, setSelectedReceive] = useState<any>();
  const { lock } = useLock();

  return (
    <>
      <Modal
        POId={POId}
        open={modal}
        onClose={() => {
          setSelectedReceive(undefined);
          setModal(false);
        }}
        initialValues={selectedReceive}
        onDone={() => mutate()}
      />
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          style={{ marginBottom: 8 }}
          onClick={() => setModal(true)}
          disabled={lock}
        >
          Add
        </Button>
        <BaseDataGrid
          rows={data?.result || []}
          cols={cols}
          onRowSelected={(d) => {
            setSelectedReceive(d);
            setModal(true);
          }}
          height={400}
        />
      </Box>
    </>
  );
}
