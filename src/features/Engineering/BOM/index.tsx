import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Details from "./Details";
import ClusterModal from "../../Cluster/Modal";

import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";
import Button from "app/Button";

import Confirm from "common/Confirm";

import { clusterType, deleteCluster } from "api/cluster";

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

  const handleDelete = () => {
    Confirm({
      onConfirm: async () => {
        try {
          if (selectedRow && selectedRow.id) {
            await deleteCluster(selectedRow.id);

            setSelectedRow(undefined);
            setActiveTab(0);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

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

          <Button kind="add" onClick={() => setClusterModal(true)} style={{ marginRight: 8 }}>
            Add Cluster
          </Button>
          {selectedRow && activeTab === 1 && (
            <Button kind="delete" onClick={handleDelete}>
              Delete Cluster
            </Button>
          )}
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
