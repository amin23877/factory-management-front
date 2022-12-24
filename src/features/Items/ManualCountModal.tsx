import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import TextField from "../../app/TextField";
import { Box } from "@material-ui/core";
import { patchItem } from "../../api/items";
import Toast from "../../app/Toast";

import useStyles from "./styles";

const validationSchema = Yup.object({
  lastCountDate: Yup.string().required(),
  lastCount: Yup.string().required(),
  usedInQuarterAdj: Yup.number().required(),
  usedInHalfAdj: Yup.number().required(),
  usedInYearAdj: Yup.number().required(),
});

export default function ManualCountModal({
  open,
  itemId,
  onClose,
}: {
  itemId: string;
  open: boolean;
  onClose: () => void;
}) {
  const cls = useStyles();

  const handleSubmit = async (data: {
    lastCountDate: any;
    lastCount: number;
    usedInQuarterAdj: number;
    usedInHalfAdj: number;
    usedInYearAdj: number;
  }) => {
    try {
      await patchItem(itemId, data);
      Toast("Record updated successfully", "success");
      onClose && onClose();
    } catch (error) {
      console.log(error);
      onClose && onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Adjust last manual count">
      <Box m={2}>
        <Formik
          initialValues={{
            lastCountDate: undefined,
            lastCount: 0,
            usedInQuarterAdj: 0,
            usedInHalfAdj: 0,
            usedInYearAdj: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors }) => (
            <Form>
              <Box className={cls.inputContainer}>
                <TextField
                  className={cls.inp}
                  name="lastCountDate"
                  value={values.lastCountDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.lastCountDate)}
                  helperText={errors.lastCountDate}
                  type="date"
                  //   label="date"
                />
                <TextField
                  className={cls.inp}
                  name="lastCount"
                  value={values.lastCount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.lastCount)}
                  helperText={errors.lastCount}
                  label="Count"
                />
              </Box>
              <Box className={cls.inputContainer}>
                <TextField
                  className={cls.inp}
                  name="usedInQuarterAdj"
                  value={values.usedInQuarterAdj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.usedInQuarterAdj)}
                  helperText={errors.usedInQuarterAdj}
                  label="Used in quarter adjustment"
                />
                <TextField
                  className={cls.inp}
                  name="usedInHalfAdj"
                  value={values.usedInHalfAdj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.usedInHalfAdj)}
                  helperText={errors.usedInHalfAdj}
                  label="Used in half adjustment"
                />
              </Box>
              <Box className={cls.singleInp}>
                <TextField
                  style={{ width: "100%" }}
                  name="usedInYearAdj"
                  value={values.usedInYearAdj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.usedInYearAdj)}
                  helperText={errors.usedInYearAdj}
                  label="Used in year adjustment"
                />
                <Button type="submit" kind="add">
                  Adjust
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
