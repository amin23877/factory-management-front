import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ColDef } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";

import { updatePurchasePO, IPurchasePO } from "../../api/purchasePO";
import { BasePaper } from "../../app/Paper";
import Button from "../../app/Button";
import EditForm from "./Forms";
import Snack from "../../app/Snack";

export default function Details({ initialValues, onDone }: { initialValues: IPurchasePO; onDone: () => void }) {
    const [activeTab, setActiveTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async () => {
        try {
            if (initialValues.id) {
                const resp = await updatePurchasePO(initialValues.id, initialValues);
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
                    {({ values, handleChange, handleBlur, errors }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto auto auto auto" gridGap={5}>
                                <EditForm values={values} errors={errors} handleBlur={handleBlur} handleChange={handleChange} />
                                <Button type="submit" kind="edit" style={{ alignSelf: "end", marginBottom: 5 }}>
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </BasePaper>
            <BasePaper style={{ marginTop: "1em" }}>
                <Tabs>
                    <Tab label="Line items" />
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                </Tabs>
            </BasePaper>
        </Box>
    );
}
