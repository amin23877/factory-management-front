import React, { useEffect, useRef, useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { useFormik } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";

import General from "../MainForm";
import { FinalForm } from "../EditForm";
import { DocumentForm } from "./DocumentStep";

import { ISOComplete, createSOComplete } from "api/so";
import { createAModelDocument } from "api/document";
import { exportPdf } from "logic/pdf";

import GroupLineItemTable from "components/GroupLineItemTable";
import { get } from "api";

export default function AddSOModal({
  open,
  onClose,
  onDone,
  initialData,
}: {
  initialData?: ISOComplete;
  open: boolean;
  onClose: () => void;
  onDone: (createdSO: any) => void;
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<
    | "Creating SO"
    | "Uploading Accounting Document"
    | "Uploading Representative Document"
    | "Uploading Customer Document"
    | ""
  >("");
  const [progress, setProgress] = useState(0);
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
    initialValues: initialData || ({} as any),
    async onSubmit(data, { setSubmitting }) {
      try {
        setProgress(0);
        setStatus("Creating SO");
        const createdSO: any = await createSOComplete(data);
        setProgress(25);
        if (accRef.current && createdSO?.id) {
          setStatus("Uploading Accounting Document");
          const generatedAccPdf = await exportPdf(accRef.current);
          await createAModelDocument({
            model: "so",
            id: createdSO.id,
            file: generatedAccPdf,
            description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
            name: `SO_ACC_${createdSO.number}.pdf`,
          });
          setProgress(50);
        }
        if (repRef.current) {
          setStatus("Uploading Representative Document");
          const generatedRepPdf = await exportPdf(repRef.current);
          await createAModelDocument({
            model: "so",
            id: createdSO.id,
            file: generatedRepPdf,
            description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
            name: `SO_REP_${createdSO.number}.pdf`,
          });
          setProgress(75);
        }
        if (cusRef.current) {
          setStatus("Uploading Customer Document");
          const generatedCusPdf = await exportPdf(cusRef.current);
          await createAModelDocument({
            model: "so",
            id: createdSO.id,
            file: generatedCusPdf,
            description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
            name: `SO_CUS_${createdSO.number}.pdf`,
          });
          setProgress(100);
        }
        onDone(createdSO);
        onClose();
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const generateQuoteGroups = async () => {
      try {
        if (!values.QuoteId) {
          return;
        }
        const resp = await get(`/lineitem?QuoteId=${values.QuoteId}`);
        if (resp && resp?.result) {
          const newGroups = [];
          for (const line of resp.result) {
            if (newGroups[line.group - 1]) {
              if (line.ItemId) {
                console.log({ line });

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
        }
      } catch (error) {
        console.log(error);
      }
    };

    generateQuoteGroups();
  }, [setFieldValue, values.QuoteId]);

  useEffect(() => {
    function handleBeforeUnLoad(e: any) {
      e.preventDefault();
      e.returnValue = "";
    }
    if (isSubmitting) {
      window.addEventListener("beforeunload", handleBeforeUnLoad);
    } else if (!isSubmitting || !open) {
      window.removeEventListener("beforeunload", handleBeforeUnLoad);
    }

    return () => window.removeEventListener("beforeunload", handleBeforeUnLoad);
  }, [isSubmitting, open]);

  return (
    <Dialog
      closeOnClickOut={false}
      onClose={() => {
        if (!isSubmitting) {
          resetForm({ values: {} as any });
          onClose();
        }
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
                add
              />
              <Box>
                <GroupLineItemTable groups={values.lines || []} setGroups={(g) => setFieldValue("lines", g)} />
              </Box>
            </Box>
          )}
          {step === 1 && values && <FinalForm />}
          {step === 2 && values && (
            <DocumentForm
              status={status}
              progress={progress}
              data={values}
              accRef={accRef}
              repRef={repRef}
              cusRef={cusRef}
            />
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
