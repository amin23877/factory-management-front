import React, { useState } from "react";
import { Box, Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import { MyTabs, MyTab } from "../app/Tabs";

import QuotePanel from "../features/Sales/Quote";
import SalesOrderPanel from "../features/Sales/SO";
import PurchaseOrderPanel from "../features/Sales/PO";
import DevicesPanel from "../features/Engineering/Devices";
import Dashboard from "../features/Sales/Dashboard";
import Calls from "../features/Sales/Call";
import Clients from "../features/Sales/Customer";

import { usePortal } from "../logic/PortalContext";

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
  const id = open ? "simple-popover" : undefined;
  const portals = usePortal();

  return (
    <>
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
            <MyTab label="Customers" />
          </MyTabs>
        </Popover>
      </Portal>
      <Box display="flex">
        <Box flex={1}>
          {activeTab === 0 && <Calls />}
          {activeTab === 1 && <Dashboard />}
          {activeTab === 2 && <DevicesPanel sales={true} />}
          {activeTab === 3 && <QuotePanel />}
          {activeTab === 4 && <PurchaseOrderPanel />}
          {activeTab === 5 && <SalesOrderPanel />}
          {activeTab === 6 && <Clients />}
        </Box>
      </Box>
    </>
  );
}
