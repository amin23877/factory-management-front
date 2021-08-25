import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box, makeStyles } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import Button from "../../../app/Button";

import EditForm from "./EditForm";

import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";

import { IQuote } from "../../../api/quote";
import { INote } from "../../../api/note";
import { IDocument } from "../../../api/document";
import { ILineItem } from "../../../api/lineItem";
import { ILineService } from "../../../api/lineService";
import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";
import LineItemModal from "../../LineItem";
import LineServiceModal from "../../LineService";

const useStyle = makeStyles({
    btn: {
        border: "1px solid gray ",
        borderRadius: "4px",
        padding: "5px 10px",
        margin: "3px 0px 10px 5px ",
    },
});

export default function EditTab({ selectedQuote }: { selectedQuote: IQuote }) {
    const classes = useStyle();
    const [activeTab, setActiveTab] = useState(0);

    const [noteModal, setNoteModal] = useState(false);
    const [documentModal, setDocumentModal] = useState(false);
    const [lineItemModal, setLineItemModal] = useState(false);
    const [lineServiceModal, setLineServiceModal] = useState(false);

    const [selectedLI, setSelectedLI] = useState<ILineItem>();
    const [selectedLS, setSelectedLS] = useState<ILineService>();
    const [selectedNote, setSelectedNote] = useState<INote>();
    const [selectedDoc, setSelectedDoc] = useState<IDocument>();

    const { data: lineItems } = useSWR<ILineItem[]>(activeTab === 0 ? `/lineitem?QuoteId=${selectedQuote.id}` : null);
    const { data: lineServices } = useSWR<ILineService[]>(
        activeTab === 1 ? `/lineservice?QuoteId=${selectedQuote.id}` : null
    );
    const { data: documents } = useSWR<IDocument[]>(activeTab === 2 ? `/document/quote/${selectedQuote.id}` : null);
    const { data: notes } = useSWR<INote[]>(activeTab === 4 ? `/note/quote/${selectedQuote.id}` : null);

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "index", headerName: "Sort" },
            { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row?.ItemId?.name, width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "quantity", headerName: "QTY", width: 90 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
            { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row?.quantity, width: 200 },
        ],
        []
    );

    const LSCols = useMemo<GridColumns>(
        () => [
            { field: "ServiceId", headerName: "Service", valueFormatter: (r) => r.row?.ServiceId?.name, flex: 1 },
            // { field: "LineItemRecordId",  width: 200 },
            { field: "quantity", headerName: "Quantity", width: 100 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
        ],
        []
    );

    const noteCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
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
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
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

    const quoteHistoryCols = useMemo<GridColumns>(
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

    return (
        <Box>
            <NoteModal
                itemId={selectedQuote.id}
                model="quote"
                open={noteModal}
                noteData={selectedNote}
                onClose={() => setNoteModal(false)}
            />
            <DocumentModal
                itemId={selectedQuote.id}
                model="quote"
                open={documentModal}
                docData={selectedDoc}
                onClose={() => setDocumentModal(false)}
            />
            <LineItemModal
                record="quote"
                recordId={selectedQuote?.id}
                open={lineItemModal}
                onClose={() => setLineItemModal(false)}
                mutateField="QuoteId"
                selectedLine={selectedLI}
            />
            <LineServiceModal
                record="quote"
                recordId={selectedQuote?.id}
                open={lineServiceModal}
                onClose={() => setLineServiceModal(false)}
                mutateField="QuoteId"
                selectedLine={selectedLS}
            />

            <EditForm selectedQuote={selectedQuote} />
            <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Line Item" />
                <Tab label="Line Services" />
                <Tab label="Document" />
                <Tab label="Quote history" />
                <Tab label="Note" />
                <Tab label="Auditing" />
            </Tabs>
            <Box p={2}>
                {activeTab === 0 && (
                    <>
                        <Button
                            onClick={() => {
                                setSelectedLI(undefined);
                                setLineItemModal(true);
                            }}
                            className={classes.btn}
                        >
                            + Add Line Item
                        </Button>
                        <BaseDataGrid
                            cols={LICols}
                            rows={lineItems || []}
                            onRowSelected={(r) => {
                                setSelectedLI(r);
                                setLineItemModal(true);
                            }}
                            height={300}
                        />
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <Button
                            onClick={() => {
                                setSelectedLS(undefined);
                                setLineServiceModal(true);
                            }}
                            className={classes.btn}
                        >
                            + Add Line Service
                        </Button>
                        <BaseDataGrid
                            cols={LSCols}
                            rows={lineServices || []}
                            onRowSelected={(r) => {
                                setSelectedLS(r);
                                setLineServiceModal(true);
                            }}
                            height={300}
                        />
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <Button
                            onClick={() => {
                                setSelectedDoc(undefined);
                                setDocumentModal(true);
                            }}
                            className={classes.btn}
                        >
                            + Add Document
                        </Button>
                        <BaseDataGrid
                            cols={docCols}
                            rows={documents || []}
                            onRowSelected={(r) => {
                                setSelectedDoc(r);
                                setDocumentModal(true);
                            }}
                            height={300}
                        />
                    </>
                )}
                {activeTab === 3 && (
                    <BaseDataGrid cols={quoteHistoryCols} rows={[]} onRowSelected={() => {}} height={300} />
                )}
                {activeTab === 4 && (
                    <>
                        <Button
                            onClick={() => {
                                setSelectedNote(undefined);
                                setNoteModal(true);
                            }}
                            className={classes.btn}
                        >
                            + Add Note
                        </Button>
                        <BaseDataGrid
                            cols={noteCols}
                            rows={notes || []}
                            onRowSelected={(r) => {
                                setSelectedNote(r);
                                setNoteModal(true);
                            }}
                            height={300}
                        />
                    </>
                )}
                {activeTab === 5 && <div>Auditing</div>}
            </Box>
        </Box>
    );
}
