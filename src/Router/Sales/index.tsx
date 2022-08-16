import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom";

import { LockProvider } from "common/Lock";
import { usePortal } from "logic/PortalContext";

import { Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import MyBackdrop from "app/Backdrop";
import { MyTabs, MyTab } from "app/Tabs";
import { camelCaseToRegular } from "logic/utils";

const Dashboard = React.lazy(() => import("features/Sales/Dashboard"));
const Calls = React.lazy(() => import("Router/Sales/Calls"));
const DevicesPanel = React.lazy(() => import("Router/Engineering/Devices"));
const Option = React.lazy(() => import("features/Engineering/Option"));
const QuotePanel = React.lazy(() => import("Router/Sales/Quote"));
const PurchaseOrderPanel = React.lazy(() => import("Router/Sales/PurchaseOrders"));
const SalesOrderPanel = React.lazy(() => import("Router/Sales/SalesOrders"));
const Clients = React.lazy(() => import("features/Sales/Customer"));
const Reps = React.lazy(() => import("Router/Sales/Reps"));

export default function PanelRouter() {
  const portals = usePortal();
  const history = useHistory();
  const location = useLocation();

  const tabs = ["dashboard", "calls", "device", "options", "quotes", "customerPOs", "salesOrders", "clients", "reps"];

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
              history.push("/panel/sales/" + tabs[nv]);
              handleClose();
            }}
            orientation="vertical"
          >
            <MyTab label="Dashboard" />
            <MyTab label="Calls" />
            <MyTab label="Devices" />
            <MyTab label="options" />
            <MyTab label="Quotes" />
            <MyTab label="Customer POs" />
            <MyTab label="Sales Orders" />
            <MyTab label="Clients" />
            <MyTab label="Reps" />
          </MyTabs>
        </Popover>
      </Portal>
      <Suspense fallback={<MyBackdrop />}>
        <Switch>
          <Route exact path="/panel/sales">
            <Redirect to="/panel/sales/salesOrders" />
          </Route>
          <Route exact path="/panel/sales/dashboard" component={Dashboard} />
          <Route path="/panel/sales/calls" component={Calls} />
          <Route path="/panel/sales/device">
            <DevicesPanel sales={true} />
          </Route>
          <Route exact path="/panel/sales/options" component={Option} />
          <Route path="/panel/sales/quotes" component={QuotePanel} />
          <Route path="/panel/sales/customerPOs" component={PurchaseOrderPanel} />
          <Route path="/panel/sales/salesOrders" component={SalesOrderPanel} />
          <Route exact path="/panel/sales/clients" component={Clients} />
          <Route path="/panel/sales/reps" component={Reps} />
        </Switch>
      </Suspense>
    </LockProvider>
  );
}
