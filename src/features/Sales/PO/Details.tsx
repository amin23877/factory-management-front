import React, { useState, useMemo, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GridColumns, GridColDef } from "@material-ui/data-grid";

import EditForm from "./EditForm";
import NoteModal from "../../Modals/NoteModals";
import DocModal from "../../Modals/DocumentModals";

import BaseDataGrid from "../../../app/BaseDataGrid";
import Button from "../../../app/Button";

import { IPO } from "../../../api/po";
import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";
import { Box, useMediaQuery } from "@material-ui/core";
import { BasePaper } from "../../../app/Paper";

const style = {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "3px 0px 10px 5px ",
};

export default function Details({
    poData,
    onDone,
    notes,
    docs,
    onNoteSelected,
    onDocSelected,
}: {
    poData: IPO;
    onNoteSelected: (d: any) => void;
    onDocSelected: (d: any) => void;
    onDone: () => void;
    notes: any;
    docs: any;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [addNote, setAddNote] = useState(false);
    const [addDoc, setAddDoc] = useState(false);

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "index", headerName: "Sort" },
            { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row.ItemId?.name, width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "quantity", headerName: "QTY", width: 90 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
            { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row.quantity, width: 200 },
        ],
        []
    );

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

    const docCols = useMemo<GridColDef[]>(
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
    const phone = useMediaQuery("(max-width:600px)");

    return (
        <Fragment>
            {poData && poData.id && (
                <NoteModal open={addNote} onClose={() => setAddNote(false)} itemId={poData.id as any} model="po" />
            )}
            {poData && poData.id && (
                <DocModal open={addDoc} onClose={() => setAddDoc(false)} itemId={poData.id} model="po" />
            )}
            <Box pb="8px" display="flex" style={phone ? { gap: 10, flexDirection: "column" } : { gap: 10 }}>
                <Box flex={3}>
                    <EditForm poData={poData} onDone={onDone} />
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
                        <Tab label="Documents" />
                        <Tab label="Notes" />
                        <Tab label="Auditing" />
                    </Tabs>
                    <BasePaper>
                        {activeTab === 0 && (
                            <BaseDataGrid cols={LICols} rows={docs} onRowSelected={onDocSelected} height="60vh" />
                        )}
                        {activeTab === 1 && (
                            <Fragment>
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
                                    rows={docs}
                                    onRowSelected={onDocSelected}
                                    height="54.4vh"
                                />
                            </Fragment>
                        )}
                        {activeTab === 2 && (
                            <Fragment>
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
                                    rows={notes}
                                    onRowSelected={onNoteSelected}
                                    height="54.4vh"
                                />
                            </Fragment>
                        )}
                    </BasePaper>
                </Box>
            </Box>
        </Fragment>
    );
}
