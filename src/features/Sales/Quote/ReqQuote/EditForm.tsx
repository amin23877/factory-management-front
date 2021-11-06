import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import { BasePaper } from "../../../../app/Paper";
import { EntitiesTab } from "../Forms";

import { updateQuote } from "../../../../api/quote";
import Toast from "../../../../app/Toast";
import { getModifiedValues } from "../../../../logic/utils";
import { IReqQuote } from "../../../../api/reqQuote";
import TextField from "../../../../app/TextField";

export default function EditForm({ selectedQuote }: { selectedQuote: IReqQuote }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: IReqQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (selectedQuote?.id) {
                await updateQuote(selectedQuote.id, getModifiedValues(data, selectedQuote));
                mutate("/quote");

                Toast("Record updated successfully", "success");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={selectedQuote} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, values, isSubmitting, setFieldValue }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                        <BasePaper>
                            <Box my={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                <TextField value={values.number} label="REQ. NO." disabled />
                                <TextField value={values.QuoteId?.number} label="Quote ID" disabled />
                                <TextField rows={4} multiline value={values.note} label="Note" disabled />
                            </Box>
                        </BasePaper>
                        <BasePaper
                            style={{
                                margin: "0 1em",
                                height: "100%",
                            }}
                        >
                            <Tabs
                                value={activeTab}
                                textColor="primary"
                                onChange={(e, nv) => setActiveTab(nv)}
                                variant="scrollable"
                                style={{ maxWidth: 700 }}
                            >
                                {/* <Tab label="Terms" /> */}
                                <Tab label="Entities" />
                            </Tabs>
                            <Box style={{ minHeight: "600", overflowY: "auto", marginBottom: "auto" }}>
                                {activeTab === 0 && (
                                    <EntitiesTab
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                )}
                            </Box>
                        </BasePaper>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
