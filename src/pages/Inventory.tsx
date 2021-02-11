import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Button } from "@material-ui/core";
import { RowData, ColDef } from "@material-ui/data-grid";
import { NoteRounded, FileCopyRounded, PrintRounded, AddRounded, DeleteRounded, CategoryRounded } from "@material-ui/icons";

import Confirm from "../features/Modals/Confirm";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import BOMModal from "../features/BOM/BomModal";

import { AddItemModal } from "../features/Items/ItemModals";
import CatTypeFamilyModal from "../features/Modals/CategoryModals";
import ItemsDetails from "../features/Items/ItemsDetails";

import { AddItemInitialValues, getItems, deleteAnItem } from "../api/items";
import { getAllModelNotes } from "../api/note";
import { getAllModelDocuments } from "../api/document";

import { MyTabs, MyTab } from "../app/Tabs";
import BaseDataGrid from "../app/BaseDataGrid";

const Inventory = () => {
    const [rows, setRows] = useState<RowData[]>([]);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);

    const [activeTab, setActiveTab] = useState(0);
    const [detailDis, setDetailDis] = useState(true);
    const [selectedItem, setSelectedItem] = useState({ ...AddItemInitialValues, id: 0 });
    const [selectedNote, setSelectedNote] = useState<any>();
    const [selectedDoc, setSelectedDoc] = useState<any>();

    const [addItemModal, setAddItemModal] = useState(false);
    const [deleteItemModal, setDeleteItemModal] = useState(false);
    const [catModal, setCatModal] = useState(false);
    const [editNoteModal, setEditNoteModal] = useState(false);
    const [editDocModal, setEditDocModal] = useState(false);
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);

    const [bomModal, setBomModal] = useState(false);

    const refreshItems = async () => {
        try {
            const resp = await getItems();
            setRows(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshNotes = async () => {
        try {
            if (selectedItem && selectedItem.id) {
                const resp = await getAllModelNotes("item", selectedItem.id);
                setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selectedItem && selectedItem.id) {
                const resp = await getAllModelDocuments("item", selectedItem.id);
                setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshItems();
    }, [addItemModal]);

    useEffect(() => {
        refreshNotes();
        refreshDocs();
    }, [selectedItem]);

    const handleDelete = async () => {
        try {
            if (selectedItem) {
                const resp = await deleteAnItem(selectedItem.id);
                console.log(resp);
                refreshItems();
                setActiveTab(0);
                setDeleteItemModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cols: ColDef[] = [
        { field: "no", headerName: "Item no" },
        { field: "name", headerName: "Item name" },
        { field: "description", headerName: "desc" },
        { field: "cost", headerName: "Cost" },
    ];

    return (
        <Container style={{ maxWidth: 1240 }}>
            {selectedNote && (
                <NoteModal
                    onDone={refreshNotes}
                    noteData={selectedNote}
                    itemId={selectedItem.id}
                    model="item"
                    open={editNoteModal}
                    onClose={() => setEditNoteModal(false)}
                />
            )}
            {selectedDoc && (
                <DocumentModal
                    onDone={refreshDocs}
                    open={editDocModal}
                    itemId={selectedItem.id}
                    model="item"
                    onClose={() => setEditDocModal(false)}
                    docData={selectedDoc}
                />
            )}

            <NoteModal
                onDone={refreshNotes}
                itemId={selectedItem.id}
                model="item"
                open={addNoteModal}
                onClose={() => setAddNoteModal(false)}
            />
            <DocumentModal
                onDone={refreshDocs}
                open={addDocModal}
                onClose={() => setAddDocModal(false)}
                itemId={selectedItem.id}
                model="item"
            />

            <BOMModal itemId={selectedItem.id} open={bomModal} onClose={() => setBomModal(false)} />

            <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
            <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />
            <CatTypeFamilyModal open={catModal} onClose={() => setCatModal(false)} />

            <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                    disabled={activeTab === 0}
                    onClick={() => setAddNoteModal(true)}
                    title="add note"
                    color="secondary"
                    startIcon={<NoteRounded />}
                >
                    Add New Note
                </Button>
                <Button
                    disabled={activeTab === 0}
                    onClick={() => setAddDocModal(true)}
                    title="add document"
                    color="secondary"
                    startIcon={<FileCopyRounded />}
                >
                    Add Document
                </Button>
                <Button disabled={activeTab === 0} onClick={() => setBomModal(true)} title="Bill of Material" startIcon={<PrintRounded />}>
                    BOM
                </Button>

                <div style={{ flexGrow: 1 }} />

                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="secondary">
                    <MyTab color="primary" label="Overview" />
                    <MyTab label="Details" disabled={detailDis} />
                </MyTabs>
            </Box>

            <Grid container>
                <Grid item xs={1} style={{ margin: "1em 0" }}>
                    <Box px={1} display="flex" flexDirection="column" my={2}>
                        <Button title="Add item" onClick={() => setAddItemModal(true)} variant="outlined">
                            <AddRounded />
                        </Button>
                        <Button
                            title="Delete item"
                            onClick={() => selectedItem && selectedItem?.id && setDeleteItemModal(true)}
                            variant="outlined"
                            style={{ margin: "1em 0" }}
                        >
                            <DeleteRounded />
                        </Button>
                        <Button title="Categories" onClick={() => setCatModal(true)} variant="outlined">
                            <CategoryRounded />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    {activeTab === 0 && (
                        <BaseDataGrid
                            cols={cols}
                            rows={rows}
                            onRowSelected={(r) => {
                                console.log(r);

                                setSelectedItem(r);
                                setDetailDis(false);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && (
                        <ItemsDetails
                            notes={notes}
                            docs={docs}
                            onDone={refreshItems}
                            onDocSelected={(d) => {
                                setSelectedDoc(d);
                                setEditDocModal(true);
                            }}
                            onNoteSelected={(d) => {
                                setSelectedNote(d);
                                setEditNoteModal(true);
                            }}
                            selectedRow={selectedItem}
                        />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Inventory;
