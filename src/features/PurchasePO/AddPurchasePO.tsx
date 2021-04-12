import React, { useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, Dialog, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

import { CreateForm, FinalForm, LinesForm } from "./Forms";
import { IPurchasePO } from "../../api/purchasePO";

export default function AddPOModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const [step, setStep] = useState(0);
    const [createdPO, setCreatedPO] = useState<IPurchasePO | null>(null);

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
                                    onDone={(d) => {
                                        setCreatedPO(d);
                                        setStep(1);
                                    }}
                                />
                            </Box>
                        </Box>
                        <div style={{ flexGrow: 1 }} />
                    </Box>
                )}
                {step === 1 && createdPO && createdPO.id && <LinesForm recordId={createdPO?.id} onDone={() => setStep(2)} />}
                {step === 2 && (
                    <FinalForm
                        onBack={() => setStep(1)}
                        onDone={() => {
                            onClose();
                            onDone();
                        }}
                    />
                )}
                {/* <Button
                    onClick={() => {
                        setStep((p) => (p + 1) % 3);
                        setCreatedPO({ id: 1 } as IPurchasePO);
                    }}
                >
                    next
                </Button> */}
            </Box>
        </Dialog>
    );
}
