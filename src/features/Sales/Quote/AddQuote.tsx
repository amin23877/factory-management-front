import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, useMediaQuery } from "@material-ui/core";

import Dialog from "app/Dialog";

// import { LinesForm } from "../../Purchase/PO/Forms";
import General from "./General";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createQuoteComplete, IQuote } from "api/quote";
import GroupLineItemTable from "components/GroupLineItemTable";

const schema = Yup.object().shape({
  // requester: Yup.string().required(),
  // ClientId: Yup.string().required(),
  // salesperson: Yup.string().required(),
});

export default function AddQuote({
  open,
  onClose,
  onDone,
  initialData,
  addFromReq,
}: {
  initialData: any;
  open: boolean;
  onClose: () => void;
  onDone: () => void;
  addFromReq?: boolean;
}) {
  const ref = useRef<any>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [quote, setQuote] = useState<any>(initialData);
  const [createdQuote, setCreatedQuote] = useState<IQuote>();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);

  const handleNext = async () => {
    if (activeStep === 0) {
      setQuote((d: any) => ({
        ...d,
        lines: groups,
        ...ref?.current?.values,
      }));

      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      try {
        setLoading(true);
        const resp = await createQuoteComplete(quote);
        if (resp) {
          onDone();
          setCreatedQuote({ ...resp, lines: groups });
          setActiveStep((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (initialData) {
      setQuote(initialData);
    }
  }, [initialData]);
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Dialog onClose={onClose} closeOnClickOut={false} open={open} title="Add New Quote" fullScreen maxWidth="md">
      <Box px={phone ? 0 : 2} height={activeStep !== 2 ? "100%" : "90vh"} display="flex" flexDirection="column">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>{phone ? "" : "General Information"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{phone ? "" : "Final"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{phone ? "" : "Document"}</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && (
          <Box
            display="grid"
            gridGap={10}
            gridTemplateColumns={phone ? "1fr" : "1fr 1fr"}
            height={phone ? "auto" : "100%"}
          >
            <Formik
              innerRef={ref}
              initialValues={{ ...initialData } as IQuote}
              validationSchema={schema}
              onSubmit={() => {}}
            >
              {({ handleChange, handleBlur, values, setFieldValue }) => (
                <Form>
                  <General
                    add={true}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </Form>
              )}
            </Formik>
            <div>
              <GroupLineItemTable groups={groups} setGroups={(g) => setGroups(g)} />
            </div>
          </Box>
        )}
        {activeStep === 1 && quote && <FinalForm loading={loading} />}
        {activeStep === 2 && createdQuote && (
          <DocumentForm
            data={quote}
            createdQoute={createdQuote}
            onDone={() => {
              onClose();
              onDone();
            }}
          />
        )}
        {activeStep !== 2 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            marginTop="10px"
            paddingBottom="30px"
            width="100%"
            gridGap={10}
          >
            <div style={{ flex: 1 }}></div>
            <Button variant="contained" disabled={activeStep === 0 || activeStep === 2} onClick={handleBack}>
              Back
            </Button>
            <div style={phone ? {} : { flex: 1 }}></div>
            <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 2}>
              {activeStep === 1 ? "Finalize" : "Next"}
            </Button>
            <div style={{ flex: 1 }}></div>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
