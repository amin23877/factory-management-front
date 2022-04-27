import React, { ChangeEvent, useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { Formik, Form } from "formik";
import { host } from "host";
import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import FileUploader from "app/UploadButton";
import Toast from "app/Toast";
import Confirm from "features/Modals/Confirm";

import { addFileToStep, deleteFileFromStep, stepType } from "api/steps";

function RowModal({
  open,
  type,
  initialValues,
  onClose,
  handleChangeRow,
  handleAddRow,
  handleDelete,
  columns,
  taskId,
  mutateRows,
}: {
  type: stepType;
  open: boolean;
  onClose: () => void;
  handleChangeRow: (row: any) => void;
  handleAddRow: (row: any) => void;
  handleDelete: (row: any) => void;
  initialValues?: any;
  columns: any[];
  taskId: string;
  mutateRows: any;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [selecetdFile, setSelectedFile] = useState<string>();

  const handleSubmit = (d: any) => {
    if (initialValues) {
      handleChangeRow(d);
    } else {
      handleAddRow(d);
    }
  };

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        await addFileToStep(type, taskId, initialValues.number, e.target.files[0]);

        mutateRows();
        Toast("File added", "success");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFile = async (selecetdFile: string) => {
    try {
      if (selecetdFile) {
        await deleteFileFromStep(type, taskId, selecetdFile);

        mutateRows();
        Toast("File deleted", "success");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Confirm
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          if (selecetdFile) {
            handleDeleteFile(selecetdFile);
            setConfirm(false);
          }
        }}
      />

      <Dialog title="Add/Change step" open={open} onClose={onClose} fullWidth maxWidth="sm">
        <Box m={1} height={500}>
          <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: "1em" }}>
            <Tab label="General" />
            <Tab label="Files" disabled={!initialValues?.number} />
          </Tabs>

          {activeTab === 0 && (
            <Formik initialValues={initialValues || ({} as any)} onSubmit={handleSubmit}>
              {({ values, errors, handleChange, handleBlur }) => (
                <Form>
                  <Box height="440px" display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column">
                      <Box py={1} display="grid" gridTemplateColumns="1fr 1fr" overflow="auto" gridGap={10}>
                        {columns.map(
                          (column) =>
                            column.field !== "files" &&
                            column.field !== "number" && (
                              <TextField
                                style={{ alignSelf: "center" }}
                                key={column.field}
                                name={column.field}
                                label={column.field}
                                value={values[column.field]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors[column.field])}
                                helperText={errors[column.field]}
                                required={column.field === "number"}
                              />
                            )
                        )}
                      </Box>
                      <div style={{ flex: "1 1 200px" }} />
                    </Box>
                    <Box mt="auto">
                      <Button kind="add" type="submit">
                        Save
                      </Button>
                      {initialValues?.number && (
                        <Button style={{ marginLeft: 10 }} kind="delete" onClick={() => handleDelete(initialValues)}>
                          Delete
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
          {activeTab === 1 && (
            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
              <FileUploader onChange={handleUploadFile} multiple={false} />
              <Box height="370px" overflow="auto">
                {initialValues?.files?.map((f: any) => (
                  <img
                    onClick={() => {
                      setSelectedFile(f);
                      setConfirm(true);
                    }}
                    alt={initialValues?.number}
                    src={`http://${host}` + f}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default RowModal;
