import React, { useEffect, useState } from "react";
import { mutate } from "swr";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "../../../app/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";
import LineItemModal from "../../LineItem";
import LineServiceModal from "../../LineService";
import EditTab from "./EditTab";
import AddSOModal from "./AddSoModal";

import { deleteSO, getLineItems, ISO } from "../../../api/so";
import { ILineItem } from "../../../api/lineItem";
import { getSOLineServices, ILineService } from "../../../api/lineService";
import { BasePaper } from "../../../app/Paper";
import Datagrid from "./Datagrid";

export default function SalesOrderPanel() {
    const [activeTab, setActiveTab] = useState(0);

    const [confirm, setConfirm] = useState(false);
    const [addSo, setAddSo] = useState(false);
    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [lineItemModal, setLineItemModal] = useState(false);
    const [lineServiceModal, setLineServiceModal] = useState(false);

    const [selectedNote, setSelectedNote] = useState<any>();
    const [selectedDoc, setSelectedDoc] = useState<any>();
    const [selectedLI, setSelectedLI] = useState<ILineItem>();
    const [selectedLS, setSelectedLS] = useState<ILineService>();
    const [selectedSO, setSelectedSO] = useState<ISO>();

    const handleDelete = async () => {
        try {
            if (selectedSO && selectedSO.id) {
                const resp = await deleteSO(selectedSO.id);
                if (resp) {
                    setActiveTab(0);
                    setSelectedSO(undefined);
                    mutate("/so");
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            {selectedSO && selectedSO.id && (
                <LineItemModal
                    open={lineItemModal}
                    onClose={() => setLineItemModal(false)}
                    record="SO"
                    recordId={selectedSO.id}
                    selectedLine={selectedLI}
                />
            )}
            {selectedSO && selectedSO.id && (
                <LineServiceModal
                    open={lineServiceModal}
                    onClose={() => setLineServiceModal(false)}
                    record="SO"
                    recordId={selectedSO.id}
                    selectedLine={selectedLS}
                />
            )}
            {selectedSO && selectedSO.id && (
                <NoteModal
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    itemId={selectedSO.id}
                    model="so"
                    noteData={selectedNote}
                />
            )}
            {selectedSO && selectedSO.id && (
                <DocumentModal
                    open={docModal}
                    onClose={() => setDocModal(false)}
                    itemId={selectedSO.id}
                    model="so"
                    docData={selectedDoc}
                />
            )}

            <AddSOModal open={addSo} onClose={() => setAddSo(false)} onDone={() => mutate("/so")} />
            <Confirm
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`Are you sure, You are going to delete SO with number ${selectedSO?.number}`}
            />

            <Box mb={2} display="flex" alignItems="center">
                <Button
                    onClick={() => setAddSo(true)}
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                >
                    <AddRoundedIcon />
                    Add SO
                </Button>

                {activeTab === 1 && (
                    <>
                        <Button disabled={!selectedSO} onClick={() => setConfirm(true)} kind="delete">
                            Delete SO
                        </Button>
                        <Button
                            kind="add"
                            onClick={() => {
                                setSelectedLI(undefined);
                                setLineItemModal(true);
                            }}
                            style={{ margin: "0 0.5em" }}
                        >
                            Add Line item
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedLS(undefined);
                                setLineServiceModal(true);
                            }}
                            kind="add"
                        >
                            Add Line service
                        </Button>
                        {/* <Button
                            onClick={() => {
                                setSelectedNote(undefined);
                                setNoteModal(true);
                            }}
                        >
                            Add note
                        </Button>
                        <Button
                            style={{ backgroundColor: "#1a73e8", color: "#fff", marginLeft: "5px" }}
                            onClick={() => {
                                setSelectedDoc(undefined);
                                setDocModal(true);
                            }}
                        >
                            <AddRoundedIcon />
                            Add Document
                        </Button> */}
                    </>
                )}
                <div style={{ flexGrow: 1 }} />
            </Box>

            <BasePaper>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Overview" />
                    <Tab label="Details" disabled={!selectedSO} />
                </Tabs>
                {activeTab === 0 && (
                    <Datagrid
                        onRowSelected={(d) => {
                            setSelectedSO(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedSO && (
                    <EditTab
                        selectedSo={selectedSO}
                        onLineServiceSelected={(d) => {
                            setSelectedLS(d);
                            setLineServiceModal(true);
                        }}
                        onLineItemSelected={(d) => {
                            setSelectedLI(d);
                            setLineItemModal(true);
                        }}
                        onNoteSelected={(d) => {
                            setSelectedNote(d);
                            setNoteModal(true);
                        }}
                        onDocSelected={(d) => {
                            setSelectedDoc(d);
                            setDocModal(true);
                        }}
                    />
                )}
            </BasePaper>
        </Box>
    );
}
