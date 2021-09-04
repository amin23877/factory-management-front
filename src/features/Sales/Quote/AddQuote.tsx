import React, { useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";

import Dialog from "../../../app/Dialog";

import { LinesForm } from "../../Purchase/PO/Forms";
import General from "./General";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";

import { IQuote, IQuoteComplete } from "../../../api/quote";

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
    const [step, setStep] = useState(0);
    const [quote, setQuote] = useState<any>(initialData);
    const [createdQuote, setCreatedQuote] = useState<IQuote>();

    useEffect(() => {
        if (initialData) {
            console.log(initialData);
            setQuote(initialData);
        }
    }, [initialData]);

    return (
        <Dialog onClose={onClose} closeOnClickOut={false} open={open} title="Add New Quote" fullScreen maxWidth="md">
            <Box p={2} height={600} display="flex" flexDirection="column">
                <Stepper activeStep={step}>
                    <Step>
                        <StepLabel>General Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Line Items</StepLabel>
                    </Step>
                    {/* <Step>
                        <StepLabel>Line Services</StepLabel>
                    </Step> */}
                    <Step>
                        <StepLabel>Final</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Document</StepLabel>
                    </Step>
                </Stepper>
                {step === 0 && (
                    <Box display="flex" justifyContent="center" flexGrow={1} my={2}>
                        <General
                            add={true}
                            data={initialData}
                            // data={quote}
                            onDone={(d) => {
                                setQuote((prev: any) => ({ ...prev, ...d }));
                                setStep((prev) => prev + 1);
                            }}
                        />
                    </Box>
                )}
                {step === 1 && (
                    <LinesForm
                        data={quote}
                        onBack={() => setStep(0)}
                        onDone={(items: any) => {
                            setQuote((d: any) => ({ ...d, lines: items }));
                            setStep((prev) => prev + 1);
                        }}
                        devices={initialData?.devices}
                    />
                )}
                {step === 2 && quote && (
                    <FinalForm
                        data={quote}
                        onBack={() => setStep(1)}
                        onDone={(data) => {
                            onDone();
                            setCreatedQuote(data);
                            setStep((prev) => prev + 1);
                        }}
                    />
                )}
                {step === 3 && (
                    <DocumentForm
                        data={quote}
                        createdQoute={createdQuote}
                        onDone={() => {
                            onClose();
                            onDone();
                        }}
                    />
                )}
            </Box>
        </Dialog>
    );
}
