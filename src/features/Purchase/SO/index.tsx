import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, PrintRounded, PostAddRounded, NoteAddRounded, FileCopyRounded } from "@material-ui/icons";
import { GridColDef } from "@material-ui/data-grid";

import List from "../../../app/SideUtilityList";
import BaseDataGrid from "../../../app/BaseDataGrid";

import AddSOModal from "./AddPurchaseSO";
import AddLineItem from "../../LineItem";
import Details from "./Details";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";

import { getPurchaseSOs, deletePurchaseSO, IPurchaseSO, getPurchaseSOLines } from "../../../api/purchaseSO";
import { getAllModelNotes } from "../../../api/note";
import { getAllModelDocuments } from "../../../api/document";
import { ILineItem } from "../../../api/lineItem";

function Index() {
    const [activeTab, setActiveTab] = useState(0);
    const [addSO, setAddSO] = useState(false);
    const [addLineItem, setAddLineItem] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [sos, setSOs] = useState([]);
    const [lines, setLines] = useState([]);

    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);

    const [selNote, setSelNote] = useState<any>();
    const [selDoc, setSelDoc] = useState<any>();

    const [selectedLine, setSelectedLine] = useState<ILineItem>();
    const [selSO, setSelSO] = useState<IPurchaseSO>();

    const cols: GridColDef[] = [
        { field: "number", headerName: "Number" },
        { field: "requester", headerName: "Requester" },
        { field: "VendorId" },
        { field: "ContactId" },
        { field: "EmployeeId" },
        { field: "estimatedObtainDate", headerName: "Estimated obtain date" },
        { field: "status", headerName: "Status" },
        { field: "obtained", headerName: "Obtained" },
    ];

    const refreshLines = async () => {
        try {
            if (selSO && selSO.id) {
                const resp = await getPurchaseSOLines(selSO.id);
                resp && setLines(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshSOs = async () => {
        try {
            const resp = await getPurchaseSOs();
            resp && setSOs(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selSO && selSO.id) {
                const resp = await deletePurchaseSO(selSO.id);
                if (resp) {
                    refreshSOs();
                    setConfirm(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const refreshNotes = async () => {
        try {
            if (selSO && selSO.id) {
                const resp = await getAllModelNotes("purchaseSO", selSO.id);
                resp && !resp.error && setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selSO && selSO.id) {
                const resp = await getAllModelDocuments("purchaseSO", selSO.id);
                resp && !resp.error && setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshSOs();
    }, []);

    useEffect(() => {
        if (activeTab === 1) {
            refreshLines();
            refreshNotes();
            refreshDocs();
        }
    }, [activeTab]);

    return (
        <Box display="grid" gridTemplateColumns="1fr 11fr">
            <AddSOModal open={addSO} onClose={() => setAddSO(false)} onDone={refreshSOs} />
            {selSO && selSO.id && (
                <AddLineItem
                    selectedLine={selectedLine}
                    open={addLineItem}
                    onClose={() => setAddLineItem(false)}
                    onDone={refreshLines}
                    record="purchaseSO"
                    recordId={selSO.id}
                />
            )}
            {selSO && (
                <Confirm
                    open={confirm}
                    onClose={() => setConfirm(false)}
                    onConfirm={handleDelete}
                    text={`Are you sure? You are going to delete purchase SO ${selSO?.number}`}
                />
            )}
            {selSO && selSO.id && (
                <NoteModal
                    itemId={selSO.id}
                    model="purchaseSO"
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    noteData={selNote}
                    onDone={refreshNotes}
                />
            )}
            {selSO && selSO.id && (
                <DocumentModal
                    itemId={selSO.id}
                    model="purchaseSO"
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
                                setSelSO(undefined);
                                setAddSO(true);
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
                    {activeTab === 1 && (
                        <>
                            <ListItem>
                                <IconButton
                                    onClick={() => {
                                        setSelectedLine(undefined);
                                        setAddLineItem(true);
                                    }}
                                    title="Add new line item"
                                >
                                    <PostAddRounded />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton onClick={() => setNoteModal(true)}>
                                    <NoteAddRounded />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton onClick={() => setDocModal(true)}>
                                    <FileCopyRounded />
                                </IconButton>
                            </ListItem>
                        </>
                    )}
                    <ListItem>
                        <IconButton>
                            <PrintRounded />
                        </IconButton>
                    </ListItem>
                </List>
            </Box>
            <Box>
                <Tabs style={{ marginBottom: "1em" }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selSO} />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={cols}
                        rows={sos}
                        onRowSelected={(d) => {
                            setSelSO(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selSO && (
                    <Details
                        initialValues={selSO}
                        onDone={refreshSOs}
                        lines={lines}
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
                        onLineSelected={(d) => {
                            setSelectedLine(d);
                            setAddLineItem(true);
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default Index;
