import React, { useRef, useState } from "react";
import { Box, LinearProgress, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { useFormik } from "formik";

import Dialog from "app/Dialog";
import { CreateForm, FinalForm, DocumentForm } from "../Forms";
import Button from "app/Button";

import { IPurchasePOComplete } from "api/purchasePO";
import LineItems from "./LineItems";
import { createPO } from "api/po";
import { exportPdf } from "logic/pdf";
import { createAModelDocument } from "api/document";

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
  const [status, setStatus] = useState<"Creating PO" | "Uploading Document" | "">("");
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const { values, errors, handleChange, handleBlur, setFieldValue, isSubmitting, handleSubmit, setSubmitting } =
    useFormik({
      initialValues: initialData || ({} as any),
      async onSubmit(data) {
        try {
          if (divToPrint.current) {
            setStatus("Creating PO");
            setProgress(0);
            const resp = await createPO(data);
            if (resp) {
              setStatus("Uploading Document");
              setProgress(50);
              const generatedRepPdf = await exportPdf(divToPrint.current);
              await createAModelDocument({
                model: "po",
                id: resp.id,
                file: generatedRepPdf,
                description: `${new Date().toJSON().slice(0, 19)} - ${resp.number}`,
                name: `PO_${resp.number}.pdf`,
              });
              onDone();
              onClose();
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
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
            <Box flex={1}>
              <LineItems lines={values.lines} vendorId={values.VendorId} setFieldValue={setFieldValue} />
            </Box>
          </Box>
        )}
        {step === 1 && <FinalForm />}
        {step === 2 && <DocumentForm divToPrint={divToPrint} data={values} />}
        {step === 2 && isSubmitting && (
          <Box>
            <Typography style={{ textAlign: "center", margin: "0.5em 0" }}>{status}</Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}
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
