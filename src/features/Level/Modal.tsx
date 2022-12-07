import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Form, Formik, useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import Toast from "app/Toast";
import useSWR from "swr";

import { getModifiedValues } from "logic/utils";
import { ILevel, createLevel, createLevelTwo, editLevel } from "api/level";
// import AsyncCombo from "common/AsyncCombo";
import { clusterType } from "api/cluster";
import { LockButton, LockProvider, useLock } from "common/Lock";

import ValidValuesForm from "./ValidValuesForm";
import ValidValuesDataGrid from "./ValidValuesDataGrid";
import useStyles from "./styles";

export interface IVals {
  value: string;
  uom: string;
  // id?: string;
}

const schema = Yup.object({
  name: Yup.string().required("Name is required."),
  clusterId: Yup.string().required(""),
});

export default function LevelModal({
  level,
  edit,
  open,
  cluster,
  initialValues,
  onClose,
  onDone,
}: {
  level: any;
  edit: boolean;
  open: boolean;
  cluster: clusterType;
  initialValues?: ILevel;
  onClose: () => void;
  onDone?: () => void;
}) {
  const cls = useStyles();
  const { lock } = useLock();
  const { clusterId } = useParams<{ clusterId: string }>();
  const { data: allClusters } = useSWR("/level");
  console.log("allClusters: ", allClusters);

  const [selectedLevel, setSelectedLevel] = useState<ILevel>();
  const [addArray, setAddArray] = useState([]);
  const [deleteArray, setDeleteArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const filteredCluster = allClusters?.result.find((i: any) => i.clusterId.id === clusterId);
  console.log("filteredCluster: ", filteredCluster);

  const { handleChange, handleBlur, handleSubmit, getFieldProps, values, setValues, touched, errors } = useFormik({
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      name: level?.name || "",
      clusterId: level?.clusterId?.clusterValue || filteredCluster?.clusterId.clusterValue,
      valid: level?.valid || [],
    },
    onSubmit: async (data, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (initialValues) {
          const modified = getModifiedValues(data, selectedLevel);
          await editLevel(clusterId, { ...modified, add: addArray, delete: deleteArray });
          Toast("Level updated successfully", "success");
        } else {
          await createLevelTwo(data);
          Toast("Level created successfully", "success");
        }
      } catch (error) {
        console.log(error);
      } finally {
        onDone && onDone();
        onClose();
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} title={edit ? "Edit Level" : "Level"}>
      <form onSubmit={handleSubmit}>
        <Box className={cls.formContainer}>
          <TextField
            className={cls.inp}
            label="Name"
            {...getFieldProps("name")}
            helperText={values.name === "" ? "Name is required." : null}
          />
          <TextField className={cls.inp} disabled label="Cluster" {...getFieldProps("clusterId")} />
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
      </form>
    </Dialog>
  );
}
