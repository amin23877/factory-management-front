import React, { Suspense, useEffect, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import DataGrid from "app/NewDataGrid";
import { BasePaper } from "app/Paper";
import Details from "../../pages/Engineering/Units/Details";

import { formatTimestampToDate } from "logic/date";
import { LockProvider } from "common/Lock";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function Unit({ shipping }: { shipping?: boolean }) {
  const history = useHistory();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const cols = [
    {
      name: "number",
      header: "Device Id",
      minWidth: 120,
    },
    {
      name: "Device",
      header: "Device",
      flex: 1,
      minWidth: 120,
      render: ({ data }: any) => data?.ItemId?.no,
    },
    {
      name: "EST.S.D",
      render: ({ data }: any) => formatTimestampToDate(data?.SOId?.estimatedShipDate),
      minWidth: 120,
    },
    {
      name: "Act.S.D.",
      render: ({ data }: any) => formatTimestampToDate(data?.SOId?.actualShipDate),
      minWidth: 120,
    },
    { name: "status", header: "Status", minWidth: 100 },
    { name: "warrantyStatus", header: "Warranty Status", minWidth: 150 },
    { name: "warrantyEndDate", header: "Warranty End Date", minWidth: 150 },
    {
      name: "SO NO.",
      header: "SO NO.",
      minWidth: 90,
      render: ({ data }: any) => data?.SOId?.number,
    },
    {
      name: "SO Date",
      header: "SO Date",
      minWidth: 100,
      render: ({ data }: any) => formatTimestampToDate(data?.SOId?.date),
    },
  ];

  return (
    <LockProvider>
      <BasePaper style={{ height: "100%" }}>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => {
            setActiveTab(nv);
            history.push({
              pathname: `/panel/${shipping ? "shipping" : "fieldservice"}/units`,
              search: window.location.search,
            });
          }}
          style={{ marginBottom: 10 }}
        >
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
              </span>
            }
            wrapped
          />
          <Tab
            disabled={activeTab !== 1}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
              </span>
            }
          />
        </Tabs>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path={`/panel/${shipping ? "shipping" : "fieldservice"}/units`}>
              <DataGrid
                url="/unit"
                initParams={{ class: "device" }}
                columns={cols}
                onRowSelected={(d) => {
                  history.push(
                    `/panel/${shipping ? "shipping" : "fieldservice"}/units/${d.id}${window.location.search}`
                  );
                }}
                setUrlFilters
              />
            </Route>
            <Route exact path={`/panel/${shipping ? "shipping" : "fieldservice"}/units/:unitId`}>
              <Details />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </LockProvider>
  );
}
