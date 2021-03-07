import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Button from "../../app/Button";
import { BillingTab, CommissionTab, DepositTab, GeneralForm, ShippingTab, TermsTab } from "./Forms";
import { IQuote, updateQuote } from "../../api/quote";

export default function EditForm({ selectedQuote, onDone }: { selectedQuote: IQuote; onDone: () => void }) {
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
        <Formik initialValues={selectedQuote} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, values, isSubmitting }) => (
                <Form>
                    <Box display="flex" m={1} style={{justifyContent:"space-evenly"}}>
                        <Box flex={1} mx={2} style={{maxWidth:"45%"}}>
                            <GeneralForm edit values={values} handleBlur={handleBlur} handleChange={handleChange} />
                        </Box>
                        <Box flex={1} m={1} style={{maxWidth:"403px"}}>
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
                            {activeTab === 0 && <ShippingTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                            {activeTab === 1 && <BillingTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                            {activeTab === 2 && <TermsTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                            {activeTab === 3 && <DepositTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}
                            {activeTab === 4 && <CommissionTab values={values} handleBlur={handleBlur} handleChange={handleChange} />}

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
    );
}
