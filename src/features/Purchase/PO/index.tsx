import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
    AddRounded,
    DeleteRounded,
    PrintRounded,
    PostAddRounded,
    NoteAddRounded,
    FileCopyRounded,
} from "@material-ui/icons";

import List from "../../../app/SideUtilityList";
import BaseDataGrid from "../../../app/BaseDataGrid";

import AddPOModal from "./AddPurchasePO";
import AddLineItem from "../../LineItem";
import Details from "./Details";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";

import { getPurchasePOs, deletePurchasePO, IPurchasePO, getPurchasePOLines } from "../../../api/purchasePO";
import { getAllModelNotes } from "../../../api/note";
import { getAllModelDocuments } from "../../../api/document";
import { ILineItem } from "../../../api/lineItem";

function Index() {
    const [activeTab, setActiveTab] = useState(0);
    const [addPO, setAddPO] = useState(false);
    const [addLineItem, setAddLineItem] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [pos, setPOs] = useState([]);
    const [lines, setLines] = useState([]);
    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);

    const [selNote, setSelNote] = useState<any>();
    const [selDoc, setSelDoc] = useState<any>();

    const [selectedLine, setSelectedLine] = useState<ILineItem>();
    const [selPO, setSelPO] = useState<IPurchasePO>();
    const [compPo, setCompPo] = useState<any>();

    const cols = [
        { field: "number", headerName: "Number", width: 250 },
        { field: "requester", headerName: "Requester" },
        { field: "VendorId", headerName: "Vendor" },
        { field: "ContactId", headerName: "Contact", width: 180 },
        { field: "EmployeeId", headerName: "Employee", width: 250 },
    ];

    const refreshNotes = async () => {
        try {
            if (selPO && selPO.id) {
                const resp = await getAllModelNotes("purchasePO", selPO.id);
                resp && !resp.error && setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selPO && selPO.id) {
                const resp = await getAllModelDocuments("purchasePO", selPO.id as any);
                resp && !resp.error && setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshLines = async () => {
        try {
            if (selPO && selPO.id) {
                const resp = await getPurchasePOLines(selPO.id);
                if (typeof resp === "object") {
                    setLines(resp);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshPOs = async () => {
        try {
            const resp = await getPurchasePOs();
            resp && setPOs(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selPO && selPO.id) {
                const resp = await deletePurchasePO(selPO.id);
                if (resp) {
                    refreshPOs();
                    setConfirm(false);
                    setActiveTab(0);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshPOs();
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
            <AddPOModal
                initialData={compPo}
                open={addPO}
                onClose={() => setAddPO(false)}
                onDone={() => {
                    refreshPOs();
                    setActiveTab(0);
                    setLines([]);
                }}
            />

            {selPO && selPO.id && (
                <AddLineItem
                    selectedLine={selectedLine}
                    open={addLineItem}
                    onClose={() => setAddLineItem(false)}
                    record="purchasePO"
                    recordId={selPO.id}
                />
            )}
            {selPO && (
                <Confirm
                    open={confirm}
                    onClose={() => setConfirm(false)}
                    onConfirm={handleDelete}
                    text={`Are you sure? You are going to delete purchase PO ${selPO?.number}`}
                />
            )}
            {selPO && selPO.id && (
                <NoteModal
                    itemId={selPO.id}
                    model="purchasePO"
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    noteData={selNote}
                    onDone={refreshNotes}
                />
            )}
            {selPO && selPO.id && (
                <DocumentModal
                    itemId={selPO.id}
                    model="purchasePO"
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
                                setSelPO(undefined);
                                setAddPO(true);
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
                                        setCompPo({ ...selPO, lines });
                                        setAddPO(true);
                                    }}
                                    title="Add new PO based on this PO"
                                >
                                    <PostAddRounded />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton title="Add note" onClick={() => setNoteModal(true)}>
                                    <NoteAddRounded />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton title="Add document" onClick={() => setDocModal(true)}>
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
                    <Tab label="Details" disabled={!selPO} />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={cols}
                        rows={pos}
                        onRowSelected={(d) => {
                            setSelPO(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selPO && (
                    <Details
                        initialValues={selPO}
                        onDone={refreshPOs}
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
