import React, { useState, useEffect } from "react";
import { Box, Button, Tabs, Tab, makeStyles, LinearProgress } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import { useSelector } from "react-redux";
import { deleteQuoteThunk, selectQuotes } from "./quoteSlice";
import { useAppDispatch } from "../../store";

import { INote, getAllModelNotes } from "../../api/note";
import { IDocument, getAllModelDocuments } from "../../api/document";
import { deleteQuote, getLineItems, IQuote } from "../../api/quote";
import { getQuoteActivities } from "../../api/activity";
import { ILineItem } from "../../api/lineItem";

import BaseDataGrid from "../../app/BaseDataGrid";
import EditTab from "./EditTab";

import Confirm from "../Modals/Confirm";
import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import LineItemModal from "./LineItemModals";

import AddQuote from "./AddQuote"
import AddQuoteModal from "./General";
import { BasePaper } from "../../app/Paper";
import { unwrapResult } from "@reduxjs/toolkit";
import AddLineServiceModal from "../LineService";
import { ILineService } from "../../api/lineService";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../api";



const useStyles = makeStyles({
    TabContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        margin: "0.5em",
        padding: "0.5em",
    },
});

export default function QuotePanel() {
    const { data: quotes, mutate: mutateQuotes } = useSWR("/quote", fetcher);

    const [activeTab, setActiveTab] = useState(0);
    const [lineItems, setLineItems] = useState([]);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [activities, setActivities] = useState([]);
    const [lines, setLines] = useState([]);

    const [selectedQuote, setSelectedQuote] = useState<IQuote>();
    const [selectedLI, setSelectedLI] = useState<ILineItem>();
    const [selectedLS, setSelectedLS] = useState<ILineService>();
    const [selectedNote, setSelectedNote] = useState<INote>();
    const [selectedDoc, setSelectedDocs] = useState<IDocument>();

    const [addQ, setAddQ] = useState(false);

    const [addLineItem, setAddLineItem] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [addDoc, setAddDoc] = useState(false);
    const [editLineItem, setEditLineItem] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [editDoc, setEditDoc] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [lineServiceModal, setLineServiceModal] = useState(false);
    const [compQ, setCompQ] = useState<any>();

    const classes = useStyles();

    const quoteCols: GridColDef[] = [
        { field: "entryDate", width: 150 },
        { field: "expireDate", width: 150 },
        { field: "quoteStatus", width: 150 },
    ];

    const refreshActivities = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getQuoteActivities(selectedQuote?.id);
                setActivities(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshNotes = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getAllModelNotes("quote", selectedQuote.id);
                setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getAllModelDocuments("quote", selectedQuote.id);
                setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshLineItems = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getLineItems(selectedQuote?.id);
                setLineItems(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshLineItems();
        refreshNotes();
        refreshDocs();
        refreshActivities();
    }, [selectedQuote]);

    const handleDelete = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await deleteQuote(selectedQuote.id);
                if (resp) {
                    mutateQuotes();
                }
                setConfirm(false);
                setActiveTab(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
            <AddQuote
                open={addQ}
                onClose={() => setAddQ(false)}
                initialData={compQ}
                onDone={() => {
                    // refreshPOs();
                    setActiveTab(0);
                    setLines([]);
                }} />
            <LineItemModal open={addLineItem} onClose={() => setAddLineItem(false)} quoteId={selectedQuote?.id} onDone={refreshLineItems} />
            {selectedQuote && selectedQuote.id && (
                <NoteModal itemId={selectedQuote.id} model="quote" open={addNote} onClose={() => setAddNote(false)} onDone={refreshNotes} />
            )}
            {selectedQuote && selectedQuote.id && (
                <DocumentModal
                    itemId={selectedQuote.id}
                    model="quote"
                    open={addDoc}
                    onClose={() => setAddDoc(false)}
                    onDone={refreshDocs}
                />
            )}
            {selectedNote && selectedQuote && selectedQuote?.id && (
                <NoteModal
                    noteData={selectedNote}
                    itemId={selectedQuote?.id}
                    model="quote"
                    open={editNote}
                    onClose={() => setEditNote(false)}
                    onDone={refreshNotes}
                />
            )}
            {selectedDoc && selectedQuote && selectedQuote?.id && (
                <DocumentModal
                    docData={selectedDoc}
                    itemId={selectedQuote?.id}
                    model="quote"
                    open={editDoc}
                    onClose={() => setEditDoc(false)}
                    onDone={refreshDocs}
                />
            )}
            {selectedLI && (
                <LineItemModal
                    LIData={selectedLI}
                    open={editLineItem}
                    onClose={() => setEditLineItem(false)}
                    quoteId={selectedQuote?.id}
                    onDone={refreshLineItems}
                />
            )}
            {selectedQuote && selectedQuote.id && (
                <AddLineServiceModal
                    open={lineServiceModal}
                    onClose={() => setLineServiceModal(false)}
                    record="Quote"
                    recordId={selectedQuote.id}
                    onDone={mutateQuotes}
                    selectedLine={selectedLS}
                />
            )}

            <Box display="flex" alignItems="center" style={{ marginBottom: "5px" }}>
                <Button onClick={() => setAddQ(true)}>Add Quote</Button>
                {selectedQuote ? (
                    <div>
                        <Button onClick={() => setConfirm(true)} disabled={!selectedQuote}>
                            Delete Quote
                        </Button>
                        <Button onClick={() => setAddLineItem(true)} disabled={!selectedQuote} style={{ margin: "0 0.5em" }}>
                            Add Line item
                        </Button>
                        <Button onClick={() => setLineServiceModal(true)} disabled={!selectedQuote} style={{ margin: "0 0.5em" }}>
                            Add Line Service
                        </Button>
                        <Button onClick={() => setAddNote(true)} disabled={!selectedQuote} style={{ marginRight: "0.5em" }}>
                            Add Note
                        </Button>
                        <Button
                            style={{ backgroundColor: "#1a73e8", color: "#fff", marginLeft: "5px" }}
                            onClick={() => setAddDoc(true)}
                            disabled={!selectedQuote}
                        >
                            <AddRoundedIcon />
                            Add Document
                        </Button>
                    </div>
                ) : null}
                <div style={{ flexGrow: 1 }} />
            </Box>

            <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="List" />
                <Tab label="Details" disabled={!selectedQuote} />
            </Tabs>
            <Box className={classes.TabContainer}>
                {!quotes && <LinearProgress />}
                {activeTab === 0 && quotes && (
                    <BaseDataGrid
                        cols={quoteCols}
                        rows={quotes}
                        onRowSelected={(d) => {
                            setSelectedQuote(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedQuote && (
                    <EditTab
                        onLISelected={(d) => {
                            setSelectedLI(d);
                            setEditLineItem(true);
                        }}
                        onNoteSelected={(d) => {
                            setSelectedNote(d);
                            setEditNote(true);
                        }}
                        onDocSelected={(d) => {
                            setSelectedDocs(d);
                            setEditDoc(true);
                        }}
                        activities={activities}
                        notes={notes}
                        docs={docs}
                        lineItems={lineItems}
                        selectedQuote={selectedQuote}
                    />
                )}
            </Box>
        </div>
    );
}
