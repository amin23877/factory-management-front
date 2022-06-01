import React, { useMemo } from "react";
import { Box, Button, makeStyles, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import useSWR from "swr";

import BaseDataGrid from "app/BaseDataGrid";
import { LockButton, LockProvider, useLock } from "common/Lock";

import { openRequestedSinglePopup } from "logic/window";
import { ILineItem } from "api/lineItem";
import { IQuote } from "api/quote";

const useStyle = makeStyles({
  btn: {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "0px 0px 10px 5px ",
  },
});

function LineItemsContent({ quote, onAddLineItem }: { quote: IQuote; onAddLineItem: () => void }) {
  const classes = useStyle();
  const history = useHistory();
  const { lock } = useLock();
  const phone = useMediaQuery("(max-width:900px)");
  const { data: lineItems } = useSWR<{ result: ILineItem[]; total: number }>(`/lineitem?QuoteId=${quote.id}`);

  const LICols = useMemo<GridColumns>(
    () => [
      // { field: "index", headerName: "Sort" },
      {
        field: "ItemId",
        headerName: "Part Number",
        valueFormatter: ({ row }) => row?.ItemId?.no || row?.text || row?.no,
        flex: 1,
      },
      // { field: "description", headerName: "Description", flex: 1 },
      { field: "qty", headerName: "QTY", width: 70 },
      { field: "price", headerName: "Price", width: 70, disableColumnMenu: true },
      { field: "tax", headerName: "Tax", type: "boolean", width: 70 },
      {
        field: "total",
        headerName: "Total",
        valueFormatter: (r) => Number(r.row?.price) * Number(r.row?.qty),
        width: 70,
        disableColumnMenu: true,
      },
    ],
    []
  );

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button onClick={onAddLineItem} className={classes.btn} disabled={lock}>
          + Add Line Item
        </Button>
        <LockButton />
      </Box>
      <BaseDataGrid
        height=" calc(100% - 100px)"
        cols={LICols}
        rows={lineItems?.result || []}
        onRowSelected={(r) => {
          if (r?.ItemId?.id) {
            phone
              ? history.push(`/panel/inventory/${r?.ItemId?.id}`)
              : openRequestedSinglePopup({ url: `/panel/inventory/${r?.ItemId?.id}` });
          }
        }}
      />
    </>
  );
}

export default function LineItems({ quote, onAddLineItem }: { quote: IQuote; onAddLineItem: () => void }) {
  return (
    <LockProvider>
      <LineItemsContent quote={quote} onAddLineItem={onAddLineItem} />
    </LockProvider>
  );
}
