import React, { useState } from "react";
import { Formik, Form } from "formik";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "../../app/Button";

import { GeneralForm, ShippingForm, BillingTab, TermsTab } from "./Forms";

import { ISO, createSO } from "../../api/so";

export default function MainForm({ onDone, data }: { data?: any; onDone: (data: any) => void }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: ISO, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        onDone(data);
        // try {
        //     const resp = await createSO(data);
        //     if (resp) {
        //         console.log(resp);
        //         setSubmitting(false);
        //         onDone();
        //         onClose();
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    return (
        <Box m={2}>
            <Formik initialValues={{} as ISO} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, setValues }) => (
                    <Form>
                        <Box display="grid" gridTemplateColumns="3fr 2fr" gridGap={10}>
                            <Box>
                                <GeneralForm
                                    onChangeInit={setValues}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <Button type="submit" kind="add">
                                    Add
                                </Button>
                            </Box>
                            <Box>
                                <Tabs
                                    value={activeTab}
                                    textColor="primary"
                                    onChange={(e, nv) => setActiveTab(nv)}
                                    style={{ marginBottom: 16 }}
                                >
                                    <Tab label="Shipping" />
                                    <Tab label="Billing" />
                                    <Tab label="Terms" />
                                </Tabs>
                                {activeTab === 0 && (
                                    <ShippingForm values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                )}
                                {activeTab === 1 && (
                                    <BillingTab values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                )}
                                {activeTab === 2 && (
                                    <TermsTab values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                )}
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
