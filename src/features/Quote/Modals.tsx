import React, { useState } from "react";
import { Dialog, DialogTitle, Button, Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";

import { BillingTab, CommissionTab, DepositTab, ShippingTab, TermsTab, GeneralForm } from "./Forms";

import { IQuote, QuoteInit, createQuote } from "../../api/quote";

export default function AddQuoteModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: IQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            const resp = await createQuote(data);
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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Add new Quote</DialogTitle>
            <Box>
                <Formik initialValues={QuoteInit} onSubmit={handleSubmit}>
                    {({ handleChange, handleBlur, values, isSubmitting }) => (
                        <Form>
                            <Box display="flex" m={1}>
                                <Box flex={1} mx={2}>
                                    <GeneralForm values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                </Box>
                                <Box flex={1} m={1}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 500 }}
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
                                    style={{ padding: "2em 4em" }}
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
