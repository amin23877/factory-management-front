import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { General, Pricing } from "./Forms";
import MoreInfo from "./Forms/MoreInfo";
import Shipping from "./Forms/Shipping";
import Quantity from "./Forms/Quantity";

import { createItem, duplicateItem, IItem } from "../../api/items";
import TextField from "app/TextField";
import Toast from "app/Toast";
import PhotoTab from "common/PhotoTab";
import DocumentTab from "common/Document/Tab";

export const AddItemModal = ({
  open,
  device,
  initialValues,
  onClose,
}: {
  open: boolean;
  device?: boolean;
  initialValues?: IItem;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState(0);
  const [item, setItem] = useState<IItem>();

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const resp = await createItem(data);
      setItem(resp);
      setSubmitting(false);
      mutate("/item?class=device");
      mutate("/item");
      Toast("Item added successfully", "success");
      setStep((p) => p + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" title="Add new item" fullScreen>
      <Box p={2}>
        <Formik initialValues={initialValues ? initialValues : ({ class: "device" } as IItem)} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            isSubmitting,
            setFieldValue,
            getFieldProps,
            setSubmitting,
          }) => (
            <Form>
              <Box height={600}>
                <Stepper activeStep={step}>
                  <Step>
                    <StepLabel>General information</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Add Photo</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Add Document</StepLabel>
                  </Step>
                </Stepper>
                <Box height="80%">
                  {step === 0 && (
                    <>
                      <Box display="flex">
                        <Box flex={2}>
                          <General
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                            values={values}
                            setFieldValue={setFieldValue}
                            isSubmitting={isSubmitting}
                            device={device}
                            add={!initialValues}
                          />
                        </Box>
                        <Box flex={1} ml={1}>
                          <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="primary">
                            <Tab label="More info" />
                            <Tab label="Pricing" />
                            <Tab label="Shipping" />
                            <Tab label="Quantity" />
                          </Tabs>
                          {activeTab === 0 && (
                            <MoreInfo getFieldProps={getFieldProps} values={values} add={!initialValues} />
                          )}
                          {activeTab === 1 && (
                            <Pricing
                              errors={errors}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              setFieldValue={setFieldValue}
                              touched={touched}
                              values={values}
                              isSubmitting={isSubmitting}
                              add={!initialValues}
                            />
                          )}
                          {activeTab === 2 && (
                            <Shipping
                              getFieldProps={getFieldProps}
                              setFieldValue={setFieldValue}
                              values={values}
                              add={!initialValues}
                            />
                          )}
                          {activeTab === 3 && (
                            <Quantity
                              getFieldProps={getFieldProps}
                              setFieldValue={setFieldValue}
                              values={values}
                              add={!initialValues}
                            />
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                  {step === 1 && item && (
                    <>
                      <PhotoTab model="item" id={item.id} />
                    </>
                  )}
                  {step === 2 && item && (
                    <>
                      <DocumentTab itemId={item.id} model="item" />
                    </>
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width={"50%"}
                  ml={"auto"}
                  mr={"auto"}
                >
                  <Button
                    variant="contained"
                    disabled={isSubmitting || step !== 2}
                    onClick={() => setStep((p) => p - 1)}
                  >
                    Back
                  </Button>
                  {isSubmitting ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {step === 0 && (
                        <Button kind={"add"} variant="contained" type="submit">
                          submit
                        </Button>
                      )}
                      {step === 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setStep((p) => p + 1)}
                          disabled={isSubmitting}
                        >
                          Next
                        </Button>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export const DuplicateModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const itemId = window.location.pathname.split("/")[4];
  const { data: selectedRow } = useSWR<IItem>(itemId ? `/item/${itemId}` : null);

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const resp = await duplicateItem(itemId, data);
      if (resp) {
        setSubmitting(false);
        mutate("/item?class=device");
        mutate("/item");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Duplicate item">
      <Box p={1}>
        <Formik initialValues={selectedRow ? selectedRow : ({ class: "device" } as IItem)} onSubmit={handleSubmit}>
          {({ handleChange, isSubmitting, getFieldProps, values }) => (
            <Form>
              <Box display={"grid"} gridTemplateColumns="1fr">
                <TextField {...getFieldProps("no")} label="Item NO." />
                <FormControlLabel
                  style={{ fontSize: "0.7rem" }}
                  checked={values.bomCheck}
                  label="Duplicate BOM"
                  name="bomCheck"
                  onChange={handleChange}
                  control={<Checkbox size="small" />}
                />
                <FormControlLabel
                  style={{ fontSize: "0.7rem" }}
                  checked={values.vendorCheck}
                  label="Duplicate Preferred Vendor"
                  name="vendorCheck"
                  onChange={handleChange}
                  control={<Checkbox size="small" />}
                />
                <FormControlLabel
                  style={{ fontSize: "0.7rem" }}
                  checked={values.docCheck}
                  label="Duplicate Documents"
                  name="docCheck"
                  onChange={handleChange}
                  control={<Checkbox size="small" />}
                />
                <Box display="flex">
                  <Box flex={2}>
                    <Button disabled={isSubmitting} style={{ marginTop: "1.3em" }} kind="add" type="submit">
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
