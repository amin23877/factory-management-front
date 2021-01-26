import React, { useState, useEffect } from "react";
import { Box, TextField, FormControlLabel, Select, MenuItem, Checkbox, Button, List, ListItem } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

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
        initialValues !== undefined ? initialValues : { itemId: 0, index: 0, usage: 0, revision: "", fixedQty: false };

    const schema = Yup.object().shape({
        itemId: Yup.string().required(),
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
                        <Select
                            style={{ marginTop: "0.4em" }}
                            variant="outlined"
                            name="itemId"
                            defaultValue={values.itemId}
                            value={values.itemId}
                            label="item"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.itemId && touched.itemId)}
                        >
                            {method === "patch" && <MenuItem value="">{items.find((item: any) => item.id === values.itemId)}</MenuItem>}
                            {items.map((item: any) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
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
