import React, { useState } from "react";
import { Box, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormControl, Tabs, Tab } from "@material-ui/core";
import { useFormik } from "formik";

import Dialog from "../../app/Dialog";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";
import { General, MoreInfo, Quantity, Shipping } from "./AddForms";

import { getCategories } from "../../api/category";
import { getTypes } from "../../api/types";
import { getFamilies } from "../../api/family";
import { createItem, AddItemInitialValues, AddItemSchema } from "../../api/items";

export const AddItemModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState(0);
    const { errors, touched, values, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
        initialValues: AddItemInitialValues,
        validationSchema: AddItemSchema,
        onSubmit: (data, { setSubmitting }) => {
            // console.log(data);

            createItem(data)
                .then((res: any) => {
                    console.log(res);
                    setSubmitting(false);
                    if (res.status !== 400) {
                        onClose();
                    }
                })
                .catch((e) => console.log(e));
        },
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" title="Add new item">
            <Box p={3} display="flex" alignItems="center">
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
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
                        <Box flex={1} textAlign="center" width={400} ml={1}>
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
