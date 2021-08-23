import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { Formik, Form } from "formik";
import { mutate } from "swr";

import Dialog from "../../../app/Dialog";
import Button from "../../../app/Button";
import { GeneralForm, MainContactForm, MoreInfoForm } from "./Forms";

import * as Yup from "yup";
import { addCall } from "../../../api/calls";

const schema = Yup.object().shape({
    name: Yup.string().required(),
    address: Yup.string().required(),
    zip: Yup.string().required(),
    state: Yup.string().required(),
    Tags: Yup.string().required(),
    subject: Yup.string().required(),
    description: Yup.string().required(),
    CreatedBy: Yup.string().required(),
    AssignedTo: Yup.string().required(),
    Response: Yup.string().required(),
    contactName: Yup.string().required(),
    contactNumber: Yup.string().required(),
});

const AddCallModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSubmit = async (values: any, setSubmitting: any) => {
        try {
            await addCall({ ...values, Tags: [values.Tags] });
            mutate("/calls");
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };
    // const { errors, touched, values, handleChange, handleBlur } = useFormik({
    //     initialValues: {},
    //     onSubmit: async (data: any, { setSubmitting }) => {
    //         try {
    //             await addCall({ ...data, Tags: [values.Tags] });
    //             mutate("/calls");
    //             onClose();
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setSubmitting(false);
    //         }
    //     },
    //     validationSchema: { schema },
    // });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" title="Add New Ticket">
            <Formik initialValues={{} as any} onSubmit={handleSubmit} validationSchema={schema}>
                {({ values, errors, touched, handleChange, handleBlur, setSubmitting }) => (
                    <Form>
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
                                    add
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
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            margin="10px auto"
                            width="50%"
                        >
                            <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            <Button type="submit" kind="add">
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={activeStep === 2}
                            >
                                Next
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            );
        </Dialog>
    );
};

export default AddCallModal;
