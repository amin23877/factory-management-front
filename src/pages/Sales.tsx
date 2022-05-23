import React, { Suspense, useState, useEffect } from "react";
import { Box, Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import { MyTabs, MyTab } from "app/Tabs";
import MyBackdrop from "app/Backdrop";

import { useLock } from "common/Lock";

import { usePortal } from "logic/PortalContext";

const Calls = React.lazy(() => import("features/Sales/Call"));
const Dashboard = React.lazy(() => import("features/Sales/Dashboard"));
const DevicesPanel = React.lazy(() => import("features/Engineering/Devices"));
const QuotePanel = React.lazy(() => import("features/Sales/Quote"));
const PurchaseOrderPanel = React.lazy(() => import("features/Sales/PO"));
const SalesOrderPanel = React.lazy(() => import("features/Sales/SO"));
const Clients = React.lazy(() => import("features/Sales/Customer"));
const Reps = React.lazy(() => import("features/Sales/Rep"));

export default function Sales() {
  const [activeTab, setActiveTab] = useState(5);
  const [tabText, setTabText] = useState("Sales Orders");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const portals = usePortal();
  const { setLock } = useLock();

  useEffect(() => {
    setLock(true);
  }, [setLock]);

  return (
    <>
      <Portal container={portals.topAppBar ? (portals.topAppBar as any).current : null}>
        <div
          id="top-menu-button"
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
          id="top-menu-list"
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
              setLock(true);
              handleClose();
            }}
            orientation="vertical"
          >
            <MyTab label="Calls" />
            <MyTab label="Dashboard" />
            <MyTab label="Devices" />
            <MyTab label="Quotes" />
            <MyTab label="Customer POs" />
            <MyTab label="Sales Orders" />
            <MyTab label="Clients" />
            <MyTab label="Reps" />
          </MyTabs>
        </Popover>
      </Portal>
      <Box display="flex">
        <Box flex={1}>
          <Suspense fallback={<MyBackdrop />}>
            {activeTab === 0 && <Calls />}
            {activeTab === 1 && <Dashboard />}
            {activeTab === 2 && <DevicesPanel sales={true} />}
            {activeTab === 3 && <QuotePanel />}
            {activeTab === 4 && <PurchaseOrderPanel />}
            {activeTab === 5 && <SalesOrderPanel />}
            {activeTab === 6 && <Clients />}
            {activeTab === 7 && <Reps />}
          </Suspense>
        </Box>
      </Box>
    </>
  );
}
