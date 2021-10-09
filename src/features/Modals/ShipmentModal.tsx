import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import { Formik, Form } from "formik";
import { mutate } from "swr";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import TextField from "../../app/TextField";

import * as Yup from "yup";
// import { addCall } from "../../../api/calls";

const schema = Yup.object().shape({
    // name: Yup.string().required(),
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
            // await addCall({ ...values, Tags: [values.Tags] });
            // mutate("/calls");
            // onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" title="Add New Shipment">
            <Formik initialValues={{} as any} onSubmit={handleSubmit} validationSchema={schema}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setSubmitting }) => (
                    <Form>
                        <Stepper activeStep={activeStep}>
                            <Step>
                                <StepLabel>Packing Instruction</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Packing</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Pictures</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Shipped</StepLabel>
                            </Step>
                        </Stepper>

                        <Box p={5} style={{ padding: "30px 15%" }}>
                            {activeStep === 0 && <></>}
                            {activeStep === 1 && <></>}
                            {activeStep === 2 && <></>}
                            {activeStep === 3 && (
                                <ShippedForm
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
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
                                disabled={activeStep === 3}
                            >
                                Next
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default AddCallModal;

export const ShippedForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
}: {
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
    setFieldValue: any;
}) => {
    return (
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr">
            <TextField
                name="deliveryMethod"
                value={values.deliveryMethod}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.deliveryMethod)}
                helperText={touched.deliveryMethod && errors.deliveryMethod && String(errors.deliveryMethod)}
                label="Delivery Method"
                placeholder="Delivery Method"
            />
            <TextField
                name="trackingNumber"
                value={values.trackingNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.trackingNumber)}
                helperText={touched.trackingNumber && errors.trackingNumber && String(errors.trackingNumber)}
                label="Tracking Number"
                placeholder="Tracking Number"
            />
            <DateTimePicker
                name="deliveryDate"
                value={values.deliveryDate || null}
                onChange={(d) => setFieldValue("deliveryDate", d && new Date(d?.toISOString()).getTime())}
                onBlur={handleBlur}
                error={Boolean(errors.deliveryDate)}
                helperText={errors.deliveryDate}
                size="small"
                placeholder="Delivery Date"
                label="Delivery Date"
            />
            <DateTimePicker
                name="shippingDate"
                value={values.shippingDate || null}
                onChange={(d) => setFieldValue("shippingDate", d && new Date(d?.toISOString()).getTime())}
                onBlur={handleBlur}
                error={Boolean(errors.shippingDate)}
                helperText={errors.shippingDate}
                size="small"
                placeholder="Shipping Date"
                label="Shipping Date"
            />
        </Box>
    );
};
