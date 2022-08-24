import React, { useState } from "react";
import { Box, IconButton, ListItem, Tab, Tabs } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";

import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";
import List from "app/SideUtilityList";
import AddRequiredPOModal from "./AddRequiredPOModal";

const cols = [
  { name: "so", header: "SO NO.", width: 120 },
  { name: "unit", header: "Unit NO.", width: 120 },
  { name: "itemNo", header: "Item NO.", type: "string", width: 120, render: ({ data }: any) => data?.data?.no },
  { name: "type", header: "Type", width: 120 },
  { name: "expectedDate", header: "Expected Date", width: 120, type: "date" },
];

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [addRPO, setAddRPO] = useState(false);

  return (
    <BasePaper>
      <AddRequiredPOModal setRefresh={setRefresh} open={addRPO} onClose={() => setAddRPO(false)} />
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
        <Tabs textColor="primary" value={tab} onChange={(e, nv) => setTab(nv)}>
          <Tab label="Purchasing Required List" />
          <Tab label="Fulfillment List" />
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

      {tab === 0 && <NewDataGrid columns={cols} url="/requiredPo" onRowSelected={() => {}} refresh={refresh} />}
      {/* {activeTab === 1 && (
        <NewDataGrid columns={cols} url="/" onRowSelected={() => {}} />
      )} */}
    </BasePaper>
  );
}
