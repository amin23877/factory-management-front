import React, { useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper, Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

import { LinesForm } from "../PurchasePO/Forms";
import General from "./MainForm";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";

import { ISO, ISOComplete } from "../../api/so";

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
        <Dialog open={open} title="Add new Sales order" fullWidth maxWidth="md">
            <Box display="flex" justifyContent="space-between" alignItems="center" mx={1}>
                <DialogTitle>Add new Sales order</DialogTitle>
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
                            // onClose();
                            setStep(3);
                            onDone();
                            setCreatedSO(data);
                        }}
                    />
                )}
                {step === 3 && (
                    <DocumentForm
                        onDone={() => {
                            onClose();
                            onDone();
                        }}
                        createdSO={createdSO}
                        data={so}
                    />
                )}
            </Box>
        </Dialog>
    );
}
