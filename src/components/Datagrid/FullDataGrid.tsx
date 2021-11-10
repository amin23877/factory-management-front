import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { DataGrid, GridColumns, GridFilterModelParams, GridSortModelParams, GridToolbar } from "@material-ui/data-grid";

import { BasePaper } from "../../app/Paper";

import { useDataGridData } from "../../components/Datagrid/hooks";
import { ParameterType } from "../../logic/utils";

function FullDataGrid({
    url,
    columns,
    height = 400,
    onRowSelected,
    defaultQueries,
}: {
    defaultQueries?: ParameterType;
    columns: GridColumns;
    url: string;
    onRowSelected: (r: any) => void;
    height?: number | string;
}) {
    const [filters, setFilters] = useState<{ [key: string]: any }>();
    const [sorts, setSort] = useState<{ [key: string]: string }>();
    const [limit, setLimit] = useState<string | number>();
    const {
        dataGridClasses,
        loading,
        page,
        rows: items,
        setPage,
    } = useDataGridData({ url, params: { ...defaultQueries, ...filters, ...sorts }, limit });

    const handleChangeFilter = (f: GridFilterModelParams) => {
        const { columnField, value, operatorValue } = f.filterModel.items[0];

        if (columnField) {
            setFilters({
                [`${operatorValue === "contains" ? "contain" : ""}${columnField}`]: value,
            });
            setPage(0);
        } else if (columnField && !value) {
            setFilters({});
        }
    };

    const handleSortChange = (s: GridSortModelParams): void => {
        if (s.sortModel[0]) {
            const { field, sort } = s.sortModel[0];
            if (!field || !sort) {
                return;
            }

            setSort({ sort: field, order: sort === "desc" ? "DESC" : "ASC" });
            setPage(0);
        } else {
            setSort({});
        }
    };

    return (
        <BasePaper>
            <Box height={height}>
                <DataGrid
                    density="compact"
                    loading={loading}
                    className={dataGridClasses.root}
                    onRowSelected={onRowSelected}
                    pagination
                    page={page}
                    pageSize={25}
                    rowCount={items ? items.total : 0}
                    filterMode="server"
                    paginationMode="server"
                    sortingMode="server"
                    onSortModelChange={handleSortChange}
                    onPageChange={(p) => setPage(p.page)}
                    onPageSizeChange={(ps) => setLimit(ps.pageSize)}
                    onFilterModelChange={handleChangeFilter}
                    rows={items ? items.result : []}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </BasePaper>
    );
}

export default FullDataGrid;
