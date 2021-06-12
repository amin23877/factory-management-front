import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, IconButton, ListItem, Paper } from "@material-ui/core";
import {
    NoteRounded,
    FileCopyRounded,
    PrintRounded,
    AddRounded,
    DeleteRounded,
    CategoryRounded,
    PostAddRounded,
    FilterListRounded,
} from "@material-ui/icons";
import useSWR from "swr";
import Confirm from "../features/Modals/Confirm";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import BOMModal from "../features/BOM/BomModal";

import { AddItemModal } from "../features/Items/ItemModals";
import CatTypeFamilyModal from "../features/Modals/CategoryModals";
import ItemsDetails from "../features/Items";

import { deleteAnItem, getFilterOperator, IItem } from "../api/items";

import List from "../app/SideUtilityList";
import { MyTabs, MyTab } from "../app/Tabs";

import FieldNFilter from "../features/FieldAndFilter/Modal";

import { DataGrid, GridColDef, GridFilterItem, GridToolbar } from "@material-ui/data-grid";
// import { INote } from "../api/note";
// import { IDocument } from "../api/document";
// import DataTable from "../features/Items/Table";

const Inventory = () => {
    const [filters, setFilters] = useState<GridFilterItem[]>([]);
    const [page, setPage] = useState(1);

    const {
        data: items,
        mutate: mutateItems,
        revalidate: revalidateItems,
    } = useSWR<IItem[]>(
        filters.length > 0 || filters[0]?.value
            ? [
                  `/item?${getFilterOperator(filters[0]?.operatorValue)}${filters[0]?.columnField}=${
                      filters[0]?.value
                  }`,
                  filters,
              ]
            : "/item"
    );

    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

    const [activeTab, setActiveTab] = useState(0);
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
    const [applyFilterModal, setApplyFilterModal] = useState(false);
    const [FieldNFilterModal, setFieldNFilterModal] = useState(false);

    const gridColumns = useMemo<GridColDef[]>(
        () => [
            { field: "no", headerName: "Item no.", flex: 1 },
            { field: "name", headerName: "Name", flex: 2 },
            { field: "description", headerName: "Description", flex: 2 },
            { field: "cost", headerName: "cost" },
            { field: "salesApproved", headerName: "salesApproved", type: "boolean" },
            { field: "engineeringApproved", headerName: "engineeringApproved", type: "boolean" },
            { field: "totalQoh", headerName: "totalQoh" },
            { field: "usedInLastQuarter", headerName: "usedInLastQuarter" },
            { field: "resellCost", headerName: "resellCost" },
            { field: "qbtype", headerName: "qbtype", hide: true },
            { field: "qbid", headerName: "qbid", hide: true },
            { field: "sku", headerName: "sku", hide: true },
            { field: "active", headerName: "active", hide: true, type: "boolean" },
            { field: "manufacturer", headerName: "manufacturer", hide: true },
            { field: "jobDays", headerName: "jobDays", hide: true },
            { field: "color", headerName: "color", hide: true },
            { field: "size", headerName: "size", hide: true },
            { field: "color", headerName: "color", hide: true },
        ],
        []
    );

    const handleDelete = useCallback(async () => {
        try {
            if (selectedItem && selectedItem.id) {
                await deleteAnItem(selectedItem.id);
                mutateItems();
                setActiveTab(0);
                setDeleteItemModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedItem]);

    return (
        <Box>
            {selectedNote && selectedItem && selectedItem.id && (
                <NoteModal
                    noteData={selectedNote}
                    itemId={selectedItem.id as any}
                    model="item"
                    open={editNoteModal}
                    onClose={() => setEditNoteModal(false)}
                />
            )}
            {selectedDoc && selectedItem && selectedItem.id && (
                <DocumentModal
                    open={editDocModal}
                    itemId={selectedItem.id as any}
                    model="item"
                    onClose={() => setEditDocModal(false)}
                    docData={selectedDoc}
                />
            )}

            {selectedItem && selectedItem.id && (
                <NoteModal
                    itemId={selectedItem.id as any}
                    model="item"
                    open={addNoteModal}
                    onClose={() => setAddNoteModal(false)}
                />
            )}
            {selectedItem && selectedItem.id && (
                <DocumentModal
                    open={addDocModal}
                    onClose={() => setAddDocModal(false)}
                    itemId={selectedItem.id as any}
                    model="item"
                />
            )}
            {selectedItem && selectedItem.id && (
                <BOMModal itemId={selectedItem.id} open={bomModal} onClose={() => setBomModal(false)} />
            )}

            <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
            <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />
            {/* <CatTypeFamilyModal open={catModal} onClose={() => setCatModal(false)} /> */}

            <FieldNFilter open={FieldNFilterModal} onClose={() => setFieldNFilterModal(false)} />
            {/* <ApplyFilterModal open={applyFilterModal} onClose={() => setApplyFilterModal(false)} setter={setFilters} /> */}

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
                <Button
                    disabled={activeTab === 0}
                    onClick={() => setBomModal(true)}
                    title="Bill of Material"
                    startIcon={<PrintRounded />}
                >
                    BOM
                </Button>

                <div style={{ flexGrow: 1 }} />

                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="secondary">
                    <MyTab color="primary" label="Overview" />
                    <MyTab label="Details" disabled={!selectedItem} />
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
                        <IconButton
                            title="Delete item"
                            onClick={() => selectedItem && selectedItem?.id && setDeleteItemModal(true)}
                        >
                            <DeleteRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton title="َApply Filter" onClick={() => setApplyFilterModal(true)}>
                            <FilterListRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton title="Dyanamic fields" onClick={() => setFieldNFilterModal(true)}>
                            <PostAddRounded />
                        </IconButton>
                    </ListItem>
                </List>
                <Box flex={11} ml={2}>
                    {activeTab === 0 && (
                        <Paper>
                            <Box height={550}>
                                <DataGrid
                                    loading={!items}
                                    onRowSelected={(r) => {
                                        setSelectedItem(r.data as any);
                                        setActiveTab(1);
                                    }}
                                    filterMode="server"
                                    onFilterModelChange={(d) => {
                                        console.log(d.filterModel.items);
                                        if (d.filterModel.items[0].value) {
                                            setFilters(d.filterModel.items);
                                        }
                                    }}
                                    rows={items || []}
                                    columns={gridColumns}
                                    components={{ Toolbar: GridToolbar }}
                                />
                            </Box>
                        </Paper>
                        // <DataTable
                        //     order={order}
                        //     setOrder={setOrder}
                        //     filters={filters}
                        //     setFilters={setFilters}
                        //     cats={cats}
                        //     types={types}
                        //     families={families}
                        //     rows={items}
                        //     page={page}
                        //     setPage={setPage}
                        //     onRowSelected={(d) => {
                        //         setSelectedItem(d);
                        //         setDetailDis(false);
                        //         setActiveTab(1);
                        //     }}
                        // />
                    )}
                    {activeTab === 1 && (
                        <ItemsDetails
                            onDone={mutateItems}
                            selectedRow={selectedItem}
                            onDocSelected={(d) => {
                                setSelectedDoc(d);
                                setEditDocModal(true);
                            }}
                            onNoteSelected={(d) => {
                                setSelectedNote(d);
                                setEditNoteModal(true);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Inventory;
