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
    MenuItem,
    Snackbar,
} from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";

import { createCategory, deleteACategory, updateACategory, getCategories } from "../../api/category";

import { Gradients } from "../../theme";
import { BaseSelect } from "../../app/Inputs";

export const CategoryModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [cats, setCats] = useState([]);
    const [dis, setDis] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [addCatName, setAddCatName] = useState("");
    const [editSelCat, setEditSelCat] = useState("");
    const [editNewName, setEditNewName] = useState("");
    const [delSelCat, setDelSelCat] = useState("");

    const showMsg = (d: any) => {
        setShowSnack(true);
        if (d.status && d.status === 400) {
            setSnackMsg(d.error);
        } else {
            setSnackMsg("Request Successful...");
        }
    };

    useEffect(() => {
        if (open) {
            getCategories()
                .then((d) => setCats(d))
                .catch((e) => console.log(e));
        }
    }, [open]);

    const handleAdd = () => {
        setDis(true);
        if (addCatName) {
            createCategory(addCatName)
                .then((d) => showMsg(d))
                .catch((e) => console.log(e))
                .finally(() => setDis(false));
        }
    };
    const handleEdit = () => {
        setDis(true);
        console.log(editSelCat, editNewName);

        if (editSelCat && editNewName) {
            updateACategory(editSelCat, editNewName)
                .then((d) => showMsg(d))
                .catch((e) => console.log(e))
                .finally(() => setDis(false));
        }
    };
    const handleDelete = () => {
        setDis(true);
        if (delSelCat) {
            deleteACategory(delSelCat)
                .then((d) => showMsg(d))
                .catch((e) => console.log(e))
                .finally(() => setDis(false));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                onClose={() => setShowSnack(false)}
                open={showSnack}
                message={snackMsg}
                key="updateSnack"
            />

            <DialogTitle>Manange Categories</DialogTitle>
            <Box m={2} p={2}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreRounded />}>Add</AccordionSummary>
                    <AccordionDetails>
                        <Box width="100%" display="flex" alignItems="center">
                            <TextField
                                fullWidth
                                value={addCatName}
                                onChange={(e) => setAddCatName(e.target.value)}
                                variant="outlined"
                                label="Category Name"
                            />
                            <Button
                                disabled={dis}
                                variant="contained"
                                onClick={handleAdd}
                                color="primary"
                                style={{ background: Gradients.success }}
                            >
                                Add
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreRounded />}>Edit</AccordionSummary>
                    <AccordionDetails>
                        <Box width="100%" display="flex" alignItems="center">
                            <BaseSelect value={editSelCat} onChange={(e) => setEditSelCat(e.target.value as string)}>
                                {cats.map((cat: { id: string; name: string }) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </BaseSelect>
                            <TextField
                                variant="outlined"
                                value={editNewName}
                                onChange={(e) => setEditNewName(e.target.value)}
                                fullWidth
                                label="New Category Name"
                            />
                            <Button
                                disabled={dis}
                                variant="contained"
                                onClick={handleEdit}
                                color="primary"
                                style={{ background: Gradients.info }}
                            >
                                Save
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreRounded />}>Delete</AccordionSummary>
                    <AccordionDetails>
                        <Box width="100%" display="flex" alignItems="center">
                            <BaseSelect
                                value={delSelCat}
                                onChange={(e) => setDelSelCat(e.target.value as string)}
                                fullWidth
                                style={{ marginRight: "0.5em" }}
                            >
                                {cats.map((cat: { id: string; name: string }) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </BaseSelect>
                            <Button
                                disabled={dis}
                                variant="contained"
                                onClick={handleDelete}
                                color="primary"
                                style={{ background: Gradients.error }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Dialog>
    );
};
