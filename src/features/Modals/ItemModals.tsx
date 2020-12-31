import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    useTheme,
    Box,
    TextField,
    Button,
    MenuItem,
    Divider,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ExpandMoreRounded } from "@material-ui/icons";
import { Formik, Form } from "formik";

import { BaseSelect } from "../../app/Inputs";

import { Gradients } from "../../theme";
import { getCategories } from "../../api/category";
import { getAllSubTypes, getAllTypes } from "../../api/types";
import { createItem, AddItemInitialValues, AddItemSchema, deleteAnItem } from "../../api/items";

export const DeleteItem = ({ open, onClose, item }: { open: boolean; onClose: () => void; item: any }) => {
    const theme = useTheme();
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
    const [cats, setCats] = useState([]);
    const [types, setTypes] = useState([]);
    const [subtypes, setSubtypes] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => setCats(data))
            .catch((e) => console.log(e));
        getAllTypes()
            .then((data) => setTypes(data))
            .catch((e) => console.log(e));
        getAllSubTypes()
            .then((data) => setSubtypes(data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
            <DialogTitle>Add new Item to inventory</DialogTitle>
            <Box p={3} display="flex" alignItems="center">
                <Formik
                    initialValues={AddItemInitialValues}
                    validationSchema={AddItemSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        createItem(data)
                            .then((res) => {
                                console.log(res);
                                setSubmitting(false);
                                if (res.status !== 400) {
                                    onClose();
                                }
                            })
                            .catch((e) => console.log(e));
                    }}
                >
                    {({ errors, touched, values, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                        <Form style={{ textAlign: "center" }}>
                            <TextField
                                variant="outlined"
                                name="name"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.name && touched.name)}
                                helperText={touched.name && errors.name && String(errors.name)}
                                label="name"
                            />
                            <TextField
                                variant="outlined"
                                name="no"
                                value={values.no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.no && touched.no)}
                                helperText={touched.no && errors.no && String(errors.no)}
                                label="Number"
                            />
                            <BaseSelect
                                style={{ margin: "0.41em" }}
                                variant="outlined"
                                name="active"
                                value={values.active}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.active && touched.active)}
                                // helperText={touched.active && errors.active && String(errors.active)}
                                label="Active"
                            >
                                <MenuItem value={"true"}>Active</MenuItem>
                                <MenuItem value={"false"}>InActive</MenuItem>
                            </BaseSelect>
                            <TextField
                                variant="outlined"
                                name="version"
                                value={values.version}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.version && touched.version)}
                                helperText={touched.version && errors.version && String(errors.version)}
                                label="Version"
                            />
                            <TextField
                                variant="outlined"
                                name="keywords"
                                value={values.keywords}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.keywords && touched.keywords)}
                                helperText={touched.keywords && errors.keywords && String(errors.keywords)}
                                label="Keywords"
                            />
                            <TextField
                                variant="outlined"
                                name="url"
                                value={values.url}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.url && touched.url)}
                                helperText={touched.url && errors.url && String(errors.url)}
                                label="URL"
                            />
                            <TextField
                                variant="outlined"
                                name="description"
                                value={values.description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.description && touched.description)}
                                helperText={touched.description && errors.description && String(errors.description)}
                                style={{ margin: "1em 2em", width: "94%" }}
                                label="Description"
                            />
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreRounded />}>Inventory</AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        variant="outlined"
                                        name="mfgr"
                                        value={values.mfgr}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.mfgr && touched.mfgr)}
                                        helperText={touched.mfgr && errors.mfgr && String(errors.mfgr)}
                                        label="MFGR"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="sku"
                                        value={values.sku}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.sku && touched.sku)}
                                        helperText={touched.sku && errors.sku && String(errors.sku)}
                                        label="SKU"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="upc"
                                        value={values.upc}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.upc && touched.upc)}
                                        helperText={touched.upc && errors.upc && String(errors.upc)}
                                        label="UPC"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="bin"
                                        value={values.bin}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.bin && touched.bin)}
                                        helperText={touched.bin && errors.bin && String(errors.bin)}
                                        label="BIN"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="tiers"
                                        value={values.tiers}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.tiers && touched.tiers)}
                                        helperText={touched.tiers && errors.tiers && String(errors.tiers)}
                                        label="Tiers"
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreRounded />}>Sales</AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        variant="outlined"
                                        name="cost"
                                        value={values.cost}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.cost && touched.cost)}
                                        helperText={touched.cost && errors.cost && String(errors.cost)}
                                        label="Cost"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="retailPrice"
                                        value={values.retailPrice}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.retailPrice && touched.retailPrice)}
                                        helperText={touched.retailPrice && errors.retailPrice && String(errors.retailPrice)}
                                        label="Retail Price"
                                    />
                                    <BaseSelect
                                        style={{ margin: "0.41em" }}
                                        variant="outlined"
                                        name="mode"
                                        value={values.mode}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.mode && touched.mode)}
                                        // helperText={touched.mode && errors.mode && String(errors.mode)}
                                        label="Mode"
                                    >
                                        <MenuItem value="Individual">Individual</MenuItem>
                                        <MenuItem value="Kit">Kit</MenuItem>
                                        <MenuItem value="Bundle">Bundle</MenuItem>
                                    </BaseSelect>
                                    <TextField
                                        variant="outlined"
                                        name="modeCost"
                                        value={values.modeCost}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.modeCost && touched.modeCost)}
                                        helperText={touched.modeCost && errors.modeCost && String(errors.modeCost)}
                                        label="Mode Cost"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="qoh"
                                        value={values.qoh}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.qoh && touched.qoh)}
                                        helperText={touched.qoh && errors.qoh && String(errors.qoh)}
                                        label="Quantity On Hand"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="minimum"
                                        value={values.minimum}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.minimum && touched.minimum)}
                                        helperText={touched.minimum && errors.minimum && String(errors.minimum)}
                                        label="Minimum"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="maximum"
                                        value={values.maximum}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.maximum && touched.maximum)}
                                        helperText={touched.maximum && errors.maximum && String(errors.maximum)}
                                        label="Maximum"
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreRounded />}>Shipping</AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        variant="outlined"
                                        name="aisle"
                                        value={values.aisle}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.aisle && touched.aisle)}
                                        helperText={touched.aisle && errors.aisle && String(errors.aisle)}
                                        label="AISLE"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="shelf"
                                        value={values.shelf}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.shelf && touched.shelf)}
                                        helperText={touched.shelf && errors.shelf && String(errors.shelf)}
                                        label="Shelf"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="additionalShippingFee"
                                        value={values.additionalShippingFee}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.additionalShippingFee && touched.additionalShippingFee)}
                                        helperText={
                                            touched.additionalShippingFee &&
                                            errors.additionalShippingFee &&
                                            String(errors.additionalShippingFee)
                                        }
                                        label="Additional Shipping Fee"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="shippingNote"
                                        value={values.shippingNote}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.shippingNote && touched.shippingNote)}
                                        helperText={touched.shippingNote && errors.shippingNote && String(errors.shippingNote)}
                                        label="Shipping Note"
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreRounded />}>Details</AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        variant="outlined"
                                        name="color"
                                        value={values.color}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.color && touched.color)}
                                        helperText={touched.color && errors.color && String(errors.color)}
                                        label="Color"
                                    />
                                    <BaseSelect
                                        style={{ margin: "0.41em" }}
                                        variant="outlined"
                                        name="size"
                                        value={values.size}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.size && touched.size)}
                                        // helperText={touched.size && errors.size && String(errors.size)}
                                        label="Size"
                                    >
                                        <MenuItem value="large">Large</MenuItem>
                                        <MenuItem value="medium">Medium</MenuItem>
                                        <MenuItem value="small">Small</MenuItem>
                                    </BaseSelect>
                                    <TextField
                                        variant="outlined"
                                        name="variance"
                                        value={values.variance}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.variance && touched.variance)}
                                        helperText={touched.variance && errors.variance && String(errors.variance)}
                                        label="Variance"
                                    />
                                    <TextField
                                        variant="outlined"
                                        name="specialNote"
                                        value={values.specialNote}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(errors.specialNote && touched.specialNote)}
                                        helperText={touched.specialNote && errors.specialNote && String(errors.specialNote)}
                                        label="Special Notes"
                                        multiline
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreRounded />}>Category Type Subtype</AccordionSummary>
                                <AccordionDetails style={{ justifyContent: "space-evenly" }}>
                                    <Autocomplete
                                        value={values.CategoryId}
                                        onBlur={handleBlur}
                                        inputValue={values.CategoryId || ""}
                                        onChange={(e, nv: any) => {
                                            nv && setFieldValue("CategoryId", nv.id);
                                            console.log(nv);
                                        }}
                                        options={cats}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                                    />
                                    <Autocomplete
                                        // value={values.TypeId}
                                        onBlur={handleBlur}
                                        inputValue={values.TypeId || ""}
                                        onInputChange={(e, nv: any) => nv && setFieldValue("TypeId", nv)}
                                        options={types}
                                        getOptionLabel={(option: any) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                        style={{ margin: "0 1em" }}
                                    />
                                    <Autocomplete
                                        // value={values.SubtypeId}
                                        onBlur={handleBlur}
                                        inputValue={values.SubtypeId || ""}
                                        onInputChange={(e, nv: any) => nv && setFieldValue("SubtypeId", nv)}
                                        options={subtypes}
                                        getOptionLabel={(option: any) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Subtype" variant="outlined" />}
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Box textAlign="center" my={2}>
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    Add Item
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
