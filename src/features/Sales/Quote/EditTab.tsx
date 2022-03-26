import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box, makeStyles, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "app/BaseDataGrid";
import { BasePaper } from "app/Paper";
import Button from "app/Button";

import EditForm from "./EditForm";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

import { IQuote } from "api/quote";
import { ILineItem } from "api/lineItem";
import { ILineService } from "api/lineService";
import LineItemModal from "../../LineItem";
import LineServiceModal from "../../LineService";

const useStyle = makeStyles({
  btn: {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "0px 0px 10px 5px ",
  },
});

export default function EditTab({ selectedQuote }: { selectedQuote: IQuote }) {
  const classes = useStyle();
  const [activeTab, setActiveTab] = useState(0);

  const [lineItemModal, setLineItemModal] = useState(false);
  const [lineServiceModal, setLineServiceModal] = useState(false);

  const [selectedLI, setSelectedLI] = useState<ILineItem>();
  const [selectedLS, setSelectedLS] = useState<ILineService>();

  const { data: lineItems } = useSWR<{ result: ILineItem[]; total: number }>(
    activeTab === 0 ? `/lineitem?QuoteId=${selectedQuote.id}` : null
  );
  const LICols = useMemo<GridColumns>(
    () => [
      // { field: "index", headerName: "Sort" },
      {
        field: "ItemId",
        headerName: "Part Number",
        valueFormatter: ({ row }) => row?.ItemId?.name || row?.text,
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

  const LSCols = useMemo<GridColumns>(
    () => [
      { field: "ServiceId", headerName: "Service", valueFormatter: (r) => r.row?.ServiceId?.name, flex: 1 },
      // { field: "LineItemRecordId",  width: 200 },
      { field: "quantity", headerName: "Quantity", width: 100 },
      { field: "price", headerName: "Price", width: 100 },
      { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
    ],
    []
  );

  const quoteHistoryCols = useMemo<GridColumns>(
    () => [
      { field: "startTime", headerName: "Entry Date", width: 150, type: "date" },
      { field: "number", headerName: "Quote ID", flex: 1 },
      { field: "project", headerName: "Project Name", flex: 1 },
      { field: "quotedBy", headerName: "Quoted By", flex: 1 },
      { field: "requestedBy", headerName: "Requested By", flex: 1 },
      { field: "note", headerName: "Note" },
    ],
    []
  );
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <LineItemModal
        record="quote"
        recordId={selectedQuote?.id}
        open={lineItemModal}
        onClose={() => setLineItemModal(false)}
        mutateField="QuoteId"
        selectedLine={selectedLI}
      />
      <LineServiceModal
        record="quote"
        recordId={selectedQuote?.id}
        open={lineServiceModal}
        onClose={() => setLineServiceModal(false)}
        mutateField="QuoteId"
        selectedLine={selectedLS}
      />
      <Box
        display="grid"
        gridGap={10}
        gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}
        height={phone ? "" : "calc(100vh - 200px)"}
      >
        <EditForm selectedQuote={selectedQuote} />
        <BasePaper style={phone ? { height: "80vh" } : { height: "100%" }}>
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => setActiveTab(nv)}
            variant="scrollable"
            scrollButtons={phone ? "on" : "auto"}
            style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }}
          >
            <Tab label="Line Item" />
            <Tab label="Document" />
            <Tab label="Quote history" />
            <Tab label="Note" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && (
            <>
              <Button
                onClick={() => {
                  setSelectedLI(undefined);
                  setLineItemModal(true);
                }}
                className={classes.btn}
              >
                + Add Line Item
              </Button>
              <BaseDataGrid
                height=" calc(100% - 100px)"
                cols={LICols}
                rows={lineItems?.result || []}
                onRowSelected={(r) => {
                  setSelectedLI(r);
                  setLineItemModal(true);
                }}
              />
            </>
          )}
          {activeTab === 1 && <DocumentTab itemId={selectedQuote.id} model="quote" />}
          {activeTab === 2 && (
            <BaseDataGrid cols={quoteHistoryCols} rows={[]} onRowSelected={() => {}} height=" calc(100% - 57px)" />
          )}
          {activeTab === 3 && <NoteTab itemId={selectedQuote.id} model="quote" />}
          {activeTab === 4 && <div>Auditing</div>}
        </BasePaper>
      </Box>
    </>
  );
}
