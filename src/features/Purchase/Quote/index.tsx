import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, PrintRounded } from "@material-ui/icons";
import { GridColDef } from "@material-ui/data-grid";

import List from "../../../app/SideUtilityList";
import BaseDataGrid from "../../../app/BaseDataGrid";

import NoteModal from "../../Modals/NoteModals";
import DocumentsModal from "../../Modals/DocumentModals";
import AddPQuoteModal from "./AddPQuoteModal";
import Details from "./Details";

import { deletePurchaseQuote, getPurchaseQuotes, IPurchaseQuote } from "../../../api/purchaseQuote";
import Confirm from "../../Modals/Confirm";
import { getAllModelNotes } from "../../../api/note";
import { getAllModelDocuments } from "../../../api/document";
import { formatTimestampToDate } from "../../../logic/date";

function Index() {
    const [activeTab, setActiveTab] = useState(0);
    const [addPQ, setAddPQ] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [pqs, setPqs] = useState([]);

    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);

    const [selNote, setSelNote] = useState<any>();
    const [selDoc, setSelDoc] = useState<any>();
    const [selPQ, setSelPQ] = useState<IPurchaseQuote>();
    // Date	Quote Number	Vendor	SO 	Staff	Contact

    const cols: GridColDef[] = [
        {
            field: "Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.date),
            flex: 1,
        },
        { field: "senderNumber", headerName: "Quote NO.", flex: 1 },
        { field: "Vendor", flex: 1, valueFormatter: (r) => r.row?.VendorId?.name },
        { field: "SO", flex: 1, valueFormatter: (r) => r.row?.SOId?.number },
        { field: "Staff", flex: 1, valueFormatter: (r) => r.row?.EmployeeId?.username },
        { field: "contactName", headerName: "Contact", flex: 1 },
    ];

    const refreshPQs = async () => {
        try {
            const resp = await getPurchaseQuotes();
            resp && setPqs(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selPQ && selPQ.id) {
                const resp = await deletePurchaseQuote(selPQ.id);
                if (resp) {
                    refreshPQs();
                    setConfirm(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const refreshNotes = async () => {
        try {
            if (selPQ && selPQ.id) {
                const resp = await getAllModelNotes("purchaseQuote", selPQ.id);
                resp && !resp.error && setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selPQ && selPQ.id) {
                const resp = await getAllModelDocuments("purchaseQuote", selPQ.id);
                resp && !resp.error && setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeTab == 1) {
            refreshNotes();
            refreshDocs();
        }
    }, [activeTab]);

    useEffect(() => {
        refreshPQs();
    }, []);

    return (
        <Box display="grid" gridTemplateColumns="1fr 11fr">
            <AddPQuoteModal open={addPQ} onClose={() => setAddPQ(false)} onDone={refreshPQs} />
            {selPQ && (
                <Confirm
                    open={confirm}
                    onClose={() => setConfirm(false)}
                    onConfirm={handleDelete}
                    text={`Are you sure? You are going to delete purchase quote ${selPQ?.number}`}
                />
            )}
            {selPQ && selPQ.id && (
                <NoteModal
                    itemId={selPQ.id}
                    model="purchaseQuote"
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    noteData={selNote}
                    onDone={refreshNotes}
                />
            )}
            {selPQ && selPQ.id && (
                <DocumentsModal
                    itemId={selPQ.id}
                    model="purchaseQuote"
                    open={docModal}
                    onClose={() => setDocModal(false)}
                    docData={selDoc}
                    onDone={refreshDocs}
                />
            )}

            <Box>
                <List>
                    <ListItem>
                        <IconButton
                            onClick={() => {
                                setActiveTab(0);
                                setSelPQ(undefined);
                                setAddPQ(true);
                            }}
                        >
                            <AddRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton onClick={() => setConfirm(true)}>
                            <DeleteRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton>
                            <PrintRounded />
                        </IconButton>
                    </ListItem>
                </List>
            </Box>
            <Box>
                <Tabs
                    style={{ marginBottom: "1em" }}
                    textColor="primary"
                    value={activeTab}
                    onChange={(e, nv) => setActiveTab(nv)}
                >
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selPQ} />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={cols}
                        rows={pqs}
                        onRowSelected={(d) => {
                            setSelPQ(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selPQ && (
                    <Details
                        initialValues={selPQ}
                        onDone={refreshPQs}
                        notes={notes}
                        docs={docs}
                        onNoteSelected={(d) => {
                            setSelNote(d);
                            setNoteModal(true);
                        }}
                        onDocumentSelected={(d) => {
                            setSelDoc(d);
                            setDocModal(true);
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default Index;
