import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { getItems } from "../../api/items";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { FieldSelect } from "../../app/Inputs";
import TextField from "../../app/TextField";
import { Box } from "@material-ui/core";

export default function AddServiceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} title="Add new service" fullWidth maxWidth="sm">
            <Box p={2}>
                <Formik initialValues={{} as any} onSubmit={(d) => console.log(d)}>
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="flex" flexDirection="column">
                                <FieldSelect
                                    request={getItems}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    label="Item"
                                    name="ItemId"
                                    value={values.ItemId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                />
                                <TextField
                                    label="Start date"
                                    name="startDate"
                                    type="date"
                                    value={values.startDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    label="End date"
                                    name="endDate"
                                    type="date"
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Button style={{ margin: "0.5em 0" }} type="submit" kind="add">
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
