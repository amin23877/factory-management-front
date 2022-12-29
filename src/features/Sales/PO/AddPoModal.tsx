import React, { useState } from "react";
import { LinearProgress, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import FileUploader from "app/UploadButton";

import AsyncCombo from "common/AsyncCombo";

import { createCustomerPo, customerPoType } from "api/customerPo";
import { createAModelDocument } from "api/document";

const schema = Yup.object().shape({
  file: Yup.mixed().required(),
  number: Yup.string().required(),
  QuoteId: Yup.string().required(),
});

export default function AddPOModal({
  open,
  initialValues,
  onClose,
  onDone,
}: {
  open: boolean;
  initialValues?: Partial<customerPoType>;
  onClose: () => void;
  onDone: () => void;
}) {
  const [status, setStatus] = useState<"" | "Creating Customer PO" | "Uploading File">("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      setStatus("Creating Customer PO");
      const resp = await createCustomerPo(data);
      if (resp && resp.id && data.file) {
        setStatus("Uploading File");
        await createAModelDocument({ model: "salesPo", id: resp.id, file: data.file, description: resp.number });

        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("");
      onDone();
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={"Add new Purchase Order"}>
      <Box m={1}>
        <Formik
          validationSchema={schema}
          initialValues={initialValues || ({} as customerPoType)}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                <Box textAlign="center">
                  <FileUploader
                    onChange={(e: any) => {
                      if (e.target.files) {
                        setFieldValue("file", e.target.files[0]);

                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  {fileName && <Typography variant="caption">{fileName}</Typography>}
                  {(errors as any).file && <Typography>{(errors as any).file}</Typography>}
                </Box>
                <TextField
                  name="number"
                  label="Customer PO Number"
                  value={values?.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors?.number && touched?.number)}
                  helperText={errors?.number}
                />
                {/* <AsyncCombo
                  label="SO Number"
                  url="/so"
                  filterBy="number"
                  getOptionLabel={(o) => o?.number || "No-Number"}
                  getOptionSelected={(o, v) => o?.id === v?.id}
                  onChange={(e, nv) => setFieldValue("SOId", nv?.id)}
                  value={values?.SOId}
                /> */}
                <AsyncCombo
                  label="Quote Number"
                  url="/quote"
                  filterBy="number"
                  getOptionLabel={(o) => o?.number || "No-Number"}
                  getOptionSelected={(o, v) => o?.id === v?.id}
                  onChange={(e, nv) => setFieldValue("QuoteId", nv?.id)}
                  value={values?.QuoteId}
                />
                {(errors as any).QuoteId && <Typography>{(errors as any).QuoteId}</Typography>}
                {/* <AsyncCombo
                  label="Rep"
                  url="/rep"
                  filterBy="name"
                  getOptionLabel={(o) => o?.name || "No-Name"}
                  getOptionSelected={(o, v) => o?.id === v?.id}
                  onChange={(e, nv) => setFieldValue("RepId", nv?.id)}
                  value={values?.RepId}
                />
                <AsyncCombo
                  label="Requester"
                  url={values?.RepId ? `/contact/rep/${(values?.RepId as any)?.id || values?.RepId}` : "/contact"}
                  filterBy="lastName"
                  getOptionLabel={(o) => `${o?.firstName} ${o?.lastName}`}
                  getOptionSelected={(o, v) => o?.id === v?.id}
                  onChange={(e, nv) => setFieldValue("requester", nv?.id)}
                  value={values?.requester}
                />
                <AsyncCombo
                  label="Client"
                  url={"/client"}
                  filterBy="name"
                  getOptionLabel={(o) => o?.name || "No-Name"}
                  getOptionSelected={(o, v) => o?.id === v?.id}
                  onChange={(e, nv) => setFieldValue("ClientId", nv?.id)}
                  value={values?.ClientId}
                />
                <AsyncCombo
                  label="Contact"
                  url={
                    values?.ClientId ? `/contact/rep/${(values?.ClientId as any)?.id || values?.ClientId}` : "/contact"
                  }
                  filterBy="lastName"
                  getOptionLabel={(o) => `${o?.firstName} ${o?.lastName}`}
                  getOptionSelected={(o, v) => o?.id === v?.id}
                  onChange={(e, nv) => setFieldValue("contact", nv?.id)}
                  value={values?.contact}
                /> */}
                <Button type="submit" fullWidth kind="add">
                  Add
                </Button>
                {status !== "" && <LinearProgress />}
                {status !== "" && <Typography>{status}</Typography>}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
