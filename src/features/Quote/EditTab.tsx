import React, { useState } from "react";
import { Tabs, Tab, Box, Button } from "@material-ui/core";
import { Form, Formik } from "formik";

import { BillingTab, CommissionTab, DepositTab, GeneralForm, ShippingTab, TermsTab } from "./Forms";
import { IQuote, updateQuote } from "../../api/quote";

export default function EditTab({ selectedQuote, onDone }: { selectedQuote: IQuote; onDone: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: IQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (data?.id) {
                const resp = await updateQuote(data.id, data);
                console.log(resp);
                setSubmitting(false);
                onDone();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Formik initialValues={selectedQuote} onSubmit={handleSubmit}>
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
                                    style={{ maxWidth: 700 }}
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
                                {activeTab === 4 && <CommissionTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
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
                                Save
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
