import React, { useState, useMemo } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import BaseDataGrid from "../../app/BaseDataGrid";
import useSWR from "swr";

import { GridColumns } from "@material-ui/data-grid";
import { BasePaper } from "../../app/Paper";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { data: recentlyAddedItems } = useSWR("/receive");
    const { data: onOrderItems } = useSWR("/onorder");

    const recentlyAddedCols = useMemo<GridColumns>(
        () => [
            { field: "Received Date", disableColumnMenu: true, width: 150 },
            { field: "Item Number", disableColumnMenu: true, width: 120 },
            { field: "Item Name", disableColumnMenu: true, width: 250 },
            { field: "Item Description", disableColumnMenu: true, width: 250 },
            { field: "Category", disableColumnMenu: true, width: 200 },
            { field: "Item Family", disableColumnMenu: true, width: 200 },
            { field: "Inductance", disableColumnMenu: true, width: 150 },
            { field: "Current Rating", disableColumnMenu: true, width: 150 },
            { field: "Sales.AP", disableColumnMenu: true, width: 100 },
            { field: "Eng.AP", disableColumnMenu: true, width: 100 },
            { field: "Ship.AP", disableColumnMenu: true, width: 100 },
            { field: "Preferred Vendor", disableColumnMenu: true, width: 120 },
            { field: "Vendor Part Number", disableColumnMenu: true, width: 150 },
            { field: "Item Cost", disableColumnMenu: true, width: 150 },
            { field: "Item Location", disableColumnMenu: true, width: 350 },
            { field: "QTY On Hand", disableColumnMenu: true, width: 120 },
            { field: "QTY Remain", disableColumnMenu: true, width: 120 },
            { field: "QTY On Order", disableColumnMenu: true, width: 120 },
            { field: "ATY Allocated", disableColumnMenu: true, width: 100 },
            { field: "Last 90", disableColumnMenu: true, width: 150 },
            { field: "FIFO Value", disableColumnMenu: true, width: 150 },
            { field: "QOH Value", disableColumnMenu: true, width: 150 },
            { field: "UOM", disableColumnMenu: true, width: 150 },
            { field: "Obsolete", disableColumnMenu: true, width: 100 },
            { field: "Non-Inventory Item", disableColumnMenu: true, width: 150 },
            { field: "R & D", disableColumnMenu: true, width: 100 },
        ],
        []
    );

    const onOrderCols = useMemo<GridColumns>(
        () => [
            { field: "Est Receiving Date", disableColumnMenu: true, width: 150 },
            { field: "Item Number", disableColumnMenu: true, width: 120 },
            { field: "Item Name", disableColumnMenu: true, width: 250 },
            { field: "Item Description", disableColumnMenu: true, width: 250 },
            { field: "Category", disableColumnMenu: true, width: 200 },
            { field: "Item Family", disableColumnMenu: true, width: 200 },
            { field: "Inductance", disableColumnMenu: true, width: 150 },
            { field: "Current Rating", disableColumnMenu: true, width: 150 },
            { field: "Sales.AP", disableColumnMenu: true, width: 100 },
            { field: "Eng.AP", disableColumnMenu: true, width: 100 },
            { field: "Ship.AP", disableColumnMenu: true, width: 100 },
            { field: "Preferred Vendor", disableColumnMenu: true, width: 120 },
            { field: "Vendor Part Number", disableColumnMenu: true, width: 150 },
            { field: "Item Cost", disableColumnMenu: true, width: 150 },
            { field: "Item Location", disableColumnMenu: true, width: 350 },
            { field: "QTY On Hand", disableColumnMenu: true, width: 120 },
            { field: "QTY Remain", disableColumnMenu: true, width: 120 },
            { field: "QTY On Order", disableColumnMenu: true, width: 120 },
            { field: "ATY Allocated", disableColumnMenu: true, width: 100 },
            { field: "Last 90", disableColumnMenu: true, width: 150 },
            { field: "FIFO Value", disableColumnMenu: true, width: 150 },
            { field: "QOH Value", disableColumnMenu: true, width: 150 },
            { field: "UOM", disableColumnMenu: true, width: 150 },
            { field: "Obsolete", disableColumnMenu: true, width: 100 },
            { field: "Non-Inventory Item", disableColumnMenu: true, width: 150 },
            { field: "R & D", disableColumnMenu: true, width: 100 },
        ],
        []
    );

    const lowQuantityCols = useMemo<GridColumns>(
        () => [
            { field: "Est Receiving Date", disableColumnMenu: true, width: 150 },
            { field: "Item Number", disableColumnMenu: true, width: 120 },
            { field: "Item Name", disableColumnMenu: true, width: 250 },
            { field: "Item Description", disableColumnMenu: true, width: 250 },
            { field: "Category", disableColumnMenu: true, width: 200 },
            { field: "Item Family", disableColumnMenu: true, width: 200 },
            { field: "Inductance", disableColumnMenu: true, width: 150 },
            { field: "Current Rating", disableColumnMenu: true, width: 150 },
            { field: "Sales.AP", disableColumnMenu: true, width: 100 },
            { field: "Eng.AP", disableColumnMenu: true, width: 100 },
            { field: "Ship.AP", disableColumnMenu: true, width: 100 },
            { field: "Preferred Vendor", disableColumnMenu: true, width: 120 },
            { field: "Vendor Part Number", disableColumnMenu: true, width: 150 },
            { field: "Item Cost", disableColumnMenu: true, width: 150 },
            { field: "Item Location", disableColumnMenu: true, width: 350 },
            { field: "QTY On Hand", disableColumnMenu: true, width: 120 },
            { field: "QTY Remain", disableColumnMenu: true, width: 120 },
            { field: "QTY On Order", disableColumnMenu: true, width: 120 },
            { field: "ATY Allocated", disableColumnMenu: true, width: 100 },
            { field: "Last 90", disableColumnMenu: true, width: 150 },
            { field: "FIFO Value", disableColumnMenu: true, width: 150 },
            { field: "QOH Value", disableColumnMenu: true, width: 150 },
            { field: "UOM", disableColumnMenu: true, width: 150 },
            { field: "Obsolete", disableColumnMenu: true, width: 100 },
            { field: "Non-Inventory Item", disableColumnMenu: true, width: 150 },
            { field: "R & D", disableColumnMenu: true, width: 100 },
        ],
        []
    );

    return (
        <>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Recently Added Items" />
                    <Tab label="Items On Order" />
                    <Tab label="Low Quantity Items" />
                </Tabs>
                <div style={{ flexGrow: 1 }} />
            </Box>
            <BasePaper>
                {activeTab === 0 && (
                    <BaseDataGrid
                        height="79vh"
                        cols={recentlyAddedCols}
                        rows={recentlyAddedItems ? recentlyAddedItems.map((r: any, i: any) => ({ ...r, id: i })) : []}
                    />
                )}
                {activeTab === 1 && (
                    <BaseDataGrid
                        height="79vh"
                        cols={onOrderCols}
                        rows={onOrderItems ? onOrderItems.map((r: any, i: any) => ({ ...r, id: i })) : []}
                    />
                )}
                {activeTab === 2 && <BaseDataGrid height="79vh" cols={lowQuantityCols} rows={[{ id: 1 }]} />}
            </BasePaper>
        </>
    );
};

export default Dashboard;
