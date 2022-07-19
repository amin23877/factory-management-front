import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";

import { General } from "./Forms";

import { BasePaper } from "app/Paper";
import Toast from "app/Toast";

import DocumentTab from "common/Document/Tab";

import { getModifiedValues } from "logic/utils";

import { ITaskList } from "api/taskList";
import { LockButton, LockProvider } from "common/Lock";

const schema = Yup.object().shape({});

function ServiceDetails({ taskList }: { taskList: ITaskList }) {
  const handleSubmit = async (data: any) => {
    try {
      if (taskList.id) {
        // await updateTicket(taskList.id, getModifiedValues(data, taskList));

        await mutate("/task");
        Toast("Updated successfully.", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [gridActiveTab, setGridActiveTab] = useState(0);

  return (
    <Box display="grid" gridTemplateColumns="1fr 2fr " gridGap={10}>
      <Formik initialValues={taskList} validationSchema={schema} onSubmit={handleSubmit}>
        {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
          <Form>
            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
              <LockProvider>
                <BasePaper>
                  <General
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                  <Box textAlign="center" my={1}>
                    <LockButton />
                  </Box>
                </BasePaper>
              </LockProvider>
            </Box>
          </Form>
        )}
      </Formik>
      <BasePaper>
        <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
          <Tab label="Documents" />
          <Tab label="parts" />
        </Tabs>
        {gridActiveTab === 0 && <DocumentTab itemId={taskList.id} model="taskList" />}
      </BasePaper>
    </Box>
  );
}

export default ServiceDetails;
