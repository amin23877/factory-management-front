import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import { mutate } from "swr";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
// import CustomScrollbars from "../../app/CustomScroll";
import { General, MoreInfo, Pricing, Shipping } from "./Forms";

import { createItem, AddItemSchema, IItem } from "../../api/items";
// import { IFilter } from "../../api/filter";

export const AddItemModal = ({
    open,
    onClose,
    device,
    initialValues,
}: {
    open: boolean;
    onClose: () => void;
    device?: boolean;
    initialValues?: IItem;
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        // console.log(data);
        setSubmitting(true);
        try {
            await createItem(data);
            setSubmitting(false);
            mutate("/item?device=true");
            mutate("/item");

            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" title="Add new item" fullScreen>
            <Box p={1}>
                <Formik
                    initialValues={initialValues ? initialValues : ({} as IItem)}
                    validationSchema={AddItemSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, handleChange, handleBlur, touched, isSubmitting, setFieldValue }) => (
                        <Form>
                            <Box display="flex">
                                <Box flex={2}>
                                    <General
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        touched={touched}
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        isSubmitting={isSubmitting}
                                        device={device}
                                    />
                                    <Button
                                        disabled={isSubmitting}
                                        style={{ marginTop: "1.3em" }}
                                        kind="add"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </Box>
                                <Box flex={1} ml={1}>
                                    <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="primary">
                                        <Tab label="More info" />
                                        {/* <Tab label="Quantity" /> */}
                                        <Tab label="Pricing" />
                                        <Tab label="Shipping" />
                                        {/* <Tab label="Cluster and Levels" /> */}
                                    </Tabs>
                                    {activeTab === 0 && (
                                        <MoreInfo
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                            touched={touched}
                                            values={values}
                                            isSubmitting={isSubmitting}
                                        />
                                    )}
                                    {/* {activeTab === 1 && (
                                        <Quantity
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                            touched={touched}
                                            values={values}
                                            isSubmitting={isSubmitting}
                                        />
                                    )} */}
                                    {activeTab === 1 && (
                                        <Pricing
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                            touched={touched}
                                            values={values}
                                            isSubmitting={isSubmitting}
                                        />
                                    )}
                                    {activeTab === 2 && (
                                        <Shipping
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                            touched={touched}
                                            values={values}
                                            isSubmitting={isSubmitting}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
