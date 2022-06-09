import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import { mutate } from "swr";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { General, Pricing, Shipping } from "./Forms";
import MoreInfo from "./Forms/MoreInfo";

import { createItem, IItem } from "../../api/items";

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
                  </Tabs>
                  {activeTab === 0 && <MoreInfo getFieldProps={getFieldProps} values={values} />}
                  {activeTab === 1 && (
                    <Pricing
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      values={values}
                      isSubmitting={isSubmitting}
                    />
                  )}
                  {activeTab === 2 && (
                    <Shipping
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      values={values}
                      isSubmitting={isSubmitting}
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
