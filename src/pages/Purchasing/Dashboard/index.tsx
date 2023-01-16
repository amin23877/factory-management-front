import React, { useState } from "react";
import { Box, IconButton, ListItem, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";

import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";
import List from "app/SideUtilityList";
import RequiredPOModal from "../../../features/Purchase/Dashboard/RequiredPOModal";
import { formatTimestampToDate } from "logic/date";

const requiredCols = [
  {
    header: "Id",
    maxWidth: 50,
    render: ({ rowIndex }: any) => (
      <Tooltip title={rowIndex + 1}>
        <span>{rowIndex + 1}</span>
      </Tooltip>
    ),
  },
  { header: "Related SO", width: 120, render: ({ data }: any) => data?.SOId?.number },
  { header: "Related Unit", width: 120, render: ({ data }: any) => data?.UnitId?.number },
  { header: "Item NO.", type: "string", width: 120, render: ({ data }: any) => data?.ItemId?.no },
  {
    header: "Item Name",
    type: "string",
    width: 120,
    render: ({ data }: any) => (
      <Tooltip title={data?.ItemId?.name}>
        <span>{data?.ItemId?.name}</span>
      </Tooltip>
    ),
    defaultFlex: 1,
  },
  { name: "qty", header: "QTY", width: 80, type: "number" },
  { name: "expectedDate", header: "Expected Date", width: 120, type: "date" },
  { name: "type", header: "Type", width: 120 },
];

const receivedCols = [
  { header: "Item NO.", type: "string", width: 120, render: ({ data }: any) => data?.ItemId?.no },
  {
    header: "Item Name",
    type: "string",
    width: 120,
    render: ({ data }: any) => (
      <Tooltip title={data?.ItemId?.name}>
        <span>{data?.ItemId?.name}</span>
      </Tooltip>
    ),
    defaultFlex: 1,
  },
  { header: "Related Unit", width: 120, render: ({ data }: any) => data?.UnitId?.number },
  {
    header: "Ordered QTY",
    width: 120,
    render: ({ data }: any) => data?.POLineItemId?.orderedQuantity,
  },
  {
    header: "Received QTY",
    width: 120,
    render: ({ data }: any) => data?.POLineItemId?.receivedQuantity,
  },
  {
    header: "Expected Date",
    width: 120,
    render: ({ data }: any) => formatTimestampToDate(data?.POLineItemId?.dateExpected),
  },
];
const preferredCols = [
  { header: "Item NO.", type: "string", width: 120, render: ({ data }: any) => data?.ItemId?.no },
  {
    header: "Item Name",
    type: "string",
    width: 120,
    render: ({ data }: any) => (
      <Tooltip title={data?.ItemId?.name}>
        <span>{data?.ItemId?.name}</span>
      </Tooltip>
    ),
    defaultFlex: 1,
  },
  {
    name: "receiveCount",
    header: "Received QTY",
    width: 120,
    type: "number",
  },
  {
    name: "preferredCount",
    header: "Preferred QTY",
    width: 120,
    type: "number",
  },
  {
    header: "Non-Preferred QTY",
    width: 120,
    render: ({ data }: any) => data?.receiveCount - data?.preferredCount,
  },
];

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [addRPO, setAddRPO] = useState(false);
  const [editRPO, setEditRPO] = useState(false);
  const [selectedRPO, setSelectedRPO] = useState();

  return (
    <BasePaper>
      <RequiredPOModal setRefresh={setRefresh} open={addRPO} onClose={() => setAddRPO(false)} />
      {selectedRPO && (
        <RequiredPOModal
          setRefresh={setRefresh}
          open={editRPO}
          onClose={() => setEditRPO(false)}
          selectedRPO={selectedRPO}
        />
      )}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
        <Tabs textColor="primary" value={tab} onChange={(e, nv) => setTab(nv)}>
          <Tab label="Purchasing Required List" />
          <Tab label="Fulfillment List" />
          <Tab label="Purchase Analysis" />
        </Tabs>
        <div style={{ flexGrow: 1 }} />
        <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
          <ListItem>
            <IconButton
              title="Add Required PO"
              onClick={() => {
                setAddRPO(true);
              }}
            >
              <AddRounded />
            </IconButton>
          </ListItem>
        </List>
      </Box>

      {tab === 0 && (
        <NewDataGrid
          columns={requiredCols}
          url="/requiredPo"
          onRowSelected={(d) => {
            setSelectedRPO(d);
            setEditRPO(true);
          }}
          refresh={refresh}
          initParams={
            {
              // used: false,
            }
          }
        />
      )}
      {tab === 1 && <NewDataGrid columns={receivedCols} url="/receive" onRowSelected={() => {}} notFilterable />}
      {tab === 2 && <NewDataGrid columns={preferredCols} url="/receive/preferred/item" onRowSelected={() => {}} />}
    </BasePaper>
  );
}
