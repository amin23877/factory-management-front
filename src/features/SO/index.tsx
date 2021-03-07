import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { ColDef } from "@material-ui/data-grid";

import Confirm from "../Modals/Confirm";
import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import LineItemModal from "./LineItemModals";
import EditTab from "./EditTab";
import AddSOModal from "./AddSoModal";
import BaseDataGrid from "../../app/BaseDataGrid";

import { deleteSO, getSO, getLineItems, ISO } from "../../api/so";
import { getAllModelNotes } from "../../api/note";
import { getAllModelDocuments } from "../../api/document";
import { BasePaper } from "../../app/Paper";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

export default function SalesOrderPanel() {
    const [activeTab, setActiveTab] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [addSo, setAddSo] = useState(false);
    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [lineItemModal, setLineItemModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<any>();
    const [selectedDoc, setSelectedDoc] = useState<any>();
    const [selectedLI, setSelectedLI] = useState<any>();

    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [sos, setSos] = useState([]);
    const [lineItems, setLineIitems] = useState([]);
    const [selectedSO, setSelectedSO] = useState<ISO>();

    const cols: ColDef[] = [
        { field: "number" },
        { field: "Client", valueGetter: ({ data }) => (data.Client ? data.Client.name : "") },
        { field: "Project", valueGetter: ({ data }) => (data.Project ? data.Project.name : "") },
    ];

    const refreshSo = async () => {
        try {
            const resp = await getSO();
            setSos(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshNotes = async () => {
        try {
            if (selectedSO && selectedSO.id) {
                const resp = await getAllModelNotes("so", selectedSO.id);
                setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshLineItems = async () => {
        try {
            if (selectedSO && selectedSO.id) {
                const resp = await getLineItems(selectedSO.id);
                resp && setLineIitems(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selectedSO && selectedSO.id) {
                const resp = await getAllModelDocuments("so", selectedSO.id);
                setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selectedSO && selectedSO.id) {
                const resp = await deleteSO(selectedSO.id);
                if (resp) {
                    setActiveTab(0);
                    setSelectedSO(undefined);
                    refreshSo();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshSo();
    }, []);

    useEffect(() => {
        if (activeTab === 1) {
            refreshLineItems();
            refreshNotes();
            refreshDocs();
        }
    }, [activeTab]);

    return (
        <Box m={1}>
            {selectedSO && selectedSO.id && (
                <LineItemModal
                    open={lineItemModal}
                    onClose={() => setLineItemModal(false)}
                    soId={selectedSO.id}
                    LIData={selectedLI}
                    onDone={refreshLineItems}
                />
            )}
            {selectedSO && selectedSO.id && (
                <NoteModal
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    itemId={selectedSO.id}
                    model="so"
                    noteData={selectedNote}
                    onDone={refreshNotes}
                />
            )}
            {selectedSO && selectedSO.id && (
                <DocumentModal
                    open={docModal}
                    onClose={() => setDocModal(false)}
                    itemId={selectedSO.id}
                    model="so"
                    docData={selectedDoc}
                    onDone={refreshDocs}
                />
            )}

            <AddSOModal open={addSo} onClose={() => setAddSo(false)} onDone={refreshSo} />
            <Confirm
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`Are you sure, You are going to delete SO with number ${selectedSO?.number}`}
            />

            <Box mb={2} display="flex" alignItems="center">
                <Button onClick={() => setAddSo(true)}>Add SO</Button>
                <Button disabled={!selectedSO} onClick={() => setConfirm(true)}>
                    Delete SO
                </Button>
                {activeTab === 1 && (
                    <>
                        <Button
                            onClick={() => {
                                setSelectedLI(undefined);
                                setLineItemModal(true);
                            }}
                        >
                            Add Line Item
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedNote(undefined);
                                setNoteModal(true);
                            }}
                        >
                            Add Note
                        </Button>
                        <Button
                            style={{ backgroundColor: "#1a73e8", color: "#fff", marginLeft: "5px" }}
                            onClick={() => {
                                setSelectedDoc(undefined);
                                setDocModal(true);
                            }}
                        >
                            <AddRoundedIcon />
                            Add Document
                        </Button>
                    </>
                )}
                <div style={{ flexGrow: 1 }} />
            </Box>
            <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
                <Tabs style={{ marginBottom: "10px" }} value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Overview" />
                    <Tab label="Details" disabled={!selectedSO} />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={cols}
                        rows={sos}
                        onRowSelected={(d) => {
                            console.log(d);
                            setSelectedSO(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedSO && (
                    <EditTab
                        selectedSo={selectedSO}
                        onDone={refreshSo}
                        notes={notes}
                        docs={docs}
                        lineItems={lineItems}
                        onLineItemSelected={(d) => {
                            console.log(d);

                            setSelectedLI(d);
                            setLineItemModal(true);
                        }}
                        onNoteSelected={(d) => {
                            setSelectedNote(d);
                            setNoteModal(true);
                        }}
                        onDocSelected={(d) => {
                            setSelectedDoc(d);
                            setDocModal(true);
                        }}
                    />
                )}
            </BasePaper>
        </Box>
    );
}
