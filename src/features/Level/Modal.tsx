import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import Toast from "app/Toast";
import useSWR from "swr";

import { createLevelTwo, editLevel } from "api/level";
// import AsyncCombo from "common/AsyncCombo";
import { LockProvider, useLock } from "common/Lock";

import ValidValuesForm from "./ValidValuesForm";
import useStyles from "./styles";

export interface IVals {
  value: string;
  uom: string;
  id?: string;
}

const schema = Yup.object({
  name: Yup.string().required("Name is required."),
  clusterId: Yup.string().required(""),
});

export default function LevelModal({
  level,
  edit,
  open,
  onClose,
  onDone,
}: {
  level: any;
  edit: boolean;
  open: boolean;
  onClose: () => void;
  onDone?: () => void;
}) {
  const cls = useStyles();
  const { lock } = useLock();
  const { clusterId } = useParams<{ clusterId: string }>();
  const { data: allClusters } = useSWR("/level");
  const [addArray, setAddArray] = useState([]);
  const [deleteArray, setDeleteArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const selectedClusterName = allClusters?.result.find((i: any) => i.clusterId.id === clusterId);
  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      if (level?.id) {
        await editLevel(level?.id, { ...data, add: addArray, delete: deleteArray });
        Toast("Level updated successfully", "success");
        onClose();
        onDone && onDone();
      } else {
        await createLevelTwo(data);
        Toast("Level created successfully", "success");
        onClose();
        onDone && onDone();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setAddArray([]);
      setDeleteArray([]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={edit ? "Edit Level" : "Level"}>
      <Formik
        initialValues={{
          name: level?.name || "",
          clusterId: level?.clusterId?.id || selectedClusterName?.clusterId.id,
          valid: level?.valid || [],
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ handleChange, handleBlur, values, setValues, touched, errors }) => (
          <Form>
            <Box className={cls.formContainer}>
              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Level Name"
                helperText={touched.name && errors.name}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                className={cls.inp}
                disabled
                label="Cluster"
                value={selectedClusterName?.clusterId.clusterValue}
              />
              <TextField
                className={cls.inp}
                name="valid"
                value={
                  Array.isArray(values.valid)
                    ? values?.valid?.map((val: IVals) => val.value + " " + val.uom).join(" , ")
                    : ""
                }
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Valid Values"
                label="Valid Values"
                InputLabelProps={{ shrink: true }}
                disabled={lock}
                onClick={() => setOpenModal(true)}
                onKeyDown={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                }}
              />
              <Button kind={edit ? "edit" : "add"} type="submit" disabled={values.name === "" ? true : false}>
                {edit ? "Save" : "Add"}
              </Button>
            </Box>
            <Box mt={1}>
              <LockProvider>
                <ValidValuesForm
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  setValuesParent={setValues}
                  valuesParent={values}
                  setAddArray={setAddArray}
                  setDeleteArray={setDeleteArray}
                />
              </LockProvider>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
