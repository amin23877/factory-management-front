import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";
import { BasePaper } from "app/Paper";

import General from "./Forms/General";
import Entities from "./Forms/Entities";
import { FinalForm } from "./EditForm";
import { DocumentForm } from "./Forms";

import { createQuoteComplete, IQuote } from "api/quote";
import GroupLineItemTable from "components/GroupLineItemTable";

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
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = async () => {
    if (activeStep === 0) {
      if (ref?.current?.values?.entryDate || ref?.current?.values?.expireDate) {
        setQuote((d: any) => ({
          ...d,
          lines: groups,
          ...ref?.current?.values,
          entryDate: Number(new Date(ref?.current?.values?.entryDate)),
          expireDate: Number(new Date(ref?.current?.values?.expireDate)),
        }));
      } else {
        setQuote((d: any) => ({
          ...d,
          lines: groups,
          ...ref?.current?.values,
        }));
      }

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
            <Formik innerRef={ref} initialValues={{ ...initialData } as IQuote} onSubmit={() => {}}>
              {({ getFieldProps }) => (
                <Form>
                  <Box display="flex" flexDirection="column" height="100%" gridGap={10}>
                    <BasePaper>
                      <General getFieldProps={getFieldProps} />
                    </BasePaper>
                    <BasePaper style={{ height: "100%" }}>
                      <Tabs
                        value={activeTab}
                        onChange={(e, nv) => setActiveTab(nv)}
                        variant="scrollable"
                        style={{ maxWidth: 500 }}
                        textColor="primary"
                      >
                        <Tab label="Entities" />
                        <Tab label="Commission" />
                      </Tabs>
                      {activeTab === 0 && <Entities getFieldProps={getFieldProps} />}
                      {/* {activeTab === 1 && (
                        <CommissionTab values={values} handleBlur={handleBlur} handleChange={handleChange} add={add} />
                      )} */}
                    </BasePaper>
                  </Box>
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
