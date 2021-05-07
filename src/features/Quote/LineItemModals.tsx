import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import { LineItemForm } from "./Forms";
import { LineItemFSForm } from "../Service/Forms";

import { createLineItem, editLineItem, deleteLineItem } from "../../api/quote";
import { ILineItem } from "../../api/lineItem";

export default function LineItemModal({
    open,
    onClose,
    onDone,
    quoteId,
    LIData,
}: {
    quoteId?: string | null;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    LIData?: ILineItem;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const schema = Yup.object().shape({
        ItemId: Yup.string().required().notOneOf([0]),
        quantity: Yup.number().min(1),
        price: Yup.number(),
    });

    const handleDelete = async () => {
        try {
            if (LIData && LIData.id) {
                const resp = await deleteLineItem(LIData?.id);
                if (resp) {
                    console.log(resp);
                    onDone();
                    onClose();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (LIData && LIData.id) {
                const resp = await editLineItem(LIData.id, data);
                if (resp) {
                    console.log(resp);
                    onDone();
                    onClose();
                }
                setSubmitting(false);
            } else {
                if (quoteId) {
                    const resp = await createLineItem(quoteId, data);
                    if (resp) {
                        console.log(resp);
                        onDone();
                        onClose();
                    }
                    setSubmitting(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title={`${LIData ? "Edit" : "Add"} line item`} maxWidth="sm" fullWidth>
            <Box m={2} mr={3}>
                <Tabs style={{ marginBottom: 10 }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Item" />
                    <Tab label="Field Service" disabled={!LIData} />
                </Tabs>
                {activeTab === 0 && (
                    <Formik validationSchema={schema} initialValues={LIData ? LIData : ({} as ILineItem)} onSubmit={handleSubmit}>
                        {({ values, handleChange, handleBlur, isSubmitting, errors, touched }) => (
                            <Form>
                                <LineItemForm
                                    LIData={LIData}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    handleDelete={handleDelete}
                                    isSubmitting={isSubmitting}
                                    touched={touched}
                                    values={values}
                                />
                            </Form>
                        )}
                    </Formik>
                )}
                {activeTab === 1 && LIData && <LineItemFSForm LineItem={LIData} />}
            </Box>
        </Dialog>
    );
}
