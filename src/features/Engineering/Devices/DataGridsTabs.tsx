import React, { useMemo, useState } from "react";

import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import { IUnit } from "api/units";
import { IShipment } from "api/shipment";

import { LockButton, useLock } from "common/Lock";
import BaseDataGrid from "app/BaseDataGrid";
import Button from "app/Button";
import { formatTimestampToDate } from "logic/date";

import AuditTable from "common/Audit";
import DocumentTab from "common/Document/Tab";
import NotesTab from "common/Note/Tab";
import JobRecordsTable from "common/JobRecords/Table";

import ShipmentModal, { EditShipModal } from "features/Modals/ShipmentModal";

export default function DataGridsTabs({ unit }: { unit: IUnit }) {
  const { setLock } = useLock();
  const phone = useMediaQuery("(max-width:900px)");

  const [activeTab, setActiveTab] = useState(0);
  const [addShipModal, setAddShipModal] = useState(false);
  const [editShip, setEditShip] = useState(false);
  const [selectedShip, setSelectedShip] = useState<IShipment>();

  const { data: shipments } = useSWR(activeTab === 4 ? `/shipment?UnitId=${unit.id}` : null);

  const warCols = useMemo<GridColumns>(
    () => [
      { field: "date", headerName: "Date", type: "date", width: 120 },
      { field: "number", headerName: "Warranty Number", width: 160 },
      { field: "name", headerName: "Name", width: 160 },
      { field: "description", headerName: "Note", flex: 1 },
      { field: "term", headerName: "Term", flex: 1 },
      { field: "status", headerName: "Status", width: 150 },
    ],
    []
  );

  const shipCols = useMemo<GridColumns>(
    () => [
      { field: "targetDate", headerName: "Target Date", type: "date", width: 130 },
      { field: "shipDate", headerName: "Actual Date", width: 130 },
      { field: "shipmentNo", headerName: "Shipment No", width: 130 },
      { field: "carrier", headerName: "Carrier", flex: 1 },
      { field: "deliveryMethod", headerName: "Delivery Method", flex: 1 },
      { field: "trackingNumber", headerName: "Tracking Number", width: 150 },
    ],
    []
  );

  const fshCols = useMemo<GridColumns>(
    () => [
      { field: "Date", valueFormatter: (params) => formatTimestampToDate(params.row?.date), width: 120 },
      { field: "Ticket ID", valueFormatter: (params) => params.row?.number, width: 120 },
      { field: "Subject", valueFormatter: (params) => params.row?.subject, flex: 1 },
      { field: "Unit", valueFormatter: (params) => params.row?.UnitId?.number, width: 150 },
      { field: "Assigned To", valueFormatter: (params) => params.row?.assignee?.username, width: 120 },
      { field: "Contact", valueFormatter: (params) => params.row?.ContactId.lastName, width: 120 },
      { field: "Status", valueFormatter: (params) => params.row?.status, width: 120 },
    ],
    []
  );

  const SOICols = useMemo<GridColumns>(
    () => [
      { field: "Option Number", valueFormatter: (params) => params.row?.ItemId?.no, flex: 1 },
      { field: "Option Description", valueFormatter: (params) => params.row?.ItemId?.description, flex: 1 },
    ],
    []
  );

  return (
    <>
      {unit && unit.id && <ShipmentModal open={addShipModal} onClose={() => setAddShipModal(false)} unitId={unit.id} />}
      {unit && unit.id && selectedShip && (
        <EditShipModal open={editShip} onClose={() => setEditShip(false)} unitId={unit.id} init={selectedShip} />
      )}
      <Box display={"flex"} alignItems="center" mb={1}>
        <Tabs
          textColor="primary"
          value={activeTab}
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
        >
          <Tab label="Phocus Monitor" />
          <Tab label="Warranties" />
          <Tab label="Job" />
          <Tab label="Documents" />
          <Tab label="Shipment" />
          <Tab label="Quality Control" />
          <Tab label="Sales Order Items" />
          <Tab label="Field Service History" />
          <Tab label="Note" />
          <Tab label="Auditing" />
        </Tabs>
        <LockButton />
      </Box>
      {activeTab === 1 && (
        <Box>
          <BaseDataGrid cols={warCols} rows={[]} onRowSelected={(d) => {}} height="67.3vh" />
        </Box>
      )}
      {activeTab === 2 && <JobRecordsTable unit={unit} />}
      {activeTab === 3 && <DocumentTab itemId={unit.id} model="unit" />}
      {activeTab === 4 && (
        <>
          <Button
            onClick={() => {
              setAddShipModal(true);
            }}
            variant="outlined"
            style={{ marginBottom: "10px" }}
          >
            + Add Shipment
          </Button>
          <BaseDataGrid
            cols={shipCols}
            rows={shipments || []}
            onRowSelected={(v) => {
              setSelectedShip(v);
              setEditShip(true);
            }}
            height={"63.2vh"}
          />
        </>
      )}
      {activeTab === 6 && <BaseDataGrid cols={SOICols} rows={[]} onRowSelected={(r) => {}} height="67.3vh" />}
      {activeTab === 7 && <BaseDataGrid cols={fshCols} rows={[]} onRowSelected={(r) => {}} height="67.3vh" />}
      {activeTab === 8 && <NotesTab itemId={unit.id} model="unit" />}
      {activeTab === 9 && <AuditTable itemId={unit.id} />}
    </>
  );
}
