import React, { useState, useMemo } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";
import Reports from "./Report";
import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

export default function ENDashboard() {
    const [activeTab, setActiveTab] = useState(0);

    const EACols: GridColDef[] = useMemo(
        () => [
            { field: "date", headerName: "Date", flex: 2 },
            { field: "so", headerName: "SO", flex: 1 },
            { field: "unit", headerName: "Unit", flex: 1 },
            { field: "device", headerName: "Device ID", flex: 3 },
            { field: "note", headerName: "Note", flex: 1 },
            { field: "EA", headerName: "E.A.", flex: 1 },
            { field: "priority", headerName: "Priority", flex: 1 },
        ],
        []
    );
    const HelpCols: GridColDef[] = useMemo(
        () => [
            { field: "date", headerName: "Date", flex: 2 },
            { field: "so", headerName: "SO", flex: 1 },
            { field: "unit", headerName: "Unit", flex: 1 },
            { field: "device", headerName: "Device ID", flex: 3 },
            { field: "note", headerName: "Note", flex: 1 },
            { field: "done", headerName: "Done", flex: 1 },
            { field: "priority", headerName: "Priority", flex: 1 },
        ],
        []
    );
    const QuestionCols: GridColDef[] = useMemo(
        () => [
            { field: "date", headerName: "Date", flex: 2 },
            { field: "department", headerName: "Department", flex: 2 },
            { field: "question", headerName: "Question", flex: 4 },
            { field: "note", headerName: "Note", flex: 2 },
            { field: "priority", headerName: "Priority", flex: 1 },
        ],
        []
    );
    const QCCols: GridColDef[] = useMemo(
        () => [
            { field: "date", headerName: "Date", flex: 2 },
            { field: "FlagId", headerName: "Flag ID", flex: 2 },
            { field: "section", headerName: "Section", flex: 2 },
            { field: "so", headerName: "SO", flex: 1 },
            { field: "unit", headerName: "Unit", flex: 1 },
            { field: "note", headerName: "Note", flex: 3 },
        ],
        []
    );

    return (
        <Box>
            <BasePaper>
                <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                    <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                        <Tab label="Report" />
                        <Tab label="EN. Approval" />
                        <Tab label="F.S. Help" />
                        <Tab label="Purchasing Help" />
                        <Tab label="Questions" />
                        <Tab label="Quality Control" />
                    </Tabs>
                    <div style={{ flexGrow: 1 }} />
                </Box>
                {activeTab === 0 && <Reports />}
                {activeTab === 1 && <BaseDataGrid rows={[] || []} cols={EACols} onRowSelected={() => {}} />}
                {activeTab === 2 && <BaseDataGrid rows={[] || []} cols={HelpCols} onRowSelected={() => {}} />}
                {activeTab === 3 && <BaseDataGrid rows={[] || []} cols={HelpCols} onRowSelected={() => {}} />}
                {activeTab === 4 && <BaseDataGrid rows={[] || []} cols={QuestionCols} onRowSelected={() => {}} />}
                {activeTab === 5 && <BaseDataGrid rows={[] || []} cols={QCCols} onRowSelected={() => {}} />}
            </BasePaper>
        </Box>
    );
}
