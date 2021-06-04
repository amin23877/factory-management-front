import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { useFormik } from "formik";

import Dialog from "../../app/Dialog";
import { General, MoreInfo, Quantity, Shipping } from "./AddForms";

import { createItem, AddItemInitialValues, AddItemSchema } from "../../api/items";

export const AddItemModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState(0);
    const { errors, touched, values, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
        initialValues: AddItemInitialValues,
        validationSchema: AddItemSchema,
        onSubmit: (data, { setSubmitting }) => {
            createItem(data)
                .then((res: any) => {
                    setSubmitting(false);

                    if (res) {
                        onClose();
                    }
                })
                .catch((e) => console.log(e));
        },
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" title="Add new item">
            <Box p={1} display="flex" alignItems="center">
                <form onSubmit={handleSubmit}>
                    <Box display="flex">
                        <Box flex={1}>
                            <General
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                                isSubmitting={isSubmitting}
                            />
                        </Box>
                        <Box flex={1} width={300} ml={5}>
                            <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="primary">
                                <Tab label="More info" />
                                <Tab label="Quantity" />
                                <Tab label="Shipping" />
                            </Tabs>
                            {activeTab === 0 && (
                                <MoreInfo
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    touched={touched}
                                    values={values}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                            {activeTab === 1 && (
                                <Quantity
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
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
                                    touched={touched}
                                    values={values}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                        </Box>
                    </Box>
                </form>
            </Box>
        </Dialog>
    );
};
