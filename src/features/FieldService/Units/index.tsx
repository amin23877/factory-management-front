import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import DataGrid from "app/NewDataGrid";
import { BasePaper } from "app/Paper";
import Details from "./Details";

import { formatTimestampToDate } from "logic/date";
import { LockProvider } from "common/Lock";

export default function Unit() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<any>();

  const cols = [
    {
      name: "number",
      header: "Device Id",
      minWidth: 120,
    },
    {
      name: "Device",
      header: "Device",
      flex: 1,
      minWidth: 120,
      render: ({ data }: any) => data?.ItemId?.no,
    },
    {
      name: "EST.S.D",
      render: ({ data }: any) => formatTimestampToDate(data?.SOId?.estimatedShipDate),
      minWidth: 120,
    },
    {
      name: "Act.S.D.",
      render: ({ data }: any) => formatTimestampToDate(data?.SOId?.actualShipDate),
      minWidth: 120,
    },
    { name: "status", header: "Status", minWidth: 100 },
    { name: "warrantyStatus", header: "Warranty Status", minWidth: 150 },
    { name: "warrantyEndDate", header: "Warranty End Date", minWidth: 150 },
    {
      name: "SO NO.",
      header: "SO NO.",
      minWidth: 90,
      render: ({ data }: any) => data?.SOId?.number,
    },
    {
      name: "SO Date",
      header: "SO Date",
      minWidth: 100,
      render: ({ data }: any) => formatTimestampToDate(data?.SOId?.date),
    },
  ];

  return (
    <LockProvider>
      <BasePaper style={{ height: "100%" }}>
        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: 10 }}>
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
              </span>
            }
            wrapped
          />
          <Tab
            disabled={!selectedUnit}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
              </span>
            }
          />
        </Tabs>
        {activeTab === 0 && (
          <DataGrid
            url="/unit"
            initParams={{ device: true }}
            columns={cols}
            onRowSelected={(d) => {
              setSelectedUnit(d);
              setActiveTab(1);
            }}
          />
        )}
        {activeTab === 1 && selectedUnit && <Details unit={selectedUnit} />}
      </BasePaper>
    </LockProvider>
  );
}
