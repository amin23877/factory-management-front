import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box, useMediaQuery, makeStyles, LinearProgress } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import BaseDataGrid from "app/BaseDataGrid";
import { BasePaper } from "app/Paper";

import EditForm from "../../../features/Sales/Quote/EditForm";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

import { IQuote } from "api/quote";

import AuditTable from "common/Audit";
import { lineItemType } from "components/GroupLineItemTable/useGroupedLineItems";
import { openRequestedSinglePopup } from "logic/window";
import useSWR from "swr";
import { useHistory, useParams } from "react-router-dom";

export default function EditTab() {
  const phone = useMediaQuery("(max-width:900px)");
  const { quoteId } = useParams<{ quoteId: string }>();
  const { data: selectedQuote } = useSWR<IQuote>(quoteId ? `/quote/${quoteId}` : null);

  const [activeTab, setActiveTab] = useState(0);

  const { data: lineItems } = useSWR<{ result: lineItemType[]; total: number }>(
    quoteId && activeTab === 0 ? `/lineitem?QuoteId=${quoteId}` : null
  );
  const history = useHistory();

  const useStyle = makeStyles({
    root: {
      height: "100%",
      "& .white": {
        backgroundColor: "#ffffff",
      },
      "& .gray": {
        backgroundColor: "#e3e3e3",
      },
    },
  });
  const classes = useStyle();
  const groupColors = ["white", "gray"];

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
  const LICols = useMemo<GridColumns>(
    () => [
      { field: "group", headerName: "Group", width: 80 },
      { field: "line", headerName: "Sort", width: 70 },
      {
        field: "itemNo",
        headerName: "Part Number",
        valueFormatter: (r) => r.row?.ItemId?.no || r.row?.text || r?.row?.itemNo,
        width: 200,
      },
      {
        field: "description",
        headerName: "Description",
        valueFormatter: (r) => r.row?.ItemId?.description,
        width: 150,
      },
      { field: "qty", headerName: "QTY", width: 90 },
      { field: "price", headerName: "Price", width: 100 },
      { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
      {
        field: "total",
        headerName: "Total",
        valueFormatter: (r) => Number(r.row?.price) * Number(r.row?.qty),
        width: 80,
      },
      { field: "invoice", headerName: "Invoice", width: 100 },
    ],
    []
  );
  if (!selectedQuote) {
    return <LinearProgress />;
  }
  return (
    <>
      <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
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
            // <LineItems
            //   quote={selectedQuote}
            //   onAddLineItem={() => {
            //     setSelectedLI(undefined);
            //     setLineItemModal(true);
            //   }}
            // />
            <div className={classes.root}>
              <BaseDataGrid
                cols={LICols}
                rows={lineItems?.result || []}
                getRowClassName={({ row }) => {
                  const index = row.group ? row.group % groupColors.length : null;
                  return index ? groupColors[index] : "";
                }}
                onRowSelected={(r) => {
                  if (phone && (r.ServiceId || r.ItemId)) {
                    history.push(r.ServiceId ? `/panel/service/${r.ServiceId}` : `/panel/engineering/${r?.ItemId?.id}`);
                  } else if (!phone && (r.ServiceId || r.ItemId)) {
                    openRequestedSinglePopup({
                      url: r.ServiceId ? `/panel/service/${r.ServiceId}` : `/panel/engineering/${r?.ItemId?.id}`,
                    });
                  }
                }}
                height="calc(100% - 60px)"
              />
            </div>
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
