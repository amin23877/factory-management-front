import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import { BasePaper } from "app/Paper";

import { formatTimestampToDate } from "logic/date";
import DataGrid from "app/NewDataGrid";

import UnitDetails from "../../pages/Engineering/Units/Details";
import DeviceDetails from "pages/Engineering/Devices/Details";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function Options({ sales, fieldservice }: { sales?: boolean; fieldservice?: boolean }) {
  const history = useHistory();
  const location = useLocation();

  const tabs = ["options", "units", "details"];
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/").length === 6 ? 2 : tabs.indexOf(location.pathname.split("/")[4])
  );

  useEffect(() => {
    if (location.pathname.split("/")[4]) {
      if (location.pathname.split("/").length === 6) {
        setActiveTab(2);
      } else {
        setActiveTab(tabs.indexOf(location.pathname.split("/")[4]));
      }
    }
  }, [location]);

  const optionDevicesColumns = useMemo(
    () => [
      { name: "no", header: "Number", minWidth: 100 },
      { name: "name", header: "Name", minWidth: 180 },
      { name: "description", header: "Description", minWidth: 200 },
      {
        name: "salesApproved",
        header: "Sales Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "engineeringApproved",
        header: "Eng. Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "shippingApproved",
        header: "Ship Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "prefVendor",
        header: "Preferred Vendor",
        render: ({ data }: any) => data?.prefVendor?.name,
        minWidth: 150,
      },
      { name: "vendorPartNumber", header: "V.Part NO.", minWidth: 100 },
      { name: "cost", header: "Cost", minWidth: 80, type: "number" },
      { name: "location", header: "Location", minWidth: 100 },
      { name: "qtyOnHand", header: "QOH.", minWidth: 80, type: "number" },
      { name: "qtyRemain", header: " Remain", minWidth: 80, type: "number" },
      { name: "qtyOnOrder", header: "on Order", minWidth: 80, type: "number" },
      { name: "qtyAllocated", header: "Allocated", minWidth: 80, type: "number" },
      { name: "usedInLastQuarter", header: "Used 90", minWidth: 80, type: "number" },
      { name: "fifo", header: "FIFO Val.", minWidth: 80, type: "number" },
      {
        name: "qohVal",
        header: "QOH Val.",
        minWidth: 80,
        render: ({ data }: any) => data?.cost * data?.qtyOnHand,
        type: "number",
      },
      { name: "uom", header: "UOM", minWidth: 100 },
      {
        name: "obsolete",
        header: "Obsolete",
        type: "boolean",
      },
      {
        name: "nonInventoryItem",
        header: "NON Inv.",
        type: "boolean",
      },
      {
        name: "rndOnly",
        header: "R&D",
        type: "boolean",
      },
    ],
    []
  );

  const optionUnitsColumns = [
    {
      name: "number",
      header: "Option Number",
      minWidth: 150,
      // render: ({ data }: any) => data?.item?.no,
    },
    {
      name: "name",
      header: "Option Name",
      minWidth: 200,
      //  render: ({ data }: any) => data?.item?.name
    },
    {
      name: "description",
      header: "Option Description",
      flex: 1,
    },
    {
      name: "Lead Time",
      render: ({ data }: any) => formatTimestampToDate(data?.so?.leadTime),
      minWidth: 120,
    },

    { name: "price", header: "Price", minWidth: 110, render: ({ data }: any) => data?.so?.price },
  ];

  return (
    <Box display="flex" height="100%">
      <BasePaper style={{ flex: 1 }}>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => {
            setActiveTab(nv);
            history.push({
              pathname: `/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/` + tabs[nv],
              search: window.location.search,
            });
          }}
          style={{ marginBottom: 10 }}
        >
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> Options
              </span>
            }
            wrapped
          />
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> Units
              </span>
            }
            wrapped
          />
          <Tab
            disabled={activeTab !== 2}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
              </span>
            }
          />
        </Tabs>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path={`/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/`}>
              <Redirect
                to={`/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/options`}
              />
            </Route>
            <Route
              exact
              path={`/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/options`}
            >
              <DataGrid
                setUrlFilters
                url="/item"
                columns={optionDevicesColumns}
                initParams={{ class: "option" }}
                onRowSelected={(d) => {
                  history.push(
                    `/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/options/${d.id}${
                      window.location.search
                    }`
                  );
                }}
              />
            </Route>
            <Route
              exact
              path={`/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/units`}
            >
              <DataGrid
                setUrlFilters
                url="/unit"
                initParams={{ class: "option" }}
                columns={optionUnitsColumns}
                onRowSelected={(d) => {
                  history.push(
                    `/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/units/${d.id}${
                      window.location.search
                    }`
                  );
                }}
              />
            </Route>
            <Route
              exact
              path={`/panel/${
                sales ? "sales" : fieldservice ? "fieldservice" : "engineering"
              }/option/options/:deviceId`}
            >
              <DeviceDetails onDone={() => {}} onFlagSelected={(d: any) => {}} />{" "}
            </Route>
            <Route
              exact
              path={`/panel/${sales ? "sales" : fieldservice ? "fieldservice" : "engineering"}/option/units/:unitId`}
            >
              <UnitDetails />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </Box>
  );
}
