import React, { useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import {
    DataGrid,
    GridColumns,
    GridFilterModelParams,
    GridPageChangeParams,
    GridSortModelParams,
    GridToolbar,
} from "@material-ui/data-grid";
import useSWR from "swr";

import { BasePaper } from "../../app/Paper";

import { IItem } from "../../api/items";
import { generateURL } from "../../logic/filterSortPage";
import SearchBox from "../../app/SearchBox";

function ItemTable({ onRowSelected }: { onRowSelected: (r: any) => void }) {
    const [filters, setFilters] = useState<GridFilterModelParams>();
    const [page, setPage] = useState<GridPageChangeParams>();
    const [sorts, setSort] = useState<GridSortModelParams>();

    const { data: items } = useSWR<{ items: IItem[]; total: number }>(
        generateURL("/item?device=false", filters, sorts, page)
    );

    const gridColumns = useMemo<GridColumns>(() => {
        let res: GridColumns = [
            { field: "no", headerName: "Number", width: 100 },
            { field: "name", headerName: "Name", width: 180 },
            { field: "description", headerName: "Description", width: 200 },
            { field: "category", headerName: "Category", width: 100 },
            { field: "family", headerName: "family", width: 100 },
            { field: "inductance", headerName: "Inductance", width: 100 },
            {
                field: "salesApproved",
                headerName: "Sales.AP",
                type: "boolean",
                width: 80,
            },
            {
                field: "engineeringApproved",
                headerName: "Eng.AP",
                type: "boolean",
                width: 80,
            },
            {
                field: "shipApproved",
                headerName: "Ship.AP",
                type: "boolean",
                width: 80,
            },
            { field: "preferredVendor", headerName: "Preferred Vendor", width: 120 },
            { field: "vendorPartNumber", headerName: "Vendor Part Number", width: 140 },
            { field: "cost", headerName: "Cost", type: "number", width: 100 },
            { field: "location", headerName: "Location", width: 200 },
            { field: "totalQoh", headerName: "Qty On Hand", width: 100 },
            { field: "remainQoh", headerName: "Qty Remain", width: 100 },
            { field: "onOrderQoh", headerName: "Qty On Order", width: 100 },
            { field: "atyAllocated", headerName: "Aty Allocated", width: 100 },
            { field: "usedInLastQuarter", headerName: "Last 90", width: 100 },
            { field: "FIFO Value", headerName: "FIFO Value", width: 100 },
            { field: "QOH Value", headerName: "QOH Value", width: 100 },
            { field: "UOM", headerName: "UOM", width: 120 },
            { field: "obsolite", headerName: "Obsolite", type: "boolean", width: 80 },
            { field: "noneInventory", headerName: "None-Inventory", type: "boolean", width: 110 },
            { field: "rand", headerName: "R & D", type: "boolean", width: 80 },
        ];

        const exceptions = [
            "__v",
            "id",
            "no",
            "name",
            "description",
            "cost",
            "salesApproved",
            "engineeringApproved",
            "totalQog",
            "usedInLastQuarter",
            "resellCost",
            "filters",
            "fields",
        ];
        if (items && items.items && items.items.length > 0) {
            for (let f of Object.keys(items.items[0])) {
                if (!exceptions.includes(f)) {
                    res.push({ field: f, headerName: f, hide: true });
                }
            }
        }

        res = res.map((r) => ({ ...r, disableColumnMenu: true }));

        return res;
    }, [items]);

    return (
        <>
            <SearchBox panel="inventory" />
            <BasePaper>
                <Box height={550}>
                    <DataGrid
                        onRowSelected={onRowSelected}
                        pagination
                        pageSize={25}
                        rowCount={items ? items.total : 0}
                        filterMode="server"
                        paginationMode="server"
                        sortingMode="server"
                        onSortModelChange={(s) => setSort(s)}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(ps) => setPage(ps)}
                        onFilterModelChange={(f) => {
                            f.filterModel.items[0].value && setFilters(f);
                        }}
                        rows={items ? items.items : []}
                        columns={gridColumns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </BasePaper>
        </>
    );
}

export default ItemTable;
