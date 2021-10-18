import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, List, ListItem } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { getItems } from "../../api/items";
import { updateBomRecord, deleteBomRecord } from "../../api/bom";
import Confirm from "../Modals/Confirm";
import { addUBomRecord, IBomRecord } from "../../api/ubom";

const BomRecordForm = ({
    initialValues,
    method,
    itemId,
    bomId,
    bomRecordId,
    onDone,
}: {
    itemId?: string;
    bomId: string;
    bomRecordId?: string;
    initialValues?: IBomRecord;
    method: "post" | "patch";
    onDone: () => void;
}) => {
    const defValues: IBomRecord = initialValues ? initialValues : ({} as IBomRecord);

    const schema = Yup.object().shape({
        ItemId: Yup.string().required().notOneOf([0]),
    });

    const handleSubmit = async (values: IBomRecord, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (method === "post") {
                if (itemId) {
                    await addUBomRecord(bomId, values);

                    onDone();
                    setSubmitting(false);
                }
            } else if (method === "patch") {
                console.log(bomRecordId);
                if (bomRecordId) {
                    const resp = await updateBomRecord(bomRecordId, values as any);
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
                            <FieldSelect
                                request={getItems}
                                getOptionList={(items) => items.items}
                                itemTitleField="name"
                                itemValueField="id"
                                name="ItemId"
                                value={values.ItemId}
                                label="item"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.ItemId && touched.ItemId)}
                            />

                            <TextField
                                name="revision"
                                label="revision"
                                value={values.revision}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.revision && touched.revision)}
                                helperText={errors.revision}
                                style={{ marginLeft: 15 }}
                            />
                            <TextField
                                name="usage"
                                label="usage"
                                value={values.usage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.usage && touched.usage)}
                                helperText={errors.usage}
                            />
                            <TextField
                                name="index"
                                label="index"
                                value={values.index}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.index && touched.index)}
                                helperText={errors.index}
                            />
                            <FormControlLabel
                                label="fixedQty"
                                control={<Checkbox checked={values.fixedQty} onChange={handleChange} name="fixedQty" />}
                            />
                            <Button type="submit" kind={method === "post" ? "add" : "edit"}>
                                {method === "post" ? "Add" : "Save"}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default function BomRecordTab({
    bomId,
    itemId,
    selectedRecord,
    refreshRecords,
}: {
    itemId: string;
    bomId: string;
    selectedRecord: any;
    refreshRecords: () => void;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteBomRecord(selectedRecord.id);

            refreshRecords();
            setConfirm(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box display="flex">
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />

            <Box flex={1} mr={1}>
                <h5 style={{ textAlign: "center" }}>BOM's record list</h5>
                <List>
                    <ListItem button selected={activeTab === 0} onClick={() => setActiveTab(0)}>
                        Add
                    </ListItem>
                    <ListItem
                        button
                        disabled={!selectedRecord}
                        selected={activeTab === 1}
                        onClick={() => setActiveTab(1)}
                    >
                        Edit
                    </ListItem>
                    <ListItem button disabled={!selectedRecord} onClick={() => setConfirm(true)}>
                        Delete
                    </ListItem>
                </List>
            </Box>
            <Box flex={4}>
                {activeTab === 0 && (
                    <BomRecordForm itemId={itemId} onDone={refreshRecords} bomId={bomId} method="post" />
                )}
                {activeTab === 1 && (
                    <BomRecordForm
                        onDone={refreshRecords}
                        bomId={bomId}
                        method="patch"
                        bomRecordId={selectedRecord.id}
                        initialValues={selectedRecord}
                    />
                )}
            </Box>
        </Box>
    );
}
