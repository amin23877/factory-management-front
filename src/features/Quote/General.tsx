import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";

import Button from "../../app/Button";
import { CommissionTab, DepositTab, TermsTab, GeneralForm } from "./Forms";

import { IQuote } from "../../api/quote";

export default function GeneralQuote({ onDone, data }: { data?: any; onDone: (data: any) => void }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: IQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        onDone(data);
    };

    return (
        <Box m={1} style={{ height: 600, overflowY: "auto" }}>
            <Formik initialValues={{} as IQuote} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <Box display="flex" m={1}>
                            <Box flex={1} mx={2}>
                                <GeneralForm
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Box>
                            <Box flex={1} m={1} style={{ maxWidth: "403px" }}>
                                <Tabs
                                    value={activeTab}
                                    onChange={(e, nv) => setActiveTab(nv)}
                                    variant="scrollable"
                                    style={{ maxWidth: 500 }}
                                    textColor="primary"
                                >
                                    <Tab label="Terms" />
                                    <Tab label="Deposit" />
                                    <Tab label="Commission" />
                                </Tabs>
                                {activeTab === 0 && (
                                    <TermsTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                )}
                                {activeTab === 1 && (
                                    <DepositTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                )}
                                {activeTab === 2 && (
                                    <CommissionTab
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="center" my={2} py={2}>
                            <Button disabled={isSubmitting} type="submit" kind="add" style={{ padding: "1em 2em" }}>
                                Add
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
