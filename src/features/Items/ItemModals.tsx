import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import CustomScrollbars from "../../app/CustomScroll";
import { DynamicFilterAndFields, General, MoreInfo, Quantity, Shipping } from "./Forms";

import { createItem, AddItemSchema, IItem } from "../../api/items";
import { IFilter } from "../../api/filter";

export const AddItemModal = ({ open, onClose, device }: { open: boolean; onClose: () => void; device?: boolean }) => {
    const [activeTab, setActiveTab] = useState(0);
    // const {data:filters} = useSWR<IFilter[]>('/filter');

    // const initialFilterValues = filters.map(filter => ({filter.name}))

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        // console.log(data);
        setSubmitting(true);
        try {
            const resp = await createItem(data);
            setSubmitting(false);
            if (resp) {
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" title="Add new item">
            <Box p={1}>
                <Formik initialValues={{} as IItem} validationSchema={AddItemSchema} onSubmit={handleSubmit}>
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
                                        <Tab label="Shipping" />
                                        <Tab label="Cluster and Levels" />
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
                                    {activeTab === 2 && (
                                        <CustomScrollbars style={{ height: 290 }} thumbColor="#555">
                                            <DynamicFilterAndFields
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                                touched={touched}
                                                values={values}
                                                isSubmitting={isSubmitting}
                                                device={device}
                                            />
                                        </CustomScrollbars>
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
