import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { General, Pricing } from "./Forms";
import MoreInfo from "./Forms/MoreInfo";
import Shipping from "./Forms/Shipping";
import Quantity from "./Forms/Quantity";

import { createItem, IItem } from "../../api/items";
import TextField from "app/TextField";

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

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      await createItem(data);
      setSubmitting(false);
      mutate("/item?class=device");
      mutate("/item");

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" title="Add new item" fullScreen>
      <Box p={1}>
        <Formik initialValues={initialValues ? initialValues : ({ class: "device" } as IItem)} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur, touched, isSubmitting, setFieldValue, getFieldProps }) => (
            <Form>
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
                  <Button disabled={isSubmitting} style={{ marginTop: "1.3em" }} kind="add" type="submit">
                    Save
                  </Button>
                </Box>
                <Box flex={1} ml={1}>
                  <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="primary">
                    <Tab label="More info" />
                    <Tab label="Pricing" />
                    <Tab label="Shipping" />
                    <Tab label="Quantity" />
                  </Tabs>
                  {activeTab === 0 && <MoreInfo getFieldProps={getFieldProps} values={values} add={!initialValues} />}
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
      const resp = await createItem(data);
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
          {({ values, errors, handleChange, handleBlur, touched, isSubmitting, setFieldValue, getFieldProps }) => (
            <Form>
              <TextField {...getFieldProps("no")} label="Item NO." />
              <Box display="flex">
                <Box flex={2}>
                  <Button disabled={isSubmitting} style={{ marginTop: "1.3em" }} kind="add" type="submit">
                    Save
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
