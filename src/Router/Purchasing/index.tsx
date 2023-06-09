import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom";

import { LockProvider } from "common/Lock";
import { usePortal } from "logic/PortalContext";

import { Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import MyBackdrop from "app/Backdrop";
import { MyTabs, MyTab } from "app/Tabs";

import { camelCaseToRegular } from "logic/utils";

const Dashboard = React.lazy(() => import("pages/Purchasing/Dashboard"));
const PurchasePO = React.lazy(() => import("Router/Purchasing/Purchase"));
const Vendors = React.lazy(() => import("Router/Purchasing/Vendors"));
const PurchaseQuote = React.lazy(() => import("Router/Purchasing/Quote"));

export default function PanelRouter() {
  const portals = usePortal();
  const history = useHistory();
  const location = useLocation();

  const tabs = ["dashboard", "quote", "purchaseOrder", "vendor"];

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
              history.push("/panel/purchase/" + tabs[nv]);
              handleClose();
            }}
            orientation="vertical"
          >
            <MyTab label="Dashboard" />
            <MyTab label="Quote" />
            <MyTab label="Purchase Order" />
            <MyTab label="Vendor" />
          </MyTabs>
        </Popover>
      </Portal>
      <Suspense fallback={<MyBackdrop />}>
        <Switch>
          <Route exact path="/panel/purchase">
            <Redirect to="/panel/purchase/dashboard" />
          </Route>
          <Route exact path="/panel/purchase/dashboard" component={Dashboard} />
          <Route path="/panel/purchase/quote" component={PurchaseQuote} />
          <Route path="/panel/purchase/purchaseOrder" component={PurchasePO} />
          <Route path="/panel/purchase/vendor" component={Vendors} />
        </Switch>
      </Suspense>
    </LockProvider>
  );
}
