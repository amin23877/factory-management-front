import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import { getPO, deletePO, IPO } from "../../../api/po";
import { getAllModelNotes } from "../../../api/note";
import { getAllModelDocuments } from "../../../api/document";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../Modals/NoteModals";
import DocModal from "../../Modals/DocumentModals";
import BaseDataGrid from "../../../app/BaseDataGrid";
import Button from "../../../app/Button";

import Details from "./Details";
import AddPOModal from "./AddPoModal";
import { BasePaper } from "../../../app/Paper";
import { GridColDef } from "@material-ui/data-grid";
import { formatTimestampToDate } from "../../../logic/date";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

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

    const poCols: GridColDef[] = [
        // Date	Customer PO Number	SO Number	Client	Rep	State	Project	Status

        {
            field: "Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt),
            width: 110,
        },
        { field: "number", headerName: "Customer PO Number", flex: 1 },
        { field: "SoID", headerName: "SO Number", flex: 1 },
        { field: "Client", valueFormatter: (r) => r.row?.ClientId?.name, flex: 1 },
        {
            field: "Rep",
            valueFormatter: (r) => r.row?.ContactId?.name,
            flex: 1,
        },
        { field: "state", headerName: "State", width: 110 },
        {
            field: "Project",
            valueFormatter: (r) => r.row?.ProjectId?.name,
            flex: 1,
        },
        { field: "status", headerName: "Status", width: 110 },
    ];

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
                const resp = await getAllModelNotes("po", selectedPO.id as any);
                setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selectedPO && selectedPO.id) {
                const resp = await getAllModelDocuments("po", selectedPO.id as any);
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
                const resp = await deletePO(selectedPO.id as any);
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
        <Box>
            {selectedPO && selectedPO.id && (
                <NoteModal
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    itemId={selectedPO.id as any}
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
                <Button
                    onClick={() => setAddPo(true)}
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                >
                    <AddRoundedIcon />
                    Add PO
                </Button>
                <Button
                    kind="delete"
                    disabled={!selectedPO}
                    onClick={() => setConfirm(true)}
                    style={{ margin: "0 0.5em" }}
                >
                    Delete PO
                </Button>
                {/* {activeTab === 1 && (
                    <Button kind="add" onClick={() => setNoteModal(true)}>
                        Add note
                    </Button>
                )}
                {activeTab === 1 && (
                    <Button
                        style={{ backgroundColor: "#1a73e8", color: "#fff", marginLeft: "5px" }}
                        onClick={() => setDocModal(true)}
                        startIcon={<AddRoundedIcon />}
                    >
                        Add document
                    </Button>
                )} */}
            </Box>
            <BasePaper>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab
                        // label="List"
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded style={{ marginRight: "5px" }} /> List
                            </span>
                        }
                        wrapped
                    />
                    <Tab
                        // label="Details"
                        disabled={!selectedPO}
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                            </span>
                        }
                    />
                </Tabs>
                {activeTab === 0 && pos && (
                    <BaseDataGrid
                        height={500}
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
            </BasePaper>
        </Box>
    );
}
