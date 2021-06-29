import React, { useState, useMemo } from "react";
import { Container, Box, Paper } from "@material-ui/core";
import {
    DataGrid,
    GridColDef,
    GridFilterModelParams,
    GridPageChangeParams,
    GridSortModelParams,
    GridToolbar,
} from "@material-ui/data-grid";
import { SearchBar } from "../app/TextField";
import useSWR from "swr";

import BaseDataGrid from "../app/BaseDataGrid";
import { generateURL } from "../logic/filterSortPage";
import { IUnit } from "../api/units";
import { ChangeUnitModal } from "../features/Unit/ChangeUnitModal";

export default function Unit() {
    const [filters, setFilters] = useState<GridFilterModelParams>();
    const [page, setPage] = useState<GridPageChangeParams>();
    const [sorts, setSort] = useState<GridSortModelParams>();
    const [open, setOpen] = useState<boolean>(false);

    const [selected, setSelected] = useState<IUnit>();

    const { data: units, mutate: mutateItems } = useSWR(generateURL("/unit", filters, sorts, page));

    const unitCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "Serial No." },
            { field: "laborCost", headerName: "Labor Cost" },
            { field: "dueDate", headerName: "Due Date", flex: 1 },
            { field: "status", headerName: "Status" },
        ],
        []
    );
    return (
        <Container>
            <ChangeUnitModal open={open} onClose={() => setOpen(false)} unit={selected} />
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
            </Box>
            <Box flex={11} ml={2}>
                <Paper>
                    <Box>
                        <BaseDataGrid
                            cols={unitCols}
                            rows={units || []}
                            onRowSelected={(i) => {
                                setSelected(i);
                                setOpen(true);
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
