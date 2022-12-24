import React, { useMemo, useState } from "react";
import { Tabs, Tab, makeStyles, useMediaQuery, Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import BaseDataGrid from "app/BaseDataGrid";
import NewDataGrid from "app/NewDataGrid";
import { BasePaper } from "app/Paper";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

import { IQuote } from "api/quote";

import AuditTable from "common/Audit";
import { lineItemType } from "components/GroupLineItemTable/useGroupedLineItems";
import { openRequestedSinglePopup } from "logic/window";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { LockButton, useLock } from "common/Lock";
export default function DataGridTabs({ selectedQuote }: { selectedQuote: IQuote }) {
  const [activeTab, setActiveTab] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");
  const { setLock } = useLock();
  const { data: lineItems } = useSWR<{ result: lineItemType[]; total: number }>(
    selectedQuote.id && activeTab === 0 ? `/lineitem?QuoteId=${selectedQuote.id}` : null
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

  const quoteHistoryCols = useMemo(
    () => [
      { name: "startTime", header: "Entry Date", width: 150, type: "date" },
      { name: "number", header: "Quote ID", flex: 1 },
      { name: "project", header: "Project Name", flex: 1 },
      { name: "quotedBy", header: "Quoted By", flex: 1 },
      { name: "requestedBy", header: "Requested By", flex: 1 },
      { name: "note", header: "Note" },
    ],
    []
  );
  const LICols = useMemo(
    () => [
      { name: "group", header: "Group", width: 80 },
      { name: "line", header: "Sort", width: 70 },
      {
        name: "itemNo",
        header: "Part Number",
        render: ({ data }: any) => data?.ItemId?.no || data?.text || data?.itemNo,
        // valueFormatter: (r) => r.row?.ItemId?.no || r.row?.text || r?.row?.itemNo,
        width: 200,
      },
      {
        name: "description",
        header: "Description",
        render: ({ data }: any) => data?.description,
        // valueFormatter: (r) => r.row?.ItemId?.description,
        width: 150,
      },
      { name: "qty", header: "QTY", width: 90 },
      { name: "price", header: "Price", width: 100 },
      { name: "tax", header: "Tax", type: "boolean", width: 80 },
      {
        name: "total",
        header: "Total",
        render: ({ data }: any) => Number(data?.price) * Number(data?.qty),
        // valueFormatter: (r) => Number(r.row?.price) * Number(r.row?.qty),
        width: 80,
      },
      { name: "invoice", header: "Invoice", width: 100 },
    ],
    []
  );

  return (
    <BasePaper style={phone ? { height: "80vh" } : { height: "100%" }}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
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
        <LockButton />
      </Box>
      {activeTab === 0 && (
        // <LineItems
        //   quote={selectedQuote}
        //   onAddLineItem={() => {
        //     setSelectedLI(undefined);
        //     setLineItemModal(true);
        //   }}
        // />
        <div className={classes.root}>
          {/* <BaseDataGrid
            cols={LICols}
            rows={lineItems?.result || []}
            getRowClassName={({ row }) => {
              const index = row.group ? row.group % groupColors.length : null;
              return index ? groupColors[index] : "";
            }}
            onRowSelected={(r) => {
              if (phone && (r.ServiceId || r.ItemId)) {
                history.push(
                  r.ServiceId
                    ? `/panel/fieldservice/services/${r.ServiceId}`
                    : `/panel/engineering/device/devices/${r?.ItemId?.id}`
                );
              } else if (!phone && (r.ServiceId || r.ItemId)) {
                openRequestedSinglePopup({
                  url: r.ServiceId
                    ? `/panel/fieldservice/services/${r.ServiceId}`
                    : `/panel/engineering/device/devices/${r?.ItemId?.id}`,
                });
              }
            }}
            height="calc(100% - 60px)"
          /> */}
          <NewDataGrid
            columns={LICols}
            url={`/lineitem?QuoteId=${selectedQuote.id}`}
            onRowSelected={(r) => {
              if (phone && (r.ServiceId || r.ItemId)) {
                history.push(
                  r.ServiceId
                    ? `/panel/fieldservice/services/${r.ServiceId}`
                    : `/panel/engineering/device/devices/${r?.ItemId?.id}`
                );
              } else if (!phone && (r.ServiceId || r.ItemId)) {
                openRequestedSinglePopup({
                  url: r.ServiceId
                    ? `/panel/fieldservice/services/${r.ServiceId}`
                    : `/panel/engineering/device/devices/${r?.ItemId?.id}`,
                });
              }
            }}
          />
        </div>
      )}
      {activeTab === 1 && <DocumentTab itemId={selectedQuote.id} model="quote" />}
      {activeTab === 2 && (
        // <BaseDataGrid cols={quoteHistoryCols} rows={[]} onRowSelected={() => {}} height=" calc(100% - 57px)" />
        <NewDataGrid
          columns={quoteHistoryCols}
          url={``}
          onRowSelected={() => {}}
          style={{ height: "calc(100% - 57px)" }}
        />
      )}
      {activeTab === 3 && <NoteTab itemId={selectedQuote.id} model="quote" />}
      {activeTab === 4 && <AuditTable itemId={selectedQuote.id} />}
    </BasePaper>
  );
}
