import React, { useCallback, useMemo, useState } from "react";
import { Box, IconButton, ListItem, Paper, Tabs, Tab } from "@material-ui/core";
import {
    NoteRounded,
    FileCopyRounded,
    AddRounded,
    DeleteRounded,
    PostAddRounded,
    FormatListNumberedRounded,
    OutlinedFlagRounded,
} from "@material-ui/icons";
import {
    DataGrid,
    GridColDef,
    GridFilterModelParams,
    GridPageChangeParams,
    GridSortModelParams,
    GridToolbar,
} from "@material-ui/data-grid";
import useSWR from "swr";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";
import FieldNFilter from "../../ClusterAndLevel/Modal";
import { AddItemModal } from "../../Items/ItemModals";

import DetailTab from "./Details";
import AddTaskModal, { EditTaskModal } from "./TaskModal";
import FlagModal from "./FlagModal";

import List from "../../../app/SideUtilityList";

import { deleteAnItem, IItem } from "../../../api/items";

import { generateURL } from "../../../logic/filterSortPage";
import SearchBox from "../../../app/SearchBox";
import { useDataGridStyles } from "../../../app/BaseDataGrid";
import { splitLevelName } from "../../../logic/levels";

const Devices = ({ sales }: { sales?: boolean }) => {
    const classes = useDataGridStyles();
    const [filters, setFilters] = useState<GridFilterModelParams>();
    const [page, setPage] = useState<GridPageChangeParams>();
    const [sorts, setSort] = useState<GridSortModelParams>();

    const { data: items, mutate: mutateItems } = useSWR<{ result: IItem[]; total: number }>(
        generateURL("/item?device=true", filters, sorts, page)
    );
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

    const [activeTab, setActiveTab] = useState(0);
    const [selectedNote, setSelectedNote] = useState<any>();
    const [selectedDoc, setSelectedDoc] = useState<any>();
    const [selectedStep, setSelectedStep] = useState<any>();
    const [selectedFlag, setSelectedFlag] = useState<any>();

    const [addItemModal, setAddItemModal] = useState(false);
    const [addStepModal, setAddStepModal] = useState(false);
    const [deleteItemModal, setDeleteItemModal] = useState(false);
    const [editNoteModal, setEditNoteModal] = useState(false);
    const [editDocModal, setEditDocModal] = useState(false);
    const [editStepModal, setEditStepModal] = useState(false);
    const [editFlagModal, setEditFlagModal] = useState(false);
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);

    const [flagModalOpen, setFlagModalOpen] = useState(false);
    const [FieldNFilterModal, setFieldNFilterModal] = useState(false);

    const gridColumns = useMemo<GridColDef[]>(() => {
        let res: GridColDef[] = [
            { field: "no", headerName: "ID", width: 120 },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "description", headerName: "Description", width: 180 },
            { field: "lead", headerName: "Lead Time", width: 120 },
            { field: "retailPrice", headerName: "Price", width: 120 },
        ];

        if (items && !sales) {
            const newCols = new Set<string>();

            items.result.forEach((item) => {
                Object.keys(item.filters).forEach((f) => newCols.add(f));
                Object.keys(item.fields).forEach((f) => newCols.add(f));
            });
            newCols.forEach((c) => res.push({ field: c, headerName: splitLevelName(c), width: 120 }));
        }

        return res;
    }, [items, sales]);

    const handleDelete = useCallback(async () => {
        try {
            if (selectedItem && selectedItem.id) {
                await deleteAnItem(selectedItem.id);
                mutateItems();

                setDeleteItemModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedItem, mutateItems]);

    return (
        <Box>
            {selectedStep && selectedItem && selectedItem.id && (
                <EditTaskModal
                    device={selectedItem}
                    tab={selectedStep.tab}
                    task={selectedStep}
                    itemId={selectedItem.id as any}
                    open={editStepModal}
                    onClose={() => setEditStepModal(false)}
                />
            )}
            {selectedItem && selectedItem.id && (
                <AddTaskModal
                    device={selectedItem}
                    open={addStepModal}
                    itemId={selectedItem.id as any}
                    onClose={() => setAddStepModal(false)}
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
            {selectedFlag && selectedItem && selectedItem.id && (
                <FlagModal
                    open={editFlagModal}
                    itemId={selectedItem.id as any}
                    onClose={() => setEditFlagModal(false)}
                    flag={selectedFlag}
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
                <FlagModal
                    open={flagModalOpen}
                    onClose={() => setFlagModalOpen(false)}
                    itemId={selectedItem.id as any}
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
            {selectedNote && selectedItem && selectedItem.id && (
                <NoteModal
                    noteData={selectedNote}
                    itemId={selectedItem.id as any}
                    model="item"
                    open={editNoteModal}
                    onClose={() => setEditNoteModal(false)}
                />
            )}
            <AddItemModal
                open={addItemModal}
                onClose={() => setAddItemModal(false)}
                device={true}
                initialValues={{ device: true } as IItem}
            />
            <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />

            <FieldNFilter open={FieldNFilterModal} onClose={() => setFieldNFilterModal(false)} />

            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab disabled={!selectedItem} label="Details" />
                </Tabs>
                <div style={{ flexGrow: 1 }} />
            </Box>

            <Box display="flex" alignItems="flex-start" mt={1}>
                {!sales && (
                    <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
                        <ListItem>
                            <IconButton title="Add Device" onClick={() => setAddItemModal(true)}>
                                <AddRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                disabled={activeTab === 0}
                                title="Add Task"
                                onClick={() => setAddStepModal(true)}
                            >
                                <FormatListNumberedRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                disabled={activeTab === 0}
                                title="Delete Device"
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
                                title="Add Flag"
                                onClick={() => setFlagModalOpen(true)}
                            >
                                <OutlinedFlagRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                disabled={activeTab === 0}
                                title="Add note"
                                onClick={() => setAddNoteModal(true)}
                            >
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
                )}
                <Box flex={11} ml={2}>
                    {activeTab === 0 && (
                        <>
                            <SearchBox panel="engineering" />
                            <Paper>
                                <Box height={550}>
                                    <DataGrid
                                        className={classes.root}
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
                                        }}
                                        rows={items ? items.result : []}
                                        columns={gridColumns}
                                        components={{ Toolbar: GridToolbar }}
                                    />
                                </Box>
                            </Paper>
                        </>
                    )}
                    {activeTab === 1 && (
                        <DetailTab
                            sales={sales}
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
                            onStepSelected={(d) => {
                                setSelectedStep(d);
                                setEditStepModal(true);
                            }}
                            onFlagSelected={(d) => {
                                setSelectedFlag(d);
                                setEditFlagModal(true);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Devices;
