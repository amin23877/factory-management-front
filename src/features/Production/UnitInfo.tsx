import React from "react";
import { Box, TextField } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";

import Button from "../../app/Button";
import { ArraySelect, FieldSelect } from "../../app/Inputs";

import { IUnit, updateUnit } from "../../api/units";
import { getAllEmployees } from "../../api/employee";
import { Toast } from "../../app/Toast";

const schema = Yup.object().shape({
    laborCost: Yup.number().required(),
    status: Yup.string().required(),
    dueDate: Yup.string().required(),
    assignee: Yup.string().required(),
});

export default function UnitInfo({ unit }: { unit: IUnit }) {
    const handleSubmit = async (data: any) => {
        try {
            if (unit?.id) {
                const resp = await updateUnit(unit.id, data);
                mutate("/unit");
                if (resp) {
                    Toast.fire({ text: "Unit updated", icon: "success" });
                }
            }
        } catch (e) {
            Toast.fire("Error", "An error hppened", "error");
        }
    };

    return (
        <Box p={1}>
            <Formik initialValues={unit as IUnit} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
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
                                <FieldSelect
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    name="assignee"
                                    onChange={handleChange}
                                    label="Employee"
                                    placeholder="Employee"
                                />
                                <Button disabled={isSubmitting} kind="add" type="submit">
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
