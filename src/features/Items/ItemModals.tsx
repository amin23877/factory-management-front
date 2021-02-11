import React from "react";
import {
    Dialog,
    DialogTitle,
    Box,
    TextField,
    Button,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
} from "@material-ui/core";
import { useFormik } from "formik";

import { FieldSelect } from "../../app/Inputs";

import { getCategories } from "../../api/category";
import { getTypes } from "../../api/types";
import { getFamilies } from "../../api/family";
import { createItem, AddItemInitialValues, AddItemSchema } from "../../api/items";

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

    const specials = ["size", "active", "ItemCategoryId", "ItemTypeId", "ItemFamilyId"];
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

                    <FieldSelect
                        request={getCategories}
                        itemTitleField="name"
                        itemValueField="id"
                        label="Category"
                        fullWidth
                        name="ItemCategoryId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ItemCategoryId}
                    />
                    <FieldSelect
                        request={getTypes}
                        title="Type"
                        itemTitleField="name"
                        itemValueField="id"
                        label="Type"
                        fullWidth
                        name="ItemTypeId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ItemTypeId}
                    />
                    <FieldSelect
                        request={getFamilies}
                        title="Family"
                        itemTitleField="name"
                        itemValueField="id"
                        label="Family"
                        fullWidth
                        name="ItemFamilyId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ItemFamilyId}
                    />

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
                        <RadioGroup name="active" value={String(values.active)} onChange={handleChange}>
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
