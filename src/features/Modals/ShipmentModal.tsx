import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import TextField from "../../app/TextField";
import UploadButton from "../../app/FileUploader";
import * as Yup from "yup";
import { createShipment } from "../../api/shipment";
import { addImage, deleteImage } from "../../api/units";

const schema = Yup.object().shape({
    // name: Yup.string().required(),
});

const AddShipModal = ({ open, onClose, unitId }: { open: boolean; onClose: () => void; unitId: string }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [img, setImg] = useState<any>();

    const { data: unit } = useSWR(`/unit/${unitId}`);

    const handleFileChange = async (e: any) => {
        if (unitId) {
            if (!e.target.files) {
                return;
            }
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            const resp = await addImage(unitId, file);
            if (resp) {
                setImg(url);
                mutate(`/unit/${unitId}`);
            }
        }
    };
    const handleFileDelete = async (url: string) => {
        if (unitId) {
            const data = { url: url };
            const resp = await deleteImage(unitId, data);
            if (resp) {
                mutate(`/unit/${unitId}`);
            }
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSubmit = async (values: any, setSubmitting: any) => {
        try {
            await createShipment({ ...values, UnitId: unitId });
            mutate(`/shipment?UnitId=${unitId}`);
            onClose();
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
                            {activeStep === 2 && (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <UploadButton onChange={handleFileChange} accept="image/*" />
                                    </div>
                                    <div>
                                        {unit &&
                                            unit.photo[0] &&
                                            unit.photo.map((url: string) => (
                                                <>
                                                    <img
                                                        style={{
                                                            maxWidth: "100%",
                                                            height: "auto",
                                                            maxHeight: 400,
                                                            margin: "0px auto",
                                                        }}
                                                        alt=""
                                                        src={`http://digitalphocus.ir${url}`}
                                                    />
                                                    <Button kind="delete" onClick={() => handleFileDelete(url)}>
                                                        delete
                                                    </Button>
                                                </>
                                            ))}
                                    </div>
                                </>
                            )}
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

export default AddShipModal;

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
            <TextField
                name="carrier"
                value={values.carrier}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.carrier)}
                helperText={touched.carrier && errors.carrier && String(errors.carrier)}
                label="Carrier"
                placeholder="Carrier"
            />
            <TextField
                name="shipmentNo"
                value={values.shipmentNo}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.shipmentNo)}
                helperText={touched.shipmentNo && errors.shipmentNo && String(errors.shipmentNo)}
                label="shipment No."
                placeholder="shipment No."
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
                name="shipDate"
                value={values.shipDate || null}
                onChange={(d) => setFieldValue("shipDate", d && new Date(d?.toISOString()).getTime())}
                onBlur={handleBlur}
                error={Boolean(errors.shipDate)}
                helperText={errors.shipDate}
                size="small"
                placeholder="Shipping Date"
                label="Shipping Date"
            />
        </Box>
    );
};
