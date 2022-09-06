import React from "react";
import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import { BasePaper } from "app/Paper";
import Toast from "app/Toast";
import { ISO, editSO } from "api/so";
import { getModifiedValues } from "logic/utils";

import { GeneralForm } from "./Forms";
import FormTabs from "./FormTabs";
import { LockProvider } from "common/Lock";

export default function EditForm({ selectedSo }: { selectedSo: ISO }) {
  const handleSubmit = async (data: ISO, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
    try {
      console.log(data);
      console.log(selectedSo, "2");

      if (selectedSo.id) {
        const reqData = getModifiedValues(data, selectedSo);
        console.log(reqData, "3");

        await editSO(selectedSo.id, reqData);

        setSubmitting(false);
        mutate("/so");

        Toast("Record updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const phone = useMediaQuery("(max-width:900px)");
  return (
    <Formik initialValues={selectedSo} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, values, setValues, getFieldProps, setFieldValue }) => (
        <Form>
          <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 10, height: "100%" }}>
            <BasePaper>
              <GeneralForm
                onChangeInit={setValues}
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </BasePaper>
            <BasePaper style={{ flex: 1 }}>
              <LockProvider>
                <FormTabs
                  values={values}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  getFieldProps={getFieldProps}
                />
              </LockProvider>
            </BasePaper>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export const FinalForm = () => {
  return (
    <Box height="85%" display="flex" flexDirection="column">
      <Typography variant="h5">Are you sure?</Typography>
      <Typography variant="subtitle1" style={{ margin: "1em 0" }}>
        If you finalize your Purchase order, You can't update it, So if you want to update it you should make new
        version or add new one
      </Typography>
    </Box>
  );
};
