import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Details from "./Details";
import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";

import { clusterType } from "api/cluster";

const columns = [
  { name: "createdAt", header: "Date", type: "date" },
  { name: "clusterValue", header: "Cluster Value" },
  { name: "deviceName", header: "Device Name" },
  { name: "description", header: "Description", flex: 1 },
];

function BOM() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRow, setSelectedRow] = useState<clusterType>();

  return (
    <BasePaper>
      <Box mb={1}>
        <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="primary">
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> List
              </span>
            }
            wrapped
          />
          <Tab
            disabled={!selectedRow}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
              </span>
            }
          />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <NewDataGrid
          url="/cluster"
          columns={columns}
          onRowSelected={(row) => {
            setSelectedRow(row);
            setActiveTab(1);
          }}
        />
      )}
      {activeTab === 1 && selectedRow && <Details selectedRow={selectedRow} />}
    </BasePaper>
  );
}

export default BOM;
