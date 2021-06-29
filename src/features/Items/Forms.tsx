import React, { ReactNode, useEffect, useState } from "react";
import { Box, FormControlLabel, Checkbox, LinearProgress, Divider } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Snack from "../../app/Snack";
import TextField from "../../app/TextField";
import { ArraySelect } from "../../app/Inputs";
import Button from "../../app/Button";

import { IFilter } from "../../api/filter";
import { IField } from "../../api/field";
import { updateItemQuantity } from "../../api/items";

interface IForm {
    values: any;
    errors: any;
    touched: any;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: any;
    isSubmitting?: boolean;
}

interface IQForm extends IForm {
    itemId: string;
    handleManualCount?: () => void;
    handleUpdateQuantity?: () => void;
}

export const General = ({ isSubmitting, values, errors, handleChange, handleBlur, touched, setFieldValue }: IForm) => {
    return (
        <>
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
                <Box style={{ gridColumnEnd: "span 4" }} display="flex" justifyContent="space-between" flexWrap="wrap">
                    <FormControlLabel
                        style={{ fontSize: "0.7rem" }}
                        checked={values.active}
                        label="Active"
                        name="active"
                        onChange={handleChange}
                        control={<Checkbox />}
                    />
                    <FormControlLabel
                        style={{ fontSize: "0.7rem" }}
                        checked={values.obsolete}
                        label="Obsolete"
                        name="obsolete"
                        onChange={handleChange}
                        control={<Checkbox />}
                    />
                    <FormControlLabel
                        style={{ fontSize: "0.7rem" }}
                        checked={values.rndOnly}
                        label="R&D only"
                        name="rndOnly"
                        onChange={handleChange}
                        control={<Checkbox />}
                    />
                    <FormControlLabel
                        style={{ fontSize: "0.7rem" }}
                        checked={values.salesApproved}
                        label="S. Ap."
                        name="salesApproved"
                        onChange={handleChange}
                        control={<Checkbox />}
                    />
                    <FormControlLabel
                        style={{ fontSize: "0.7rem" }}
                        checked={values.engineeringApproved}
                        label="En. Ap."
                        name="engineeringApproved"
                        onChange={handleChange}
                        control={<Checkbox />}
                    />
                    <FormControlLabel
                        style={{ fontSize: "0.7rem" }}
                        checked={values.device}
                        label="Device"
                        name="device"
                        onChange={handleChange}
                        control={<Checkbox />}
                    />
                </Box>
                <TextField
                    style={{ gridColumnEnd: "span 4" }}
                    label="Item name"
                    placeholder="Item name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name && touched.name)}
                    value={values.name}
                />
                <Box
                    style={{ gridColumnEnd: "span 4" }}
                    display="grid"
                    gridTemplateColumns="1fr 1fr 1fr"
                    gridRowGap={10}
                    gridColumnGap={10}
                >
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
                </Box>
                <TextField
                    multiline
                    style={{ gridColumnEnd: "span 4" }}
                    rows={4}
                    placeholder="description"
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
                <TextField
                    style={{ gridColumnEnd: "span 4" }}
                    label="Special notes"
                    value={values.specialNote}
                    name="specialNote"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.specialNote && touched.specialNote)}
                />
            </Box>
        </>
    );
};

export const MoreInfo = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box mt={1} display="grid" gridTemplateColumns="auto auto" gridColumnGap={10} gridRowGap={10}>
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
                label="Resell Cost"
                value={values.resellCost}
                name="resellCost"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.resellCost && touched.resellCost)}
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
        </Box>
    );
};

