import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { GridColDef } from "@material-ui/data-grid";
import useSwr from "swr";
import { formatTimestampToDate } from "../../../logic/date";
import { Tab, Tabs } from "@material-ui/core";

function Index() {
    const { data: tasks } = useSwr("/prodtask");
    const { data: man } = useSwr("/engineering/manufacturing/task");
    const { data: evaluation } = useSwr("/engineering/eval/task");
    const { data: test } = useSwr("/engineering/test/task");
    const [activeTab, setActiveTab] = useState(0);
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        if (man && evaluation && test) {
            const newMan = man.map((i: any) => ({ ...i, type: "Manufacturing" }));
            const newEval = evaluation.map((i: any) => ({ ...i, type: "Evaluation" }));
            const newTest = test.map((i: any) => ({ ...i, type: "Test" }));
            let combinedArray1 = newMan.concat(newEval);
            let done = combinedArray1.concat(newTest);
            setTaskList(done);
        }
    }, [man, evaluation, test]);

    const tasksCols: GridColDef[] = [
        {
            field: "Date Assigned",
            valueFormatter: (r) => formatTimestampToDate(r.row?.assginDate),
            width: 120,
        },
        {
            field: "Task Number",
            valueFormatter: (r) => r.row?.EngEvalTaskId?.id || r.row?.EngManTaskId?.id || r.row?.EngTestTaskId?.id,
            width: 120,
        },
        {
            field: "Task Name",
            valueFormatter: (r) =>
                r.row?.EngEvalTaskId?.name || r.row?.EngManTaskId?.name || r.row?.EngTestTaskId?.name,
            width: 120,
        },
        {
            field: "Task Description",
            valueFormatter: (r) =>
                r.row?.EngEvalTaskId?.description ||
                r.row?.EngManTaskId?.description ||
                r.row?.EngTestTaskId?.description,
            width: 130,
        },
        { field: "Unit", valueFormatter: (r) => r.row?.UnitId?.number, width: 100 },
        { field: "Assign", valueFormatter: (r) => r.row?.UnitId?.assignee?.username, width: 100 },
        { field: "Device", valueFormatter: (r) => r.row?.UnitId?.ItemId?.no, width: 110 },
        { field: "SO NO.", valueFormatter: (r) => r.row?.UnitId?.LineItemRecordId?.SOId?.number, width: 100 },
        {
            field: "Est. Ship Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.UnitId?.LineItemRecordId?.SOId?.estimatedShipDate),
            width: 130,
        },
        { field: "Production Status", valueFormatter: (r) => r.row?.UnitId?.productionStatus, width: 140 },
        { field: "Package", headerName: "Package", width: 100 }, // touch later
        { field: "Status", valueFormatter: (r) => r.row?.UnitId?.status, width: 100 },
        { field: "Time Left", valueFormatter: (r) => r.row?.UnitId?.timeLeft, width: 120 },
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
            {activeTab === 0 && <BaseDataGrid cols={tasksCols} rows={tasks || []} onRowSelected={(d) => {}} />}
            {activeTab === 1 && <BaseDataGrid cols={taskListCols} rows={taskList || []} onRowSelected={(d) => {}} />}
        </Box>
    );
}

export default Index;
