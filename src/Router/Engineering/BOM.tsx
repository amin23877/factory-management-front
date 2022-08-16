import React, { Suspense, useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Details from "../../pages/Engineering/BOM/Details";
import ClusterModal from "../../features/Cluster/Modal";

import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";

import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

const columns = [
  { name: "clusterValue", header: "Cluster (Model)" },
  { name: "deviceName", header: "Device Name" },
  { name: "description", header: "Description", flex: 1 },
  { name: "createdAt", header: "Date", type: "date" },
];

function BOM() {
  const history = useHistory();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  const [refresh, setRefresh] = useState(0);
  const [clusterModal, setClusterModal] = useState(false);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

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
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/engineering/devicesBom",
                search: window.location.search,
              });
            }}
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
              disabled={activeTab !== 1}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                </span>
              }
            />
          </Tabs>
        </Box>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path="/panel/engineering/devicesBom">
              <NewDataGrid
                url="/cluster"
                columns={columns}
                refresh={refresh}
                onRowSelected={(d) => {
                  history.push(`/panel/engineering/devicesBom/${d.id}${window.location.search}`);
                }}
              />
            </Route>
            <Route exact path="/panel/engineering/devicesBom/:clusterId">
              <Details />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </>
  );
}

export default BOM;
