import React, { useRef, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";

import { FinalForm } from "../EditForm";
import { DocumentForm } from "../Forms";

import { createQuoteComplete, IQuote } from "api/quote";
import GeneralStep from "./General";
import { exportPdf } from "logic/pdf";
import { createAModelDocument } from "api/document";

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
  onDone: (quote: any) => void;
  addFromReq?: boolean;
}) {
  const divToPrint = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");

  // const handleNext = async () => {
  //   if (activeStep === 0) {
  //     if (ref?.current?.values?.entryDate || ref?.current?.values?.expireDate) {
  //       setQuote((d: any) => ({
  //         ...d,
  //         lines: groups,
  //         ...ref?.current?.values,
  //         entryDate: Number(new Date(ref?.current?.values?.entryDate)),
  //         expireDate: Number(new Date(ref?.current?.values?.expireDate)),
  //       }));
  //     } else {
  //       setQuote((d: any) => ({
  //         ...d,
  //         lines: groups,
  //         ...ref?.current?.values,
  //       }));
  //     }

  //     setActiveStep((prev) => prev + 1);
  //   } else if (activeStep === 1) {
  //     try {
  //       setLoading(true);
  //       const resp = await createQuoteComplete(quote);
  //       if (resp) {
  //         onDone();
  //         setCreatedQuote({ ...resp, lines: groups });
  //         setActiveStep((prev) => prev + 1);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      // console.log({ data });

      // TODO: test when quote is created but document is not saved
      setSubmitting(true);
      const quoteResp = await createQuoteComplete({
        ...data,
        entryDate: Number(new Date(data.entryDate)),
        expireDate: Number(new Date(data.expireDate)),
      });
      if (quoteResp && quoteResp.id) {
        if (divToPrint.current && quoteResp.id) {
          const generatedPdf = await exportPdf(divToPrint.current);
          await createAModelDocument({
            model: "quote",
            id: quoteResp.id,
            file: generatedPdf,
            description: `${new Date().toJSON().slice(0, 19)} - ${quoteResp.number}`,
            name: `Quote_${quoteResp.number}.pdf`,
          });

          onDone(quoteResp);
          onClose();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

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
        <Formik initialValues={{ ...initialData, lines: [] } as IQuote} onSubmit={handleSubmit}>
          {({ getFieldProps, values, setFieldValue, isSubmitting, handleSubmit }) => (
            <Box display="flex" height="85%">
              <Form style={{ width: "100%" }}>
                {activeStep === 0 && (
                  <GeneralStep values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} />
                )}
                {activeStep === 1 && <FinalForm loading={isSubmitting} />}
                {activeStep === 2 && <DocumentForm data={values} divToPrint={divToPrint} />}
                <Box display="flex" alignItems="center">
                  <Button variant="contained" disabled={isSubmitting || activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <div style={phone ? {} : { flex: 1 }}></div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === 2 ? () => handleSubmit() : () => handleNext()}
                    disabled={isSubmitting}
                  >
                    {activeStep === 2 ? "Finalize" : "Next"}
                  </Button>
                </Box>
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
