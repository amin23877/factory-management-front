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

function ItemTable({ onRowSelected }: { onRowSelected: (r: any) => void }) {
    const [filters, setFilters] = useState<GridFilterModelParams>();
    const [page, setPage] = useState<GridPageChangeParams>();
    const [sorts, setSort] = useState<GridSortModelParams>();

    const { data: items, mutate: mutateItems } = useSWR<{ items: IItem[]; total: number }>(
        generateURL("/item", filters, sorts, page)
    );

    const gridColumns = useMemo<GridColumns>(() => {
        const res: GridColumns = [
            { field: "no", headerName: "Item no.", flex: 1 },
            { field: "name", headerName: "Name", flex: 2 },
            { field: "description", headerName: "Description", flex: 2 },
            { field: "cost", headerName: "cost" },
            { field: "salesApproved", headerName: "salesApproved", type: "boolean" },
            { field: "engineeringApproved", headerName: "engineeringApproved", type: "boolean" },
            { field: "totalQoh", headerName: "totalQoh" },
            { field: "usedInLastQuarter", headerName: "usedInLastQuarter" },
            { field: "resellCost", headerName: "resellCost" },
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
                        setFilters(f);
                    }}
                    rows={items ? items.items : []}
                    columns={gridColumns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </BasePaper>
    );
}

export default ItemTable;
