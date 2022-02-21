import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";
import Toast from "app/Toast";
import { CommissionForm, GeneralForm, MoreInfoForm } from "./Forms";

import { IClient, addClient } from "api/client";
import { mutate } from "swr";

export default function AddCustomerModal({
  open,
  onClose,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  onDone?: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (data: any) => {
    try {
      await addClient(data);
      Toast("Client created.", "success");
      mutate("/client");
      onDone && onDone();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen title="Add New Customer">
      <Formik initialValues={{} as IClient} onSubmit={handleSubmit}>
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form>
            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>General information</StepLabel>
              </Step>
              <Step>
                <StepLabel>More Information</StepLabel>
              </Step>
              <Step>
                <StepLabel>Commissions</StepLabel>
              </Step>
            </Stepper>
            <Box p={5}>
              {activeStep === 0 && (
                <GeneralForm
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  cId={""}
                  changeTab={() => {}}
                />
              )}
              {activeStep === 1 && (
                <MoreInfoForm
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                />
              )}
              {activeStep === 2 && (
                <CommissionForm
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                />
              )}
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "50%",
                margin: "10px auto",
              }}
            >
              <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" kind="edit">
                Save
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 4}>
                Next
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
