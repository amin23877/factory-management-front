import React, { useState } from "react";
import { Box, Tabs, Tab, Step, StepLabel, Stepper, IconButton } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { CommissionForm, GeneralForm, MainContactForm, MoreInfoForm } from "./Forms";

import { addClient, AddClientInit } from "../../api/client";

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

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
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
        <Dialog open={open} onClose={onClose} fullScreen title="Add New Customer">
            <form onSubmit={handleSubmit}>
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>General information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>More Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Main Contact </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Commissions</StepLabel>
                    </Step>
                    {/* <Step>
                        <StepLabel>Add Contact</StepLabel>
                    </Step> */}
                </Stepper>

                {/* 
                            <Tabs
                                textColor="primary"
                                value={activeStep}
                                onChange={(e, nv) => setActiveTab(nv)}
                                variant="scrollable"
                                style={{ maxWidth: 700 }}
                            >
                                <Tab label="More Info" />
                                <Tab label="Main Contact" />
                                <Tab label="Commission" />
                            </Tabs> */}
                <Box p={5}>
                    {activeStep === 0 && (
                        <GeneralForm
                            values={values}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                        />
                    )}
                    {activeStep === 1 && (
                        <MoreInfoForm
                            values={values}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                        />
                    )}
                    {activeStep === 2 && (
                        <MainContactForm
                            values={values}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                        />
                    )}
                    {activeStep === 3 && (
                        <CommissionForm
                            values={values}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                        />
                    )}
                    {/* {activeStep === 4 && (
                        <CommissionForm
                            values={values}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                        />
                    )} */}
                </Box>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "50%",
                        margin: "10px auto",
                    }}
                >
                    <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button type="submit" kind="edit">
                        Save
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 4}>
                        Next
                    </Button>
                </Box>
            </form>
        </Dialog>
    );
};
