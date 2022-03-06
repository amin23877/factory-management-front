import React, { useEffect, useRef, useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { useFormik } from "formik";
import useSWR from "swr";

import Dialog from "app/Dialog";
import Button from "app/Button";

import General from "../MainForm";
import { FinalForm } from "../EditForm";
import { DocumentForm } from "./DocumentStep";

import { ISO, ISOComplete } from "api/so";
import GroupLineItemTable from "components/GroupLineItemTable";

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
  // const [so, setSO] = useState(initialData);
  const accRef = useRef<HTMLElement | null>(null);
  const repRef = useRef<HTMLElement | null>(null);
  const cusRef = useRef<HTMLElement | null>(null);

  const {
    values,
    handleChange,
    handleBlur,
    setValues,
    setFieldValue,
    handleSubmit,
    resetForm,
    isSubmitting,
    getFieldProps,
  } = useFormik({
    initialValues: {} as any,
    onSubmit(data) {
      console.log({ data });

      // setSO((prev) => ({ ...prev, ...data }));
    },
  });
  const { data: quoteLineItems } = useSWR<{ result: any[]; total: number }>(
    values.QuoteId ? `/lineitem?QuoteId=${values.QuoteId}` : null
  );

  useEffect(() => {
    if (quoteLineItems && quoteLineItems.result) {
      try {
        const newGroups = [];
        for (const line of quoteLineItems.result) {
          if (newGroups[line.group - 1]) {
            if (line.ItemId) {
              newGroups[line.group - 1].push({
                ...line,
                ItemObject: line.ItemId,
                ItemId: line.ItemId.id,
                type: "device",
              });
            } else {
              newGroups[line.group - 1].push(line);
            }
          } else {
            if (line.ItemId) {
              newGroups.push([{ ...line, ItemObject: line.ItemId, ItemId: line.ItemId.id, type: "device" }]);
            } else {
              newGroups.push([line]);
            }
          }
        }

        setFieldValue("lines", newGroups);
      } catch (error) {
        console.log({ error });
      }
    }
  }, [quoteLineItems, setFieldValue]);

  // useEffect(() => {
  //   if (initialData) {
  //     setSO(initialData);
  //   }
  // }, [initialData]);

  return (
    <Dialog
      closeOnClickOut={false}
      onClose={() => {
        resetForm();
        onClose();
      }}
      open={open}
      title="Add new Sales order"
      fullScreen
    >
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
        <Box height="95%">
          {step === 0 && (
            <Box display="grid" gridTemplateColumns="2fr 3fr" gridGap={10} my={1}>
              <General
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                setValues={setValues}
                getFieldProps={getFieldProps}
              />
              <Box>
                <GroupLineItemTable groups={values.lines || []} setGroups={(g) => setFieldValue("lines", g)} />
              </Box>
            </Box>
          )}
          {step === 1 && values && <FinalForm onBack={() => setStep(1)} onDone={(data) => setStep(2)} />}
          {step === 2 && values && (
            <DocumentForm data={values} accRef={accRef} repRef={repRef} cusRef={cusRef} isUploading={isSubmitting} />
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button variant="contained" disabled={isSubmitting || step === 0} onClick={() => setStep((p) => p - 1)}>
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
