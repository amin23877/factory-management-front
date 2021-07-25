import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, List, ListItem } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Confirm from "../Modals/Confirm";
import {  deleteBom } from "../../api/bom";
import { addUBom, IUBom, updateUBom } from "../../api/ubom";
import { DateTimePicker } from "@material-ui/pickers";

const BomForm = ({
    initialValues,
    method,
    unitId,
    bomId,
    onDone,
}: {
    unitId: string;
    bomId?: string;
    initialValues?: IUBom;
    method: "post" | "patch";
    onDone: () => void;
}) => {
    const defValues: IUBom = initialValues ? initialValues : ({} as IUBom);

    const schema = Yup.object().shape({
        name: Yup.string().required().min(3),
    });

    const handleSubmit = async (values: IUBom, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (method === "post") {
                console.log(unitId, values, 'add')
                const resp = await addUBom(unitId, values);
                console.log(resp);
                onDone();
                setSubmitting(false);
            } else if (method === "patch") {
                if (bomId) {
                    const resp = await updateUBom(bomId, values);
                    console.log(resp);
                    onDone();
                    setSubmitting(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={defValues}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <TextField
                                name="name"
                                label="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.name && touched.name)}
                                helperText={errors.name}
                            />
                            <TextField
                                name="no"
                                label="no"
                                value={values.no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.no && touched.no)}
                                helperText={errors.no}
                            />
                            <TextField
                                name="note"
                                label="note"
                                value={values.note}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.note && touched.note)}
                                helperText={errors.note}
                            />
                            <DateTimePicker
                                name="date"
                                value={values.date || null}
                                onChange={(d) => setFieldValue("date", d?.toString())}
                                onBlur={handleBlur}
                                error={Boolean(errors.date)}
                                helperText={errors.date}
                                size="small"
                                placeholder="date"
                                label="Date"
                            />
                            <Button type="submit" kind={method === "post" ? "add" : "edit"}>
                                {method === "post" ? "Add" : "edit"}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default function Tab({
    unitId,
    selectedBom,
    refreshBoms,
}: {
    unitId: string;
    selectedBom: any;
    refreshBoms: () => void;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            const resp = await deleteBom(selectedBom.id);
            console.log(resp);
            refreshBoms();
            setConfirm(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box display="flex">
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />

            <Box flex={1} mr={1}>
                <h5 style={{ textAlign: "center" }}>Item's BOM list</h5>
                <List>
                    <ListItem button selected={activeTab === 0} onClick={() => setActiveTab(0)}>
                        Add
                    </ListItem>
                    <ListItem button disabled={!selectedBom} selected={activeTab === 1} onClick={() => setActiveTab(1)}>
                        Edit
                    </ListItem>
                    <ListItem button disabled={!selectedBom} onClick={() => setConfirm(true)}>
                        Delete
                    </ListItem>
                </List>
            </Box>
            <Box flex={4}>
                {activeTab === 0 && <BomForm onDone={refreshBoms} unitId={unitId} method="post" />}
                {activeTab === 1 && (
                    <BomForm
                        onDone={refreshBoms}
                        unitId={unitId}
                        method="patch"
                        bomId={selectedBom.id}
                        initialValues={{
                            name: selectedBom.name,
                            no: selectedBom.no,
                            note: selectedBom.note,
                            date: selectedBom.current,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}
