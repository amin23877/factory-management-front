import React from "react";
import { Box, useMediaQuery, LinearProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import { GeneralForm } from "features/Sales/Customer/Forms";
import Button from "app/Button";
import { BasePaper } from "app/Paper";

import { editClient, IClient } from "api/client";

import { useLock, LockButton, LockProvider } from "common/Lock";

import Toast from "app/Toast";
import { getModifiedValues } from "logic/utils";

import { useParams } from "react-router-dom";
import FormTabs from "features/Sales/Customer/FormTabs";
import DataGridTabs from "features/Sales/Customer/DataGridTabs";

export default function ClientDetails({ req, changeTab }: { req?: any; changeTab: (a: number) => void }) {
  const { clientId } = useParams<{ clientId: string }>();
  const { data: selectedRow } = useSWR<IClient>(clientId ? `/client/${clientId}` : null);

  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await editClient(clientId, getModifiedValues(values, selectedRow));
      mutate("/client");
      mutate("/client?approved=false");
      setSubmitting(false);

      Toast("Record updated", "success");
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedRow) {
    return <LinearProgress />;
  }
  return (
    <Box>
      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            {/* <Box display="flex" style={{ gap: 10 }} flexDirection={phone ? "column" : "row"}> */}
            <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
              <Box>
                <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 10, height: "100%" }}>
                  <BasePaper>
                    <GeneralForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      req={req}
                      cId={selectedRow.id}
                      changeTab={changeTab}
                    />
                    <Box display="flex" alignItems="center" style={{ width: "100%" }} justifyContent="center">
                      <Button type="submit" kind="edit" style={{ width: "100%", display: "none" }} disabled={lock}>
                        Save
                      </Button>
                      <LockButton />
                    </Box>
                  </BasePaper>
                  <BasePaper style={{ height: "100%", flex: 1 }}>
                    <LockProvider>
                      <FormTabs
                        values={values}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        selectedRow={selectedRow}
                      />
                    </LockProvider>
                  </BasePaper>
                </Box>
              </Box>
              <Box>
                <BasePaper style={{ height: "100%" }}>
                  <LockProvider>
                    <DataGridTabs selectedRow={selectedRow} />
                  </LockProvider>
                </BasePaper>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
