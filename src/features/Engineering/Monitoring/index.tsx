import React, { useCallback, useMemo, useState } from "react";
import { Box, Paper, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridFilterModelParams, GridPageChangeParams, GridSortModelParams } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import Details from "./Details";

const Inventory = () => {
    const { data: items, mutate: mutateItems } = useSWR("/quote");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const [activeTab, setActiveTab] = useState(0);

    const gridColumns = useMemo<GridColDef[]>(() => {
        const res: GridColDef[] = [
            { field: "id", headerName: "ID", flex: 3 },
            { field: "date", headerName: "Date", flex: 2 },
            { field: "name", headerName: "Name", flex: 3 },
            { field: "description", headerName: "Description", flex: 3 },
            { field: "section", headerName: "Section", flex: 2 },
            {
                field: "engineeringApproved",
                headerName: "E.A.",
                description: "Engineering Approved",
                type: "boolean",
                width: 100,
            },
            { field: "enable", headerName: "Enable", type: "boolean", width: 100 },
        ];
        return res;
    }, [items]);

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedItem} />
                </Tabs>
                <div style={{ flexGrow: 1 }} />
            </Box>
            <Box display="flex" alignItems="flex-start" mt={1}>
                <Box flex={11} ml={2}>
                    {activeTab === 0 && items && (
                        <Paper>
                            <BaseDataGrid
                                rows={items || []}
                                cols={gridColumns}
                                onRowSelected={(d) => {
                                    setSelectedItem(d);
                                    setActiveTab(1);
                                }}
                            />
                        </Paper>
                    )}
                    {activeTab === 1 && <Details selectedRow={selectedItem} />}
                </Box>
            </Box>
        </Box>
    );
};

export default Inventory;
