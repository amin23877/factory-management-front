import React, { useRef } from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";
import TextField from "app/TextField";
import { host } from "host";

import { createAModelDocument, updateAModelDocument, deleteAModelDocument, IDocument } from "api/document";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PDFPreview from "components/PDFPreview";
import { mutate } from "swr";

interface IDocumentModal {
  open: boolean;
  model: string;
  itemId: string;
  data?: any;
  onDone?: () => void;
  onClose: () => void;
}

const mutateDocuments = (type: string, id: string) => {
  return mutate(`/document/${type}/${id}`);
};

export default function DocumentModal({ open, onClose, model, itemId, onDone, data }: IDocumentModal) {
  const fileUploader = useRef<HTMLInputElement | null>();
  const phone = useMediaQuery("(max-width:900px)");

  const deleteDocument = async () => {
    try {
      if (data && data.id) {
        await deleteAModelDocument(data.id);
        onDone && onDone();
        mutateDocuments(model, itemId);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (data && data.id) {
        await updateAModelDocument(data.id, values.file, values.description);

        onDone && onDone();
        mutateDocuments(model, itemId);
        onClose();
      } else {
        await createAModelDocument({ model, id: itemId, ...values });

        onDone && onDone();
        mutateDocuments(model, itemId);
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen title={`${data ? "Edit" : "Add"} Document to ${model}`}>
      <Box height="82vh" m={3} display="grid" gridTemplateColumns={phone ? "1fr" : "1fr 300px"} gridColumnGap={10}>
        <Box>{data?.path && <PDFPreview height="100%" pdf={host + data?.path} />}</Box>
        <Formik initialValues={data ? data : ({} as IDocument)} onSubmit={handleSubmit}>
          {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
            <Form>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <input
                  type="file"
                  ref={(e) => (fileUploader.current = e)}
                  hidden
                  onChange={(e) => e.target.files !== null && setFieldValue("file", e.target.files[0])}
                />
                <Button
                  color="primary"
                  style={{
                    backgroundColor: "#fff",
                    color: " rgb(43,140,255) ",
                    border: "1px solid rgb(43,140,255) ",
                    width: "100%",
                  }}
                  variant="contained"
                  onClick={() => fileUploader.current?.click()}
                >
                  <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                  Upload file
                </Button>

                <div style={{ margin: "1em 0" }}>
                  {values.file ? (
                    String((values.file as any).name)
                  ) : // <p>ads</p>

                  data ? (
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      download={data.path.search("blob") > -1 ? "document.pdf" : "document"}
                      href={data.path.slice(0)}
                    >
                      Download previous file
                    </a>
                  ) : (
                    ""
                  )}
                </div>
                <TextField
                  style={{ marginBottom: "20px" }}
                  fullWidth
                  value={values.name}
                  name="name"
                  label="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  style={{ marginBottom: "20px" }}
                  fullWidth
                  value={values.number}
                  name="number"
                  label="Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  style={{ marginBottom: "20px" }}
                  fullWidth
                  value={values.description}
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box style={{ display: "flex", width: "100%" }}>
                  <Button type="submit" kind={data ? "edit" : "add"} disabled={isSubmitting} style={{ flex: 1 }}>
                    Save
                  </Button>
                  {data && (
                    <Button
                      style={{ marginLeft: "1em" }}
                      onClick={deleteDocument}
                      kind="delete"
                      disabled={isSubmitting}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
