import React from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";

import { GeneralForm } from "./Forms";
import Button from "app/Button";
import { BasePaper } from "app/Paper";
import Toast from "app/Toast";

import { getModifiedValues } from "logic/utils";
import { updateCustomerPo, customerPoType } from "api/customerPo";

import { useLock, LockButton, LockProvider } from "common/Lock";

export default function EditForm({ poData, onDone }: { poData: customerPoType; onDone: () => void }) {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      if (poData.id) {
        await updateCustomerPo({ id: poData.id, ...getModifiedValues(data, poData) });
        onDone();

        Toast("Record updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <LockProvider>
        <Formik initialValues={poData} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, setValues, setFieldValue, isSubmitting }) => (
            <Form style={{ height: "100%" }}>
              <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 10, height: "100%" }}>
                <BasePaper>
                  <GeneralForm
                    onChangeInit={setValues}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                  <Box display="flex" justifyContent="center" style={{ width: "100%" }} my={1}>
                    <LockButton />
                  </Box>
                </BasePaper>
              </Box>
            </Form>
          )}
        </Formik>
      </LockProvider>
    </Box>
  );
}
