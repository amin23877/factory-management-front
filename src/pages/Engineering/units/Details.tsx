import React from "react";
import { Box, useMediaQuery, LinearProgress } from "@material-ui/core";
import useSWR, { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { General } from "features/FieldService/Units/Forms";

import { BasePaper } from "app/Paper";

import { IUnit, updateUnit } from "api/units";

import Toast from "app/Toast";
import { getModifiedValues } from "logic/utils";

import { LockProvider } from "common/Lock";

import { useParams } from "react-router-dom";
import FormsTabs from "features/Engineering/Devices/FormsTabs";
import DataGridsTabs from "features/Engineering/Devices/DataGridsTabs";

const schema = Yup.object().shape({});

function Details() {
  const { unitId } = useParams<{ unitId: string }>();
  const { data: unit } = useSWR<IUnit>(unitId ? `/unit/${unitId}` : null);

  const handleSubmit = async (data: any) => {
    try {
      if (unit?.id) {
        await updateUnit(unit.id, getModifiedValues(data, unit));
        await mutate("/unit");
        Toast("Unit updated", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const phone = useMediaQuery("(max-width:900px)");

  if (!unit) {
    return <LinearProgress />;
  }
  return (
    <>
      <Box display="grid" gridTemplateColumns={phone ? "1fr" : "1fr 2fr"} gridGap={10}>
        <Formik initialValues={unit as IUnit} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur, setFieldValue, touched }) => (
            <Form>
              <Box display="flex" flexDirection="column" gridGap={10} height={phone ? "" : "100%"}>
                <BasePaper>
                  <LockProvider>
                    <General
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  </LockProvider>
                </BasePaper>
                <BasePaper style={{ flex: 1 }}>
                  <LockProvider>
                    <FormsTabs
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      unit={unit}
                    />
                  </LockProvider>
                </BasePaper>
              </Box>
            </Form>
          )}
        </Formik>
        <BasePaper style={{ height: "100%" }}>
          <LockProvider>
            <DataGridsTabs unit={unit} />
          </LockProvider>
        </BasePaper>
      </Box>
    </>
  );
}

export default Details;
