import React from "react";
import { Box, TextField, RadioGroup, Radio, FormControlLabel, Divider, Typography } from "@material-ui/core";

import Button from "../../app/Button";

import { getCategories } from "../../api/category";
import { getTypes } from "../../api/types";
import { getFamilies } from "../../api/family";

import { BaseTextInput, FieldSelect } from "../../app/Inputs";

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
            <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                <TextField
                    placeholder="Item name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name && touched.name)}
                    value={values.name}
                    variant="outlined"
                />
                <TextField
                    placeholder="upc"
                    name="upc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.upc && touched.upc)}
                    value={values.upc}
                    variant="outlined"
                />
                <TextField
                    placeholder="sku"
                    name="sku"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.sku && touched.sku)}
                    value={values.sku}
                    variant="outlined"
                />
                <TextField
                    placeholder="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.description && touched.description)}
                    value={values.description}
                    variant="outlined"
                />
                <TextField
                    value={values.no}
                    name="no"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.no && touched.no)}
                    placeholder="no"
                    variant="outlined"
                />
                <FieldSelect
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
                    placeholder="mfgr"
                    name="mfgr"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.mfgr && touched.mfgr)}
                    value={values.mfgr}
                    variant="outlined"
                />
                <TextField
                    placeholder="color"
                    name="color"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.color && touched.color)}
                    value={values.color}
                    variant="outlined"
                />
                <TextField
                    placeholder="size"
                    name="size"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.size && touched.size)}
                    value={values.size}
                    variant="outlined"
                />
                <TextField
                    placeholder="variance"
                    name="variance"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.variance && touched.variance)}
                    value={values.variance}
                    variant="outlined"
                />
            </Box>
            <Box>
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

                <Box display="flex">
                    <TextField
                        value={values.specialNote}
                        style={{ marginRight: "1em", flex: 5 }}
                        fullWidth
                        placeholder={values.specialNote}
                        name="specialNote"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.specialNote && touched.specialNote)}
                        variant="outlined"
                        multiline
                    />
                    <Button disabled={isSubmitting} kind="edit" type="submit">
                        Update
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export const MoreInfo = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box mr={2}>
                <BaseTextInput
                    name="version"
                    placeholder="version"
                    value={values.version}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ margin: "4px 0" }}
                />
                <BaseTextInput
                    name="keywords"
                    placeholder="keywords"
                    value={values.keywords}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <BaseTextInput
                    name="url"
                    placeholder="url"
                    value={values.url}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <BaseTextInput
                    name="cost"
                    placeholder="cost"
                    value={values.cost}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <BaseTextInput
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
                <BaseTextInput
                    name="totalQoh"
                    placeholder="Total quantity"
                    value={values.totalQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <Typography>Allocated qoh</Typography>
                <BaseTextInput
                    name="allocatedQoh"
                    placeholder="allocatedQoh"
                    value={values.allocatedQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ margin: "3px 0" }}
                />
                <Typography>Available qoh</Typography>
                <BaseTextInput
                    name="availableQoh"
                    placeholder="availableQoh"
                    value={values.availableQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <Typography>Trigger qoh</Typography>
                <BaseTextInput
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
                <BaseTextInput
                    name="additionalShippingFee"
                    placeholder="Additional shipping fee"
                    value={values.additionalShippingFee}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginBottom: 3 }}
                />
                <Divider style={{ margin: "1em 0" }} />
                <Box display="flex">
                    <Typography style={{ flex: 1 }}>Item Weight</Typography>
                    <Box textAlign="center">
                        <Typography>Lbs</Typography>
                        <BaseTextInput
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
                        <BaseTextInput
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
                    <Typography style={{ flex: 1 }}>Shipping Weight</Typography>
                    <Box textAlign="center">
                        <Typography>Lbs</Typography>
                        <BaseTextInput
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
                        <BaseTextInput
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
