import React, { useEffect, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper } from "@material-ui/core";

import Dialog from "../../../app/Dialog";

import { LinesForm } from "../../Purchase/PO/Forms";
import General from "./General";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";

import { IQuote } from "../../../api/quote";

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
    const [activeStep, setActiveStep] = useState(0);
    const [quote, setQuote] = useState<any>(initialData);
    const [createdQuote, setCreatedQuote] = useState<IQuote>();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (initialData) {
            setQuote(initialData);
        }
    }, [initialData]);

    return (
        <Dialog onClose={onClose} closeOnClickOut={false} open={open} title="Add New Quote" fullScreen maxWidth="md">
            <Box p={2} height={600} display="flex" flexDirection="column">
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>General Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Final</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Document</StepLabel>
                    </Step>
                </Stepper>
                {activeStep === 0 && (
                    <Box display="flex" justifyContent="center" flexGrow={1} my={2}>
                        <Box flex={1}>
                            <General
                                add={true}
                                data={initialData}
                                // data={quote}
                                onDone={(d) => {
                                    setQuote((prev: any) => ({ ...prev, ...d }));
                                    setActiveStep((prev) => prev + 1);
                                }}
                            />
                        </Box>
                        <Box flex={1} mt={1}>
                            <LinesForm
                                data={quote}
                                onBack={() => setActiveStep(0)}
                                onDone={(items: any) => {
                                    setQuote((d: any) => ({ ...d, lines: items }));
                                    setActiveStep((prev) => prev + 1);
                                }}
                                devices={initialData?.devices}
                            />
                        </Box>
                    </Box>
                )}

                {activeStep === 1 && quote && (
                    <FinalForm
                        data={quote}
                        onBack={() => setActiveStep(1)}
                        onDone={(data) => {
                            onDone();
                            setCreatedQuote(data);
                            setActiveStep((prev) => prev + 1);
                        }}
                    />
                )}
                {activeStep === 2 && (
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
            <Box display="flex" alignItems="center" justifyContent="space-between" margin="30px auto" width="30%">
                <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                <div></div>
                <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 2}>
                    {activeStep === 1 ? "Finalize" : "Next"}
                </Button>
            </Box>
        </Dialog>
    );
}
