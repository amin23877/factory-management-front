import React, { useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { useFormik } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";

// import { LinesForm } from "../../Purchase/PO/Forms";
import General from "./MainForm";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";

import { ISO, ISOComplete } from "api/so";
import GroupLineItemTable from "components/GroupLineItemTable";
import useSWR from "swr";

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
  const [groups, setGroups] = useState<any[]>([]);
  const [createdSO, setCreatedSO] = useState<ISO>();

  const { values, handleChange, handleBlur, setValues, setFieldValue, handleSubmit } = useFormik({
    initialValues: {} as any,
    onSubmit(data) {
      setSO((prev) => ({ ...prev, ...data }));
      setStep(1);
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

        setGroups(newGroups);
      } catch (error) {
        console.log({ error });
      }
    }
  }, [quoteLineItems]);

  useEffect(() => {
    if (initialData) {
      setSO(initialData);
    }
  }, [initialData]);

  return (
    <Dialog closeOnClickOut={false} onClose={onClose} open={open} title="Add new Sales order" fullWidth maxWidth="lg">
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
          <Box display="grid" gridTemplateColumns="2fr 3fr" gridGap={10} my={1}>
            <General
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              setValues={setValues}
            />
            <Box>
              <GroupLineItemTable groups={values.lines || groups || []} setGroups={(g) => setFieldValue("lines", g)} />
              <Box textAlign="right">
                <Button onClick={() => handleSubmit()} variant="contained" color="primary">
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {step === 1 && so && (
          <FinalForm
            data={so}
            onBack={() => setStep(1)}
            onDone={(data) => {
              setStep(2);
              onDone();
              setCreatedSO(data);
            }}
          />
        )}
        {step === 2 ? (
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
