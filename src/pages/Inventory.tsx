import React, { useEffect, useState } from "react";
import { Box, Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import Dashboard from "features/Items/Dashboard";
import Items from "features/Items";

import { MyTabs, MyTab } from "app/Tabs";

import { usePortal } from "logic/PortalContext";
import { useLock } from "common/Lock";

const Inventory = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabText, setTabText] = useState("Items");
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
  const { setLock } = useLock();

  useEffect(() => {
    setLock(true);
  }, [setLock]);

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
            <MyTab label="Items" />
          </MyTabs>
        </Popover>
      </Portal>
      <Box display="flex">
        <Box flex={1}>
          {activeTab === 0 && <Dashboard />}
          {activeTab === 1 && <Items />}
        </Box>
      </Box>
    </>
  );
};

export default Inventory;
