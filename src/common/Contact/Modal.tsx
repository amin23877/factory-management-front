import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { mutate } from "swr";

import Dialog from "app/Dialog";
import Button from "app/Button";

import { createAModelContact, deleteAModelContact, updateAModelContact, IContact } from "api/contact";
import AddPhone, { AddEmail } from "./AddPhone";
import ContactForm from "./Forms";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";

const schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  title: Yup.string().required(),
  department: Yup.string().required(),
});

const phoneColumns: GridColumns = [
  { field: "phone", headerName: "Phone", width: 110 },
  { field: "phoneType", headerName: "Phone Type", width: 110 },
  { field: "ext", headerName: "EXT", width: 90 },
  { field: "main", headerName: "Main", type: "boolean" },
];
const emialColumns: GridColumns = [
  { field: "email", headerName: "Email", width: 110 },
  { field: "emailType", headerName: "Email Type", width: 110 },
  { field: "main", headerName: "Main", type: "boolean" },
];

export default function ContactModal({
  open,
  onClose,
  model,
  itemId,
  data,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  model: string;
  itemId: string;
  data?: IContact;
  onDone?: () => void;
}) {
  const [selectedPhone, setSelectedPhone] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(false);
  const [addPhone, setAddPhone] = useState(false);
  const [addEmail, setAddEmail] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleDelete = () => {
    if (data?.id) {
      deleteAModelContact(data.id)
        .then(() => {
          onClose();
          onDone && onDone();
          mutate(`/contact/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    if (data?.id) {
      updateAModelContact(data?.id, values)
        .then((d: any) => {
          console.log(d);
          onDone && onDone();
          setSubmitting(false);
          onClose();
          mutate(`/contact/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    } else {
      createAModelContact(model, itemId, values)
        .then((d: any) => {
          console.log(d);
          onDone && onDone();
          setSubmitting(false);
          onClose();
          mutate(`/contact/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        title={`${data?.id ? "Edit" : "Add"} a Contact to ${model}`}
        maxWidth="md"
        fullWidth
      >
        <Box m={3}>
          <Formik
            initialValues={data?.id ? data : ({ active: false, main: false } as IContact)}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
              <Form>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={8} gridColumnGap={8}>
                  <Box>
                    <ContactForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                    <Box display={"flex"} mt={1} justifyContent="space-around" gridGap={2}>
                      <Button type="submit" disabled={isSubmitting} kind={data ? "edit" : "add"}>
                        Save
                      </Button>
                      {data?.id && (
                        <Button kind="delete" onClick={handleDelete}>
                          Delete
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Tabs
                      value={activeTab}
                      textColor="primary"
                      onChange={(e, nv) => {
                        setActiveTab(nv);
                      }}
                      style={{ marginBottom: "10px" }}
                    >
                      <Tab label="Phone" />
                      <Tab label="Email" />
                    </Tabs>
                    {activeTab === 0 && (
                      <Box>
                        <FieldArray
                          name="phones"
                          render={(arrayHelpers) => (
                            <Box pb={1}>
                              <AddPhone
                                open={addPhone}
                                onClose={() => setAddPhone(false)}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                errors={errors}
                                values={values}
                                setFieldValue={setFieldValue}
                                arrayHelpers={arrayHelpers}
                                touched={touched}
                                selectedPhone={selectedPhone}
                              />
                              <Button
                                disabled={isSubmitting}
                                variant="outlined"
                                onClick={() => {
                                  setAddPhone(true);
                                }}
                              >
                                Add Phone Number
                              </Button>
                            </Box>
                          )}
                        />
                        <BaseDataGrid
                          cols={phoneColumns}
                          rows={values.phones?.map((i, ind) => ({ ...i, id: ind })) || []}
                          onRowSelected={(r) => {
                            setSelectedPhone(r);
                            setFieldValue("phone", r.phone);
                            setFieldValue("phoneType", r.phoneType);
                            setFieldValue("ext", r.ext);
                            setFieldValue("main", r.main);
                            setAddPhone(true);
                          }}
                        />
                      </Box>
                    )}
                    {activeTab === 1 && (
                      <Box>
                        <FieldArray
                          name="emails"
                          render={(arrayHelpers) => (
                            <Box pb={1}>
                              <AddEmail
                                open={addEmail}
                                onClose={() => setAddEmail(false)}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                errors={errors}
                                values={values}
                                setFieldValue={setFieldValue}
                                arrayHelpers={arrayHelpers}
                                touched={touched}
                                selectedEmail={selectedEmail}
                              />
                              <Button
                                disabled={isSubmitting}
                                variant="outlined"
                                onClick={() => {
                                  setAddEmail(true);
                                }}
                              >
                                Add Email Address
                              </Button>
                            </Box>
                          )}
                        />
                        <BaseDataGrid
                          cols={emialColumns}
                          rows={values.emails?.map((i, ind) => ({ ...i, id: ind })) || []}
                          onRowSelected={(r) => {
                            setSelectedEmail(r);
                            setFieldValue("email", r.email);
                            setFieldValue("emailType", r.emailType);
                            setFieldValue("main", r.main);
                            setAddEmail(true);
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </>
  );
}
