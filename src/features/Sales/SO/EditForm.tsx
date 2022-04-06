import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import { GeneralForm } from "./Forms";
// import EntitiesForm from "./Forms/Entities";
import { ISO, editSO } from "api/so";
import { BasePaper } from "app/Paper";
import Toast from "app/Toast";
import { getModifiedValues } from "logic/utils";
import Shipping from "./Forms/Shipping";
import Billing from "./Forms/Billing";
import Approvals from "./Forms/Approvals";
import Entities from "./Forms/Entities";

export default function EditForm({ selectedSo }: { selectedSo: ISO }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = async (data: ISO, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
    try {
      if (selectedSo.id) {
        const reqData = getModifiedValues(data, selectedSo);
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
              {/* <Box textAlign="center" mt={1}>
                <Button style={{ width: "200px" }} disabled={isSubmitting} type="submit" kind="edit">
                  Save
                </Button>
              </Box> */}
            </BasePaper>
            <BasePaper style={{ flex: 1 }}>
              <Tabs
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
                variant="scrollable"
                style={phone ? { maxWidth: "calc(100vw - 80px)" } : { maxWidth: 700 }}
              >
                <Tab label="Approvals" />
                <Tab label="Entities" />
                <Tab label="Shipping" />
                <Tab label="Billing" />
              </Tabs>
              <Box>
                {activeTab === 0 && <Approvals getFieldProps={getFieldProps} />}
                {activeTab === 1 && (
                  <Entities
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                  />
                )}
                {activeTab === 2 && <Shipping getFieldProps={getFieldProps} />}
                {activeTab === 3 && <Billing getFieldProps={getFieldProps} />}
                {/* {activeTab === 0 && (
                  <ApprovalForm
                    setFieldValue={setFieldValue}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === 1 && (
                  <AccountingForm
                    setFieldValue={setFieldValue}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === 2 && (
                  <ShippingForm
                    setFieldValue={setFieldValue}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === 3 && (
                  <EntitiesForm
                    setFieldValue={setFieldValue}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === 4 && (
                  <AddressesForm
                    setFieldValue={setFieldValue}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                )} */}
              </Box>
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
