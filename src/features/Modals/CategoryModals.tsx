import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    Tabs,
    Tab,
    MenuItem,
    Snackbar,
} from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";

import { createCategory, deleteCategory, updateCategory, getCategories } from "../../api/category";
import { createType, deleteType, getTypes, updateType } from "../../api/types";
import { createFamily, deleteFamily, getFamilies, updateFamily } from "../../api/family";

import { Gradients } from "../../theme";
import { BaseSelect } from "../../app/Inputs";

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
        if (d.status && d.status === 400) {
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
                        >
                            <Box width="100%" display="flex" alignItems="center">
                                <TextField
                                    fullWidth
                                    value={addName}
                                    onChange={(e) => setAddName(e.target.value)}
                                    variant="outlined"
                                    label={`${type} name`}
                                />
                                <Button
                                    type="submit"
                                    disabled={dis}
                                    variant="contained"
                                    onClick={handleAdd}
                                    color="primary"
                                    style={{ background: Gradients.success }}
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
                                    label="New Category Name"
                                />
                                <Button
                                    type="submit"
                                    disabled={dis}
                                    variant="contained"
                                    onClick={handleEdit}
                                    color="primary"
                                    style={{ background: Gradients.info }}
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
                        >
                            <Box width="100%" display="flex" alignItems="center">
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
                                    style={{ background: Gradients.error }}
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

export default function CatTypeFamilyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Manage <em>Categories - Types - Families</em>
            </DialogTitle>
            <Box>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Category" />
                    <Tab label="Type" />
                    <Tab label="Family" />
                </Tabs>
                {activeTab === 0 && (
                    <GeneralForm
                        type="Category"
                        addRecord={createCategory}
                        deleteRecord={deleteCategory}
                        getRecord={getCategories}
                        updateRecord={updateCategory}
                    />
                )}
                {activeTab === 1 && (
                    <GeneralForm
                        type="Type"
                        addRecord={createType}
                        deleteRecord={deleteType}
                        getRecord={getTypes}
                        updateRecord={updateType}
                    />
                )}
                {activeTab === 2 && (
                    <GeneralForm
                        type="Family"
                        addRecord={createFamily}
                        deleteRecord={deleteFamily}
                        getRecord={getFamilies}
                        updateRecord={updateFamily}
                    />
                )}
            </Box>
        </Dialog>
    );
}
