import React, { useState } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSwr from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

// import Details from "./Details";
import Details from "../../FieldService/Units/Details";

import { formatTimestampToDate } from "../../../logic/date";

export default function Ship({ tab }: { tab: number }) {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedShip, setSelectedShip] = useState<any>();

    const { data: ships } = useSwr(tab === 0 ? "/ship?progress" : tab === 1 ? "/ship?ready" : "/ship?shipped");

    const cols: GridColumns =
        tab !== 2
            ? [
                  {
                      field: "SO NO.",
                      headerName: "SO NO.",
                      width: 90,
                      valueFormatter: (r) => r.row?.so?.number,
                  },
                  {
                      field: "Est.S.D.",
                      valueFormatter: (r) => formatTimestampToDate(r.row?.so?.estimatedShipDate),
                      width: 120,
                  },
                  {
                      field: "unit",
                      headerName: "Unit Serial Number",
                      flex: 1,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
                  //check these three
                  {
                      field: "Client",
                      flex: 1,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
                  {
                      field: "Rep",
                      flex: 1,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
                  {
                      field: "State",
                      flex: 1,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
              ]
            : [
                  {
                      field: "SO NO.",
                      headerName: "SO NO.",
                      width: 90,
                      valueFormatter: (r) => r.row?.so?.number,
                  },
                  {
                      field: "Est.S.D.",
                      valueFormatter: (r) => formatTimestampToDate(r.row?.so?.estimatedShipDate),
                      width: 120,
                  },
                  {
                      field: "Act.S.D.",
                      valueFormatter: (r) => formatTimestampToDate(r.row?.so?.actualShipDate),
                      width: 120,
                  },
                  {
                      field: "unit",
                      headerName: "Unit Serial Number",
                      flex: 1,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
                  //check these three
                  {
                      field: "Client",
                      width: 120,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
                  {
                      field: "Rep",
                      width: 120,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
                  {
                      field: "State",
                      width: 120,
                      valueFormatter: (r) => r.row?.item?.no,
                  },
                  {
                      field: "TrackingNumber",
                      headerName: "Tracking NO.",
                      width: 120,
                  },
              ];

    return (
        <Box>
            <BasePaper>
                <Tabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    style={{ marginBottom: 10 }}
                >
                    <Tab label="List" />
                    <Tab label="Details" />
                </Tabs>
                {activeTab === 0 && ships && (
                    <>
                        <BaseDataGrid
                            // rows={ships.result || []}
                            rows={[]}
                            cols={cols}
                            onRowSelected={(d) => {
                                setSelectedShip(d);
                                setActiveTab(1);
                            }}
                        />
                    </>
                )}
                {/* {activeTab === 1 && selectedShip && <Details ship={selectedShip} />} */}
                {activeTab === 1 && <Details unit={selectedShip} />}
            </BasePaper>
        </Box>
    );
}
