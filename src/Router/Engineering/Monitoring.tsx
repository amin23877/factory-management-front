import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import DataGrid from "app/NewDataGrid";
import Details from "pages/Engineering/Monitoring/Details";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { BasePaper } from "app/Paper";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

const Monitoring = () => {
  const history = useHistory();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const gridColumns = useMemo(
    () => [
      { name: "id", header: "Rule ID", minWidth: 150 },
      {
        name: "date",
        header: "Date",
        minWidth: 110,
        type: "date",
      },
      { name: "name", header: "Name", minWidth: 150 },
      { name: "description", header: "Description", minWidth: 150, flex: 1 },
      { name: "section", header: "Section", minWidth: 110 },
      {
        name: "engAP",
        header: "Eng.A.",
        type: "boolean",
      },
      { name: "enable", header: "Enable", type: "boolean" },
    ],
    []
  );

  return (
    <BasePaper>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => {
            setActiveTab(nv);
            history.push({
              pathname: "/panel/engineering/monitoring",
              search: window.location.search,
            });
          }}
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
        <div style={{ flexGrow: 1 }} />
      </Box>
      <Box display="flex" alignItems="flex-start">
        <Box flex={11}>
          <Suspense fallback={<MyBackdrop />}>
            <Switch>
              <Route exact path="/panel/engineering/monitoring">
                <DataGrid
                  setUrlFilters
                  url="/monitor"
                  columns={gridColumns}
                  onRowSelected={(d) => {
                    history.push(`/panel/engineering/monitoring/${d.id}${window.location.search}`);
                  }}
                />
              </Route>
              <Route exact path="/panel/engineering/monitoring/:monitorId">
                <Details />
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </Box>
    </BasePaper>
  );
};

export default Monitoring;
