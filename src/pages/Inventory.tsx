import React, { useState, useEffect } from "react";
import { Box, Container, Button, IconButton, ListItem, LinearProgress } from "@material-ui/core";
import {
    NoteRounded,
    FileCopyRounded,
    PrintRounded,
    AddRounded,
    DeleteRounded,
    CategoryRounded,
    FilterRounded,
    PostAddRounded,
    FilterListRounded,
} from "@material-ui/icons";
import Confirm from "../features/Modals/Confirm";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import BOMModal from "../features/BOM/BomModal";

import { AddItemModal } from "../features/Items/ItemModals";
import CatTypeFamilyModal from "../features/Modals/CategoryModals";
import ItemsDetails from "../features/Items";

import { getItems, getItemsByQuery, deleteAnItem, IItem } from "../api/items";
import { getTypes } from "../api/types";
import { getCategories } from "../api/category";
import { getFamilies } from "../api/family";
import { getAllModelNotes } from "../api/note";
import { getAllModelDocuments } from "../api/document";

import List from "../app/SideUtilityList";
import { MyTabs, MyTab } from "../app/Tabs";

import { IFilters } from "../features/Items/Table/Filters";
import { IOrder } from "../features/Items/Table/Sorts";
import DataTable from "../features/Items/Table";
import FiltersModal, { ApplyFilterModal } from "../features/Filter/Modals";
import { AddFieldModal } from "../features/Field/Modal";

