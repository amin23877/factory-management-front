import React from 'react'
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import TextField from "../../app/TextField";
interface IForm {
    values: any;
    errors: any;
    touched: any;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: any;
    isSubmitting?: boolean;
    device?: boolean
}

export const General = ({ isSubmitting, values, errors, handleChange, handleBlur, touched, setFieldValue, device }: IForm) => {
    return (
        <>
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
                {/* <Box style={{ gridColumnEnd: "span 4" }} display="flex" justifyContent="space-between" flexWrap="wrap">
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
                        checked={device ? true : values.device}
                        label="Device"
                        name="device"
                        onChange={handleChange}
                        disabled={device}
                        control={<Checkbox />}
                    />
                </Box> */}
                <TextField
                    style={{ gridColumnEnd: "span 4" }}
                    label="Device Name"
                    placeholder="Device name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name && touched.name)}
                    value={values.name}
                />
                <TextField
                    style={{ gridColumnEnd: "span 4" }}
                    label="Device ID"
                    placeholder="Device ID"
                    name="no"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.no && touched.no)}
                    value={values.no}
                    disabled
                />
                {/* <Box
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
                </Box> */}
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

