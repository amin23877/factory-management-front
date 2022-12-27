import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom";

import { LockProvider } from "common/Lock";
import { usePortal } from "logic/PortalContext";

import { Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import MyBackdrop from "app/Backdrop";
import { MyTabs, MyTab } from "app/Tabs";
import { camelCaseToRegular } from "logic/utils";

const Options = React.lazy(() => import("Router/Engineering/Options"));
const FRUs = React.lazy(() => import("Router/Engineering/FRU"));
const ServiceIndex = React.lazy(() => import("Router/Servicing/Services"));
const Tickets = React.lazy(() => import("Router/Servicing/Tickets"));
const Tasks = React.lazy(() => import("features/FieldService/Tasks"));
const Units = React.lazy(() => import("Router/Servicing/Units"));
const UP = React.lazy(() => import("features/FieldService/UP"));
const Vendors = React.lazy(() => import("Router/Purchasing/Vendors"));
const Config = React.lazy(() => import("pages/Config"));

export default function PanelRouter() {
  const portals = usePortal();
  const history = useHistory();
  const location = useLocation();

  const tabs = ["dashboard", "fru", "services", "tickets", "tasks", "units", "rma", "up", "vendor", "option", "config"];

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
              history.push("/panel/fieldservice/" + tabs[nv]);
              handleClose();
            }}
            orientation="vertical"
          >
            <MyTab label="Dashboard" />
            <MyTab label="FRU" />
            <MyTab label="Services" />
            <MyTab label="Tickets" />
            <MyTab label="Tasks" />
            <MyTab label="Units" />
            <MyTab label="RMA" />
            <MyTab label="UP" />
            <MyTab label="Vendor Tech" />
            <MyTab label="Options" />
            <MyTab label="Config" />
          </MyTabs>
        </Popover>
      </Portal>

      <Suspense fallback={<MyBackdrop />}>
        <Switch>
          <Route exact path="/panel/fieldservice">
            <Redirect to="/panel/fieldservice/units" />
          </Route>
          <Route path="/panel/fieldservice/fru">
            <FRUs fieldservice />
          </Route>
          <Route path="/panel/fieldservice/services" component={ServiceIndex} />
          <Route path="/panel/fieldservice/tickets" component={Tickets} />
          <Route exact path="/panel/fieldservice/tasks" component={Tasks} />
          <Route path="/panel/fieldservice/units" component={Units} />
          <Route exact path="/panel/fieldservice/up" component={UP} />
          <Route exact path="/panel/fieldservice/config" component={Config} />

          <Route path="/panel/fieldservice/vendor">
            <Vendors tech={true} />
          </Route>
          <Route path="/panel/fieldservice/option">
            <Options fieldservice />
          </Route>
        </Switch>
      </Suspense>
    </LockProvider>
  );
}
