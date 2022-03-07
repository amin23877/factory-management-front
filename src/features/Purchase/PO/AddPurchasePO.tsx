import React, { useRef, useState } from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { useFormik } from "formik";

import Dialog from "app/Dialog";
import { CreateForm, FinalForm, DocumentForm } from "./Forms";
import Button from "app/Button";

import { IPurchasePOComplete } from "api/purchasePO";

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
  const divToPrint = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState(0);

  const { values, errors, handleChange, handleBlur, setFieldValue, isSubmitting, handleSubmit } = useFormik({
    initialValues: {} as any,
    onSubmit(data) {
      console.log({ data });
    },
  });

  return (
    <Dialog open={open} title="Add new purchase order" fullScreen onClose={onClose}>
      <Box p={2} height={600}>
        <Stepper activeStep={step}>
          <Step>
            <StepLabel>General information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Final</StepLabel>
          </Step>
          <Step>
            <StepLabel>Document</StepLabel>
          </Step>
        </Stepper>
        {step === 0 && (
          <Box display="flex" justifyContent="center" px={5}>
            <Box flex={1}>
              <Typography variant="h6">General information</Typography>
              <Typography variant="caption">
                Please consider this after you finalize your po (last step) you can't edit it
              </Typography>
              <Box my={2} flex={1}>
                <CreateForm
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              </Box>
            </Box>
          </Box>
        )}
        {step === 2 && <FinalForm />}
        {step === 3 && <DocumentForm divToPrint={divToPrint} data={values} />}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop="10px"
          paddingBottom="30px"
          width="100%"
          gridGap={10}
        >
          <Button variant="contained" disabled={step === 0} onClick={() => setStep((p) => p - 1)}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={step === 2 ? () => handleSubmit() : () => setStep((p) => p + 1)}
            disabled={isSubmitting}
          >
            {step === 2 ? "Finalize" : "Next"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
