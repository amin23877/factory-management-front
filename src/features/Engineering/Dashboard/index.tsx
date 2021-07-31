import React, { useState, useMemo } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";

import useSWR from "swr";

import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

import Reports from "./Report";
import { FieldModal, PurchaseModal } from "./Modals";
import { formatTimestampToDate } from "../../../logic/date";

export default function ENDashboard() {
    const [activeTab, setActiveTab] = useState(0);
    const [fieldOpen, setFieldOpen] = useState(false);
    const [purchaseOpen, setPurchaseOpen] = useState(false);
    const [selectedField, setSelectedField] = useState();
    const [selectedPurchase, setSelectedPurchase] = useState();

    const { data: engAp } = useSWR("/engapp");
    const { data: FSH } = useSWR("/fsh");

    const EACols = useMemo<GridColumns>(
        () => [
            // { field: "date", headerName: "Date", flex: 2 },
            // { field: "so", headerName: "SO", flex: 1 },
            // { field: "unit", headerName: "Unit", flex: 1 },
            { field: "no", headerName: "Device ID", flex: 2, valueFormatter: (params) => params.row?.ItemId?.no },
            { field: "note", headerName: "Note", flex: 1 },
            {
                field: "EA",
                headerName: "E.A.",
                flex: 1,
                type: "boolean",
                valueFormatter: (params) => params.row?.ItemId?.engineeringApproved,
            },
            { field: "priority", headerName: "Priority", flex: 1 },
        ],
        []
    );
    const FSCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                flex: 2,
                valueFormatter: (params) => formatTimestampToDate(params.row?.ticket?.createdAt),
            },
            { field: "so", headerName: "SO", flex: 1, valueFormatter: (params) => params.row?.so?.number },
            { field: "unit", headerName: "Unit", flex: 1, valueFormatter: (params) => params.row?.unit?.number },
            { field: "device", headerName: "Device ID", flex: 3, valueFormatter: (params) => params.row?.item?.no },
            { field: "note", headerName: "Note", flex: 1, valueFormatter: (params) => params.row?.ticket?.note },
            { field: "done", headerName: "Done", flex: 1, valueFormatter: (params) => params.row?.fsh?.done },
            {
                field: "priority",
                headerName: "Priority",
                flex: 1,
                valueFormatter: (params) => params.row?.fsh?.priority,
            },
        ],
        []
    );
    const PCols = useMemo<GridColumns>(
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
            {selectedField && <FieldModal open={fieldOpen} onClose={() => setFieldOpen(false)} help={selectedField} />}
            {selectedPurchase && (
                <PurchaseModal open={purchaseOpen} onClose={() => setPurchaseOpen(false)} help={selectedPurchase} />
            )}
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
                {activeTab === 1 && <BaseDataGrid rows={engAp || []} cols={EACols} onRowSelected={() => {}} />}
                {activeTab === 2 && (
                    <BaseDataGrid
                        rows={FSH || []}
                        cols={FSCols}
                        onRowSelected={(d) => {
                            setSelectedField(d);
                            setFieldOpen(true);
                        }}
                    />
                )}
                {activeTab === 3 && (
                    <BaseDataGrid
                        rows={[{ id: 256412 }] || []}
                        cols={PCols}
                        onRowSelected={(d) => {
                            setSelectedPurchase(d);
                            setPurchaseOpen(true);
                        }}
                    />
                )}
                {activeTab === 4 && <BaseDataGrid rows={[] || []} cols={QuestionCols} onRowSelected={() => {}} />}
                {activeTab === 5 && <BaseDataGrid rows={[] || []} cols={QCCols} onRowSelected={() => {}} />}
            </BasePaper>
        </Box>
    );
}
