import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Details from "./Details";
import ClusterModal from "../../Cluster/Modal";

import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";

import { clusterType } from "api/cluster";

const columns = [
  { name: "clusterValue", header: "Cluster (Model)" },
  { name: "deviceName", header: "Device Name" },
  { name: "description", header: "Description", flex: 1 },
  { name: "createdAt", header: "Date", type: "date" },
];

function BOM() {
  const [activeTab, setActiveTab] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [selectedRow, setSelectedRow] = useState<clusterType>();
  const [clusterModal, setClusterModal] = useState(false);

  return (
    <>
      <ClusterModal
        open={clusterModal}
        onClose={() => setClusterModal(false)}
        onDone={() => setRefresh((p) => p + 1)}
      />
      <BasePaper>
        <Box mb={1} display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            textColor="primary"
            style={{ marginRight: "auto" }}
          >
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
            refresh={refresh}
            onRowSelected={(row) => {
              setSelectedRow(row);
              setActiveTab(1);
            }}
          />
        )}
        {activeTab === 1 && selectedRow && <Details selectedRow={selectedRow} />}
      </BasePaper>
    </>
  );
}

export default BOM;
