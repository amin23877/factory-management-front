import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import Details from "./Details";
import { formatTimestampToDate } from "../../../logic/date";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { BasePaper } from "../../../app/Paper";

const Inventory = () => {
    const { data: items } = useSWR("/monitor");
    const [selectedItem, setSelectedItem] = useState<any>({ id: "", assertion: "", vars: [] });

    const [activeTab, setActiveTab] = useState(0);

    const gridColumns = useMemo<GridColDef[]>(
        () => [
            { field: "id", headerName: "Rule ID", flex: 3 },
            {
                field: "date",
                headerName: "Date",
                flex: 2,
                valueFormatter: (params) => formatTimestampToDate(params.row.date),
            },
            { field: "name", headerName: "Name", flex: 3 },
            { field: "description", headerName: "Description", flex: 3 },
            { field: "section", headerName: "Section", flex: 2 },
            {
                field: "engAP",
                headerName: "E.A.",
                description: "Engineering Approved",
                type: "boolean",
                width: 100,
            },
            { field: "enable", headerName: "Enable", type: "boolean", width: 100 },
        ],
        []
    );

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded style={{ marginRight: "5px" }} /> List
                            </span>
                        }
                        wrapped
                    />
                    <Tab
                        disabled={!selectedItem}
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                            </span>
                        }
                    />
                </Tabs>
                <div style={{ flexGrow: 1 }} />
            </Box>
            <Box display="flex" alignItems="flex-start">
                <Box flex={11}>
                    {activeTab === 0 && (
                        <BasePaper>
                            <BaseDataGrid
                                rows={items || []}
                                cols={gridColumns}
                                onRowSelected={(d) => {
                                    setSelectedItem(d);
                                    setActiveTab(1);
                                }}
                                height={"79vh"}
                            />
                        </BasePaper>
                    )}
                    {activeTab === 1 && <Details selectedRow={selectedItem} />}
                </Box>
            </Box>
        </Box>
    );
};

export default Inventory;
