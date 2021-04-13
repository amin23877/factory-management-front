import React, { useState } from "react";
import { Box, FormControlLabel, Typography, Checkbox } from "@material-ui/core";

import Button from "../../app/Button";

import { getCategories } from "../../api/category";
import { getTypes } from "../../api/types";
import { getFamilies } from "../../api/family";
import ManualCountModal from "./ManualCountModal";

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

interface IQForm extends IForm {
    handleManualCount: () => void;
}

export const General = ({ isSubmitting, values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <>
            <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <TextField
                        style={{ flex: "1 1 30%" }}
                        label="Item name"
                        placeholder="Item name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.name && touched.name)}
                        value={values.name}
                    />
                    <TextField
                        style={{ flex: "1 1 30%", marginRight: 5, marginLeft: 5 }}
                        label="upc"
                        placeholder="upc"
                        name="upc"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.upc && touched.upc)}
                        value={values.upc}
                    />
                    <TextField
                        style={{ flex: "1 1 30%" }}
                        label="sku"
                        placeholder="sku"
                        name="sku"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.sku && touched.sku)}
                        value={values.sku}
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <TextField
                        style={{ flex: "1 1 30%" }}
                        label="description"
                        placeholder="description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.description && touched.description)}
                        value={values.description}
                    />
                    <TextField
                        style={{ flex: "1 1 30%", marginRight: 5, marginLeft: 5 }}
                        label="no"
                        value={values.no}
                        name="no"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.no && touched.no)}
                        placeholder="no"
                    />
                    <TextField
                        style={{ flex: "1 1 30%" }}
                        label="variance"
                        placeholder="variance"
                        name="variance"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.variance && touched.variance)}
                        value={values.variance}
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <TextField
                        style={{ flex: "1 1 30%" }}
                        label="mfgr"
                        placeholder="mfgr"
                        name="mfgr"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.mfgr && touched.mfgr)}
                        value={values.mfgr}
                    />
                    <TextField
                        style={{ flex: "1 1 30%", marginRight: 5, marginLeft: 5 }}
                        label="color"
                        placeholder="color"
                        name="color"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.color && touched.color)}
                        value={values.color}
                    />
                    <TextField
                        style={{ flex: "1 1 30%" }}
                        label="size"
                        placeholder="size"
                        name="size"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.size && touched.size)}
                        value={values.size}
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <FieldSelect
                        style={{ flex: "1 1 30%" }}
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
                        style={{ flex: "1 1 30%", marginRight: 5, marginLeft: 5 }}
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
                        style={{ flex: "1 1 30%" }}
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
                </Box>
            </Box>

            <Box display="flex">
                <FormControlLabel
                    style={{ flex: "0 30%" }}
                    checked={values.active}
                    label="Active"
                    name="active"
                    onChange={handleChange}
                    control={<Checkbox />}
                />
                <FormControlLabel
                    style={{ flex: "0 30%" }}
                    checked={values.obsolete}
                    label="Obsolete"
                    name="obsolete"
                    onChange={handleChange}
                    control={<Checkbox />}
                />
                <FormControlLabel
                    style={{ flex: "0 30%" }}
                    checked={values.rndOnly}
                    label="rndOnly"
                    name="rndOnly"
                    onChange={handleChange}
                    control={<Checkbox />}
                />
            </Box>
            <Box display="flex">
                <FormControlLabel
                    style={{ flex: "0 30%" }}
                    checked={values.salesApproved}
                    label="Sales Approve"
                    name="salesApproved"
                    onChange={handleChange}
                    control={<Checkbox />}
                />
                <FormControlLabel
                    style={{ flex: "0 30%" }}
                    checked={values.engineeringApproved}
                    label="Engineering Approve"
                    name="engineeringApproved"
                    onChange={handleChange}
                    control={<Checkbox />}
                />
            </Box>
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
        </>
    );
};

export const MoreInfo = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            {/* <Box style={{ padding: "4em 3em", border: "2px dashed gray", borderRadius: 20 }} /> */}
            <Box mr={2} textAlign="center">
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
                <TextField
                    label="lastUsedInBom"
                    name="lastUsedInBom"
                    placeholder="lastUsedInBom"
                    value={values.lastUsedInBom}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
};

export const Quantity = ({ values, errors, handleChange, handleBlur, handleManualCount }: IQForm) => {
    // Quantity on hand : Toye anbaar
    // Allocated quantity : gharare toye so masraf beshe
    // Available quantity : menhaye so
    // Total quantity : on hand + onayi ke to raahe

    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box>
                <Typography>Total Quantity on hand</Typography>
                <Box display="flex">
                    <TextField
                        style={{ marginRight: 5 }}
                        label="total quantity"
                        name="totalQoh"
                        placeholder="Total quantity"
                        value={values.totalQoh}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Reorder Quantity"
                        name="reorderQty"
                        value={values.reorderQty}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </Box>
                <Box display="flex">
                    <TextField
                        label="Lead time"
                        style={{ marginRight: 5 }}
                        name="lead"
                        value={values.lead}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <TextField label="Last count" name="lastCount" value={values.lastCount} onBlur={handleBlur} onChange={handleChange} />
                </Box>
                <Box display="flex">
                    <TextField
                        style={{ marginRight: 5 }}
                        label="Recent purchase price"
                        name="recentPurchasePrice"
                        value={values.recentPurchasePrice}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <TextField
                        label="allocated quantity"
                        name="allocatedQoh"
                        value={values.allocatedQoh}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </Box>
                <Typography>Available qoh</Typography>
                <TextField
                    style={{ width: "100%" }}
                    label="available quantity on hand"
                    name="availableQoh"
                    placeholder="availableQoh"
                    value={values.availableQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <TextField
                    style={{ width: "100%" }}
                    label="trriger quantity on hand"
                    name="triggerQoh"
                    placeholder="triggerQoh"
                    value={values.triggerQoh}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <Button kind="add" fullWidth style={{ marginTop: 10 }} onClick={handleManualCount}>
                    Adjust
                </Button>
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
                    style={{ marginBottom: 35, width: "100%" }}
                />
                {/* <Divider style={{ margin: "1em 0" }} /> */}
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
                            style={{ flex: 1, marginRight: 5 }}
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
                            style={{ flex: 1, marginRight: 5 }}
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
