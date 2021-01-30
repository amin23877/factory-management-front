import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    Box,
    TextField,
    MenuItem,
    Button,
    Divider,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
} from "@material-ui/core";
import { useFormik } from "formik";

import { BaseSelect } from "../../app/Inputs";

import { Gradients } from "../../theme";
import { getCategories } from "../../api/category";
import { getTypes } from "../../api/types";
import { getFamilies } from "../../api/family";
import { createItem, AddItemInitialValues, AddItemSchema, deleteAnItem } from "../../api/items";

export const DeleteItem = ({ open, onClose, item }: { open: boolean; onClose: () => void; item: any }) => {
    const [dis, setDis] = useState(false);

    const handleDelete = () => {
        setDis(true);
        deleteAnItem(item.id)
            .then((d) => {
                if (d.status !== 400) {
                    onClose();
                }
            })
            .catch((e) => console.log(e))
            .finally(() => setDis(false));
    };

    return (
        <Dialog open={open} onClose={() => onClose()} maxWidth="sm">
            <DialogTitle>
                Delete Item <em>'{item.name}'</em> with id <em>'{item.id}'</em>
            </DialogTitle>
            <Box p={2}>
                <TextField fullWidth disabled value={item.name} variant="outlined" />
                <TextField fullWidth disabled value={item.no} variant="outlined" />
                <TextField fullWidth disabled value={item.cost + " $"} variant="outlined" />
                <TextField fullWidth disabled value={item.mode} variant="outlined" />
                <Divider style={{ width: "90%", margin: "1em auto" }} />
                <Box textAlign="center" my={2}>
                    <Button
                        onClick={handleDelete}
                        disabled={dis}
                        variant="contained"
                        color="primary"
                        style={{ background: Gradients.error }}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export const AddItemModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { errors, touched, values, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
        initialValues: AddItemInitialValues,
        validationSchema: AddItemSchema,
        onSubmit: (data, { setSubmitting }) => {
            // console.log(data);

            createItem(data)
                .then((res: any) => {
                    console.log(res);
                    setSubmitting(false);
                    if (res.status !== 400) {
                        onClose();
                    }
                })
                .catch((e) => console.log(e));
        },
    });
    const [cats, setCats] = useState([]);
    const [types, setTypes] = useState([]);
    const [families, setFamilies] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => setCats(data))
            .catch((e) => console.log(e));

        getTypes()
            .then((data) => setTypes(data))
            .catch((e) => console.log(e));

        getFamilies()
            .then((d) => setFamilies(d))
            .catch((e) => console.log(e));
    }, [open]);

    const specials = ["size", "active", "CategoryId", "TypeId", "FamilyId"];
    let form_inputs = [];
    let key: keyof typeof values;
    for (key in values) {
        if (!specials.includes(key)) {
            form_inputs.push(
                <TextField
                    fullWidth
                    variant="outlined"
                    name={key}
                    value={values[key]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors[key] && touched[key])}
                    helperText={touched[key] && errors[key] && String(errors[key])}
                    label={key}
                />
            );
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>Add new Item to inventory</DialogTitle>
            <Box p={3} display="flex" alignItems="center">
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                    {form_inputs}

                    <FormControl fullWidth>
                        <FormLabel>Category</FormLabel>
                        <BaseSelect fullWidth name="CategoryId" onChange={handleChange} onBlur={handleBlur} value={values.CategoryId}>
                            {cats.map((c: any) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </BaseSelect>
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Type</FormLabel>
                        <BaseSelect fullWidth name="TypeId" onChange={handleChange} onBlur={handleBlur} value={values.TypeId}>
                            {types.map((c: any) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </BaseSelect>
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Family</FormLabel>
                        <BaseSelect fullWidth name="FamilyId" onChange={handleChange} onBlur={handleBlur} value={values.FamilyId}>
                            {families.map((c: any) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </BaseSelect>
                    </FormControl>

                    <FormControl fullWidth style={{ margin: "0.5em" }}>
                        <FormLabel>Size</FormLabel>
                        <RadioGroup name="size" value={values.size} onChange={handleChange}>
                            <FormControlLabel value="small" control={<Radio />} label="Small" />
                            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="large" control={<Radio />} label="Large" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth style={{ margin: "0.5em" }}>
                        <FormLabel>Active</FormLabel>
                        <RadioGroup name="active" value={values.active} onChange={handleChange}>
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <Box textAlign="center" my={2}>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Add Item
                        </Button>
                    </Box>
                </form>
            </Box>
        </Dialog>
    );
};
