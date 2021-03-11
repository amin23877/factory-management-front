import React, { useState, useEffect } from "react";
import { Box, Container, Button, TextField, IconButton, ListItem, LinearProgress } from "@material-ui/core";
import { RowData, ColDef } from "@material-ui/data-grid";
import { NoteRounded, FileCopyRounded, PrintRounded, AddRounded, DeleteRounded, CategoryRounded } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Confirm from "../features/Modals/Confirm";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import BOMModal from "../features/BOM/BomModal";

import { AddItemModal } from "../features/Items/ItemModals";
import CatTypeFamilyModal from "../features/Modals/CategoryModals";
import ItemsDetails from "../features/Items";

import { AddItemInitialValues, getItems, getItemsByQuery, deleteAnItem } from "../api/items";
import { getTypes } from "../api/types";
import { getCategories } from "../api/category";
import { getFamilies } from "../api/family";
import { getAllModelNotes } from "../api/note";
import { getAllModelDocuments } from "../api/document";

// import TextField from "../app/TextField";
import List from "../app/SideUtilityList";
import { MyTabs, MyTab } from "../app/Tabs";
import BaseDataGrid from "../app/BaseDataGrid";

const Inventory = () => {
    const [rows, setRows] = useState<RowData[]>([]);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<{ category: string | null; type: string | null; family: string | null }>({
        category: "",
        type: "",
        family: "",
    });

    const [cats, setCats] = useState([]);
    const [types, setTypes] = useState([]);
    const [families, setFamilies] = useState([]);

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

    const refreshCats = async () => {
        try {
            const resp = await getCategories();
            if (resp) {
                setCats(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const refreshTypes = async () => {
        try {
            const resp = await getTypes();
            if (resp) {
                setTypes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const refreshFamilies = async () => {
        try {
            const resp = await getFamilies();
            if (resp) {
                setFamilies(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshCats();
        refreshTypes();
        refreshFamilies();
    }, []);

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
                refreshItems();
                setActiveTab(0);
                setDeleteItemModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filterItems = async () => {
        try {
            setLoading(true);
            if (!filters.category && !filters.type && !filters.family) {
                refreshItems();
                return;
            } else {
                const resp = await getItemsByQuery({
                    ItemCategoryId: filters.category,
                    ItemTypeId: filters.type,
                    ItemFamilyId: filters.family,
                });
                resp && setRows(resp);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        filterItems();
    }, [filters]);

    const cols: ColDef[] = [
        { field: "no", headerName: "Item no" },
        { field: "name", headerName: "Item name", width: 120 },
        { field: "description", headerName: "desc" },
        { field: "cost", headerName: "Cost" },
        {
            field: "ItemCategory",
            headerName: "Category",
            valueGetter: (d) => (d.data.ItemCategory ? d.data.ItemCategory.name : ""),
        },
        {
            field: "ItemType",
            headerName: "Type",
            valueGetter: (d) => (d.data.ItemType ? d.data.ItemType.name : ""),
        },
        {
            field: "ItemFamily",
            headerName: "Family",
            valueGetter: (d) => (d.data.ItemFamily ? d.data.ItemFamily.name : ""),
        },
    ];

    return (
        <Container>
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

            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
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

            <Box display="flex" alignItems="flex-start" mt={1}>
                <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
                    <ListItem>
                        <IconButton title="Add item" onClick={() => setAddItemModal(true)}>
                            <AddRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton title="Delete item" onClick={() => selectedItem && selectedItem?.id && setDeleteItemModal(true)}>
                            <DeleteRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton title="Categories" onClick={() => setCatModal(true)}>
                            <CategoryRounded />
                        </IconButton>
                    </ListItem>
                </List>
                <Box flex={11} ml={2}>
                    {activeTab === 0 && (
                        <Box my={2} display="flex" alignItems="center">
                            <Autocomplete
                                onChange={(v, nv: any) => setFilters((prev) => ({ ...prev, category: nv?.id }))}
                                options={cats}
                                getOptionLabel={(op: any) => op.name}
                                renderInput={(params) => <TextField label="Category" {...params} />}
                            />
                            <Autocomplete
                                onChange={(v, nv: any) => setFilters((prev) => ({ ...prev, type: nv?.id }))}
                                options={types}
                                getOptionLabel={(op: any) => op.name}
                                style={{ margin: "0 0.5em" }}
                                renderInput={(params) => <TextField label="Type" {...params} />}
                            />
                            <Autocomplete
                                onChange={(v, nv: any) => setFilters((prev) => ({ ...prev, family: nv?.id }))}
                                options={families}
                                getOptionLabel={(op: any) => op.name}
                                renderInput={(params) => <TextField label="Family" {...params} />}
                            />
                        </Box>
                    )}
                    {loading && <LinearProgress />}
                    {activeTab === 0 && !loading && (
                        <BaseDataGrid
                            cols={cols}
                            rows={rows}
                            onRowSelected={(r) => {
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
                </Box>
            </Box>
        </Container>
    );
};

export default Inventory;
