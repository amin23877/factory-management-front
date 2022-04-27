import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { FieldSelect } from "../../../app/Inputs";

import { createPO, IPO } from "../../../api/po";
import { getContacts } from "../../../api/contact";
import { getClients } from "../../../api/client";
import { getAllEmployees } from "../../../api/employee";
import { getProjects } from "../../../api/project";
import FileUploader from "../../../app/UploadButton";

const schema = Yup.object().shape({
  // name: Yup.string().required(),
});
export default function AddPOModal({
  open,
  onClose,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  onDone: () => void;
}) {
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      const resp = await createPO(data);
      if (resp) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      onDone();
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={"Add new Purchase Order"}>
      <Box m={1}>
        <Formik validationSchema={schema} initialValues={{} as any} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                <FileUploader
                  onChange={(e: any) => {
                    if (e.target.files) {
                      setFieldValue("file", e.target.files[0]);

                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
                {fileName && <Typography variant="caption">{fileName}</Typography>}
                <TextField
                  name="senderNumber"
                  label="Sender Number"
                  value={values.senderNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.senderNumber && touched.senderNumber)}
                  helperText={errors.senderNumber}
                />
                <FieldSelect
                  label="Contact"
                  name="ContactId"
                  request={getContacts}
                  itemTitleField="lastName"
                  itemValueField="id"
                  value={values.ContactId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.ContactId && touched.ContactId)}
                />
                <FieldSelect
                  label="Client"
                  name="ClientId"
                  request={getClients}
                  itemTitleField="name"
                  itemValueField="id"
                  value={values.ClientId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.ClientId && touched.ClientId)}
                />
                <FieldSelect
                  label="Employee"
                  name="EmployeeId"
                  request={getAllEmployees}
                  itemTitleField="username"
                  itemValueField="id"
                  value={values.EmployeeId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.EmployeeId && touched.EmployeeId)}
                />
                <FieldSelect
                  label="Project"
                  name="ProjectId"
                  request={getProjects}
                  itemTitleField="name"
                  itemValueField="id"
                  value={values.ProjectId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.ProjectId && touched.ProjectId)}
                />
                <FieldSelect
                  request={getAllEmployees}
                  itemTitleField="username"
                  itemValueField="id"
                  label="Reciever"
                  name="reciever"
                  value={values.reciever}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.reciever && touched.reciever)}
                />

                <Button type="submit" fullWidth kind="add">
                  Add
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
