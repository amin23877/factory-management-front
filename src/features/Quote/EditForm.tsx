import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, LinearProgress } from "@material-ui/core";
import { Form, Formik } from "formik";

import { useAppDispatch } from "../../store";
import { updateQuoteThunk } from "./quoteSlice";

import Snack from "../../app/Snack";
import Button from "../../app/Button";
import { CommissionTab, DepositTab, GeneralForm, TermsTab } from "./Forms";
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
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", border: "none", margin: "0 1em " }}>
                                    <GeneralForm edit values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                    <Box display="flex" justifyContent="flex-end" mt={1}>
                                        <Button disabled={isSubmitting} type="submit" kind="edit">
                                            Save
                                        </Button>
                                    </Box>
                                </BasePaper>
                            </Box>
                            <Box flex={1}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", border: "none", margin: "0 1em " }}>
                                    <Tabs
                                        value={activeTab}
                                        textColor="primary"
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 700 }}
                                    >
                                        <Tab label="Terms" />
                                        <Tab label="Deposit" />
                                        <Tab label="Commission" />
                                    </Tabs>
                                    <Box style={{ minHeight: "600", overflowY: "auto", marginBottom: "auto" }}>
                                        {activeTab === 0 && (
                                            <TermsTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                        )}
                                        {activeTab === 1 && (
                                            <DepositTab values={values} handleBlur={handleBlur} handleChange={handleChange} />
                                        )}
                                        {activeTab === 2 && (
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

export const FinalForm = ({ onDone, onBack, data }: { onDone: (a: any) => void; onBack: () => void; data: any }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        onDone(data);
        //     try {
        //         const { ContactId, requester, status, VendorId, lines } = data;
        //         let newLines = [...lines];
        //         newLines.forEach(function (v: any) {
        //             delete v.createdAt;
        //             delete v.id;
        //             delete v.PurchasePOId;
        //             delete v.PurchaseSOId;
        //             delete v.QuoteId;
        //             delete v.SOId;
        //             delete v.updatedAt;
        //         });
        //         const resp = await createPurchasePOComplete({
        //             ContactId,
        //             requester,
        //             status,
        //             VendorId,
        //             lines: newLines,
        //         } as IPurchasePOComplete);
        //         if (resp) {
        //             console.log(resp);
        //             onDone(resp);
        //         }
        //     } catch (error) {
        //         console.log(error);
        //         console.log(error.response.data.error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
    }
    return (
        <>
            <Box height="85%" display="flex" flexDirection="column">
                <Typography variant="h5">Are you sure?</Typography>
                <Typography variant="subtitle1" style={{ margin: "1em 0" }}>
                    If you finilize your Purchase order, You can't update it, So if you want to update it you should make new version or add new
                    one
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
