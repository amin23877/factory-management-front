import React, { useRef, useState } from "react";
import { Box, LinearProgress, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import { CreateForm, FinalForm, DocumentForm } from "../Forms";
import Button from "app/Button";

import { IPurchasePOComplete } from "api/purchasePO";
import LineItems from "./LineItems";
import { createPO } from "api/po";
import { exportPdf } from "logic/pdf";
import { createAModelDocument } from "api/document";
import Stepper from "app/Stepper";

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
  const [createdPo, setCreatedPo] = useState<IPurchasePOComplete>();

  const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: any }) => {
    try {
      setStatus("Creating PO");
      setProgress(0);
      const resp = await createPO(data);
      setCreatedPo(resp);
      setStep(2);
      if (resp && divToPrint.current) {
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} title="Add new purchase order" fullScreen onClose={onClose}>
      <Formik initialValues={{} as any} onSubmit={handleSubmit}>
        {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, setSubmitting }) => (
          <Form>
            <Box p={2} height={600}>
              <Box mb={2}>
                <Stepper step={step} setStep={setStep} steps={["General Information", "Final", "Document"]} />
              </Box>
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
              {step === 2 && createdPo && (
                <DocumentForm divToPrint={divToPrint} data={createdPo} lines={values.lines} />
              )}
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
                <Button variant="contained" disabled={step === 0 || step === 2} onClick={() => setStep((p) => p - 1)}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={
                    step === 1
                      ? () => handleSubmit(values, { setSubmitting })
                      : step === 2
                      ? () => onClose()
                      : () => setStep((p) => p + 1)
                  }
                >
                  {step === 1 ? "Finalize" : step === 2 ? "Close" : "Next"}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
