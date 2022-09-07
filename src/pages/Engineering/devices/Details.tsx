import React from "react";
import { Box, LinearProgress, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Toast from "app/Toast";
import Button from "app/Button";
import { BasePaper } from "app/Paper";

import { General } from "features/Engineering/Devices/Forms";

import { IItem, updateAnItem } from "api/items";
import { getModifiedValues } from "logic/utils";

import { useParams } from "react-router-dom";
import { LockProvider } from "common/Lock";
import FormTabs from "features/Engineering/Devices/FormTabs";
import DataGridsTabs from "features/Engineering/Devices/DataGridTabs";

function DeviceDetails({
  sales,
  onFlagSelected,
  onDone,
}: {
  sales?: boolean;
  onDone?: () => void;
  onFlagSelected: (a: any) => void;
}) {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { data: selectedRow } = useSWR<IItem>(deviceId ? `/item/${deviceId}` : null);

  const phone = useMediaQuery("(max-width:900px)");

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      if (selectedRow) {
        const resp = await updateAnItem(selectedRow.id, getModifiedValues(data, selectedRow));
        if (resp) {
          setSubmitting(false);
          Toast("Record updated successfully", "success");

          onDone && onDone();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedRow) {
    return <LinearProgress />;
  }

  return (
    <>
      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "5fr 7fr"}>
              <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 10, height: "100%" }}>
                <BasePaper>
                  <General
                    sales={sales}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <Box
                    mt={2}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button style={{ display: "none", margin: "0 auto", width: "200px" }} kind="edit" type="submit">
                      Save
                    </Button>
                  </Box>
                </BasePaper>
                <BasePaper style={{ flex: 1, overflowY: "auto" }}>
                  <LockProvider>
                    <FormTabs
                      sales={sales}
                      selectedRow={selectedRow}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  </LockProvider>
                </BasePaper>
              </Box>
              <BasePaper>
                <LockProvider>
                  <DataGridsTabs sales={sales} selectedRow={selectedRow} onFlagSelected={onFlagSelected} />
                </LockProvider>
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default DeviceDetails;
