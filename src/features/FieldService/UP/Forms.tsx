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
                    placeholder="Last System Test Run"
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
                <TextField
                    label="Warranty Number"
                    value={values.warrantyNumber}
                    name="warrantyNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.warrantyNumber && touched.warrantyNumber)}
                    placeholder="Warranty Number"
                />
                <TextField
                    label="Warranty Name"
                    value={values.warrantyName}
                    name="warrantyName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.warrantyName && touched.warrantyName)}
                    placeholder="Warranty Name"
                />
                <TextField
                    label="Expiration Date"
                    value={values.expirationDate}
                    name="expirationDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.expirationDate && touched.expirationDate)}
                    placeholder="Expiration Date"
                />
                <TextField
                    label="Purchase Date"
                    value={values.purchaseDate}
                    name="purchaseDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.purchaseDate && touched.purchaseDate)}
                    placeholder="Purchase Date"
                />
                <TextField
                    label="SO Ship Date"
                    value={values.SOShipDate}
                    name="SOShipDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.SOShipDate && touched.SOShipDate)}
                    placeholder="SO Ship Date"
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
                    label="Battery Qty"
                    value={values.batteryQty}
                    name="batteryQty"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.batteryQty && touched.batteryQty)}
                    placeholder="Battery Qty"
                />
                <TextField
                    label="Battery Cabinet Qty"
                    value={values.batteryCabinetQty}
                    name="batteryCabinetQty"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.batteryCabinetQty && touched.batteryCabinetQty)}
                    placeholder="Battery Cabinet Qty"
                />
                <TextField
                    label="Battery Type"
                    value={values.batteryType}
                    name="batteryType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.batteryType && touched.batteryType)}
                    placeholder="Battery Type"
                />
                <TextField
                    label="Cabinet"
                    value={values.Cabinet}
                    name="Cabinet"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.Cabinet && touched.Cabinet)}
                    placeholder="Cabinet"
                />
                <TextField
                    label="Battery Diagram"
                    value={values.batteryDiagram}
                    name="batteryDiagram"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.batteryDiagram && touched.batteryDiagram)}
                    placeholder="Battery Diagram"
                />
                <TextField
                    label="Battery Order Date"
                    value={values.batteryOrderDate}
                    name="batteryOrderDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.batteryOrderDate && touched.batteryOrderDate)}
                    placeholder="Battery Order Date"
                />
                <TextField
                    label="PO"
                    value={values.po}
                    name="po"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.po && touched.po)}
                    placeholder="PO"
                />
                <TextField
                    label="Date Required"
                    value={values.dateRequired}
                    name="dateRequired"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.dateRequired && touched.dateRequired)}
                    placeholder="Date Required"
                />
                <TextField
                    label="Battery Shipping Address"
                    value={values.batteryShippingAddress}
                    name="batteryShippingAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.batteryShippingAddress && touched.batteryShippingAddress)}
                    placeholder="Battery Shipping Address"
                />
            </Box>
        </>
    );
};
