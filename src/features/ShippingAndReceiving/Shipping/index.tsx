import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import { BasePaper } from "../../../app/Paper";

import Details from "../../../pages/Engineering/Units/Details";
import { subMonths } from "date-fns";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import DataGrid from "../../../app/NewDataGrid";

export default function Ship({ tab }: { tab: number }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedShip, setSelectedShip] = useState<any>();
  const [month, setMonth] = useState(new Date(subMonths(new Date(), 1)).getTime());

  const cols =
    tab !== 2
      ? [
          {
            name: "sono",
            header: "SO NO.",
            width: 90,
          },
          {
            name: "estimatedShipDate",
            type: "date",
            header: "Est.S.D.",
            width: 120,
          },
          {
            name: "unit",
            header: "Unit Serial Number",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
          //check these three
          {
            name: "Client",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
          {
            name: "Rep",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
          {
            name: "State",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
        ]
      : [
          {
            name: "sono",
            header: "SO NO.",
            width: 90,
          },

          {
            name: "actualShipDate",
            header: "Act.S.D.",
            type: "date",
            width: 120,
          },
          {
            name: "unit",
            header: "Unit NO.",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
          {
            name: "Client",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
          {
            name: "Rep",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
          {
            name: "State",
            flex: 1,
            minWidth: 100,
            render: ({ data }: any) => data?.item?.no,
          },
          {
            name: "TrackingNumber",
            header: "Tracking NO.",
            flex: 1,
            minWidth: 100,
          },
        ];

  return (
    <Box>
      <BasePaper>
        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: 10 }}>
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> List
              </span>
            }
            wrapped
          />
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
              </span>
            }
          />
        </Tabs>
        <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
          <>
            <DataGrid
              url="/unit"
              columns={cols}
              initParams={
                tab === 0
                  ? { nstatus: "ready to ship" }
                  : tab === 1
                  ? { status: "ready to ship" }
                  : { status: "shipped", shipDate: `${month}` }
              }
              onRowSelected={(d) => {
                setSelectedShip(d);
                setActiveTab(1);
              }}
            />
          </>
        </div>
        {activeTab === 1 && selectedShip && <Details />}
      </BasePaper>
    </Box>
  );
}
