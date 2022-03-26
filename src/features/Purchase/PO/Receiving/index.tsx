import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import AddRounded from "@material-ui/icons/AddRounded";

import Modal from "./Modal";
import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";

import { formatTimestampToDate } from "logic/date";

const cols: GridColumns = [
  { field: "Date", valueFormatter: (r) => formatTimestampToDate(r.row.ItemId?.date), width: 200 },
  { field: "ItemId", headerName: "Item Number", valueFormatter: (r) => r.row.ItemId.number, width: 200 },
  { field: "ItemId", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId.name, width: 200 },
  { field: "vendor", headerName: "Vendor P. NO.", flex: 1 },
  { field: "quantity", headerName: "QTY", width: 90 },
  { field: "uom", headerName: "UOM", width: 100 },
  { field: "note", headerName: "Note", width: 200 },
];

export default function ReceivingTab() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)} />
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          style={{ marginBottom: 8 }}
          onClick={() => setModal(true)}
        >
          Add
        </Button>
        <BaseDataGrid
          rows={[]}
          cols={cols}
          onRowSelected={(d) => {
            // TODO: edit line item
          }}
          height={400}
        />
      </Box>
    </>
  );
}
