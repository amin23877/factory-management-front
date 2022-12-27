import React, { Suspense, useEffect, useState } from "react";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { Tabs, Tab, Box } from "@material-ui/core";

import UnitTable from "features/Production/Dashboard/UnitList/Table";
import UnitDetails from "pages/Production/Dashboard/Units/Details";
import ServiceTable from "features/Production/Dashboard/ServiceList/Table";
import TicketDetails from "pages/Production/Dashboard/services/Details";
import { BasePaper } from "app/Paper";

import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

function Index() {
  const history = useHistory();
  const location = useLocation();

  const tabs = ["units", "services", "details"];

  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/").length === 6 ? 2 : tabs.indexOf(location.pathname.split("/")[4])
  );

  useEffect(() => {
    if (location.pathname.split("/")[4]) {
      if (location.pathname.split("/").length === 6) {
        setActiveTab(2);
      } else {
        setActiveTab(tabs.indexOf(location.pathname.split("/")[4]));
      }
    }
  }, [location]);

  return (
    <BasePaper>
      <Box display="flex">
        <Tabs
          value={activeTab}
          onChange={(e, nv) => {
            setActiveTab(nv);
            history.push({
              pathname: "/panel/production/dashboard/" + tabs[nv],
              search: window.location.search,
            });
          }}
          textColor="primary"
          style={{ marginBottom: "10px" }}
        >
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> Unit List
              </span>
            }
            wrapped
          />
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> Service List
              </span>
            }
            wrapped
          />
          <Tab
            disabled={activeTab !== 2}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
              </span>
            }
          />
        </Tabs>
        <div style={{ flex: 1 }}></div>
      </Box>
      <Suspense fallback={<MyBackdrop />}>
        <Switch>
          <Route exact path="/panel/production/dashboard">
            <Redirect to="/panel/production/dashboard/units" />
          </Route>
          <Route exact path="/panel/production/dashboard/units">
            <UnitTable
              onRowSelected={(u) => {
                history.push(`/panel/production/dashboard/units/${u.id}${window.location.search}`);
              }}
            />
          </Route>
          <Route exact path="/panel/production/dashboard/services">
            <ServiceTable
              onRowSelected={(t) => {
                history.push(`/panel/production/dashboard/services/${t.id}${window.location.search}`);
              }}
            />
          </Route>
          <Route exact path="/panel/production/dashboard/units/:unitId">
            <UnitDetails />
          </Route>
          <Route exact path="/panel/production/dashboard/services/:serviceId">
            <TicketDetails />
          </Route>
        </Switch>
      </Suspense>
    </BasePaper>
  );
}

export default Index;
