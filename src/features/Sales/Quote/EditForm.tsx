import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, LinearProgress, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import Toast from "app/Toast";
import { BasePaper } from "app/Paper";
import Button from "app/Button";

import { GeneralForm } from "./Forms";
// import Entities from "./Forms/Entities";
// import Addresses from "./Forms/Addresses";
import Status from "./Forms/Status";
import Metrics from "./Forms/Metrics";
import Shipping from "./../SO/Forms/Shipping";
import Billing from "./../SO/Forms/Billing";
import Entities from "./../SO/Forms/Entities";

import { IQuote, updateQuote } from "api/quote";
import { getModifiedValues } from "logic/utils";
import { LockButton } from "common/Lock";

export default function EditForm({ selectedQuote }: { selectedQuote: IQuote }) {
  const [activeTab, setActiveTab] = useState(0);
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
              <Box display="flex" justifyContent="center" mt={1} style={{ width: "100%" }}>
                <LockButton />
                <Button type="submit" kind="edit" style={{ width: "100%", display: "none" }}>
                  Save
                </Button>
              </Box>
            </BasePaper>
            <BasePaper style={{ flex: 1 }}>
              <Tabs
                value={activeTab}
                textColor="primary"
                onChange={(e, nv) => setActiveTab(nv)}
                variant="scrollable"
                style={{ maxWidth: 700 , marginBottom:"10px" }}
              >
                {/* <Tab label="Entities" />
                <Tab label="Addresses" />*/}
                <Tab label="Entities" />
                <Tab label="Shipping" />
                <Tab label="Billing" />
                <Tab label="Status" />
                <Tab label="Metrics" />
              </Tabs>

              {/* {activeTab === 0 && (
                <Entities values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} />
              )}
              {activeTab === 1 && <Addresses getFieldProps={getFieldProps} />} */}
              {activeTab === 0 && (
                <Entities
                  setFieldValue={setFieldValue}
                  values={values}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              {activeTab === 1 && <Shipping getFieldProps={getFieldProps} />}
              {activeTab === 2 && <Billing getFieldProps={getFieldProps} />}
              {activeTab === 3 && <Status getFieldProps={getFieldProps} />}
              {activeTab === 4 && <Metrics values={values} getFieldProps={getFieldProps} />}
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
