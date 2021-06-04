import React, { ReactNode } from "react";
import { Box, FormControlLabel, Typography, Checkbox } from "@material-ui/core";

import Button from "../../app/Button";

import { getCategories } from "../../api/category";
import { getTypes } from "../../api/types";
import { getFamilies } from "../../api/family";

import TextField from "../../app/TextField";
import { ArraySelect, FieldSelect } from "../../app/Inputs";
import useSWR from "swr";
import { IFilter } from "../../api/filter";
import { IField } from "../../api/field";

interface IForm {
    values: any;
    errors: any;
    touched: any;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    isSubmitting?: boolean;
}

export const General = ({ isSubmitting, values, errors, handleChange, handleBlur, touched }: IForm) => {
    const { data: filters } = useSWR<IFilter[]>("/filter");
    const { data: fields } = useSWR<IField[]>("/field");

    let dynamicFieldInputs: ReactNode[] = [];
    if (fields) {
        fields.map((field) => {
            if (field.filterValue.includes(values[field.filterName])) {
                dynamicFieldInputs.push(<TextField label={field.name} />);
            }
        });
    }

    return (
        <>
            <Box my={1} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap={5} gridColumnGap={5}>
                <TextField
                    label="Item name"
                    placeholder="Item name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name && touched.name)}
                    value={values.name}
                />
                <TextField
                    label="upc"
                    placeholder="upc"
                    name="upc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.upc && touched.upc)}
                    value={values.upc}
                />
                <TextField
                    label="sku"
                    placeholder="sku"
                    name="sku"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.sku && touched.sku)}
                    value={values.sku}
                />
                <TextField
                    label="description"
                    placeholder="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.description && touched.description)}
                    value={values.description}
                />
                <TextField
                    label="no"
                    value={values.no}
                    name="no"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.no && touched.no)}
                    placeholder="no"
                />
                <TextField
                    label="variance"
                    placeholder="variance"
                    name="variance"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.variance && touched.variance)}
                    value={values.variance}
                />
                <TextField
                    label="mfgr"
                    placeholder="mfgr"
                    name="mfgr"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.mfgr && touched.mfgr)}
                    value={values.mfgr}
                />
                <TextField
                    label="color"
                    placeholder="color"
                    name="color"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.color && touched.color)}
                    value={values.color}
                />
                <TextField
                    label="size"
                    placeholder="size"
                    name="size"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.size && touched.size)}
                    value={values.size}
                />
                <FieldSelect
                    label="Item category"
                    request={getCategories}
                    itemTitleField="name"
                    itemValueField="id"
                    name="ItemCategoryId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ItemCategoryId && touched.ItemCategoryId)}
                    value={values.ItemCategoryId}
                    placeholder={"Category"}
                />
                <FieldSelect
                    label="Item type"
                    request={getTypes}
                    itemTitleField="name"
                    itemValueField="id"
                    name="ItemTypeId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ItemTypeId && touched.ItemTypeId)}
                    value={values.ItemTypeId}
                />
                <FieldSelect
                    label="Item family"
                    request={getFamilies}
                    itemTitleField="name"
                    itemValueField="id"
                    name="ItemFamilyId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ItemFamilyId && touched.ItemFamilyId)}
                    value={values.ItemFamilyId}
                />
                <TextField
                    label="Special notes"
                    style={{ gridColumnEnd: "span 3" }}
                    value={values.specialNote}
                    placeholder={values.specialNote}
                    name="specialNote"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.specialNote && touched.specialNote)}
                />
                {filters &&
                    filters.map((filter, i) => (
                        <ArraySelect
                            key={i}
                            name={filter.name}
                            items={filter.valid as any}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={filter.name}
                        />
                    ))}
                {dynamicFieldInputs}
                <FormControlLabel
                    style={{ gridColumnEnd: "span 3" }}
                    label="Active"
                    name="Active"
                    onChange={handleChange}
                    control={<Checkbox />}
                />
            </Box>

            <Button disabled={isSubmitting} fullWidth style={{ marginTop: "1.3em", width: "50%" }} kind="add" type="submit">
                Add
            </Button>
        </>
    );
};

export const MoreInfo = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box p={2} display="grid" gridTemplateRows="1fr" gridRowGap={5}>
            <TextField
                label="version"
                name="version"
                placeholder="version"
                value={values.version}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                label="keywords"
                name="keywords"
                placeholder="keywords"
                value={values.keywords}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField label="url" name="url" placeholder="url" value={values.url} onBlur={handleBlur} onChange={handleChange} />
            <TextField label="cost" name="cost" placeholder="cost" value={values.cost} onBlur={handleBlur} onChange={handleChange} />
            <TextField
                label="retail price"
                name="retailPrice"
                placeholder="Retail Price"
                value={values.retailPrice}
                onBlur={handleBlur}
                onChange={handleChange}
            />
        </Box>
    );
};

export const Quantity = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="flex" flexDirection="column" p={2}>
            <Typography style={{ textAlign: "left", marginBottom: "5px" }}>Total Quantity on hand</Typography>
            <TextField
                fullWidth
                label="total quantity on hand"
                name="totalQoh"
                value={values.totalQoh}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                style={{ margin: "10px 0" }}
                label="allocated quantity on hand"
                name="allocatedQoh"
                value={values.allocatedQoh}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <Typography style={{ textAlign: "left", marginBottom: "5px" }}>Available qoh</Typography>
            <TextField
                fullWidth
                label="available quantity on hand"
                name="availableQoh"
                value={values.availableQoh}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                style={{ margin: "10px 0" }}
                label="trriger quantity on hand"
                name="triggerQoh"
                value={values.triggerQoh}
                onBlur={handleBlur}
                onChange={handleChange}
            />
        </Box>
    );
};

export const Shipping = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box>
                <Typography>Adittional Shipping Fee</Typography>
                <TextField
                    label="Additional shipping fee"
                    name="additionalShippingFee"
                    value={values.additionalShippingFee}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: 35 }}
                />
                <Box display="flex">
                    {/* <Typography style={{ flex: 1 }}>Item Weight</Typography> */}
                    <Box textAlign="center">
                        <Typography>Lbs</Typography>
                        <TextField
                            label="weight Lb"
                            name="weightLb"
                            value={values.weightLb}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1, marginRight: 2 }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography>Oz</Typography>
                        <TextField
                            label="weight Oz"
                            name="weightOz"
                            value={values.weightOz}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1, marginLeft: 2 }}
                        />
                    </Box>
                </Box>
                <Box display="flex" mt={1}>
                    {/* <Typography style={{ flex: 1 }}>Shipping Weight</Typography> */}
                    <Box textAlign="center">
                        <Typography>Lbs</Typography>
                        <TextField
                            label="shipping Lb"
                            name="shippingLb"
                            value={values.shippingLb}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1, marginRight: 2 }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography>OZ</Typography>
                        <TextField
                            label="shipping Oz"
                            name="shippingOz"
                            value={values.shippingOz}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1, marginLeft: 2 }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
