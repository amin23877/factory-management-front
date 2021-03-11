import React, { useState } from "react";
import { Dialog, DialogTitle, Button, Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";

import { useAppDispatch } from "../../store";
import { createQuoteThunk } from "./quoteSlice";

import { BillingTab, CommissionTab, DepositTab, ShippingTab, TermsTab, GeneralForm } from "./Forms";

import { IQuote, QuoteInit } from "../../api/quote";
import { unwrapResult } from "@reduxjs/toolkit";

export default function AddQuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: IQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            const resp = await dispatch(createQuoteThunk(data));
            unwrapResult(resp);
            console.log(resp);
            setSubmitting(false);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
            <DialogTitle>Add new Quote</DialogTitle>
            <Box m={1}>
                <Formik initialValues={QuoteInit} onSubmit={handleSubmit}>
                    {({ handleChange, handleBlur, values, isSubmitting }) => (
                        <Form>
                            <Box display="flex" m={1}>
                                <Box flex={1} mx={2}>
                                    <GeneralForm values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                </Box>
                                <Box flex={1} m={1} style={{ maxWidth: "403px" }}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 500 }}
                                        textColor="primary"
                                    >
                                        <Tab label="Shipping" />
                                        <Tab label="Billing" />
                                        <Tab label="Terms" />
                                        <Tab label="Deposit" />
                                        <Tab label="Commission" />
                                    </Tabs>
                                    {activeTab === 0 && <ShippingTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                    {activeTab === 1 && <BillingTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                    {activeTab === 2 && <TermsTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                    {activeTab === 3 && <DepositTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                    {activeTab === 4 && (
                                        <CommissionTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                    )}
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" my={2}>
                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ padding: "1em 4em", width: "50%" }}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
