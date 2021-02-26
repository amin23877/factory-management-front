import React from "react";
import { Box, RadioGroup, Radio, FormControlLabel, Divider, Typography } from "@material-ui/core";

import Button from "../../app/Button";

import { getCategories } from "../../api/category";
import { getTypes } from "../../api/types";
import { getFamilies } from "../../api/family";

import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";

interface IForm {
    values: any;
    errors: any;
    touched: any;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    isSubmitting?: boolean;
}

export const General = ({ isSubmitting, values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <>
            <Box display="flex" alignItems="flex-start">
                <Box flex={1}>
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
                </Box>
                <Box flex={1}>
                    <FieldSelect
                        label="Item category"
                        fullWidth
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
                        fullWidth
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
                        fullWidth
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
                </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <RadioGroup
                    style={{ flexDirection: "row" }}
                    name="active"
                    value={String(values.active)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Active" />
                    <FormControlLabel value="false" control={<Radio />} label="Inactive" />
                </RadioGroup>
                <TextField
                    label="Special notes"
                    // style={{ margin: 5 }}
                    value={values.specialNote}
                    fullWidth
                    placeholder={values.specialNote}
                    name="specialNote"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.specialNote && touched.specialNote)}
                />
                <Button disabled={isSubmitting} style={{ marginTop: "1.3em" }} kind="edit" type="submit">
                    Update
                </Button>
            </Box>
        </>
    );
};

export const MoreInfo = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box mr={2}>
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
                    style={{ marginBottom: 3 }}
                />
                <TextField
                    label="url"
                    name="url"
                    placeholder="url"
                    value={values.url}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <TextField
                    label="cost"
                    name="cost"
                    placeholder="cost"
                    value={values.cost}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <TextField
                    label="retail price"
                    name="retailPrice"
                    placeholder="Retail Price"
                    value={values.retailPrice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <Divider />
                {/* <Typography style={{ fontWeight: "bold", textAlign: "center" }}> Markup 200 %</Typography> */}
            </Box>
            <Box>
                <Box style={{ padding: "4em 3em", border: "2px dashed gray", borderRadius: 20 }}></Box>
            </Box>
        </Box>
    );
};

export const Quantity = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box flex={2} mr={2}>
                <Typography>Total Quantity on hand</Typography>
                <TextField
                    label="total quantity on hand"
                    name="totalQoh"
                    placeholder="Total quantity"
                    value={values.totalQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <Typography>Allocated qoh</Typography>
                <TextField
                    label="allocated quantity on hand"
                    name="allocatedQoh"
                    placeholder="allocatedQoh"
                    value={values.allocatedQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ margin: "3px 0" }}
                />
                <Typography>Available qoh</Typography>
                <TextField
                    label="available quantity on hand"
                    name="availableQoh"
                    placeholder="availableQoh"
                    value={values.availableQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <Typography>Trigger qoh</Typography>
                <TextField
                    label="trriger quantity on hand"
                    name="triggerQoh"
                    placeholder="triggerQoh"
                    value={values.triggerQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
            </Box>
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
                    placeholder="Additional shipping fee"
                    value={values.additionalShippingFee}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <Divider style={{ margin: "1em 0" }} />
                <Box display="flex">
                    {/* <Typography style={{ flex: 1 }}>Item Weight</Typography> */}
                    <Box textAlign="center">
                        <Typography>Lbs</Typography>
                        <TextField
                            label="weight Lb"
                            name="weightLb"
                            placeholder="weightLb"
                            value={values.weightLb}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography>Oz</Typography>
                        <TextField
                            label="weight Oz"
                            name="weightOz"
                            placeholder="weightOz"
                            value={values.weightOz}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1 }}
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
                            placeholder="shippingLb"
                            value={values.shippingLb}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography>OZ</Typography>
                        <TextField
                            label="shipping Oz"
                            name="shippingOz"
                            placeholder="shippingOz"
                            value={values.shippingOz}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
