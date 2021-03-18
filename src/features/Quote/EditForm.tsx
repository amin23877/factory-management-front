import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import { useAppDispatch } from "../../store";
import { updateQuoteThunk } from "./quoteSlice";

import Snack from "../../app/Snack";
import Button from "../../app/Button";
import { BillingTab, CommissionTab, DepositTab, GeneralForm, ShippingTab, TermsTab } from "./Forms";
import { IQuote } from "../../api/quote";
import { unwrapResult } from "@reduxjs/toolkit";
import { BasePaper } from "../../app/Paper";

export default function EditForm({ selectedQuote }: { selectedQuote: IQuote }) {
    const dispatch = useAppDispatch();

    const [activeTab, setActiveTab] = useState(0);
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (data: IQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (data?.id) {
                const resp = await dispatch(updateQuoteThunk({ id: data.id, data }));
                unwrapResult(resp);
                setShowSnack(true);
                setMsg("Record updated");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Snack open={showSnack} onClose={() => setShowSnack(false)}>
                {msg}
            </Snack>
            <Formik initialValues={selectedQuote} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, values, isSubmitting }) => (
                    <Form>
                        <Box display="flex" justifyContent="space-evenly">
                            <Box flex={3} mr={2}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", border: "none" }}>

                                    <GeneralForm edit values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                    <Box display="flex" justifyContent="flex-end" my={2}>
                                        <Button disabled={isSubmitting} type="submit" kind="edit">
                                            Save
                                    </Button>
                                    </Box>
                                </BasePaper>
                            </Box>
                            <Box flex={1}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", border: "none" }}>

                                    <Tabs
                                        value={activeTab}
                                        textColor="primary"
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 700 }}
                                    >
                                        <Tab label="Shipping" />
                                        <Tab label="Billing" />
                                        <Tab label="Terms" />
                                        <Tab label="Deposit" />
                                        <Tab label="Commission" />
                                    </Tabs>
                                    <Box style={{minHeight:"600", overflowY: "auto",marginBottom:"auto" }}>
                                        {activeTab === 0 && <ShippingTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                        {activeTab === 1 && <BillingTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                        {activeTab === 2 && <TermsTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                        {activeTab === 3 && <DepositTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                                        {activeTab === 4 && (
                                            <CommissionTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                        )}
                                    </Box>
                                </BasePaper>


                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
}
