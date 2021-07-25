import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, LinearProgress } from "@material-ui/core";

import { Form, Formik } from "formik";

import Snack from "../../../app/Snack";
import Button from "../../../app/Button";
import { BillingTab, GeneralForm, ShippingForm, TermsTab } from "./Forms";
import { ISO, editSO, createSOComplete, ISOComplete } from "../../../api/so";
import { BasePaper } from "../../../app/Paper";

export default function EditForm({ selectedSo, onDone }: { selectedSo: ISO; onDone: () => void }) {
    const [activeTab, setActiveTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (data: ISO, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (selectedSo.id) {
                const resp = await editSO(selectedSo.id, data);
                console.log(resp);
                setSubmitting(false);
                onDone();
                setMsg("Record updated");
                setSnack(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>
            <Formik initialValues={selectedSo} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, values, setValues, isSubmitting, setFieldValue }) => (
                    <Form>
                        <Box display="flex" style={{ justifyContent: "space-evenly" }}>
                            <Box flex={2}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}>
                                    <GeneralForm
                                        onChangeInit={setValues}
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                    <Box display="flex" justifyContent="flex-end" my={2}>
                                        <Button disabled={isSubmitting} type="submit" kind="edit">
                                            Save
                                        </Button>
                                    </Box>
                                </BasePaper>
                            </Box>
                            <Box flex={1}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}>
                                    <Tabs
                                        textColor="primary"
                                        value={activeTab}
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 700 }}
                                    >
                                        <Tab label="Shipping" />
                                        <Tab label="Billing" />
                                        <Tab label="Terms" />
                                    </Tabs>
                                    <Box>
                                        {activeTab === 0 && (
                                            <ShippingForm
                                                setFieldValue={setFieldValue}
                                                values={values}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                            />
                                        )}
                                        {activeTab === 1 && (
                                            <BillingTab
                                                values={values}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                            />
                                        )}
                                        {activeTab === 2 && (
                                            <TermsTab
                                                values={values}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                            />
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

export const FinalForm = ({
    onDone,
    onBack,
    data,
}: {
    onDone: (a: any) => void;
    onBack: () => void;
    data: ISOComplete;
}) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const resp = await createSOComplete(data);
            if (resp) {
                console.log(resp);
                onDone(resp);
            }
        } catch (error) {
            console.log(error.response.data);
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
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Finilize
                    </Button>
                </Box>
            </Box>
        </>
    );
};
