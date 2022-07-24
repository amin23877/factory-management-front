import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import BaseDataGrid from "app/BaseDataGrid";
import { BasePaper } from "app/Paper";

import EditForm from "./EditForm";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

import { IQuote } from "api/quote";
import { ILineItem } from "api/lineItem";
import LineItemModal from "../../LineItem";

import LineItems from "./LineItem";
import AuditTable from "common/Audit";

export default function EditTab({ selectedQuote }: { selectedQuote: IQuote }) {
  const phone = useMediaQuery("(max-width:900px)");

  const [activeTab, setActiveTab] = useState(0);
  const [lineItemModal, setLineItemModal] = useState(false);
  const [selectedLI, setSelectedLI] = useState<ILineItem>();

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
            <LineItems
              quote={selectedQuote}
              onAddLineItem={() => {
                setSelectedLI(undefined);
                setLineItemModal(true);
              }}
            />
          )}
          {activeTab === 1 && <DocumentTab itemId={selectedQuote.id} model="quote" />}
          {activeTab === 2 && (
            <BaseDataGrid cols={quoteHistoryCols} rows={[]} onRowSelected={() => {}} height=" calc(100% - 57px)" />
          )}
          {activeTab === 3 && <NoteTab itemId={selectedQuote.id} model="quote" />}
          {activeTab === 4 && <AuditTable itemId={selectedQuote.id} />}
        </BasePaper>
      </Box>
    </>
  );
}
