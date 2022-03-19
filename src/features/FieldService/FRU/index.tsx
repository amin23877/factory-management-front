import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import { BasePaper } from "../../../app/Paper";

import { formatTimestampToDate } from "../../../logic/date";
import DataGrid from "../../../app/NewDataGrid";

import UnitDetails from "../Units/Details";
import DeviceDetails from "../../../features/Engineering/Devices/Details";
import { IUnit } from "../../../api/units";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

export default function FRU() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUnitFru, setSelectedUnitFru] = useState<IUnit>();
  const [selectedItemFru, setSelectedItemFru] = useState<any>();

  const fruDevicesColumns = useMemo(
    () => [
      { name: "no", header: "Number", minWidth: 100 },
      { name: "name", header: "Name", minWidth: 180 },
      { name: "description", header: "Description", minWidth: 200 },
      {
        name: "salesApproved",
        header: "Sales Ap.",
        type: "boolean",
      },
      {
        name: "engineeringApproved",
        header: "Eng. Ap.",
        type: "boolean",
      },
      {
        name: "shippingApproved",
        header: "Ship Ap.",
        type: "boolean",
      },
      {
        name: "prefVendor",
        header: "Preferred Vendor",
        render: ({ data }: any) => data?.prefVendor?.name,
        minWidth: 150,
      },
      { name: "vendorPartNumber", header: "V.Part NO.", minWidth: 100 },
      { name: "cost", header: "Cost", minWidth: 80, type: "number" },
      { name: "location", header: "Location", minWidth: 100 },
      { name: "qtyOnHand", header: "QOH.", minWidth: 80, type: "number" },
      { name: "qtyRemain", header: " Remain", minWidth: 80, type: "number" },
      { name: "qtyOnOrder", header: "on Order", minWidth: 80, type: "number" },
      { name: "qtyAllocated", header: "Allocated", minWidth: 80, type: "number" },
      { name: "usedInLastQuarter", header: "Used 90", minWidth: 80, type: "number" },
      { name: "fifo", header: "FIFO Val.", minWidth: 80, type: "number" },
      {
        name: "qohVal",
        header: "QOH Val.",
        minWidth: 80,
        render: ({ data }: any) => data?.cost * data?.qtyOnHand,
        type: "number",
      },
      { name: "uom", header: "UOM", minWidth: 100 },
      {
        name: "obsolete",
        header: "Obsolete",
        type: "boolean",
      },
      {
        name: "nonInventoryItem",
        header: "NON Inv.",
        type: "boolean",
      },
      {
        name: "rndOnly",
        header: "R&D",
        type: "boolean",
      },
    ],
    []
  );

  const callCols = [
    {
      name: "number",
      header: "FRU Number",
      minWidth: 150,
      render: ({ data }: any) => data?.ItemId?.no,
    },
    { name: "name", header: "FRU Name", minWidth: 200, render: ({ data }: any) => data?.ItemId?.name },
    {
      name: "description",
      header: "FRU Description",
      flex: 1,
      render: ({ data }: any) => data?.ItemId?.description,
    },
    {
      name: "Lead Time",
      render: ({ data }: any) => formatTimestampToDate(data?.ItemId?.lead),
      minWidth: 120,
    },

    { name: "price", header: "Price", minWidth: 110, render: ({ data }: any) => data?.LineItemRecordId?.price },
  ];

  return (
    <Box display="flex" height="100%">
      <BasePaper style={{ flex: 1 }}>
        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: 10 }}>
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> Devices
              </span>
            }
            wrapped
          />
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> Units
              </span>
            }
            wrapped
          />
          <Tab
            disabled={!selectedUnitFru && !selectedItemFru}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
              </span>
            }
          />
        </Tabs>
        {activeTab === 0 && (
          <DataGrid
            url="/item"
            columns={fruDevicesColumns}
            initParams={{ device: true, "containProduct Family": "FRU" }}
            onRowSelected={(d) => {
              setSelectedUnitFru(undefined);
              setSelectedItemFru(d);
              setActiveTab(2);
            }}
          />
        )}
        {activeTab === 1 && (
          <DataGrid
            url="/unit"
            initParams={{ fru: true }}
            columns={callCols}
            onRowSelected={(d) => {
              setSelectedItemFru(undefined);
              setSelectedUnitFru(d);
              setActiveTab(2);
            }}
          />
        )}
        {activeTab === 2 && selectedUnitFru && <UnitDetails unit={selectedUnitFru} />}
        {activeTab === 2 && selectedItemFru && (
          <DeviceDetails
            sales={true}
            onDone={() => {}}
            selectedRow={selectedItemFru}
            onStepSelected={(d) => {}}
            onFlagSelected={(d) => {}}
          />
        )}
      </BasePaper>
    </Box>
  );
}
