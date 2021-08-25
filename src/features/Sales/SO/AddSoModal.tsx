import React, { useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";

import Dialog from "../../../app/Dialog";
import Button from "../../../app/Button";

import { LinesForm } from "../../Purchase/PO/Forms";
import General from "./MainForm";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";

import { ISO, ISOComplete } from "../../../api/so";

export default function AddSOModal({
    open,
    onClose,
    onDone,
    initialData,
}: {
    initialData?: ISOComplete;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
}) {
    const [step, setStep] = useState(0);
    const [so, setSO] = useState(initialData);
    const [createdSO, setCreatedSO] = useState<ISO>();

    useEffect(() => {
        if (initialData) {
            setSO(initialData);
        }
    }, [initialData]);

    return (
        <Dialog
            closeOnClickOut={false}
            onClose={onClose}
            open={open}
            title="Add new Sales order"
            fullWidth
            maxWidth="md"
        >
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
                    <Box my={1}>
                        <General
                            data={so}
                            onDone={(d) => {
                                setSO((prev) => ({ ...prev, ...d }));
                                setStep(1);
                            }}
                        />
                    </Box>
                )}
                {step === 1 && (
                    <LinesForm
                        data={so}
                        onBack={() => setStep(0)}
                        onDone={(items: any) => {
                            setSO((prev: any) => ({ ...prev, lines: items }));
                            setStep(2);
                        }}
                    />
                )}
                {step === 2 && so && (
                    <FinalForm
                        data={so}
                        onBack={() => setStep(1)}
                        onDone={(data) => {
                            setStep(3);
                            onDone();
                            setCreatedSO(data);
                        }}
                    />
                )}
                {step === 3 ? (
                    createdSO && so ? (
                        <DocumentForm
                            onDone={() => {
                                setStep(0);
                                setCreatedSO(undefined);
                                onClose();
                                onDone();
                            }}
                            createdSO={createdSO}
                            data={so}
                        />
                    ) : (
                        <>
                            <h1>Sorry there is a problem, Please go back and try again</h1>
                            <Button variant="contained" color="primary" onClick={() => setStep((prev) => prev - 1)}>
                                Back
                            </Button>
                        </>
                    )
                ) : (
                    <></>
                )}
            </Box>
        </Dialog>
    );
}
