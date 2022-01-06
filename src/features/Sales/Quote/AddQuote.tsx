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

    const handleAddItem = (d: ILineItem, i: IItem | undefined) => {
        if (d) {
            setCreatedItems((prev: any) => prev.concat({ ...d, i }));
        }
    };
    const handleEdit = (d: ILineItem, index: number, i: any, belongsTo?: number, itemId?: string) => {
        if (d) {
            const newArray = createdItems.slice();
            if (belongsTo) {
                newArray[index] = { ...d, i, belongsTo: belongsTo, belongsToItemId: itemId };
            } else {
                newArray[index] = { ...d, i };
            }
            setCreatedItems(newArray);
        }
    };
    const handleAddService = (d: ILineItem, index: any, i: any, itemId?: string) => {
        if (d) {
            let first = createdItems.slice(0, index);
            let second = createdItems.slice(index);
            setCreatedItems(first.concat({ ...d, i, belongsTo: index, belongsToItemId: itemId }, second));
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
    const phone = useMediaQuery("(max-width:900px)");

    return (
        <Dialog onClose={onClose} closeOnClickOut={false} open={open} title="Add New Quote" fullScreen maxWidth="md">
            <Box px={phone ? 0 : 2} height={activeStep !== 2 ? "100%" : "90vh"} display="flex" flexDirection="column">
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
                        display="grid"
                        gridGap={10}
                        gridTemplateColumns={phone ? "1fr" : "1fr 1fr"}
                        height={phone ? "auto" : "100%"}
                    >
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
                        <LinesForm
                            handleEdit={handleEdit}
                            devices={initialData?.devices}
                            createdItems={createdItems}
                            handleSubmit={handleAddItem}
                            handleDelete={handleDeleteItem}
                            handleAddService={handleAddService}
                        />
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
                {activeStep !== 2 && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-around"
                        marginTop="10px"
                        paddingBottom="30px"
                        width="100%"
                        gridGap={10}
                    >
                        <div style={{ flex: 1 }}></div>
                        <Button
                            variant="contained"
                            disabled={activeStep === 0 || activeStep === 2}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <div style={phone ? {} : { flex: 1 }}></div>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 2}>
                            {activeStep === 1 ? "Finalize" : "Next"}
                        </Button>
                        <div style={{ flex: 1 }}></div>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
}
