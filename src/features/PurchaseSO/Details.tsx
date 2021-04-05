import React, { useState } from "react";
import { Form, Formik } from "formik";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ColDef } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";

import { updatePurchaseSO, IPurchaseSO } from "../../api/purchaseSO";
import { BasePaper } from "../../app/Paper";
import Button from "../../app/Button";
import EditForm from "./Forms";
import Snack from "../../app/Snack";

export default function Details({
    initialValues,
    onDone,
    lines,
    onLineSelected,
}: {
    initialValues: IPurchaseSO;
    onDone: () => void;
    lines: any[];
    onLineSelected: (v: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const lineCols: ColDef[] = [
        { field: "ItemId", headerName: "Item" },
        { field: "description", headerName: "Description" },
        { field: "quantity", headerName: "Quantity" },
        { field: "price", headerName: "Price" },
        { field: "tax", headerName: "Tax" },
        { field: "index", headerName: "Index" },
    ];

    const handleSubmit = async () => {
        try {
            if (initialValues.id) {
                const resp = await updatePurchaseSO(initialValues.id, initialValues);
                if (resp) {
                    setMsg("Record updated");
                    setSnack(true);
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>

            <BasePaper>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto auto auto auto" gridGap={5}>
                                <EditForm
                                    values={values}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                                <Button type="submit" kind="edit" style={{ alignSelf: "end", marginBottom: 5 }}>
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </BasePaper>
            <BasePaper style={{ marginTop: "1em" }}>
                <Tabs style={{ marginBottom: "1em" }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Line items" />
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                </Tabs>
                {activeTab === 0 && <BaseDataGrid rows={lines} cols={lineCols} onRowSelected={(d) => onLineSelected(d)} />}
            </BasePaper>
        </Box>
    );
}
