import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { mutate } from "swr";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { ListAltRounded, FindInPageRounded } from "@material-ui/icons";

import Confirm from "../../Modals/Confirm";
import OneFieldModal from "../../../components/OneFieldModal";

import { BasePaper } from "../../../app/Paper";
import Button from "../../../app/Button";

import Details from "./Details";
import AddCallModal from "./CallModal";

import { deleteCall } from "../../../api/calls";
import { addCallsTag, deleteCallsTag, editCallsTag } from "../../../api/callsTags";
import DataGrid from "./DataGrid";

export default function Calls() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedCall, setSelectedCall] = useState<any>();
    const [addCall, setAddCall] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [CTagModal, setCTagModal] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedCall && selectedCall?.id) {
                const resp = await deleteCall(selectedCall?.id as any);
                if (resp) {
                    mutate("/calls");
                    setActiveTab(0);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setConfirm(false);
        }
    };

    return (
        <Box>
            {/* <CallsTagsModal open={CTagModal} onClose={() => setCTagModal(false)} /> */}

            <OneFieldModal
                title="Add/Edit Calls Tags"
                getUrl="/callsTags"
                open={CTagModal}
                onClose={() => setCTagModal(false)}
                postRecord={addCallsTag}
                updateRecord={editCallsTag}
                deleteRecord={deleteCallsTag}
            />
            <AddCallModal open={addCall} onClose={() => setAddCall(false)} />
            <Confirm
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`Are you sure, You are going to delete PO with number ${selectedCall?.number}`}
            />
            <Box mb={1} display="flex" alignItems="center">
                <Button
                    onClick={() => setAddCall(true)}
                    style={{
                        backgroundColor: "rgb(25,117,228)",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 25px",
                        borderRadius: "0.5em",
                        fontSize: "small",
                        // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                >
                    <AddRoundedIcon />
                    Add Ticket
                </Button>
                <Button
                    kind="delete"
                    disabled={!selectedCall}
                    onClick={() => setConfirm(true)}
                    style={{ margin: "0 0.5em" }}
                >
                    Delete Ticket
                </Button>
                <Button kind="add" onClick={() => setCTagModal(true)} style={{ margin: "0 0.5em" }}>
                    Add Call Tags
                </Button>
            </Box>
            <BasePaper>
                <Tabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    style={{ marginBottom: 10 }}
                >
                    <Tab
                        // label="List"
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                            </span>
                        }
                        wrapped
                    />
                    <Tab
                        // label="Details"
                        disabled={!selectedCall}
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                            </span>
                        }
                    />
                </Tabs>
                {activeTab === 0 && (
                    <DataGrid
                        onRowSelected={(d) => {
                            setSelectedCall(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedCall && <Details callsData={selectedCall} />}
            </BasePaper>
        </Box>
    );
}
