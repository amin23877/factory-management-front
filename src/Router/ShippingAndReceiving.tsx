import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom";

import { LockProvider } from "common/Lock";
import { usePortal } from "logic/PortalContext";

import { Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import MyBackdrop from "app/Backdrop";
import { MyTabs, MyTab } from "app/Tabs";
import { camelCaseToRegular } from "logic/utils";

const Shipping = React.lazy(() => import("features/ShippingAndReceiving/Shipping"));
const Units = React.lazy(() => import("features/FieldService/Units"));

export default function PanelRouter() {
  const portals = usePortal();
  const history = useHistory();
  const location = useLocation();

  const tabs = ["", "inProgress", "readyToShip", "shipped", "units", "", "received", "expected"];

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
            <MyTab label="+ Shipping" disabled />
            <MyTab label="In Progress" />
            <MyTab label="Ready to Ship" />
            <MyTab label="Shipped" />
            <MyTab label="Units" />
            <MyTab label="+ Receiving" disabled />
            <MyTab label="Received" />
            <MyTab label="Expected" />
          </MyTabs>
        </Popover>
      </Portal>
      <Suspense fallback={<MyBackdrop />}>
        <Switch>
          <Route exact path="/panel/shipping">
            <Redirect to="/panel/shipping/inProgress" />
          </Route>

          <Route exact path="/panel/shipping/inProgress">
            <Shipping tab={0} />
          </Route>
          <Route exact path="/panel/shipping/readyToShip">
            <Shipping tab={1} />
          </Route>
          <Route exact path="/panel/shipping/shipped">
            <Shipping tab={2} />
          </Route>
          <Route exact path="/panel/shipping/units">
            <Units />
          </Route>
          <Route exact path="/panel/shipping/received"></Route>
          <Route exact path="/panel/shipping/expected"></Route>
        </Switch>
      </Suspense>
    </LockProvider>
  );
}
