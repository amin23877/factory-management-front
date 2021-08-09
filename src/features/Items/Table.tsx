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
import { splitLevelName } from "../../logic/levels";

function ItemTable({ onRowSelected }: { onRowSelected: (r: any) => void }) {
    const [filters, setFilters] = useState<GridFilterModelParams>();
    const [page, setPage] = useState<GridPageChangeParams>();
    const [sorts, setSort] = useState<GridSortModelParams>();

    const { data: items } = useSWR<{ result: IItem[]; total: number }>(
        generateURL("/item?device=false", filters, sorts, page)
    );
    const { data: fields } = useSWR("/field");
    const { data: clusters } = useSWR("/filter");

    const gridColumns = useMemo<GridColumns>(() => {
        let res: GridColumns = [
            { field: "no", headerName: "Number", width: 100 },
            { field: "name", headerName: "Name", width: 180 },
            { field: "description", headerName: "Description", width: 200 },
            //filter ha dynamic hast
            {
                field: "salesApproved",
                headerName: "Sales Ap.",
                type: "boolean",
                width: 80,
                // disableColumnMenu: true,
            },
            {
                field: "engineeringApproved",
                headerName: "Eng. Ap.",
                type: "boolean",
                width: 80,
                // disableColumnMenu: true,
            },
            {
                field: "shippingApproved",
                headerName: "Ship Ap.",
                type: "boolean",
                width: 80,
                // disableColumnMenu: true,
            },
            { field: "prefVendor", headerName: "Preferred Vendor", width: 150 },
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
                valueFormatter: (params) => params.row?.cost * params.row?.qtyOnHand,
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
            "totalQoh",
            "usedInLastQuarter",
            "resellCost",
            "filters",
            "fields",
            "prefVendor",
            "location",
            "rndOnly",
            "nonInventoryItem",
            "obsolete",
            "uom",
            "qohVal",
            "fifo",
            "qtyAllocated",
            "qtyRemain",
            "qtyOnOrder",
        ];
        if (items && items.result && items.result.length > 0) {
            const fieldNames = fields ? fields.map((f: any) => f.name) : [];
            const filterNames = clusters ? clusters.map((f: any) => f.name) : [];
            for (let f of Object.keys(items.result[0])) {
                if (!exceptions.includes(f)) {
                    if (filterNames.includes(f)) {
                        res.splice(2, 0, { field: f, headerName: f, width: 120 });
                    } else if (fieldNames.includes(f)) {
                        res.splice(2, 0, { field: f, headerName: splitLevelName(f), width: 120 });
                    } else {
                        res.push({ field: f, headerName: f, hide: true });
                    }
                }
            }
        }

        res = res.map((r) => ({ ...r, disableColumnMenu: true }));

        return res;
    }, [items, fields]);

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
                        rows={items ? items.result : []}
                        columns={gridColumns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </BasePaper>
        </>
    );
}

export default ItemTable;
