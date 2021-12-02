import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { GridColDef } from "@material-ui/data-grid";
import useSwr from "swr";
import { formatTimestampToDate } from "../../../logic/date";
import { Tab, Tabs } from "@material-ui/core";
import { ListAltRounded } from "@material-ui/icons";
import { BasePaper } from "../../../app/Paper";
import DataGrid from "../../../app/NewDataGrid";

function Index() {
    const { data: man } = useSwr("/engineering/manufacturing/task");
    const { data: evaluation } = useSwr("/engineering/eval/task");
    const { data: test } = useSwr("/engineering/test/task");
    const [activeTab, setActiveTab] = useState(0);
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        if (man && evaluation && test) {
            const newMan = man?.result.map((i: any) => ({ ...i, type: "Manufacturing" }));
            const newEval = evaluation?.result.map((i: any) => ({ ...i, type: "Evaluation" }));
            const newTest = test?.result.map((i: any) => ({ ...i, type: "Test" }));
            let combinedArray1 = newMan.concat(newEval);
            let done = combinedArray1.concat(newTest);
            setTaskList(done);
        }
    }, [man, evaluation, test]);

    const tasksCols = [
        {
            name: "assginDate",
            header: "Date Assigned",
            minWidth: 120,
            type: "date",
        },
        {
            name: "Task Number",
            render: ({ data }: any) => data?.EngEvalTaskId?.id || data?.EngManTaskId?.id || data?.EngTestTaskId?.id,
            minWidth: 120,
        },
        {
            name: "Task Name",
            render: ({ data }: any) =>
                data?.EngEvalTaskId?.name || data?.EngManTaskId?.name || data?.EngTestTaskId?.name,
            minWidth: 120,
        },
        {
            name: "Task Description",
            render: ({ data }: any) =>
                data?.EngEvalTaskId?.description || data?.EngManTaskId?.description || data?.EngTestTaskId?.description,
            minWidth: 130,
        },
        { name: "Unit", render: ({ data }: any) => data?.UnitId?.number, minWidth: 100 },
        { name: "Assign", render: ({ data }: any) => data?.UnitId?.assignee?.username, minWidth: 100 },
        { name: "Device", render: ({ data }: any) => data?.UnitId?.ItemId?.no, minWidth: 110 },
        { name: "SO NO.", render: ({ data }: any) => data?.UnitId?.LineItemRecordId?.SOId?.number, minWidth: 100 },
        {
            name: "Est. Ship Date",
            render: ({ data }: any) => formatTimestampToDate(data?.UnitId?.LineItemRecordId?.SOId?.estimatedShipDate),
            minWidth: 130,
        },
        { name: "Production Status", render: ({ data }: any) => data?.UnitId?.productionStatus, minWidth: 140 },
        { name: "Package", headerName: "Package", minWidth: 100 }, // touch later
        { name: "Status", render: ({ data }: any) => data?.UnitId?.status, minWidth: 100 },
        { name: "Time Left", render: ({ data }: any) => data?.UnitId?.timeLeft, minWidth: 120 },
    ];

    const taskListCols: GridColDef[] = [
        { field: "Task Number", headerName: "Task Number", flex: 1 },
        { field: "Task Name", headerName: "Task Name", flex: 1 },
        { field: "Task Description", headerName: "Task Description", flex: 1 },
        { field: "Device", headerName: "Device", flex: 1 },
        { field: "Type", headerName: "Type", flex: 1 },
    ];

    return (
        <BasePaper>
            <Box display="flex">
                <Tabs
                    textColor="primary"
                    style={{ marginBottom: "1em" }}
                    value={activeTab}
                    onChange={(e, nv) => setActiveTab(nv)}
                >
                    <Tab
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded style={{ marginRight: "5px" }} /> Tasks
                            </span>
                        }
                        wrapped
                    />
                    <Tab
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded style={{ marginRight: "5px" }} /> Task List
                            </span>
                        }
                        wrapped
                    />
                </Tabs>
                <div style={{ flex: 1 }}></div>
            </Box>
            {activeTab === 0 && <DataGrid columns={tasksCols} url="/prodTask" onRowSelected={(d) => {}} />}
            {activeTab === 1 && (
                <BaseDataGrid cols={taskListCols} rows={taskList || []} onRowSelected={(d) => {}} height={580} />
            )}
        </BasePaper>
    );
}

export default Index;
