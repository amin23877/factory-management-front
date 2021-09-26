import React from "react";
import { Box } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import TextField from "../../../app/TextField";
import { formatTimestampToDate } from "../../../logic/date";
import { ArraySelect } from "../../../app/Inputs";

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
            <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
                <ArraySelect
                    fullWidth
                    label="Inverter Status"
                    items={["Normal", "Alarm", "Error,"]}
                    name="inverterStatus"
                    value={values.inverterStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.inverterStatus)}
                />
                <ArraySelect
                    fullWidth
                    label="Battery Status"
                    items={["Normal", "Alarm", "Error,"]}
                    name="batteryStatus"
                    value={values.batteryStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.batteryStatus)}
                />
                <TextField
                    label="Serial Number"
                    value={values.item.no}
                    name="no"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.no && touched.no)}
                    placeholder="Serial Number"
                />
                <TextField
                    label="Model Number"
                    placeholder="Model Number"
                    name="modelNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.modelNumber && touched.modelNumber)}
                    value={values.item.modelNumber}
                />
                <TextField
                    label="Model name"
                    placeholder="Model name"
                    name="modelName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.modelName && touched.modelName)}
                    value={values.item.modelName}
                />
                <TextField
                    multiline
                    style={{ gridColumnEnd: "span 2" }}
                    rows={4}
                    placeholder="Unit Description"
                    label="Unit Description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.item.description}
                />
                <TextField
                    label="SO Number"
                    value={values.so.number}
                    name="so"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.so && touched.so)}
                    placeholder="SO"
                />
                <TextField
                    label="Warranty Number"
                    value={values.warrantyNumber}
                    name="warrantyNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.warrantyNumber && touched.warrantyNumber)}
                    placeholder="warrantyNumber"
                />
                <TextField
                    label="Warranty End Date"
                    value={values.warrantyEndDate}
                    name="warrantyEndDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.warrantyEndDate && touched.warrantyEndDate)}
                    placeholder="warrantyEndDate"
                />

                <DateTimePicker
                    size="small"
                    value={values.actualShipDate}
                    name="actualShipDate"
                    label="Actual ship date"
                    onChange={(date) => setFieldValue("actualShipDate", date)}
                    onBlur={handleBlur}
                />
                <TextField
                    label="Last System Test Run"
                    value={values.lastRun}
                    name="lastRun"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.lastRun && touched.lastRun)}
                    placeholder="lastRun"
                />
            </Box>
        </>
    );
};

export const Warranty = ({
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
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
                <DateTimePicker
                    size="small"
                    value={values.warrantyExpDate}
                    name="warrantyExpDate"
                    label="Warranty exp date"
                    onChange={(date) => setFieldValue("warrantyExpDate", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.purchaseDate}
                    name="purchaseDate"
                    label="purchase date"
                    onChange={(date) => setFieldValue("purchaseDate", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.estimatedShipDate}
                    name="estimatedShipDate"
                    label="Estimated ship date"
                    onChange={(date) => setFieldValue("estimatedShipDate", date)}
                    onBlur={handleBlur}
                />

                <DateTimePicker
                    size="small"
                    value={values.actualShipDate}
                    name="actualShipDate"
                    label="Actual ship date"
                    onChange={(date) => setFieldValue("actualShipDate", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.estimatedLeadTime}
                    name="estimatedLeadTime"
                    label="Estimated Lead time"
                    onChange={(date) => setFieldValue("estimatedLeadTime", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.actualLeadTime}
                    name="actualLeadTime"
                    label="Actual Lead Time"
                    onChange={(date) => setFieldValue("actualLeadTime", date)}
                    onBlur={handleBlur}
                />
            </Box>
        </>
    );
};

export const Battery = ({
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
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
                <TextField
                    label="Item Labor Time"
                    value={values.itemLaborTime}
                    name="itemLaborTime"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.itemLaborTime && touched.itemLaborTime)}
                    placeholder="Item Labor Time"
                    disabled
                />
                <TextField
                    label="Item Labor Cost"
                    value={values.itemLaborCost}
                    name="itemLaborCost"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.itemLaborCost && touched.itemLaborCost)}
                    placeholder="Item Labor Cost"
                    disabled
                />
                <TextField
                    label="Item BOM Cost"
                    value={values.bomCost}
                    name="bomCost"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.bomCost && touched.bomCost)}
                    placeholder="Item BOM Cost"
                />
                <TextField
                    label="Item Total Cost"
                    value={values.ItemId?.cost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ItemId?.cost && touched.ItemId?.cost)}
                    placeholder="Item Total Cost"
                    disabled
                />
            </Box>
        </>
    );
};
