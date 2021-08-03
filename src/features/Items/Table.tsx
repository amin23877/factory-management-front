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
        const res: GridColumns = [
            { field: "no", headerName: "Item NO.", width: 100 },
            { field: "name", headerName: "Name", width: 250 },
            { field: "description", headerName: "Description", width: 200 },
            { field: "cost", headerName: "Cost", width: 80 },
            {
                field: "salesApproved",
                headerName: "Sales Approved",
                type: "boolean",
                width: 120,
                disableColumnMenu: true,
            },
            {
                field: "engineeringApproved",
                headerName: "Engineering Approved",
                type: "boolean",
                width: 150,
                disableColumnMenu: true,
            },
            { field: "totalQoh", headerName: "Total QOH.", width: 100, disableColumnMenu: true },
            { field: "usedInLastQuarter", headerName: "Used In Last Quarter", width: 150, disableColumnMenu: true },
            { field: "resellCost", headerName: "Resell Cost", width: 120 },
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
