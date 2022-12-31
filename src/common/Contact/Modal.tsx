import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import useSWR, { mutate } from "swr";

import Dialog from "app/Dialog";
import Button from "app/Button";

import { createAModelContact, deleteAModelContact, updateAModelContact, IContact } from "api/contact";
import { AddEmail } from "./AddPhone";
import ContactForm from "./Forms";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";
import PhoneTab from "./Phone";

const schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  title: Yup.string().required(),
  department: Yup.string().required(),
});

const emialColumns: GridColumns = [
  { field: "email", headerName: "Email", width: 110 },
  { field: "emailType", headerName: "Email Type", width: 110 },
  { field: "main", headerName: "Main", type: "boolean" },
];

export default function ContactModal({
  open,
  model,
  itemId,
  contactId,
  onDone,
  onClose,
}: {
  open: boolean;
  model: string;
  itemId: string;
  contactId?: string;
  onDone?: () => void;
  onClose: () => void;
}) {
  const { data: contact } = useSWR<IContact>(contactId ? `/contact/${contactId}` : null);
  const [selectedEmail, setSelectedEmail] = useState(false);
  const [addEmail, setAddEmail] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    if (contact?._id) {
      setDeleting(true);
      deleteAModelContact(contact._id)
        .then(() => {
          onClose();
          onDone && onDone();
          mutate(`/contact/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    if (contact?._id) {
      updateAModelContact(contact?._id, values)
        .then(() => {
          onDone && onDone();
          setSubmitting(false);
          onClose();
          mutate(`/contact/${model}/${itemId}`);
        })
        .catch((e) => console.log(e));
    } else {
      createAModelContact(model, itemId, values)
        .then(() => {
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
        title={`${contact?._id ? "Edit" : "Add"} a Contact to ${model}`}
        maxWidth="md"
        fullWidth
      >
        <Box m={3}>
          <Formik
            initialValues={contact?._id ? contact : ({ active: false, main: false } as IContact)}
            validationSchema={schema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
              <Form>
                <Box
                  display="grid"
                  gridTemplateColumns={contactId ? "1fr 1fr" : "1fr"}
                  gridRowGap={8}
                  gridColumnGap={8}
                >
                  <Box>
                    <ContactForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                    <Box display={"flex"} mt={1} justifyContent="space-around" gridGap={2}>
                      <Button type="submit" disabled={isSubmitting} kind={contact ? "edit" : "add"}>
                        Save
                      </Button>
                      {contact?._id && (
                        <Button kind="delete" onClick={handleDelete} disabled={deleting}>
                          Delete
                        </Button>
                      )}
                    </Box>
                  </Box>
                  {contactId && (
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
                      {activeTab === 0 && contact && <PhoneTab contact={contact} />}
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
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </>
  );
}
