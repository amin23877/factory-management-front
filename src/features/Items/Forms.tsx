import React, { ReactNode, useEffect, useState } from "react";
import { Box, FormControlLabel, Checkbox, LinearProgress, Divider, Paper } from "@material-ui/core";
import useSWR from "swr";

import TextField from "../../app/TextField";
import { ArraySelect } from "../../app/Inputs";
import Button from "../../app/Button";

import { IFilter } from "../../api/filter";
import { IField } from "../../api/field";
import { splitLevelName } from "../../logic/levels";

interface IForm {
    values: any;
    errors: any;
    touched: any;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: any;
    isSubmitting?: boolean;
    device?: boolean;
}

interface IQForm extends IForm {
    itemId: string;
    handleManualCount?: () => void;
    handleUpdateQuantity?: () => void;
}

export const General = ({
    isSubmitting,
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
    device,
}: IForm) => {
    return (
        <>
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
                <Paper
                    style={{
                        margin: "0.5em 0",
                        padding: "0 0.5em",
                        backgroundColor: "#eee",
                        gridColumnEnd: "span 4",
                    }}
                >
                    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.shippingApproved}
                            label="Ship. Ap."
                            name="shippingApproved"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />
                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.salesApproved}
                            label="Sales Ap."
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
                            checked={values.obsolete}
                            label="Obsolete"
                            name="obsolete"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />

                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.nonInventoryItem}
                            label="Non-Inventory Item"
                            name="nonInventoryItem"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />
                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.rndOnly}
                            label="R&D"
                            name="rndOnly"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />
                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.dontTrackQoh}
                            label="Do not Track QOH"
                            name="dontTrackQoh"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />
                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.dontOrderPO}
                            label="Do not order on POs"
                            name="dontOrderPO"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />

                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.buildToStock}
                            label="Build To Stock"
                            name="buildToStock"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />
                        <FormControlLabel
                            style={{ fontSize: "0.7rem" }}
                            checked={values.archived}
                            label="Archive"
                            name="archived"
                            onChange={handleChange}
                            control={<Checkbox />}
                        />
                        <TextField
                            label="Archive Date"
                            value={values.archiveDate}
                            name="archiveDate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.archiveDate && touched.archiveDate)}
                            placeholder="archiveDate"
                            disabled
                        />
                    </Box>
                </Paper>
                <TextField
                    style={{ gridColumnEnd: "span 4" }}
                    label="no"
                    value={values.no}
                    name="no"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.no && touched.no)}
                    placeholder="no"
                />
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
            </Box>
        </>
    );
};

export const MoreInfo = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box mt={1} display="grid" gridTemplateColumns="auto auto" gridColumnGap={10} gridRowGap={10}>
            <TextField
                label="Version"
                name="version"
                placeholder="Version"
                value={values.version}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            {/* <TextField
                label="keywords"
                name="keywords"
                placeholder="keywords"
                value={values.keywords}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            /> */}
            <TextField
                label="Url"
                name="url"
                placeholder="Url"
                value={values.url}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />
            <TextField
                label="Manufacturer Product Number"
                name="manufacturerProductNumber"
                placeholder="Manufacturer Product Number"
                value={values.manufacturerProductNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />
            <TextField
                label="Manufacturer"
                name="manufacturer"
                placeholder="Manufacturer"
                value={values.manufacturer}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />
            <TextField
                label="Lead Time"
                name="leadTime"
                placeholder="Lead Time"
                value={values.leadTime}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />

            <TextField
                label="Quickbook ID"
                name="qbid"
                placeholder="Quickbook ID"
                value={values.qbid}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />
        </Box>
    );
};
export const Pricing = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box mt={1} display="grid" gridTemplateColumns="auto auto" gridColumnGap={10} gridRowGap={10}>
            <TextField
                label="Recent cost"
                name="recentCost"
                placeholder="recentCost"
                value={values.recentCost}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />
            <TextField
                label="Labor Cost"
                name="laborCost"
                placeholder="Labor Cost"
                value={values.laborCost}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />
            <TextField
                label="FIFO Value"
                name="fifo"
                placeholder="FIFO Value"
                value={values.fifo}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
            />
            <TextField
                label="QOH Value"
                name="qohVal"
                placeholder="QOH Value"
                value={values.cost * values.qtyOnHand}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ marginBottom: 3 }}
                disabled
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
                label="Quantity allocated"
                placeholder="Quantity allocated"
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
                label="Last shipping fee"
                name="lastShippingFee"
                placeholder="Last shipping fee"
                value={values.lastShippingFee}
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
            <TextField
                style={{ gridColumnEnd: "span 2" }}
                fullWidth
                label="Last Ordered Qty"
                placeholder="Last Ordered Qty"
                name="lastOrderedQty"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.lastOrderedQty && touched.lastOrderedQty)}
                value={values.lastOrderedQty}
            />
        </Box>
    );
};

