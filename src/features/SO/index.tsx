import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { GridColDef } from "@material-ui/data-grid";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import Confirm from "../Modals/Confirm";
import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import LineItemModal from "../LineItem";
import LineServiceModal from "../LineService";
import EditTab from "./EditTab";
import AddSOModal from "./AddSoModal";
import BaseDataGrid from "../../app/BaseDataGrid";

import { deleteSO, getSO, getLineItems, ISO } from "../../api/so";
import { getAllModelNotes } from "../../api/note";
import { getAllModelDocuments } from "../../api/document";
import { ILineItem } from "../../api/lineItem";
import { getSOLineServices, ILineService } from "../../api/lineService";

export default function SalesOrderPanel() {
    const [activeTab, setActiveTab] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [addSo, setAddSo] = useState(false);
    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [lineItemModal, setLineItemModal] = useState(false);
    const [lineServiceModal, setLineServiceModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<any>();
    const [selectedDoc, setSelectedDoc] = useState<any>();
    const [selectedLI, setSelectedLI] = useState<ILineItem>();
    const [selectedLS, setSelectedLS] = useState<ILineService>();
    const [selectedSO, setSelectedSO] = useState<ISO>();

    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [sos, setSos] = useState([]);
    const [lineItems, setLineIitems] = useState([]);
    const [lineServices, setLineServices] = useState([]);

    const cols: GridColDef[] = [
        { field: "number" },
        { field: "Client", valueGetter: (data) => (data.row.ClientId ? data.row.ClientId.name : "") },
        { field: "Project", valueGetter: (data) => (data.row.ProjectId ? data.row.ProjectId.name : "") },
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

    const refreshLineServices = async () => {
        try {
            if (selectedSO && selectedSO.id) {
                const resp = await getSOLineServices(selectedSO.id);
                resp && setLineServices(resp);
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
            refreshLineServices();
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
                    record="SO"
                    recordId={selectedSO.id}
                    selectedLine={selectedLI}
                    onDone={refreshLineItems}
                />
            )}
            {selectedSO && selectedSO.id && (
                <LineServiceModal
                    open={lineServiceModal}
                    onClose={() => setLineServiceModal(false)}
                    record="SO"
                    recordId={selectedSO.id}
                    selectedLine={selectedLS}
                    onDone={refreshLineServices}
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
                            Add Line item
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedLS(undefined);
                                setLineServiceModal(true);
                            }}
                        >
                            Add Line service
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedNote(undefined);
                                setNoteModal(true);
                            }}
                        >
                            Add note
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
                    lineServices={lineServices}
                    onLineServiceSelected={(d) => {
                        setSelectedLS(d);
                        setLineServiceModal(true);
                    }}
                    onLineItemSelected={(d) => {
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
        </Box>
    );
}
