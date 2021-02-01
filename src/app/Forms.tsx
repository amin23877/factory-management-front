import React, { useState, useEffect } from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, TextField, Button, MenuItem, Snackbar } from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";
import { useFormik } from "formik";

import { Gradients } from "../theme";
import { BaseSelect } from "../app/Inputs";

export const GeneralForm = ({
    type,
    getRecord,
    addRecord,
    updateRecord,
    deleteRecord,
}: {
    type: string;
    addRecord: (v: string) => Promise<any>;
    getRecord: () => Promise<any>;
    updateRecord: (id: number, v: string) => Promise<any>;
    deleteRecord: (id: number) => Promise<any>;
}) => {
    const [data, setData] = useState([]);
    const [dis, setDis] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [addName, setAddName] = useState("");
    const [editName, setEditName] = useState("");
    const [selectedData, setSelectedData] = useState<number>();

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
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async () => {
        setDis(true);
        console.log(selectedData, editName);
        try {
            if (selectedData && editName) {
                const resp = await updateRecord(selectedData, editName);
                resp && setDis(false);
                refreshData();
                showMsg(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async () => {
        setDis(true);
        console.log(selectedData);

        try {
            if (selectedData) {
                const resp = await deleteRecord(selectedData);
                resp && setDis(false);
                refreshData();
                showMsg(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                onClose={() => setShowSnack(false)}
                open={showSnack}
                message={snackMsg}
                key="updateSnack"
            />

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
                            <Box width="100%" display="flex">
                                <TextField
                                    fullWidth
                                    value={addName}
                                    onChange={(e) => setAddName(e.target.value)}
                                    variant="outlined"
                                    inputProps={{ style: { padding: 14 } }}
                                    placeholder={`${type} name`}
                                />
                                <Button
                                    type="submit"
                                    disabled={dis}
                                    variant="contained"
                                    onClick={handleAdd}
                                    color="primary"
                                    style={{ background: Gradients.success, margin: "0.5em 0" }}
                                >
                                    Add
                                </Button>
                            </Box>
                        </form>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
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
                                <BaseSelect value={selectedData} onChange={(e: any) => setSelectedData(e.target.value)}>
                                    {data.map((cat: { id: string; name: string }) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </BaseSelect>
                                <TextField
                                    variant="outlined"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    fullWidth
                                    inputProps={{ style: { padding: 14 } }}
                                    placeholder={`New ${type} name`}
                                />
                                <Button
                                    type="submit"
                                    disabled={dis}
                                    variant="contained"
                                    onClick={handleEdit}
                                    color="primary"
                                    style={{ background: Gradients.info, padding: "0.8em 0" }}
                                >
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
                            <Box width="100%" display="flex">
                                <BaseSelect
                                    value={selectedData}
                                    onChange={(e: any) => setSelectedData(e.target.value)}
                                    fullWidth
                                    style={{ marginRight: "0.5em" }}
                                >
                                    {data.map((cat: { id: string; name: string }) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </BaseSelect>
                                <Button
                                    type="submit"
                                    disabled={dis}
                                    variant="contained"
                                    onClick={handleDelete}
                                    color="primary"
                                    style={{ background: Gradients.error, margin: "0.5em 0" }}
                                >
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
