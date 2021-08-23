import React, { useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";

import Dialog from "../../../app/Dialog";

import { LineServicesForm, LinesForm } from "../../Purchase/PO/Forms";
import General from "./General";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";

import { IQuote, IQuoteComplete } from "../../../api/quote";

export default function AddQuote({
    open,
    onClose,
    onDone,
    initialData,
}: {
    initialData: IQuoteComplete;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
}) {
    const [step, setStep] = useState(0);
    const [quote, setQuote] = useState<IQuoteComplete>(initialData);
    const [createdQuote, setCreatedQuote] = useState<IQuote>();

    useEffect(() => {
        if (initialData) {
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
                    <Step>
                        <StepLabel>Line Services</StepLabel>
                    </Step>
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
                            data={quote}
                            onDone={(d) => {
                                setQuote((prev) => ({ ...prev, ...d }));
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
                    />
                )}
                {step === 2 && (
                    <LineServicesForm
                        data={quote}
                        onBack={() => setStep(0)}
                        onDone={(items: any) => {
                            setQuote((d: any) => ({ ...d, lines: items }));
                            setStep((prev) => prev + 1);
                        }}
                    />
                )}
                {step === 3 && quote && (
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
                {step === 4 && (
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