const Inventory = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState<IFilters>();
    const [order, setOrder] = useState<IOrder>();
    const [page, setPage] = useState(1);

    const [cats, setCats] = useState([]);
    const [types, setTypes] = useState([]);
    const [families, setFamilies] = useState([]);

    const [activeTab, setActiveTab] = useState(0);
    const [detailDis, setDetailDis] = useState(true);
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
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
    const [filterModal, setFilterModal] = useState(false);
    const [applyFilterModal, setApplyFilterModal] = useState(false);
    const [addFieldModal, setAddFieldModal] = useState(false);

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
            if (selectedItem && selectedItem.id) {
                const resp = await deleteAnItem(selectedItem.id);
                refreshItems();
                setActiveTab(0);
                setDeleteItemModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const filterItems = async () => {
            try {
                setLoading(true);
                if (!filters) {
                    refreshItems();
                    return;
                } else {
                    const key = Object.keys(filters.params);
                    const v = Object.values(filters.params);
                    const resp = await getItemsByQuery({
                        ItemCategoryId: filters.cat && filters.cat.length > 0 ? filters.cat.map((item) => item.id).join(",") : undefined,
                        ItemTypeId: filters.type && filters.type.length > 0 ? filters.type.map((item) => item.id).join(",") : undefined,
                        ItemFamilyId:
                            filters.family && filters.family.length > 0 ? filters.family.map((item) => item.id).join(",") : undefined,

                        minCost: filters.cost && filters.cost[0] ? filters.cost[0] : undefined,
                        maxCost: filters.cost && filters.cost[1] ? filters.cost[1] : undefined,

                        no: filters.itemNo ? filters.itemNo : undefined,
                        name: filters.name ? filters.name : undefined,
                        description: filters.desc ? filters.desc : undefined,

                        sort: order && order.orderBy ? order.orderBy : undefined,
                        order: order && order.order ? (order.order === "asc" ? "ASC" : "DESC") : undefined,
                        [key[0]]: v[0],
                    });
                    resp && setRows(resp);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        filterItems();
    }, [filters]);

    useEffect(() => {
        const sortItems = async () => {
            try {
                setLoading(true);
                if (!order) {
                    refreshItems();
                    return;
                } else {
                    const resp = await getItemsByQuery({
                        ItemCategoryId:
                            filters && filters.cat && filters.cat.length > 0 ? filters.cat.map((item) => item.id).join(",") : undefined,
                        ItemTypeId:
                            filters && filters.type && filters.type.length > 0 ? filters.type.map((item) => item.id).join(",") : undefined,
                        ItemFamilyId:
                            filters && filters.family && filters.family.length > 0
                                ? filters.family.map((item) => item.id).join(",")
                                : undefined,

                        minCost: filters && filters.cost && filters.cost[0] ? filters.cost[0] : undefined,
                        maxCost: filters && filters.cost && filters.cost[1] ? filters.cost[1] : undefined,

                        no: filters && filters.itemNo ? filters.itemNo : undefined,
                        name: filters && filters.name ? filters.name : undefined,
                        description: filters && filters.desc ? filters.desc : undefined,

                        sort: order.orderBy ? order.orderBy : undefined,
                        order: order.order ? (order.order === "asc" ? "ASC" : "DESC") : undefined,
                    });
                    resp && setRows(resp);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        sortItems();
    }, [order]);

    useEffect(() => {
        const sortItems = async () => {
            try {
                setLoading(true);

                const resp = await getItemsByQuery({
                    page,
                    ItemCategoryId:
                        filters && filters.cat && filters.cat.length > 0 ? filters.cat.map((item) => item.id).join(",") : undefined,
                    ItemTypeId:
                        filters && filters.type && filters.type.length > 0 ? filters.type.map((item) => item.id).join(",") : undefined,
                    ItemFamilyId:
                        filters && filters.family && filters.family.length > 0
                            ? filters.family.map((item) => item.id).join(",")
                            : undefined,

                    minCost: filters && filters.cost && filters.cost[0] ? filters.cost[0] : undefined,
                    maxCost: filters && filters.cost && filters.cost[1] ? filters.cost[1] : undefined,

                    no: filters && filters.itemNo ? filters.itemNo : undefined,
                    name: filters && filters.name ? filters.name : undefined,
                    description: filters && filters.desc ? filters.desc : undefined,

                    sort: order && order.orderBy ? order.orderBy : undefined,
                    order: order && order.order ? (order.order === "asc" ? "ASC" : "DESC") : undefined,
                });
                resp && setRows(resp);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        sortItems();
    }, [page]);

    return (
        <Box>
            {selectedNote && selectedItem && selectedItem.id && (
                <NoteModal
                    onDone={refreshNotes}
                    noteData={selectedNote}
                    itemId={selectedItem.id as any}
                    model="item"
                    open={editNoteModal}
                    onClose={() => setEditNoteModal(false)}
                />
            )}
            {selectedDoc && selectedItem && selectedItem.id && (
                <DocumentModal
                    onDone={refreshDocs}
                    open={editDocModal}
                    itemId={selectedItem.id as any}
                    model="item"
                    onClose={() => setEditDocModal(false)}
                    docData={selectedDoc}
                />
            )}

            {selectedItem && selectedItem.id && (
                <NoteModal
                    onDone={refreshNotes}
                    itemId={selectedItem.id as any}
                    model="item"
                    open={addNoteModal}
                    onClose={() => setAddNoteModal(false)}
                />
            )}
            {selectedItem && selectedItem.id && (
                <DocumentModal
                    onDone={refreshDocs}
                    open={addDocModal}
                    onClose={() => setAddDocModal(false)}
                    itemId={selectedItem.id as any}
                    model="item"
                />
            )}
            {selectedItem && selectedItem.id && <BOMModal itemId={selectedItem.id} open={bomModal} onClose={() => setBomModal(false)} />}

            <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
            <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />
            <CatTypeFamilyModal open={catModal} onClose={() => setCatModal(false)} />

            <AddFieldModal open={addFieldModal} onClose={() => setAddFieldModal(false)} />
            <FiltersModal open={filterModal} onClose={() => setFilterModal(false)} />
            <ApplyFilterModal open={applyFilterModal} onClose={() => setApplyFilterModal(false)} setter={setFilters} />

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
                    <ListItem>
                        <IconButton title="Filters" onClick={() => setFilterModal(true)}>
                            <FilterRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton title="َApply Filter" onClick={() => setApplyFilterModal(true)}>
                            <FilterListRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton title="Dyanamic fields" onClick={() => setAddFieldModal(true)}>
                            <PostAddRounded />
                        </IconButton>
                    </ListItem>
                </List>
                <Box flex={11} ml={2}>
                    {loading && <LinearProgress />}
                    {activeTab === 0 && !loading && (
                        <DataTable
                            order={order}
                            setOrder={setOrder}
                            filters={filters}
                            setFilters={setFilters}
                            cats={cats}
                            types={types}
                            families={families}
                            rows={rows}
                            page={page}
                            setPage={setPage}
                            onRowSelected={(d) => {
                                setSelectedItem(d);
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
        </Box>
    );
};

export default Inventory;
