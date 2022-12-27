import React, { useMemo, useState } from "react";
import { GridColumns } from "@material-ui/data-grid";

import BaseDataGrid from "app/BaseDataGrid";
import Button from "app/Button";
import AddLineItem from "./AddLineItem";
import { Box } from "@material-ui/core";

export type lineItemType = {
  ItemId: string;
  quantity: number;
  cost: number;
  vendorETA: string;
  tax: boolean;
  notes: string;
};

export default function LineItems({
  lines,
  vendorId,
  setFieldValue,
}: {
  lines: lineItemType[];
  vendorId?: string;
  setFieldValue: any;
}) {
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [error, setError] = useState(false);

  const cols = useMemo<GridColumns>(
    () => [
      { field: "Item No.", valueFormatter: (p) => p.row?.ItemObject?.no, width: 120 },
      { field: "quantity", headerName: "Qty", width: 120 },
      { field: "cost", headerName: "Cost", width: 120 },
      { field: "vendorETA", headerName: "Vendor ETA", width: 120 },
      { field: "notes", headerName: "Notes", flex: 1 },
      { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
    ],
    []
  );

  return (
    <>
      {vendorId && (
        <AddLineItem
          open={addLineItemModal}
          vendorId={vendorId}
          onClose={() => setAddLineItemModal(false)}
          onAdd={(line) => {
            setFieldValue("lines", (lines || []).concat(line));
            setAddLineItemModal(false);
          }}
        />
      )}
      <Box>
        <Button
          style={{ marginBottom: "0.5em", marginRight: "0.5em" }}
          variant="outlined"
          onClick={vendorId ? () => setAddLineItemModal(true) : () => setError(true)}
        >
          Add Line Item
        </Button>
        {!vendorId && error && <span style={{ color: "red" }}>Choose a vendor first!</span>}
      </Box>
      <BaseDataGrid cols={cols} rows={lines ? lines.map((l, i) => ({ ...l, id: i })) : []} />
    </>
  );
}
