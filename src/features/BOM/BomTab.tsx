import React, { useState } from "react";
import { Box, TextField, FormControlLabel, Checkbox, List, ListItem } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import Confirm from "../Modals/Confirm";
import { IBom, addBom, updateBom, deleteBom } from "../../api/bom";

const BomForm = ({
    initialValues,
    method,
    itemId,
    bomId,
    onDone,
}: {
    itemId: number;
    bomId?: number;
    initialValues?: IBom;
    method: "post" | "patch";
    onDone: () => void;
}) => {
    const defValues: IBom = initialValues !== undefined ? initialValues : { note: "", no: "", name: "", current: false };

    const schema = Yup.object().shape({
        name: Yup.string().required().min(3),
    });

    const handleSubmit = async (values: IBom, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (method === "post") {
                const resp = await addBom(itemId, values);
                console.log(resp);
                onDone();
                setSubmitting(false);
            } else if (method === "patch") {
                if (bomId) {
                    const resp = await updateBom(bomId, values);
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
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <TextField
                                variant="outlined"
                                name="name"
                                label="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.name && touched.name)}
                                helperText={errors.name}
                            />
                            <TextField
                                variant="outlined"
                                name="no"
                                label="no"
                                value={values.no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.no && touched.no)}
                                helperText={errors.no}
                            />
                            <TextField
                                variant="outlined"
                                name="note"
                                label="note"
                                value={values.note}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.note && touched.note)}
                                helperText={errors.note}
                            />
                            <FormControlLabel
                                label="current"
                                control={<Checkbox checked={values.current} onChange={handleChange} name="current" />}
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

export default function BomTab({ itemId, selectedBom, refreshBoms }: { itemId: number; selectedBom: any; refreshBoms: () => void }) {
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
                <h5 style={{ textAlign: "center" }}>Item {itemId}'s BOMs</h5>
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
                {activeTab === 0 && <BomForm onDone={refreshBoms} itemId={itemId} method="post" />}
                {activeTab === 1 && (
                    <BomForm
                        onDone={refreshBoms}
                        itemId={itemId}
                        method="patch"
                        bomId={selectedBom.id}
                        initialValues={{ name: selectedBom.name, no: selectedBom.no, note: selectedBom.note, current: selectedBom.current }}
                    />
                )}
            </Box>
        </Box>
    );
}
