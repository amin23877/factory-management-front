import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ColDef } from "@material-ui/data-grid";

import { getPO, deletePO, IPO } from "../../api/po";
import { getAllModelNotes } from "../../api/note";
import { getAllModelDocuments } from "../../api/document";

import Confirm from "../Modals/Confirm";
import NoteModal from "../Modals/NoteModals";
import DocModal from "../Modals/DocumentModals";
import BaseDataGrid from "../../app/BaseDataGrid";
import Button from "../../app/Button";

import Details from "./Details";
import AddPOModal from "./AddPoModal";

export default function POPanel() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedPO, setSelectedPO] = useState<IPO>();
    const [pos, setPos] = useState([]);
    const [addPo, setAddPo] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);

    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<any>();
    const [selectedDoc, setSelectedDoc] = useState<any>();

    const poCols: ColDef[] = [{ field: "number" }];

    const refreshPOs = async () => {
        try {
            const resp = await getPO();
            setPos(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshNotes = async () => {
        try {
            if (selectedPO && selectedPO.id) {
                const resp = await getAllModelNotes("po", selectedPO.id);
                setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selectedPO && selectedPO.id) {
                const resp = await getAllModelDocuments("po", selectedPO.id);
                setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshPOs();
    }, []);

    useEffect(() => {
        if (activeTab === 1) {
            refreshNotes();
            refreshDocs();
        }
    }, [activeTab]);

    const handleDelete = async () => {
        try {
            if (selectedPO && selectedPO.id) {
                const resp = deletePO(selectedPO.id);
                if (resp) {
                    refreshPOs();
                    setActiveTab(0);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setConfirm(false);
        }
    };

    return (
        <Box m={1}>
            {selectedPO && selectedPO.id && (
                <NoteModal
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    itemId={selectedPO.id}
                    model="po"
                    noteData={selectedNote}
                    onDone={refreshNotes}
                />
            )}
            {selectedPO && selectedPO.id && (
                <DocModal
                    open={docModal}
                    onClose={() => setDocModal(false)}
                    itemId={selectedPO.id}
                    model="po"
                    docData={selectedDoc}
                    onDone={refreshDocs}
                />
            )}

            <AddPOModal open={addPo} onClose={() => setAddPo(false)} onDone={refreshPOs} />
            <Confirm
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`Are you sure, You are going to delete PO with number ${selectedPO?.number}`}
            />

            <Box mb={2} display="flex" alignItems="center">
                <Button onClick={() => setAddPo(true)}>Add PO</Button>
                <Button disabled={!selectedPO} onClick={() => setConfirm(true)}>
                    Delete PO
                </Button>
                {activeTab === 1 && <Button onClick={() => setNoteModal(true)}>Add note</Button>}
                {activeTab === 1 && <Button onClick={() => setDocModal(true)}>Add document</Button>}
                <div style={{ flexGrow: 1 }} />
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Overview" />
                    <Tab label="Details" disabled={!selectedPO} />
                </Tabs>
            </Box>
            {activeTab === 0 && (
                <BaseDataGrid
                    rows={pos}
                    cols={poCols}
                    onRowSelected={(d) => {
                        setSelectedPO(d);
                        setActiveTab(1);
                        console.log(d);
                    }}
                />
            )}
            {activeTab === 1 && selectedPO && (
                <Details
                    poData={selectedPO}
                    onDone={refreshPOs}
                    onNoteSelected={(d) => {
                        setSelectedNote(d);
                        setNoteModal(true);
                    }}
                    onDocSelected={(d) => {
                        setSelectedDoc(d);
                        setDocModal(true);
                    }}
                    notes={notes}
                    docs={docs}
                />
            )}
        </Box>
    );
}
