import React, { useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper, Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

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
        <Dialog open={open} title="Add New Quote" fullScreen maxWidth="md">
            <Box display="flex" justifyContent="space-between" alignItems="center" mx={1}>
                <div style={{ flexGrow: 1 }} />
                <IconButton onClick={onClose}>
                    <CloseRounded />
                </IconButton>
            </Box>
            <Box p={2} height={600}>
                <Stepper activeStep={step}>
                    <Step>
                        <StepLabel>General information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel> Line items</StepLabel>
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
                                setStep(1);
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
                            setStep(2);
                        }}
                    />
                )}
                {step === 2 && quote && (
                    <FinalForm
                        data={quote}
                        onBack={() => setStep(1)}
                        onDone={(data) => {
                            // onClose();
                            onDone();
                            setCreatedQuote(data);
                            setStep(3);
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
