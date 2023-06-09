import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box, makeStyles, LinearProgress } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../app/BaseDataGrid";
import Button from "../app/Button";
import { useParams } from "react-router-dom";

import EditForm from "../features/Sales/Quote/EditForm";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

import { IQuote } from "../api/quote";
import { ILineItem } from "../api/lineItem";
import { ILineService } from "../api/lineService";
import LineItemModal from "../features/LineItem";
import LineServiceModal from "../features/LineService";

const useStyle = makeStyles({
  btn: {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "3px 0px 10px 5px ",
  },
});

export default function EditTab() {
  const { quoteNumber } = useParams<{ quoteNumber: string }>();
  const { data: selectedQuote } = useSWR<IQuote>(quoteNumber ? `/quote/${quoteNumber}` : null);

  const classes = useStyle();
  const [activeTab, setActiveTab] = useState(0);

  const [lineItemModal, setLineItemModal] = useState(false);
  const [lineServiceModal, setLineServiceModal] = useState(false);

  const [selectedLI, setSelectedLI] = useState<ILineItem>();
  const [selectedLS, setSelectedLS] = useState<ILineService>();

  const { data: lineItems } = useSWR<ILineItem[]>(
    activeTab === 0 && selectedQuote ? `/lineitem?QuoteId=${selectedQuote.id}` : null
  );
  const { data: lineServices } = useSWR<ILineService[]>(
    activeTab === 1 && selectedQuote ? `/lineservice?QuoteId=${selectedQuote.id}` : null
  );
  const LICols = useMemo<GridColumns>(
    () => [
      { field: "index", headerName: "Sort" },
      { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row?.ItemId?.name, width: 200 },
      { field: "description", headerName: "Description", flex: 1 },
      { field: "quantity", headerName: "QTY", width: 90 },
      { field: "price", headerName: "Price", width: 100 },
      { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
      { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row?.quantity, width: 200 },
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
  if (!selectedQuote) {
    return <LinearProgress />;
  }
  return (
    <Box>
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

      <EditForm selectedQuote={selectedQuote} />
      <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
        <Tab label="Line Item" />
        <Tab label="Line Services" />
        <Tab label="Document" />
        <Tab label="Quote history" />
        <Tab label="Note" />
        <Tab label="Auditing" />
      </Tabs>
      <Box p={2}>
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
              cols={LICols}
              rows={lineItems || []}
              onRowSelected={(r) => {
                setSelectedLI(r);
                setLineItemModal(true);
              }}
              height={300}
            />
          </>
        )}
        {activeTab === 1 && (
          <>
            <Button
              onClick={() => {
                setSelectedLS(undefined);
                setLineServiceModal(true);
              }}
              className={classes.btn}
            >
              + Add Line Service
            </Button>
            <BaseDataGrid
              cols={LSCols}
              rows={lineServices || []}
              onRowSelected={(r) => {
                setSelectedLS(r);
                setLineServiceModal(true);
              }}
              height={300}
            />
          </>
        )}
        {activeTab === 2 && <DocumentTab itemId={selectedQuote.id} model="quote" />}
        {activeTab === 3 && <BaseDataGrid cols={quoteHistoryCols} rows={[]} onRowSelected={() => {}} height={300} />}
        {activeTab === 4 && <NoteTab itemId={selectedQuote.id} model="quote" />}
        {activeTab === 5 && <div>Auditing</div>}
      </Box>
    </Box>
  );
}
