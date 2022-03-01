import React, { useState } from "react";
import { Box, Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import { MyTabs, MyTab } from "app/Tabs";

import PurchasePO from "features/Purchase/PO";
import Vendors from "features/Purchase/Vendor";
import PurchaseQuote from "features/Purchase/Quote";
import Dashboard from "features/Purchase/Dashboard";

import { usePortal } from "logic/PortalContext";

export default function Purchase() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabText, setTabText] = useState("Purchase Order");
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
            <MyTab label="Dashboard" />
            <MyTab label="Quote" />
            <MyTab label="Purchase Order" />
            <MyTab label="Vendor" />
          </MyTabs>
        </Popover>
      </Portal>
      <Box display="flex">
        <Box flex={1}>
          {activeTab === 0 && <Dashboard />}
          {activeTab === 1 && <PurchaseQuote />}
          {activeTab === 2 && <PurchasePO />}
          {activeTab === 3 && <Vendors tech={false} />}
        </Box>
      </Box>
    </>
  );
}
