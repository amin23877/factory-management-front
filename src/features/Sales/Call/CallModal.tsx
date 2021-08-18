import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { useFormik } from "formik";

import Dialog from "../../../app/Dialog";
import Button from "../../../app/Button";
import { GeneralForm, MainContactForm, MoreInfoForm } from "./Forms";

import { addCall } from "../../../api/calls";
import { mutate } from "swr";

const AddCallModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const { errors, touched, values, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {},
        onSubmit: async (data: any, { setSubmitting }) => {
            try {
                const resp = await addCall({ ...data, tags: [values.tags] });
                if (resp.id) {
                    console.log(resp);
                    mutate("/calls");
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
                        <StepLabel>Customer Problem</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Our Response</StepLabel>
                    </Step>
                </Stepper>

                <Box p={5} style={{ padding: "30px 15%" }}>
                    {activeStep === 0 && (
                        <GeneralForm
                            values={values}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                            add={true}
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

export default AddCallModal;
