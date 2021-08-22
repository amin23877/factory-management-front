import React, { useState } from "react";

import { Box, Tabs, Tab } from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";

import { deleteCall } from "../../../api/calls";

import Confirm from "../../Modals/Confirm";
import BaseDataGrid from "../../../app/BaseDataGrid";
import Button from "../../../app/Button";

import Details from "./Details";
import AddCallModal from "./CallModal";
import { BasePaper } from "../../../app/Paper";
import { GridColDef } from "@material-ui/data-grid";
import { formatTimestampToDate } from "../../../logic/date";
import useSwr, { mutate } from "swr";

export default function Calls() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedCall, setSelectedCall] = useState<any>();
    const [addCall, setAddCall] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const { data: calls } = useSwr("/calls");

    const callCols: GridColDef[] = [
        // State	Zip Code	Assigned to 	Created By	Tag

        {
            field: "Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt),
            width: 110,
        },
        { field: "number", headerName: "Ticket ID", width: 100 },
        { field: "subject", headerName: "Subject", width: 100 },
        { field: "company", headerName: "Company", width: 100 },
        { field: "contactName", headerName: "Name", width: 100 },
        { field: "contactNumber", headerName: "Contact No.", width: 110 },
        { field: "contactEmail", headerName: "Email", width: 150 },
        { field: "state", headerName: "State", width: 100 },
        { field: "zip", headerName: "Zip Code", width: 100 },
        {
            field: "Assigned To",
            valueFormatter: (r) => r.row?.assignedTo?.username,
            width: 110,
        },
        {
            field: "Created By",
            valueFormatter: (r) => r.row?.createdBy?.username,
            width: 110,
        },
        {
            field: "Tag",
            valueFormatter: (r) => r.row?.tags[0],
            width: 100,
        },
    ];

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
            <AddCallModal open={addCall} onClose={() => setAddCall(false)} />
            <Confirm
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`Are you sure, You are going to delete PO with number ${selectedCall?.number}`}
            />
            <Box mb={2} display="flex" alignItems="center">
                <Button
                    onClick={() => setAddCall(true)}
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
            </Box>
            <BasePaper>
                <Tabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    style={{ marginBottom: 10 }}
                >
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedCall} />
                </Tabs>
                {activeTab === 0 && calls && (
                    <BaseDataGrid
                        rows={calls}
                        cols={callCols}
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
