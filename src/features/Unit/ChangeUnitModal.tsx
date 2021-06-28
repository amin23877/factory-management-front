import React from "react";
import { Box, Typography, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";

import { IUnit, updateUnit } from "../../api/units";
import { useEffect } from "react";
import { useState } from "react";


import { DateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";

import { ArraySelect, FieldSelect } from "../../app/Inputs";
import { getContacts } from "../../api/contact";
import { getSO } from "../../api/so";

export const ChangeUnitModal = ({ open, onClose, unit }: { open: boolean; onClose: () => void; unit?: IUnit }) => {
    const [refresh, setRefresh] = useState<any>();

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            if (unit?.id) {
                const resp = await updateUnit(unit.id, data);
                if (resp) {
                    console.log(resp)
                    onClose();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setRefresh(unit);
    }, [unit])
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" title="Change Unit Details">
            <Box p={1}>
                <Formik initialValues={unit as IUnit} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur, touched, isSubmitting, setFieldValue }) => (
                        <Form>
                            <Box>
                                <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
                                    <TextField
                                        name="laborCost"
                                        value={values.laborCost}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.laborCost)}
                                        helperText={errors.laborCost}
                                        size="small"
                                        placeholder="Labor Cost"
                                        label="Labor Cost"
                                    />
                                    <ArraySelect
                                        fullWidth
                                        label="Status"
                                        items={["new", "done"]}
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.status)}
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
                                    <Autocomplete
                                        value={values.assignee}
                                        options={[]}
                                        getOptionLabel={(option: any) => option.description}
                                        onChange={(e, nv) => {
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Employee" placeholder="Employee" size="small" variant="outlined" />
                                        )}
                                    />
                                    {/* BOM */}

                                </Box>
                                <Box >
                                    <Button fullWidth disabled={isSubmitting} style={{ marginTop: "1.3em" }} kind="add" type="submit">
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
