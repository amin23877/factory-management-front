import React from "react";
import { Box, Typography, LinearProgress, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import Toast from "app/Toast";
import { BasePaper } from "app/Paper";
import Button from "app/Button";

import { GeneralForm } from "./Forms";
// import Entities from "./Forms/Entities";
// import Addresses from "./Forms/Addresses";

import { IQuote, updateQuote } from "api/quote";
import { getModifiedValues } from "logic/utils";
import { LockButton, LockProvider } from "common/Lock";
import FormTabs from "./FormTabs";

export default function EditForm({ selectedQuote }: { selectedQuote: IQuote }) {
  const phone = useMediaQuery("(max-width:900px)");

  const handleSubmit = async (data: IQuote, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
    try {
      if (selectedQuote?.id) {
        await updateQuote(selectedQuote.id, getModifiedValues(data, selectedQuote));
        mutate("/quote");

        Toast("Record updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={selectedQuote} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, values, getFieldProps, setFieldValue }) => (
        <Form>
          <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 7, height: "100%" }}>
            <BasePaper>
              <GeneralForm
                edit
                setFieldValue={setFieldValue}
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <Box display="flex" justifyContent="center" mt={1} style={{ width: "100%" }} alignItems="center">
                <Button type="submit" kind="edit" style={{}}>
                  Save
                </Button>
                <LockButton />
              </Box>
            </BasePaper>
            <BasePaper style={{ flex: 1 }}>
              <LockProvider>
                <FormTabs
                  setFieldValue={setFieldValue}
                  values={values}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
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

export const FinalForm = ({ loading }: { loading: boolean }) => {
  return (
    <>
      <Box height="85%" display="flex" flexDirection="column">
        <Typography variant="h5">Are you sure?</Typography>
        <Typography variant="subtitle1" style={{ textAlign: "center", fontSize: "3em" }}>
          If you finalize your Quote , You can't update it, So if you want to update it you should make new version or
          add new one
        </Typography>
        {loading && <LinearProgress />}
        <div style={{ flexGrow: 1 }} />
      </Box>
    </>
  );
};
