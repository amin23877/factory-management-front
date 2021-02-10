import React, { useState, useEffect } from "react";
import { Box, TextField, FormControlLabel, Checkbox, Button, List, ListItem } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { FieldSelect } from "../../app/Inputs";

import { getItems } from "../../api/items";
import { IBomRecord, addBomRecord, updateBomRecord, deleteBomRecord } from "../../api/bom";
import Confirm from "../Modals/Confirm";

const BomRecordForm = ({
    initialValues,
    method,
    itemId,
    bomId,
    bomRecordId,
    onDone,
}: {
    itemId?: number;
    bomId: number;
    bomRecordId?: number;
    initialValues?: IBomRecord;
    method: "post" | "patch";
    onDone: () => void;
}) => {
    const defValues: IBomRecord =
        initialValues !== undefined ? initialValues : { ItemId: 0, index: 0, usage: 0, revision: "", fixedQty: false };

    const schema = Yup.object().shape({
        ItemId: Yup.string().required(),
    });
    const [items, setItems] = useState([]);

    const handleSubmit = async (values: IBomRecord, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (method === "post") {
                if (itemId) {
                    const resp = await addBomRecord(bomId, values);
                    console.log(resp);
                    onDone();
                    setSubmitting(false);
                }
            } else if (method === "patch") {
                console.log(bomRecordId);
                if (bomRecordId) {
                    const resp = await updateBomRecord(bomRecordId, values);
                    console.log(resp);
                    onDone();
                    setSubmitting(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getItems()
            .then((d) => setItems(d))
            .catch((e) => console.log(e));
    }, []);

    return (
        <Box>
            <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={defValues}>
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <FieldSelect
                            request={getItems}
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
                            variant="outlined"
                            name="revision"
                            label="revision"
                            value={values.revision}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.revision && touched.revision)}
                            helperText={errors.revision}
                        />
                        <TextField
                            variant="outlined"
                            name="usage"
                            label="usage"
                            value={values.usage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.usage && touched.usage)}
                            helperText={errors.usage}
                        />
                        <TextField
                            variant="outlined"
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
                        <Button type="submit" variant="contained" color="primary">
                            {method === "post" ? "Add" : "Save"}
                        </Button>
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
    itemId: number;
    bomId: number;
    selectedRecord: any;
    refreshRecords: () => void;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            const resp = await deleteBomRecord(selectedRecord.id);
            console.log(resp);
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
                <h5 style={{ textAlign: "center" }}>BOM {bomId}'s records</h5>
                <List>
                    <ListItem button selected={activeTab === 0} onClick={() => setActiveTab(0)}>
                        Add
                    </ListItem>
                    <ListItem button disabled={!selectedRecord} selected={activeTab === 1} onClick={() => setActiveTab(1)}>
                        Edit
                    </ListItem>
                    <ListItem button disabled={!selectedRecord} onClick={() => setConfirm(true)}>
                        Delete
                    </ListItem>
                </List>
            </Box>
            <Box flex={4}>
                {activeTab === 0 && <BomRecordForm itemId={itemId} onDone={refreshRecords} bomId={bomId} method="post" />}
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
