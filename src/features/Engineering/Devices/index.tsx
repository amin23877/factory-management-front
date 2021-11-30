import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import {
    NoteRounded,
    FileCopyRounded,
    AddRounded,
    DeleteRounded,
    PostAddRounded,
    FormatListNumberedRounded,
    OutlinedFlagRounded,
    ListAltRounded,
    FindInPageRounded,
} from "@material-ui/icons";
// import {
//     DataGrid,
//     GridColDef,
//     GridFilterModelParams,
//     GridPageChangeParams,
//     GridSortModelParams,
//     GridToolbar,
// } from "@material-ui/data-grid";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";
import FieldNFilter from "../../ClusterAndLevel/Modal";
import { AddItemModal } from "../../Items/ItemModals";

import DetailTab from "./Details";
import AddTaskModal, { EditTaskModal } from "./TaskModal";
import FlagModal from "./FlagModal";

import List from "../../../app/SideUtilityList";
import { useDataGridStyles } from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import { deleteAnItem, IItem } from "../../../api/items";
import { get } from "../../../api";

import { generateURL } from "../../../logic/filterSortPage";
import { splitLevelName } from "../../../logic/levels";

import DataGrid from "../../../app/NewDataGrid";
import useSWR from "swr";

const Devices = ({ sales }: { sales?: boolean }) => {
    const classes = useDataGridStyles();
    const { data: fields } = useSWR("/field");
    const { data: clusters } = useSWR("/filter");
    // const [dataState, setDataState] =
    //     useState<{ filters?: GridFilterModelParams; page?: GridPageChangeParams; sorts?: GridSortModelParams }>();
    const [items, setItems] = useState<{ result: IItem[]; total: number }>({ result: [], total: 0 });
    const [loading, setLoading] = useState(false);

    // const refreshItems = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         const resp = await get(
    //             generateURL("/item", dataState?.filters, dataState?.sorts, dataState?.page, "device=true")
    //         );
    //         if (resp) {
    //             setItems(resp);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [dataState?.filters, dataState?.page, dataState?.sorts]);

    // useEffect(() => {
    //     refreshItems();
    // }, [dataState, refreshItems]);

    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const [finish, setFinish] = useState(false);

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

    const gridColumns = useMemo(() => {
        let res = [
            { name: "no", header: "Device Number", minWidth: 120 },
            { name: "name", header: "Name", flex: 1, minWidth: 200 },
            { name: "description", header: "Description", flex: 2, minWidth: 200 },
            { name: "lead", header: "Lead Time", minWidth: 120 },
            { name: "retailPrice", header: "Price", minWidth: 120 },
        ];

        if (!sales) {
            const fieldNames = fields
                ? fields.map((f: any) => res.splice(3, 0, { name: f.name, header: f.name, minWidth: 120 }))
                : [];
            const filterNames = clusters
                ? clusters.map((f: any) =>
                      res.splice(3, 0, {
                          name: f.name,
                          header: splitLevelName(f.name),
                          minWidth: 120,
                      })
                  )
                : [];
            fields && clusters && setFinish(true);
        }

        return res;
    }, [clusters, fields, sales]);

    const handleDelete = useCallback(async () => {
        try {
            if (selectedItem && selectedItem.id) {
                await deleteAnItem(selectedItem.id);
                // refreshItems();

                setDeleteItemModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedItem]);

    return (
        <BasePaper>
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

            <Box display="flex" justifyContent="flex-end" alignItems="center" my={1}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded style={{ marginRight: "5px" }} /> List
                            </span>
                        }
                        wrapped
                    />
                    <Tab
                        disabled={!selectedItem}
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                            </span>
                        }
                    />
                </Tabs>
                <div style={{ flexGrow: 1 }} />
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
            </Box>

            <Box display="flex" alignItems="flex-start" mt={1}>
                <Box flex={1}>
                    {activeTab === 0 && (
                        <>
                            <Box height={575}>
                                {finish ||
                                    (sales && (
                                        <DataGrid
                                            url="/item"
                                            initParams={{ device: true }}
                                            onRowSelected={(r) => {
                                                setSelectedItem(r.data as any);
                                                setActiveTab(1);
                                            }}
                                            columns={gridColumns}
                                        />
                                    ))}
                            </Box>
                        </>
                    )}
                    {activeTab === 1 && (
                        <DetailTab
                            sales={sales}
                            // onDone={refreshItems}
                            onDone={() => {}}
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
        </BasePaper>
    );
};

export default Devices;
