import React, { useState } from "react";
import { Formik, Form } from "formik";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Dialog from "../../app/Dialog";
import Button from "../../app/Button";

import { GeneralForm, ShippingForm, BillingTab, TermsTab } from "./Forms";

import { SOInit, ISO, createSO } from "../../api/so";

export default function AddSOModal({ open, onClose, onDone }: { open: boolean; onDone: () => void; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: ISO, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            const resp = await createSO(data);
            if (resp) {
                console.log(resp);
                setSubmitting(false);
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Add new SO" maxWidth="lg" fullWidth>
            <Box m={2}>
                <Formik initialValues={SOInit} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, setValues }) => (
                        <Form>
                            <Box display="flex">
                                <Box flex={1}>
                                    <GeneralForm
                                        onChangeInit={setValues}
                                        values={values}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                    />
                                </Box>
                                <Box flex={1}>
                                    <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                                        <Tab label="Shipping" />
                                        <Tab label="Billing" />
                                        <Tab label="Terms" />
                                    </Tabs>
                                    {activeTab === 0 && (
                                        <ShippingForm values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                    )}
                                    {activeTab === 1 && <BillingTab values={values} handleChange={handleChange} handleBlur={handleBlur} />}
                                    {activeTab === 2 && <TermsTab values={values} handleChange={handleChange} handleBlur={handleBlur} />}
                                </Box>
                            </Box>
                            <Button type="submit" kind="add">
                                Add
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
