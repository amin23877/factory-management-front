import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, LinearProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import { CommissionTab, EntitiesTab, GeneralForm } from "./Forms";

import { createQuoteComplete, IQuote, updateQuote } from "../../../api/quote";
import Toast from "../../../app/Toast";
import { getModifiedValues } from "../../../logic/utils";

export default function EditForm({ selectedQuote }: { selectedQuote: IQuote }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: IQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
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
                            <GeneralForm
                                edit
                                setFieldValue={setFieldValue}
                                values={values}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                            />
                            <Box display="flex" justifyContent="center" mt={1}>
                                <Button disabled={isSubmitting} type="submit" kind="edit">
                                    Save
                                </Button>
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
                                <Tab label="Commission" />
                            </Tabs>
                            <Box style={{ minHeight: "600", overflowY: "auto", marginBottom: "auto" }}>
                                {activeTab === 0 && (
                                    <EntitiesTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                )}
                                {activeTab === 1 && (
                                    <CommissionTab
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
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

export const FinalForm = ({ onDone, onBack, data }: { onDone: (a: any) => void; onBack: () => void; data: any }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const resp = await createQuoteComplete(data);
            if (resp) {
                console.log(resp);
                onDone(resp);
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Box height="85%" display="flex" flexDirection="column">
                <Typography variant="h5">Are you sure?</Typography>
                <Typography variant="subtitle1" style={{ margin: "1em 0" }}>
                    If you finilize your Purchase order, You can't update it, So if you want to update it you should
                    make new version or add new one
                </Typography>
                {loading && <LinearProgress />}
                <div style={{ flexGrow: 1 }} />
                <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button disabled={loading} onClick={onBack} color="secondary" variant="contained">
                        Back to lines
                    </Button>
                    <Button disabled={loading} onClick={handleSubmit} color="primary" variant="contained">
                        Finilize
                    </Button>
                </Box>
            </Box>
        </>
    );
};
