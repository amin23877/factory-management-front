import React, { useState, useEffect } from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, MenuItem } from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";

import Snackbar from "./Snack";
import TextField from "./TextField";
import Button from "./Button";
import { BaseSelect } from "./Inputs";

export const GeneralForm = ({
    type,
    getRecord,
    addRecord,
    updateRecord,
    deleteRecord,
    onDone,
}: {
    type: string;
    addRecord: (v: string) => Promise<any>;
    getRecord: () => Promise<any>;
    updateRecord: (id: string, v: string) => Promise<any>;
    deleteRecord: (id: string) => Promise<any>;
    onDone?: () => void;
}) => {
    const [data, setData] = useState([]);
    const [dis, setDis] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [addName, setAddName] = useState("");
    const [editName, setEditName] = useState("");
    const [selectedData, setSelectedData] = useState<string>();

    const showMsg = (d: any) => {
        setShowSnack(true);
        if (d.error) {
            setSnackMsg(d.error);
        } else {
            setSnackMsg("Request Successful...");
        }
    };

    const refreshData = async () => {
        try {
            const data = await getRecord();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleAdd = async () => {
        setDis(true);
        try {
            if (addName) {
                const resp = await addRecord(addName);
                resp && setDis(false);
                refreshData();
                showMsg(resp);
                onDone && onDone();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async () => {
        setDis(true);
        try {
            if (selectedData && editName) {
                const resp = await updateRecord(selectedData, editName);
                resp && setDis(false);
                refreshData();
                showMsg(resp);
                onDone && onDone();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async () => {
        setDis(true);
        try {
            if (selectedData) {
                const resp = await deleteRecord(selectedData);
                resp && setDis(false);
                refreshData();
                showMsg(resp);
                onDone && onDone();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Snackbar onClose={() => setShowSnack(false)} open={showSnack}>
                {snackMsg}
            </Snackbar>

            <Box m={2} p={2}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreRounded />}>Add</AccordionSummary>
                    <AccordionDetails>
                        <form
                            onSubmit={(e: any) => {
                                e.preventDefault();
                                handleAdd();
                            }}
                            style={{ width: "100%" }}
                        >
                            <Box width="100%" display="flex" justifyContent="space-between" alignItems="flex-end">
                                <TextField
                                    fullWidth
                                    value={addName}
                                    onChange={(e) => setAddName(e.target.value)}
                                    placeholder={`${type} name`}
                                    style={{ marginRight: "8px", flex: 1 }}
                                />
                                <Button type="submit" kind="add" disabled={dis} style={{ marginBottom: "8px" }}>
                                    Add
                                </Button>
                            </Box>
                        </form>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreRounded />}>Edit</AccordionSummary>
                    <AccordionDetails>
                        <form
                            onSubmit={(e: any) => {
                                e.preventDefault();
                                handleEdit();
                            }}
                            style={{ width: "100%" }}
                        >
                            <Box width="100%" display="flex" alignItems="center">
                                <TextField
                                    fullWidth
                                    label="new name"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    style={{ flex: 1, margin: "0px 0px 5px 0px" }}
                                    placeholder={`New ${type} name`}
                                />
                            </Box>

                            <Box width="100%" display="flex" alignItems="center">
                                <BaseSelect fullWidth value={selectedData} onChange={(e: any) => setSelectedData(e.target.value)}>
                                    {data.map((cat: { id: string; name: string }) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </BaseSelect>

                                <Button type="submit" disabled={dis} kind="edit" style={{ margin: "0 0.5em" }}>
                                    Save
                                </Button>
                            </Box>
                        </form>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreRounded />}>Delete</AccordionSummary>
                    <AccordionDetails>
                        <form
                            onSubmit={(e: any) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            style={{ width: "100%" }}
                        >
                            <Box width="100%" display="flex" alignItems="center">
                                <BaseSelect value={selectedData} onChange={(e: any) => setSelectedData(e.target.value)} fullWidth>
                                    {data.map((cat: { id: string; name: string }) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </BaseSelect>
                                <Button type="submit" disabled={dis} kind="delete" style={{ margin: "0 0.5em" }}>
                                    Delete
                                </Button>
                            </Box>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};