export const Quantity = ({ itemId, handleManualCount, values, handleUpdateQuantity }: IQForm) => {
    // qtyOnHand -> ,
    // qtyAvailable -> ,
    // qtyOnOrder -> ,
    // qtyAllocated -> ,
    // qtyRemain -> ,

    return (
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10}>
            <TextField
                label="Quantity on hand"
                placeholder="Quantity on hand"
                name="qtyOnHand"
                value={values.qtyOnHand}
                disabled
            />
            <TextField
                label="Quantity availabe"
                placeholder="Quantity availabe"
                name="qtyAvailable"
                value={values.qtyAvailable}
                disabled
            />
            <TextField
                label="Quantity on order"
                placeholder="Quantity on order"
                name="qtyOnOrder"
                value={values.qtyOnOrder}
                disabled
            />
            <TextField
                label="Quantity on order"
                placeholder="Quantity on order"
                name="qtyAllocated"
                value={values.qtyAllocated}
                disabled
            />
            <TextField
                label="Quantity remain"
                placeholder="Quantity remain"
                name="qtyRemain"
                value={values.qtyRemain}
                style={{ gridColumnEnd: "span 2" }}
                disabled
            />
            {handleUpdateQuantity && (
                <Button kind="edit" onClick={handleUpdateQuantity}>
                    Update quantity
                </Button>
            )}
            {handleManualCount && (
                <Button kind="add" onClick={handleManualCount}>
                    Adjust manual count
                </Button>
            )}
        </Box>
    );
};

export const Shipping = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10} mt={1}>
            <TextField
                style={{ gridColumnEnd: "span 2" }}
                label="Additional shipping fee"
                name="additionalShippingFee"
                placeholder="Additional shipping fee"
                value={values.additionalShippingFee}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                label="weight Lb"
                name="weightLb"
                placeholder="weightLb"
                value={values.weightLb}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                label="weight Oz"
                name="weightOz"
                placeholder="weightOz"
                value={values.weightOz}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                label="shipping Lb"
                name="shippingLb"
                placeholder="shippingLb"
                value={values.shippingLb}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                label="shipping Oz"
                name="shippingOz"
                placeholder="shippingOz"
                value={values.shippingOz}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                style={{ gridColumnEnd: "span 2" }}
                fullWidth
                label="size"
                placeholder="size"
                name="size"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.size && touched.size)}
                value={values.size}
            />
        </Box>
    );
};

export const DynamicFilterAndFields = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    const [dynamicFields, setDynamicFields] = useState<ReactNode[]>([]);
    const { data: filters } = useSWR<IFilter[]>("/filter");
    const { data: fields } = useSWR<IField[]>("/field");

    useEffect(() => {
        let validFields: ReactNode[] = [];
        const addInputToArray = (field: IField) => {
            if (field.type === "string" || field.type === "number") {
                validFields.push(
                    <TextField
                        required={field.required}
                        name={field.name}
                        label={field.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[field.name]}
                    />
                );
            } else if (field.type === "enum") {
                validFields.push(
                    <ArraySelect
                        required={field.required}
                        name={field.name}
                        label={field.name}
                        items={field.valid}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[field.name]}
                    />
                );
            } else if (field.type === "boolean") {
                validFields.push(
                    <FormControlLabel
                        checked={values[field.name]}
                        control={<Checkbox required={field.required} />}
                        name={field.name}
                        label={field.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                );
            }
        };

        fields?.map((field) => {
            if (field.all || field.filterValue.includes(values[field.filterName])) {
                addInputToArray(field);
            }
        });

        setDynamicFields(validFields);
    }, [fields, values]);

    if (!filters) {
        return <LinearProgress />;
    }

    return (
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
            {filters.map((filter) => (
                <ArraySelect
                    defaultValue="Default"
                    name={filter.name}
                    label={filter.name}
                    items={filter.valid}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ))}
            <Divider style={{ gridColumnEnd: "span 2" }} />
            {dynamicFields}
        </Box>
    );
};

export const LastUsed = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box mt={1} display="grid" gridTemplateColumns="auto" gridColumnGap={10} gridRowGap={10}>
            <TextField
                label="lastUsedInBom"
                name="lastUsedInBom"
                placeholder="lastUsedInBom"
                value={values.lastUsedInBom}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled
            />
            <TextField
                label="last used in 90 days"
                value={values.usedInLastQuarter}
                name="usedInLastQuarter"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
                error={Boolean(errors.usedInLastQuarter && touched.usedInLastQuarter)}
            />
            <TextField
                label="last used in 60 days"
                value={values.usedInLastSixty}
                name="usedInLastSixty"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.usedInLastSixty && touched.usedInLastSixty)}
                disabled
            />
            <TextField
                label="last used in 30 days"
                disabled
                value={values.usedInLastThirty}
                name="usedInLastThirty"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.usedInLastThirty && touched.usedInLastThirty)}
            />
        </Box>
    );
};
