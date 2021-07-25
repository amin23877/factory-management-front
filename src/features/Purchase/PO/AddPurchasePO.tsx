import React, { useEffect, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, Dialog, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";


import { CreateForm, FinalForm, LinesForm, DocumentForm } from "./Forms";
import { IPurchasePO, IPurchasePOComplete } from "../../../api/purchasePO";

export default function AddPOModal({
    open,
    onClose,
    onDone,
    initialData,
}: {
    initialData?: IPurchasePOComplete;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
}) {
    const [step, setStep] = useState(0);
    const [po, setPO] = useState(initialData);
    const [createdPO, setCreatedPO] = useState<IPurchasePO>();

    useEffect(() => {
        if (initialData) {
            setPO(initialData);
        }
    }, [initialData]);

    return (
        <Dialog open={open} title="Add new purchase order" fullWidth maxWidth="md">
            <Box display="flex" justifyContent="space-between" alignItems="center" mx={1}>
                <DialogTitle>Add new purchase order</DialogTitle>
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
                        <StepLabel>PO Line items</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Final</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Document</StepLabel>
                    </Step>
                </Stepper>
                {step === 0 && (
                    <Box display="flex" justifyContent="center">
                        <div style={{ flexGrow: 1 }} />
                        <Box flex={1}>
                            <Typography variant="h6">General information</Typography>
                            <Typography variant="caption">
                                Please consider this after you finilize your po (last step) you can't edit it
                            </Typography>
                            <Box my={2}>
                                <CreateForm
                                    data={po}
                                    onDone={(d) => {
                                        setPO((prev) => ({ ...prev, ...d }));
                                        setStep(1);
                                    }}
                                />
                            </Box>
                        </Box>
                        <div style={{ flexGrow: 1 }} />
                    </Box>
                )}
                {step === 1 && (
                    <LinesForm
                        data={po}
                        onBack={() => setStep(0)}
                        onDone={(items: any) => {
                            setPO((d: any) => ({ ...d, lines: items }));
                            setStep(2);
                        }}
                    />
                )}
                {step === 2 && po && (
                    <FinalForm
                        data={po}
                        onBack={() => setStep(1)}
                        onDone={(data) => {
                            // onClose();
                            setStep(3);
                            onDone();
                            setCreatedPO(data);
                        }}
                    />
                )}
                {step === 3 && po && createdPO && (
                    <DocumentForm
                        onDone={() => {
                            onClose();
                            onDone();
                        }}
                        createdPO={createdPO}
                        data={po}
                    />
                )}
            </Box>
        </Dialog>
    );
}
