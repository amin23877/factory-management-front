import React, { useState } from "react";

import Box from "@material-ui/core/Box";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { GridColDef } from "@material-ui/data-grid";
import useSwr from "swr";
import { formatTimestampToDate } from "../../../logic/date";
import { Tab, Tabs } from "@material-ui/core";

function Index() {
    const { data: tasks } = useSwr("/");
    const { data: taskLists } = useSwr("/");
    const [activeTab, setActiveTab] = useState(0);

    const tasksCols: GridColDef[] = [
        {
            field: "Date Assigned",
            valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt),
            width: 120,
        },
        { field: "Task Number", headerName: "Task Number", width: 120 },
        { field: "Task Name", headerName: "Task Name", width: 120 },
        { field: "Task Description", headerName: "Task Description", width: 130 },
        { field: "Unit", headerName: "Unit", width: 100 },
        { field: "Assign", headerName: "Assign", width: 100 },
        { field: "Device", headerName: "Device", width: 110 },
        { field: "SO NO.", headerName: "SO NO.", width: 100 },
        { field: "Est. Ship Date", headerName: "Est. Ship Date", width: 130 },
        { field: "Production Status", headerName: "Production Status", width: 140 },
        { field: "Package Status", headerName: "Package Status", width: 135 },
        { field: "Time Left", headerName: "Time Left", width: 120 },
    ];

    const taskListCols: GridColDef[] = [
        { field: "Task Number", headerName: "Task Number", flex: 1 },
        { field: "Task Name", headerName: "Task Name", flex: 1 },
        { field: "Task Description", headerName: "Task Description", flex: 1 },
        { field: "Device", headerName: "Device", flex: 1 },
        { field: "Type", headerName: "Type", flex: 1 },
    ];

    return (
        <Box>
            <Box display="flex">
                <Tabs
                    textColor="primary"
                    style={{ marginBottom: "1em" }}
                    value={activeTab}
                    onChange={(e, nv) => setActiveTab(nv)}
                >
                    <Tab label="Tasks" />
                    <Tab label="Task List" />
                </Tabs>
                <div style={{ flex: 1 }}></div>
            </Box>
            {activeTab === 0 && <BaseDataGrid cols={tasksCols} rows={[]} onRowSelected={(d) => {}} />}
            {activeTab === 1 && <BaseDataGrid cols={taskListCols} rows={[]} onRowSelected={(d) => {}} />}
        </Box>
    );
}

export default Index;
