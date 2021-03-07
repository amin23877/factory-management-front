import React, { useState } from "react";
import { Formik, Form } from "formik";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Dialog from "../../app/Dialog";
import Button from "../../app/Button";

import { GeneralForm, ShippingForm, BillingTab, TermsTab } from "./Forms";

import { SOInit, ISO, createSO } from "../../api/so";

const AddForm = ({ onClose, onDone }: { onDone: () => void; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: ISO, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            // console.log(data);
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
        <Formik initialValues={SOInit} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, setValues }) => (
                <Form>
                    <Box display="flex">
                        <Box flex={2}>
                            <GeneralForm onChangeInit={setValues} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                            <Box display="flex" justifyContent="center" my={2}>
                                <Button type="submit" variant="contained" color="primary" style={{ padding: "1em 4em", width: "50%" }}>
                                    Add
                                </Button>
                            </Box>
                        </Box>
                        <Box flex={1}>
                            <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                                <Tab label="Shipping" />
                                <Tab label="Billing" />
                                <Tab label="Terms" />
                            </Tabs>
                            {activeTab === 0 && <ShippingForm values={values} handleChange={handleChange} handleBlur={handleBlur} />}
                            {activeTab === 1 && <BillingTab values={values} handleChange={handleChange} handleBlur={handleBlur} />}
                            {activeTab === 2 && <TermsTab values={values} handleChange={handleChange} handleBlur={handleBlur} />}
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default function AddSOModal({ open, onClose, onDone }: { open: boolean; onDone: () => void; onClose: () => void }) {
    return (
        <Dialog open={open} onClose={onClose} title="Add new SO" maxWidth="lg" fullWidth>
            <Box m={2} style={{ height: "72vh" }}>
                <AddForm onClose={onClose} onDone={onDone} />
            </Box>
        </Dialog>
    );
}
