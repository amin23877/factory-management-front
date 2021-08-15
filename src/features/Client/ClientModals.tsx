import React from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { BasePaper } from "../../app/Paper";
import { CommissionForm, GeneralForm, MainContactForm, MoreInfoForm } from "./Forms";

import { addClient, AddClientInit } from "../../api/client";
import { useState } from "react";

export const AddClientModal = ({
    open,
    onClose,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    onDone: () => void;
}) => {
    const schema = Yup.object().shape({
        ClientTypeId: Yup.string().required().notOneOf([0]),
    });

    const [activeTab, setActiveTab] = useState(0);

    const { errors, touched, values, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
        initialValues: AddClientInit,
        validationSchema: schema,
        onSubmit: async (data: any, { setSubmitting }) => {
            // console.log(data);
            try {
                const resp = await addClient(data);
                if (resp.id) {
                    console.log(resp);
                    onDone();
                    onClose();
                } else {
                    console.log(resp);
                }
            } catch (error) {
                console.log(error);
            }
            setSubmitting(false);
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullScreen title="Add new client">
            <form onSubmit={handleSubmit}>
                <Box display="flex" style={{ justifyContent: "space-between" }}>
                    <Box flex={3}>
                        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}>
                            <GeneralForm
                                values={values}
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                            />
                            <Button type="submit" kind="edit">
                                Save
                            </Button>
                        </BasePaper>
                    </Box>
                    <Box flex={2}>
                        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}>
                            <Tabs
                                textColor="primary"
                                value={activeTab}
                                onChange={(e, nv) => setActiveTab(nv)}
                                variant="scrollable"
                                style={{ maxWidth: 700 }}
                            >
                                <Tab label="More Info" />
                                <Tab label="Main Contact" />
                                <Tab label="Commission" />
                            </Tabs>
                            <Box>
                                {activeTab === 0 && (
                                    <MoreInfoForm
                                        values={values}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        touched={touched}
                                    />
                                )}
                                {activeTab === 1 && (
                                    <MainContactForm
                                        values={values}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        touched={touched}
                                    />
                                )}
                                {activeTab === 2 && (
                                    <CommissionForm
                                        values={values}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        touched={touched}
                                    />
                                )}
                            </Box>
                        </BasePaper>
                    </Box>
                </Box>
            </form>
        </Dialog>
    );
};
