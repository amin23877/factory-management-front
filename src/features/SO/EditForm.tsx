import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Snack from "../../app/Snack";
import Button from "../../app/Button";
import { BillingTab, GeneralForm, ShippingForm, TermsTab } from "./Forms";
import { ISO, editSO } from "../../api/so";

export default function EditForm({ selectedSo, onDone }: { selectedSo: ISO; onDone: () => void }) {
    const [activeTab, setActiveTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (data: ISO, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (selectedSo.id) {
                const resp = await editSO(selectedSo.id, data);
                console.log(resp);
                setSubmitting(false);
                onDone();
                setMsg("Record updated");
                setSnack(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>
            <Formik initialValues={selectedSo} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, values, setValues, isSubmitting }) => (
                    <Form>
                        <Box display="flex" m={1} style={{justifyContent:"space-evenly"}}>
                            <Box flex={1} mx={2} style={{maxWidth:"45%"}}>
                                <GeneralForm onChangeInit={setValues} values={values} handleBlur={handleBlur} handleChange={handleChange} />
                            </Box>
                            <Box flex={1} m={1} style={{maxWidth:"403px"}}>
                                <Tabs
                                textColor="primary"
                                    value={activeTab}
                                    onChange={(e, nv) => setActiveTab(nv)}
                                    variant="scrollable"
                                    style={{ maxWidth: 700 }}
                                >
                                    <Tab label="Shipping" />
                                    <Tab label="Billing" />
                                    <Tab label="Terms" />
                                </Tabs>
                                {activeTab === 0 && <ShippingForm values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                {activeTab === 1 && <BillingTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                {activeTab === 2 && <TermsTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}

                                <Box display="flex" justifyContent="flex-end" my={2}>
                                    <Button disabled={isSubmitting} type="submit" kind="edit">
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
}