export const DynamicFilterAndFields = ({ values = "", handleChange, handleBlur, selectedItem, device }: any) => {
    const [dynamicFields, setDynamicFields] = useState<ReactNode[]>([]);
    const { data: filters } = useSWR<IFilter[]>("/filter");
    const { data: fields } = useSWR<IField[]>("/field");
    // const { data: filterNFields } = useSWR("/filter/field");
    // const filters: IFilter[] = selectedItem.filters;
    // const fields: IField[] = selectedItem.fields;

    useEffect(() => {
        let validFields: ReactNode[] = [];
        const addInputToArray = (field: IField) => {
            if (field.type === "string" || field.type === "number") {
                validFields.push(
                    <TextField
                        required={field.required}
                        name={field.name}
                        label={splitLevelName(field.name)}
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
                        label={splitLevelName(field.name)}
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
                        label={splitLevelName(field.name)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                );
            }
        };
        fields?.map((field) => {
            if (selectedItem?.device || device) {
                if (
                    field.all ||
                    field.filterValue.includes(values[field.filterName]) ||
                    field.filterValue.includes("all")
                ) {
                    addInputToArray(field);
                }
            } else if (field.filterName[0] !== "Product Family") {
                if (
                    field.all ||
                    field.filterValue.includes(values[field.filterName]) ||
                    field.filterValue.includes("all")
                ) {
                    addInputToArray(field);
                }
            }
        });

        setDynamicFields(validFields);
    }, [fields, values]);

    if (!filters) {
        return <LinearProgress />;
    }

    return (
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
            {filters?.map((filter) => {
                if (selectedItem?.device || device) {
                    return (
                        <ArraySelect
                            defaultValue={values[filter.name as any] || ""}
                            name={filter.name}
                            label={filter.name}
                            items={filter.valid}
                            value={values[filter.name as any]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    );
                } else if (filter.name !== "Product Family") {
                    return (
                        <ArraySelect
                            defaultValue={values ? values[filter.name as any] : ""}
                            name={filter.name}
                            label={filter.name}
                            items={filter.valid}
                            value={values ? values[filter.name as any] : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    );
                }
            })}
            <Divider style={{ gridColumnEnd: "span 2" }} />
            {dynamicFields}
        </Box>
    );
};

export const LastUsed = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
            <TextField
                name="uom"
                label="Unit Of Measure"
                placeholder="Unit Of Measure"
                value={values.uom}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                name="lastUsedInBom"
                placeholder="last Used In Bom"
                label="last Used In Bom"
                value={values.lastUsedInBom}
                onBlur={handleBlur}
                onChange={handleChange}
            />

            <TextField
                name="minOrder"
                label="Minimum Order Quantity Per Purchase"
                placeholder="Minimum Order Quantity Per Purchase"
                value={values.minOrder}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ gridColumnEnd: "span 2" }}
            />
            <TextField
                name="lastCount"
                label="Last Count"
                placeholder="Last Count"
                value={values.lastCount}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <TextField
                label="last used in 90 days"
                value={values.usedInLastQuarter}
                name="usedInLastQuarter"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.usedInLastQuarter && touched.usedInLastQuarter)}
                disabled
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
                value={values.usedInLastThirty}
                name="usedInLastThirty"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.usedInLastThirty && touched.usedInLastThirty)}
                disabled
            />
        </Box>
    );
};
