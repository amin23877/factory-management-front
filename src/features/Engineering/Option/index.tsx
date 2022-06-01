import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import { BasePaper } from "app/Paper";

import { formatTimestampToDate } from "logic/date";
import DataGrid from "app/NewDataGrid";

import UnitDetails from "../../FieldService/Units/Details";
import DeviceDetails from "features/Engineering/Devices/Details";
import { IUnit } from "api/units";

export default function Options() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUnitFru, setSelectedUnitFru] = useState<IUnit>();
  const [selectedItemFru, setSelectedItemFru] = useState<any>();

  const optionDevicesColumns = useMemo(
    () => [
      { name: "no", header: "Number", minWidth: 100 },
      { name: "name", header: "Name", minWidth: 180 },
      { name: "description", header: "Description", minWidth: 200 },
      {
        name: "salesApproved",
        header: "Sales Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "engineeringApproved",
        header: "Eng. Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "shippingApproved",
        header: "Ship Ap.",
        type: "boolean",
        defaultWidth: 100,
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

  const optionUnitsColumns = [
    {
      name: "number",
      header: "Option Number",
      minWidth: 150,
      // render: ({ data }: any) => data?.item?.no,
    },
    {
      name: "name",
      header: "Option Name",
      minWidth: 200,
      //  render: ({ data }: any) => data?.item?.name
    },
    {
      name: "description",
      header: "Option Description",
      flex: 1,
      render: ({ data }: any) => data?.item?.description,
    },
    {
      name: "Lead Time",
      render: ({ data }: any) => formatTimestampToDate(data?.so?.leadTime),
      minWidth: 120,
    },

    { name: "price", header: "Price", minWidth: 110, render: ({ data }: any) => data?.so?.price },
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
            columns={optionDevicesColumns}
            initParams={{ option: true }}
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
            initParams={{ option: true }}
            columns={optionUnitsColumns}
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
