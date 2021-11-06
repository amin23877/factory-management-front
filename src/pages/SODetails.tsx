import React, { useMemo, useState } from "react";
import { Box, LinearProgress } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useSWR from "swr";

import Button from "../app/Button";
import BaseDataGrid from "../app/BaseDataGrid";
import { BasePaper } from "../app/Paper";

import EditForm from "../features/Sales/SO/EditForm";

import { ISO } from "../api/so";
import { formatTimestampToDate } from "../logic/date";
import { fileType } from "../logic/fileType";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import { useParams } from "react-router";

const style = {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "3px 0px 10px 5px ",
};

export default function EditTab({
    // selectedSo,
    onLineItemSelected,
    onLineServiceSelected,
    onNoteSelected,
    onDocSelected,
}: {
    // selectedSo: ISO;
    onLineItemSelected: (a: any) => void;
    onLineServiceSelected: (a: any) => void;
    onNoteSelected: (a: any) => void;
    onDocSelected: (a: any) => void;
}) {
    const { soNumber } = useParams<{ soNumber: string }>();
    const { data: selectedSo } = useSWR<ISO>(soNumber ? `/so/${soNumber}` : null);

    const { data: notes } = useSWR(selectedSo && selectedSo.id ? `/note/so/${selectedSo.id}` : null);
    const { data: documents } = useSWR(selectedSo && selectedSo.id ? `/document/so/${selectedSo.id}` : null);
    const { data: lineItems } = useSWR(selectedSo && selectedSo.id ? `/lineitem?SOId=${selectedSo.id}` : null);
    // const { data: lineServices } = useSWR(selectedSo && selectedSo.id ? `/lineservice?SOId=${selectedSo.id}` : null);

    const [activeTab, setActiveTab] = useState(0);
    const [addNote, setAddNote] = useState(false);
    const [addDoc, setAddDoc] = useState(false);

    const noteCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
                width: 120,
            },
            {
                field: "creator",
                headerName: "Creator",
                width: 180,
                valueFormatter: (params) => params.row?.EmployeeId?.username,
            },
            { field: "subject", headerName: "Subject", width: 300 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    const docCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
                width: 120,
            },
            {
                field: "EmployeeId",
                headerName: "Creator",
                valueFormatter: (params) => params.row?.employee?.username,
                width: 120,
            },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "id", headerName: "ID", width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            {
                field: "type",
                headerName: "File Type",
                valueFormatter: (params) => fileType(params.row?.path),
                width: 120,
            },
        ],
        []
    );

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "index", headerName: "Sort", width: 60, disableColumnMenu: true },
            { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row?.ItemId?.no, width: 200 },
            { field: "description", headerName: "Description", width: 150, disableColumnMenu: true },
            { field: "quantity", headerName: "QTY", width: 90 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
            { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row?.quantity, width: 80 },
            { field: "invoice", headerName: "Invoice", width: 100 },
        ],
        []
    );

    const unitCols: GridColumns = useMemo(
        () => [
            { field: "number", headerName: "Unit ID", width: 100 },
            {
                field: "UnitSerialNo",
                headerName: "Unit Serial No.",
                valueFormatter: (r) => r.row?.device?.number,
                width: 130,
            },
            // { field: "LineItemRecordId",  width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "model", headerName: "Model", width: 120 },
            { field: "shippingDate", headerName: "Estimated SD.", width: 150 },
        ],
        []
    );
    const FSCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
                width: 120,
            },
            { field: "number", headerName: "Ticket ID", width: 130 },
            { field: "subject", headerName: "Subject", flex: 1 },
            {
                field: "unit",
                headerName: "Unit",
                valueFormatter: (params) => params.row?.unit?.number,
                width: 120,
            },
            { field: "AssignedTo", headerName: "Assigned To", width: 120 },
            { field: "contact", headerName: "Contact", width: 120 },
            { field: "status", headerName: "Status", width: 120 },
        ],
        []
    );
    const activityCols = useMemo<GridColumns>(
        () => [
            { field: "startTime", headerName: "Entry Date", width: 150, type: "date" },
            { field: "number", headerName: "Quote ID", flex: 1 },
            { field: "project", headerName: "Project Name", flex: 1 },
            { field: "quotedBy", headerName: "Quoted By", flex: 1 },
            { field: "requestedBy", headerName: "Requested By", flex: 1 },
            { field: "note", headerName: "Note" },
        ],
        []
    );
    const shipCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Target Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
                flex: 1,
            },
            {
                field: "actualDate",
                headerName: "Actual Date",
                flex: 1,
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
            },
            { field: "number", headerName: "Shipment No.", flex: 2 },
            {
                field: "carrier",
                headerName: "Carrier",
                flex: 1,
            },
            { field: "deliveryMethod", headerName: "Delivery Method", flex: 1 },
            { field: "trackingNumber", headerName: "Tracking No.", flex: 1 },
        ],
        []
    );
    if (!selectedSo) {
        return <LinearProgress />;
    }
    return (
        <>
            {selectedSo && selectedSo.id && (
                <NoteModal open={addNote} onClose={() => setAddNote(false)} itemId={selectedSo.id} model="so" />
            )}
            {selectedSo && selectedSo.id && (
                <DocumentModal open={addDoc} onClose={() => setAddDoc(false)} itemId={selectedSo.id} model="so" />
            )}
            <Box pb="8px" display="flex" style={{ gap: 10 }}>
                <Box flex={3}>
                    <EditForm selectedSo={selectedSo} />
                </Box>
                <Box flex={4}>
                    <Tabs
                        style={{ margin: "1em 0" }}
                        textColor="primary"
                        value={activeTab}
                        onChange={(e, nv) => setActiveTab(nv)}
                        variant="scrollable"
                    >
                        <Tab label="Line Items" />
                        <Tab label="Units" />
                        <Tab label="Documents" />
                        <Tab label="Activities" />
                        <Tab label="Shipment" />
                        <Tab label="Field Services" />
                        <Tab label="Notes" />
                        <Tab label="Auditing" />
                    </Tabs>
                    <BasePaper style={{ height: "85%" }}>
                        {activeTab === 0 && (
                            <BaseDataGrid
                                cols={LICols}
                                rows={lineItems || []}
                                onRowSelected={onLineItemSelected}
                                height="100%"
                            />
                        )}
                        {activeTab === 1 && (
                            <BaseDataGrid
                                cols={unitCols}
                                rows={lineItems || []}
                                onRowSelected={onLineItemSelected}
                                height="100%"
                            />
                        )}
                        {activeTab === 2 && (
                            <>
                                <Button
                                    onClick={() => {
                                        setAddDoc(true);
                                    }}
                                    style={style}
                                >
                                    + Add Document
                                </Button>
                                <BaseDataGrid
                                    cols={docCols}
                                    rows={documents || []}
                                    onRowSelected={onDocSelected}
                                    height="90%"
                                />
                            </>
                        )}
                        {activeTab === 3 && (
                            <BaseDataGrid
                                cols={activityCols}
                                rows={documents || []}
                                onRowSelected={() => {}}
                                height="100%"
                            />
                        )}
                        {activeTab === 4 && (
                            <BaseDataGrid
                                cols={shipCols}
                                rows={documents || []}
                                onRowSelected={() => {}}
                                height="100%"
                            />
                        )}
                        {activeTab === 5 && (
                            <BaseDataGrid cols={FSCols} rows={[]} onRowSelected={onLineServiceSelected} height="100%" />
                        )}
                        {activeTab === 6 && (
                            <>
                                <Button
                                    onClick={() => {
                                        setAddNote(true);
                                    }}
                                    style={style}
                                >
                                    + Add Note
                                </Button>
                                <BaseDataGrid
                                    cols={noteCols}
                                    rows={notes || []}
                                    onRowSelected={onNoteSelected}
                                    height="90%"
                                />
                            </>
                        )}
                    </BasePaper>
                </Box>
            </Box>
        </>
    );
}
