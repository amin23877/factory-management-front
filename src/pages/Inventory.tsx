import React, { useCallback, useMemo, useState } from "react";
import { Box, IconButton, ListItem, Paper } from "@material-ui/core";
import {
    NoteRounded,
    FileCopyRounded,
    AddRounded,
    DeleteRounded,
    PostAddRounded,
    DescriptionRounded,
} from "@material-ui/icons";
import useSWR from "swr";
import Confirm from "../features/Modals/Confirm";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import BOMModal from "../features/BOM/BomModal";

import { AddItemModal } from "../features/Items/ItemModals";
import ItemsDetails from "../features/Items";

import { deleteAnItem, IItem } from "../api/items";

import List from "../app/SideUtilityList";
import { MyTabs, MyTab } from "../app/Tabs";

import FieldNFilter from "../features/FieldAndFilter/Modal";

import {
    DataGrid,
    GridColDef,
    GridFilterModelParams,
    GridPageChangeParams,
    GridSortModelParams,
    GridToolbar,
} from "@material-ui/data-grid";
import { generateURL } from "../logic/filterSortPage";

const Inventory = () => {
    const [filters, setFilters] = useState<GridFilterModelParams>();
    const [page, setPage] = useState<GridPageChangeParams>();
    const [sorts, setSort] = useState<GridSortModelParams>();

    const { data: items, mutate: mutateItems } = useSWR<{ items: IItem[]; total: number }>(
        generateURL('/item', filters, sorts, page)
    );

    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

    const [activeTab, setActiveTab] = useState(0);
    const [selectedNote, setSelectedNote] = useState<any>();
    const [selectedDoc, setSelectedDoc] = useState<any>();

    const [addItemModal, setAddItemModal] = useState(false);
    const [deleteItemModal, setDeleteItemModal] = useState(false);
    const [editNoteModal, setEditNoteModal] = useState(false);
    const [editDocModal, setEditDocModal] = useState(false);
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);

    const [bomModal, setBomModal] = useState(false);
    const [FieldNFilterModal, setFieldNFilterModal] = useState(false);

    const gridColumns = useMemo<GridColDef[]>(() => {
        const res: GridColDef[] = [
            { field: "no", headerName: "Item no.", flex: 1 },
            { field: "name", headerName: "Name", flex: 2 },
            { field: "description", headerName: "Description", flex: 2 },
            { field: "cost", headerName: "cost" },
            { field: "salesApproved", headerName: "salesApproved", type: "boolean" },
            { field: "engineeringApproved", headerName: "engineeringApproved", type: "boolean" },
            { field: "totalQoh", headerName: "totalQoh" },
            { field: "usedInLastQuarter", headerName: "usedInLastQuarter" },
            { field: "resellCost", headerName: "resellCost" },
        ];

        const exceptions = [
            "__v",
            "id",
            "no",
            "name",
            "description",
            "cost",
            "salesApproved",
            "engineeringApproved",
            "totalQog",
            "usedInLastQuarter",
            "resellCost",
            "filters",
            "fields",
        ];
        if (items && items.items && items.items.length > 0) {
            for (let f of Object.keys(items.items[0])) {
                if (!exceptions.includes(f)) {
                    res.push({ field: f, headerName: f, hide: true });
                }
            }
        }

        return res;
    }, [items]);

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
    }, [selectedItem, mutateItems]);

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

            <FieldNFilter open={FieldNFilterModal} onClose={() => setFieldNFilterModal(false)} />

            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
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
                        <IconButton title="Cluster and level" onClick={() => setFieldNFilterModal(true)}>
                            <PostAddRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton
                            disabled={activeTab === 0}
                            title="Bill of Material"
                            onClick={() => setBomModal(true)}
                        >
                            <DescriptionRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton disabled={activeTab === 0} title="Add note" onClick={() => setAddNoteModal(true)}>
                            <NoteRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton
                            disabled={activeTab === 0}
                            title="Add document"
                            onClick={() => setAddDocModal(true)}
                        >
                            <FileCopyRounded />
                        </IconButton>
                    </ListItem>
                </List>
                <Box flex={11} ml={2}>
                    {activeTab === 0 && (
                        <Paper>
                            <Box height={550}>
                                <DataGrid
                                    onRowSelected={(r) => {
                                        setSelectedItem(r.data as any);
                                        setActiveTab(1);
                                    }}
                                    pagination
                                    pageSize={25}
                                    rowCount={items ? items.total : 0}
                                    filterMode="server"
                                    paginationMode="server"
                                    sortingMode="server"
                                    onSortModelChange={(s) => setSort(s)}
                                    onPageChange={(p) => setPage(p)}
                                    onPageSizeChange={(ps) => setPage(ps)}
                                    onFilterModelChange={(f) => {
                                        setFilters(f);
                                        console.log(f);
                                    }}
                                    rows={items ? items.items : []}
                                    columns={gridColumns}
                                    components={{ Toolbar: GridToolbar }}
                                />
                            </Box>
                        </Paper>
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
