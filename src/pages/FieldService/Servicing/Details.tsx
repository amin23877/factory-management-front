import React from "react";
import { Box, LinearProgress, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import FieldServiceForm from "features/FieldService/Forms";
import Toast from "app/Toast";
import { BasePaper } from "app/Paper";

import { IFieldService, updateFieldService } from "api/fieldService";
import { LockButton, LockProvider } from "common/Lock";
import useSWR from "swr";
import { useParams } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required(),
  no: Yup.string().required(),
  class: Yup.string().required(),
  type: Yup.string().required(),
  price: Yup.string().required(),
});

export default function FieldServiceDetails() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { data: selectedFieldService } = useSWR<IFieldService>(serviceId ? `/service/${serviceId}` : null);

  const phone = useMediaQuery("(max-width:900px)");

  const handleSubmit = async (d: any) => {
    try {
      if (serviceId) {
        const resp = await updateFieldService(serviceId, d);
        if (resp) {
          Toast("Updated successfully !!!", "success");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedFieldService) {
    return <LinearProgress />;
  }

  return (
    <Box display="flex" style={{ gap: 5 }} flex={1} flexDirection={phone ? "column" : "row"}>
      <BasePaper style={{ flex: 1 }}>
        <Formik initialValues={selectedFieldService} onSubmit={handleSubmit} validationSchema={schema}>
          {({ values, handleBlur, handleChange, errors }) => (
            <Form>
              <LockProvider>
                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                  <FieldServiceForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                  <LockButton />
                </Box>
              </LockProvider>
            </Form>
          )}
        </Formik>
      </BasePaper>
      <BasePaper style={{ flex: 2 }}></BasePaper>
    </Box>
  );
}
