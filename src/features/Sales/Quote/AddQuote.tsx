import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, useMediaQuery } from "@material-ui/core";

import Dialog from "../../../app/Dialog";

import { LinesForm } from "../../Purchase/PO/Forms";
import General from "./General";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createQuoteComplete, IQuote } from "../../../api/quote";
import { ILineItem } from "../../../api/lineItem";
import { IItem } from "../../../api/items";

const schema = Yup.object().shape({
    // requester: Yup.string().required(),
    // ClientId: Yup.string().required(),
    // salesperson: Yup.string().required(),
});

export default function AddQuote({
    open,
    onClose,
    onDone,
    initialData,
    addFromReq,
}: {
    initialData: any;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    addFromReq?: boolean;
}) {
    const ref = useRef<any>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [quote, setQuote] = useState<any>(initialData);
    const [createdQuote, setCreatedQuote] = useState<IQuote>();
    const [loading, setLoading] = useState(false);

    const [createdItems, setCreatedItems] = useState(quote?.lines ? quote.lines : []);

    // const handleAddItem = (d: ILineItem, i: IItem | undefined) => {
    //     if (d) {
    //         let first = createdItems.slice(0, 2);
    //         let second = createdItems.slice(2);
    //         setCreatedItems(first.concat({ ...d, i }, second));
    //     }
    // };
    const handleAddItem = (d: ILineItem, i: IItem | undefined) => {
        if (d) {
            setCreatedItems((prev: any) => prev.concat({ ...d, i }));
        }
    };
    const handleAddService = (d: ILineItem, index: any, i: any) => {
        if (d) {
            let first = createdItems.slice(0, index);
            let second = createdItems.slice(index);
            setCreatedItems(first.concat({ ...d, i, belongsTo: index }, second));
        }
    };
    const handleDeleteItem = async (index: number) => {
        setCreatedItems((prev: any) => prev.filter((item: any, ind: number) => ind !== index));
    };

    const handleNext = async () => {
        if (activeStep === 0) {
            const res = [...createdItems];
            res.forEach((_line, index) => {
                res[index].services = res[index].services?.map((s: any) => ({
                    ServiceId: s.id,
                    price: s.price,
                    quantity: 1,
                }));
            });
            let entry = new Date(ref?.current?.values?.entryDate);
            let exp = new Date(ref?.current?.values?.expireDate);
            setQuote((d: any) => ({
                ...d,
                lines: res,
                ...ref?.current?.values,
                entryDate: entry.getTime(),
                expireDate: exp.getTime(),
            }));
            setActiveStep((prev) => prev + 1);
        } else if (activeStep === 1) {
            try {
                setLoading(true);
                const resp = await createQuoteComplete(quote);
                if (resp) {
                    onDone();
                    setCreatedQuote(resp);
                    setActiveStep((prev) => prev + 1);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (initialData) {
            setQuote(initialData);
        }
    }, [initialData]);
    const phone = useMediaQuery("(max-width:600px)");

    return (
        <Dialog onClose={onClose} closeOnClickOut={false} open={open} title="Add New Quote" fullScreen maxWidth="md">
            <Box
                p={phone ? 0 : 2}
                height={activeStep !== 2 ? (phone ? "" : "600px") : "90vh"}
                display="flex"
                flexDirection="column"
            >
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>{phone ? "" : "General Information"}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>{phone ? "" : "Final"}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>{phone ? "" : "Document"}</StepLabel>
                    </Step>
                </Stepper>
                {activeStep === 0 && (
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexGrow={1}
                        my={2}
                        flexDirection={phone ? "column" : "row"}
                    >
                        <Box flex={1}>
                            <Formik
                                innerRef={ref}
                                initialValues={{ ...initialData } as IQuote}
                                validationSchema={schema}
                                onSubmit={() => {}}
                            >
                                {({ handleChange, handleBlur, values, setFieldValue }) => (
                                    <Form>
                                        <General
                                            add={true}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            setFieldValue={setFieldValue}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                        <Box flex={1} mt={1} height="100%" pb={2}>
                            <LinesForm
                                devices={initialData?.devices}
                                createdItems={createdItems}
                                handleSubmit={handleAddItem}
                                handleDelete={handleDeleteItem}
                                handleAddService={handleAddService}
                            />
                        </Box>
                    </Box>
                )}

                {activeStep === 1 && quote && <FinalForm loading={loading} />}
                {activeStep === 2 && createdQuote && (
                    <DocumentForm
                        data={quote}
                        createdQoute={createdQuote}
                        onDone={() => {
                            onClose();
                            onDone();
                        }}
                    />
                )}
                {activeStep !== 2 && phone && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        margin="30px auto"
                        width="30%"
                        gridGap={10}
                    >
                        <Button
                            variant="contained"
                            disabled={activeStep === 0 || activeStep === 2}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <div></div>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 2}>
                            {activeStep === 1 ? "Finalize" : "Next"}
                        </Button>
                    </Box>
                )}
            </Box>
            {activeStep !== 2 && !phone && (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    margin="30px auto"
                    width="30%"
                    gridGap={10}
                >
                    <Button variant="contained" disabled={activeStep === 0 || activeStep === 2} onClick={handleBack}>
                        Back
                    </Button>
                    <div></div>
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 2}>
                        {activeStep === 1 ? "Finalize" : "Next"}
                    </Button>
                </Box>
            )}
        </Dialog>
    );
}
