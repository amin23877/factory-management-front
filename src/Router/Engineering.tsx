import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom";

import { LockProvider } from "common/Lock";
import { usePortal } from "logic/PortalContext";

import { Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import MyBackdrop from "app/Backdrop";
import { MyTabs, MyTab } from "app/Tabs";
import { camelCaseToRegular } from "logic/utils";

const DevicesPanel = React.lazy(() => import("features/Engineering/Devices"));
const Project = React.lazy(() => import("features/Engineering/Projects"));
const BOM = React.lazy(() => import("features/Engineering/BOM"));
const Monitoring = React.lazy(() => import("features/Engineering/Monitoring"));
const Dashboard = React.lazy(() => import("features/Engineering/Dashboard"));
const FRU = React.lazy(() => import("features/Engineering/FRU"));
const Option = React.lazy(() => import("features/Engineering/Option"));

const DeviceDetails = React.lazy(() => import("pages/DeviceDetails"));

export default function PanelRouter() {
  const portals = usePortal();
  const history = useHistory();
  const location = useLocation();

  const tabs = ["dashboard", "devices", "devicesBom", "monitoring", "projects", "fru", "option"];

  const [activeTab, setActiveTab] = useState(tabs.indexOf(location.pathname.split("/")[3]));
  const [tabText, setTabText] = useState(
    typeof location.pathname.split("/")[3] === "string" ? camelCaseToRegular(location.pathname.split("/")[3]) : ""
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (location.pathname.split("/")[3]) {
      setTabText(camelCaseToRegular(location.pathname.split("/")[3]));
      setActiveTab(tabs.indexOf(location.pathname.split("/")[3]));
    }
  }, [location]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <LockProvider>
      <Portal container={portals.topAppBar ? (portals.topAppBar as any).current : null}>
        <div
          onClick={handleClick}
          style={{
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: "20px",
            cursor: "pointer",
          }}
        >
          {tabText} {anchorEl ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MyTabs
            value={activeTab}
            textColor="primary"
            onChange={(e: any, nv) => {
              setActiveTab(nv);
              setTabText(e.target.textContent);
              history.push(tabs[nv]);
              handleClose();
            }}
            orientation="vertical"
          >
            <MyTab label="Dashboard" />
            <MyTab label="Devices" />
            <MyTab label="Devices BOM" />
            <MyTab label="Monitoring" />
            <MyTab label="Projects" />
            <MyTab label="FRU" />
            <MyTab label="Option" />
          </MyTabs>
        </Popover>
      </Portal>
      <Suspense fallback={<MyBackdrop />}>
        <Switch>
          <Route exact path="/panel/engineering">
            <Redirect to="/panel/engineering/devices" />
          </Route>
          <Route exact path="/panel/engineering/dashboard" component={Dashboard} />
          <Route exact path="/panel/engineering/devices" component={DevicesPanel} />
          <Route exact path="/panel/engineering/devicesBom" component={BOM} />
          <Route exact path="/panel/engineering/monitoring" component={Monitoring} />
          <Route exact path="/panel/engineering/projects" component={Project} />
          <Route exact path="/panel/engineering/fru" component={FRU} />
          <Route exact path="/panel/engineering/option" component={Option} />

          <Route exact path="/panel/engineering/:deviceId" component={DeviceDetails} />
        </Switch>
      </Suspense>
    </LockProvider>
  );
}