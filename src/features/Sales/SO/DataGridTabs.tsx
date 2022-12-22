import React, { useMemo, useState } from "react";
import { Box, useMediaQuery, makeStyles, Tooltip } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useSWR from "swr";
import { useHistory } from "react-router";

import BaseDataGrid from "app/BaseDataGrid";
import NewDataGrid from "app/NewDataGrid";
import { BasePaper } from "app/Paper";

import { ISO } from "api/so";

import { formatTimestampToDate } from "logic/date";
import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

import { openRequestedSinglePopup } from "logic/window";
import { lineItemType } from "components/GroupLineItemTable/useGroupedLineItems";
import AuditTable from "common/Audit";
import { LockButton, useLock } from "common/Lock";

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

const groupColors = ["white", "gray"];

export default function DataGridTabs({
  selectedSo,
  onLineServiceSelected,
}: {
  selectedSo: ISO;
  onLineServiceSelected: (a: any) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyle();
  const history = useHistory();
  const { setLock } = useLock();
  const phone = useMediaQuery("(max-width:900px)");

  const { data: lineItems } = useSWR<{ result: lineItemType[]; total: number }>(
    selectedSo && selectedSo.id && activeTab === 0 ? `/lineitem?SOId=${selectedSo.id}` : null
  );

  const { data: units } = useSWR(selectedSo && selectedSo.id && activeTab === 1 ? `/unit?SOId=${selectedSo.id}` : null);

  const { data: documents } = useSWR(
    selectedSo && selectedSo.id && activeTab === 2 ? `/document/so/${selectedSo.id}` : null
  );

  const LICols = useMemo(
    () => [
      { name: "group", header: "Group", width: 80 },
      { name: "line", header: "Sort", width: 70 },
      {
        name: "itemNo",
        header: "Part Number",
        render: (r: any) => (
          <Tooltip title={r?.data?.ItemId?.no || r.row?.text || r?.row?.itemNo}>
            <span>{r?.data?.ItemId?.no || r.row?.text || r?.row?.itemNo}</span>
          </Tooltip>
        ),
        width: 200,
      },
      {
        name: "description",
        header: "Description",
        render: (r: any) => (
          <Tooltip title={r.row?.ItemId?.description}>
            <span>{r.row?.ItemId?.description}</span>
          </Tooltip>
        ),
        width: 150,
      },
      { name: "qty", header: "QTY", width: 90 },
      { name: "price", header: "Price", width: 100 },
      { name: "tax", header: "Tax", type: "boolean", width: 80 },
      {
        name: "total",
        header: "Total",
        render: (r: any) => (
          <Tooltip title={Number(r.data?.price) * Number(r.data?.qty)}>
            <span>{Number(r.data?.price) * Number(r.data?.qty)}</span>
          </Tooltip>
        ),
        width: 80,
      },
      { name: "invoice", header: "Invoice", width: 100 },
    ],
    []
  );

  const unitCols = useMemo(
    () => [
      { name: "number", header: "Unit ID", width: 100 },
      {
        name: "number",
        header: "Unit Serial No.",
        width: 130,
      },
      { name: "description", header: "Description", flex: 1 },
      { name: "model", header: "Model", width: 120 },
      {
        name: "shipDate",
        header: "Estimated SD.",
        width: 150,
        render: (r: any) => {
          // valueFormatter: (params) => formatTimestampToDate(params.row?.SOId?.estimatedShipDate),
          const date = r?.data?.so.find(() => true);
          return formatTimestampToDate(date?.estimatedShipDate);
        },
      },
    ],
    []
  );

  const FSCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        width: 120,
      },
      { field: "number", headerName: "Ticket ID", width: 130 },
      { field: "subject", headerName: "Subject", flex: 1 },
      {
        field: "unit",
        headerName: "Unit",
        valueFormatter: (params) => params.row?.unit?.number,
        width: 120,
      },
      { field: "AssignedTo", headerName: "Assigned To", width: 120 },
      { field: "contact", headerName: "Contact", width: 120 },
      { field: "status", headerName: "Status", width: 120 },
    ],
    []
  );

  const activityCols = useMemo<GridColumns>(
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

  const shipCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Target Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        flex: 1,
      },
      {
        field: "actualDate",
        headerName: "Actual Date",
        flex: 1,
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
      },
      { field: "number", headerName: "Shipment No.", flex: 2 },
      {
        field: "carrier",
        headerName: "Carrier",
        flex: 1,
      },
      { field: "deliveryMethod", headerName: "Delivery Method", flex: 1 },
      { field: "trackingNumber", headerName: "Tracking No.", flex: 1 },
    ],
    []
  );

  return (
    <BasePaper style={{ paddingTop: "0px" }}>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Tabs
          style={!phone ? { marginBottom: "10px" } : { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" }}
          textColor="primary"
          value={activeTab}
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
          variant="scrollable"
        >
          <Tab label="Line Items" />
          <Tab label="Units" />
          <Tab label="Documents" />
          <Tab label="Activities" />
          <Tab label="Shipment" />
          <Tab label="Field Services" />
          <Tab label="Notes" />
          <Tab label="Auditing" />
        </Tabs>
        <LockButton />
      </Box>
      {activeTab === 0 && (
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
            url={`/lineitem?SOId=${selectedSo.id}`}
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
      {activeTab === 1 && (
        // <BaseDataGrid
        //   cols={unitCols}
        //   rows={units?.result || []}
        //   onRowSelected={(r) => {
        //     phone
        //       ? history.push(`/panel/production/dashboard/units/${r.id}`)
        //       : openRequestedSinglePopup({ url: `/panel/production/dashboard/units/${r.id}` });
        //   }}
        //   height="calc(100% - 60px)"
        // />
        <NewDataGrid
          columns={unitCols}
          url={`/unit?SOId=${selectedSo.id}`}
          onRowSelected={(r) => {
            phone
              ? history.push(`/panel/production/dashboard/units/${r.id}`)
              : openRequestedSinglePopup({ url: `/panel/production/dashboard/units/${r.id}` });
          }}
          style={{ height: "calc(100% - 60px)" }}
        />
      )}
      {activeTab === 2 && <DocumentTab itemId={selectedSo.id} model="so" />}
      {activeTab === 3 && (
        <BaseDataGrid cols={activityCols} rows={documents || []} onRowSelected={() => {}} height="calc(100% - 60px)" />
      )}
      {activeTab === 4 && (
        <BaseDataGrid cols={shipCols} rows={[]} onRowSelected={() => {}} height="calc(100% - 60px)" />
      )}
      {activeTab === 5 && (
        <BaseDataGrid cols={FSCols} rows={[]} onRowSelected={onLineServiceSelected} height="calc(100% - 60px)" />
      )}
      {activeTab === 6 && <NoteTab itemId={selectedSo.id} model="so" />}
      {activeTab === 7 && <AuditTable itemId={selectedSo.id} />}
    </BasePaper>
  );
}
