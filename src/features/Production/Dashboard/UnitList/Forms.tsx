import React from "react";
import { Box } from "@material-ui/core";

import TextField from "../../../../app/TextField";
import { formatTimestampToDate } from "../../../../logic/date";
import { ArraySelect, FieldSelect } from "../../../../app/Inputs";
import DateTimePicker from "../../../../app/DateTimePicker";

import { getAllEmployees } from "../../../../api/employee";

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
            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
                <ArraySelect
                    fullWidth
                    label="Status"
                    items={["New", "Done"]}
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.status)}
                />
                <TextField
                    label="SO Date"
                    value={formatTimestampToDate(values?.so?.date)}
                    name="soDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.soDate && touched.soDate)}
                    placeholder="SO Date"
                    disabled
                />
                <ArraySelect
                    fullWidth
                    label="Production Status"
                    items={["Manufacturing", "Evaluation", "Test"]}
                    name="productionStatus"
                    value={values.productionStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.productionStatus)}
                />
                <DateTimePicker
                    name="dueDate"
                    value={values.dueDate || null}
                    onChange={(d) => setFieldValue("dueDate", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.dueDate)}
                    helperText={errors.dueDate}
                    size="small"
                    placeholder="dueDate"
                    label="Due Date"
                />
            </Box>
        </>
    );
};

export const UnitInfo = ({
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
                    label="Unit"
                    placeholder="Unit"
                    name="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.number && touched.number)}
                    value={values.number}
                    disabled
                />
                <TextField
                    label="Device Number"
                    value={values?.item?.no}
                    name="no"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.no && touched.no)}
                    placeholder="Device Number"
                    disabled
                />
                <TextField
                    label="Device name"
                    placeholder="Device name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name && touched.name)}
                    value={values?.item?.name}
                    style={{ gridColumnEnd: "span 2" }}
                    disabled
                />

                <TextField
                    multiline
                    style={{ gridColumnEnd: "span 2" }}
                    rows={4}
                    placeholder="Description"
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.item?.description}
                    disabled
                />
            </Box>
        </>
    );
};
