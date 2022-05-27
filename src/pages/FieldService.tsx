import React, { Suspense, useState } from "react";
import { Box, Portal, Popover, LinearProgress } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import { MyTabs, MyTab } from "../app/Tabs";

import { usePortal } from "../logic/PortalContext";

const Options = React.lazy(() => import("../features/FieldService/Option"));
const FRUs = React.lazy(() => import("../features/FieldService/FRU"));
const ServiceIndex = React.lazy(() => import("../features/FieldService"));
const Tickets = React.lazy(() => import("../features/FieldService/Tickets"));
const Tasks = React.lazy(() => import("../features/FieldService/Tasks"));
const Units = React.lazy(() => import("../features/FieldService/Units"));
const UP = React.lazy(() => import("../features/FieldService/UP"));
const Vendors = React.lazy(() => import("../features/Purchase/Vendor"));

export default function FieldService() {
  const [activeTab, setActiveTab] = useState(5);
  const [tabText, setTabText] = useState("Units");
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
            <MyTab label="FRU" />
            <MyTab label="Services" />
            <MyTab label="Tickets" />
            <MyTab label="Tasks" />
            <MyTab label="Units" />
            <MyTab label="RMA" />
            <MyTab label="UP" />
            <MyTab label="Vendor Tech" />
            <MyTab label="Options" />
          </MyTabs>
        </Popover>
      </Portal>
      <Box display="flex">
        <Box flex={1}>
          <Suspense fallback={<LinearProgress />}>
            {activeTab === 1 && <FRUs />}
            {activeTab === 2 && <ServiceIndex />}
            {activeTab === 3 && <Tickets />}
            {activeTab === 4 && <Tasks />}
            {activeTab === 5 && <Units />}
            {activeTab === 7 && <UP />}
            {activeTab === 8 && <Vendors tech />}
            {activeTab === 9 && <Options />}
          </Suspense>
        </Box>
      </Box>
    </>
  );
}
