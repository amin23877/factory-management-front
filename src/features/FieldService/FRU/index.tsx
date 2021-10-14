import React, { useMemo, useState } from "react";
import { GridColDef } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSwr from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

// import Details from "./Details";

import { formatTimestampToDate } from "../../../logic/date";
import FullDataGrid from "../../../components/Datagrid/FullDataGrid";

export default function FRU() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedFru, setSelectedFru] = useState<any>();

    const { data: FRUs } = useSwr("/unit?fru=true");
    // /item?device=true&page=1&containProduct%20Family=FRU

    const fruDevicesColumns = useMemo(
        () => [
            { field: "no", headerName: "Number", width: 100 },
            { field: "name", headerName: "Name", width: 180 },
            { field: "description", headerName: "Description", width: 200 },
            //filter ha dynamic hast
            {
                field: "salesApproved",
                headerName: "Sales Ap.",
                type: "boolean",
                width: 80,
                disableColumnMenu: true,
            },
            {
                field: "engineeringApproved",
                headerName: "Eng. Ap.",
                type: "boolean",
                width: 80,
                disableColumnMenu: true,
            },
            {
                field: "shippingApproved",
                headerName: "Ship Ap.",
                type: "boolean",
                width: 80,
                disableColumnMenu: true,
            },
            {
                field: "prefVendor",
                headerName: "Preferred Vendor",
                valueFormatter: (params: any) => params.row?.prefVendor?.name,
                disableColumnMenu: true,
                width: 150,
            },
            { field: "vendorPartNumber", headerName: "V. Part NO.", width: 100 },
            { field: "cost", headerName: "Cost", width: 80 },
            { field: "location", headerName: "Location", width: 100 },
            { field: "qtyOnHand", headerName: "QOH.", width: 80 },
            { field: "qtyRemain", headerName: " Remain", width: 80 },
            { field: "qtyOnOrder", headerName: "on Order", width: 80 },
            { field: "qtyAllocated", headerName: "Allocated", width: 80 },
            { field: "usedInLastQuarter", headerName: "Used 90", width: 80 },
            { field: "fifo", headerName: "FIFO Val.", width: 80 },
            {
                field: "qohVal",
                headerName: "QOH Val.",
                width: 80,
                valueFormatter: (params: any) => params.row?.cost * params.row?.qtyOnHand,
                // disableColumnMenu: true,
            },
            { field: "uom", headerName: "UOM", width: 100, disableColumnMenu: true },
            {
                field: "obsolete",
                headerName: "Obsolete",
                type: "boolean",
                width: 80,
                // disableColumnMenu: true,
            },
            {
                field: "nonInventoryItem",
                headerName: "NON Inv.",
                type: "boolean",
                width: 80,
                // disableColumnMenu: true,
            },
            {
                field: "rndOnly",
                headerName: "R&D",
                type: "boolean",
                width: 80,
                // disableColumnMenu: true,
            },
        ],
        []
    );
    const callCols: GridColDef[] = [
        {
            field: "number",
            headerName: "FRU Number",
            width: 150,
            valueFormatter: (r) => r.row?.ItemId?.no,
        },
        { field: "name", headerName: "FRU Name", width: 200, valueFormatter: (r) => r.row?.ItemId?.name },
        {
            field: "description",
            headerName: "FRU Description",
            flex: 1,
            valueFormatter: (r) => r.row?.ItemId?.description,
        },
        {
            field: "Lead Time",
            valueFormatter: (r) => formatTimestampToDate(r.row?.ItemId?.lead),
            width: 120,
        },

        { field: "price", headerName: "Price", width: 110, valueFormatter: (r) => r.row?.LineItemRecordId?.price },
    ];

    return (
        <Box>
            {/* <Box mb={2} display="flex" alignItems="center">
                <Button
                    onClick={() => setAddCall(true)}
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                >
                    <AddRoundedIcon />
                    Add Ticket
                </Button>
                <Button
                    kind="delete"
                    disabled={!selectedFru}
                    onClick={() => setConfirm(true)}
                    style={{ margin: "0 0.5em" }}
                >
                    Delete Ticket
                </Button>
                <Button kind="add" onClick={() => setCTagModal(true)} style={{ margin: "0 0.5em" }}>
                    Add Call Tags
                </Button>
            </Box> */}
            <BasePaper>
                <Tabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    style={{ marginBottom: 10 }}
                >
                    <Tab label="Units" />
                    <Tab label="Devices" />
                    <Tab label="Details" disabled={!selectedFru} />
                </Tabs>
                {activeTab === 0 && FRUs && (
                    <BaseDataGrid
                        rows={FRUs.result || []}
                        cols={callCols}
                        onRowSelected={(d) => {
                            setSelectedFru(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && (
                    <FullDataGrid
                        url="/item"
                        columns={fruDevicesColumns}
                        defaultQueries={{ device: true, "containProduct Family": "FRU" }}
                        onRowSelected={() => {}}
                    />
                )}
                {/* {activeTab === 1 && selectedFru && <Details FRUsData={selectedFru} />} */}
            </BasePaper>
        </Box>
    );
}
