import React, { useState, useEffect } from "react";

import { ColDef } from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { IActivity } from "../../api/activity";
import { getAllModelNotes, INote } from "../../api/note";
import { getAllModelDocuments } from "../../api/document";

import EditActivityForm from "./Forms";

import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import BaseDataGrid from "../../app/BaseDataGrid";
import Button from "../../app/Button";
import { BasePaper } from "../../app/Paper";

export default function EditForm({ selectedActivity, onDone }: { selectedActivity: IActivity; onDone: () => void }) {
    const [activeTab, setActiveTab] = useState(0);
    const [addNote, setAddNote] = useState(false);
    const [addDoc, setAddDoc] = useState(false);

    const [selNote, setSelNote] = useState<INote>();
    const [selDoc, setSelDoc] = useState<any>();

    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);

    const noteCols: ColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    const refreshNotes = async () => {
        try {
            if (selectedActivity.id) {
                const resp = await getAllModelNotes("activity", selectedActivity.id);
                setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selectedActivity.id) {
                const resp = await getAllModelDocuments("activity", selectedActivity.id);
                setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeTab === 0) {
            refreshNotes();
        } else if (activeTab === 1) {
            refreshDocs();
        }
    }, [activeTab]);

    return (
        <Box>
            {selectedActivity.id && (
                <NoteModal
                    noteData={selNote}
                    itemId={selectedActivity.id}
                    model="activity"
                    open={addNote}
                    onClose={() => setAddNote(false)}
                    onDone={refreshNotes}
                />
            )}
            {selectedActivity.id && (
                <DocumentModal
                    docData={selDoc}
                    itemId={selectedActivity.id}
                    model="activity"
                    open={addDoc}
                    onClose={() => setAddDoc(false)}
                    onDone={refreshDocs}
                />
            )}

            <BasePaper>
                <EditActivityForm init={selectedActivity} onDone={onDone} />

                <Box>
                    <Box display="flex" alignItems="center" my={2}>
                        <Button
                            onClick={() => {
                                setSelNote(undefined);
                                setAddNote(true);
                            }}
                            variant="outlined"
                            style={{ marginRight: "1em" }}
                        >
                            Add note
                        </Button>
                        <Button
                            onClick={() => {
                                setSelDoc(undefined);
                                setAddDoc(true);
                            }}
                            variant="outlined"
                        >
                            Add Document
                        </Button>
                    </Box>
                    <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                        <Tab label="Notes" />
                        <Tab label="Documents" />
                    </Tabs>
                    {activeTab === 0 && (
                        <BaseDataGrid
                            cols={noteCols}
                            rows={notes}
                            onRowSelected={(d) => {
                                setSelNote(d);
                                setAddNote(true);
                            }}
                        />
                    )}
                    {activeTab === 1 && (
                        <BaseDataGrid
                            cols={docCols}
                            rows={docs}
                            onRowSelected={(d) => {
                                setSelDoc(d);
                                setAddDoc(true);
                            }}
                        />
                    )}
                </Box>
            </BasePaper>
        </Box>
    );
}
