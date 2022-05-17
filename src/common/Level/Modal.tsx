import React, { useMemo, useState } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";
import useSWR from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import MyForm from "./Form";
import Toast from "app/Toast";
import MyDialog from "app/Dialog";
import BaseDataGrid from "app/BaseDataGrid";

import { createLevel, editLevel, ILevel } from "api/level";
import { getModifiedValues } from "logic/utils";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  clusterValueRef: Yup.string().required(),
  valid: Yup.string().required(),
});

type formInitialValuesType = Omit<Partial<ILevel>, "valid"> & {
  valid: string;
};

export default function Modal({ onClose, open }: { open: boolean; onClose: () => void }) {
  const [selectedLevel, setSelectedLevel] = useState<ILevel>();
  const { data: levels, mutate } = useSWR("/level");

  const cols = useMemo<GridColumns>(
    () => [
      { field: "name", flex: 1 },
      { field: "clusterValueRef", flex: 1, headerName: "Cluster Value Reference" },
      { field: "valid", headerName: "Valid Values", flex: 1 },
    ],
    []
  );

  const handleSubmit = async (data: any) => {
    try {
      if (data.id) {
        const modified = getModifiedValues(data, selectedLevel);
        await editLevel(data.id, modified);
        Toast("Level updated.", "success");
      } else {
        await createLevel(data);
        Toast("Level created.", "success");
      }
    } catch (error) {
      Toast("An error ocurred", "error");
    } finally {
      mutate();
    }
  };

  return (
    <MyDialog open={open} onClose={onClose} title="Levels" maxWidth="md" fullWidth>
      <Box height={400}>
        <Formik validationSchema={schema} initialValues={{} as formInitialValuesType} onSubmit={handleSubmit}>
          {({ resetForm, values, handleChange, handleBlur, setValues }) => (
            <Form>
              <MyForm handleBlur={handleBlur} handleChange={handleChange} resetForm={resetForm} values={values} />
              <Box mt={1}>
                <BaseDataGrid
                  height="360px"
                  cols={cols}
                  rows={levels?.result || []}
                  onRowSelected={(r) => {
                    setSelectedLevel(r);
                    setValues(r);
                  }}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </MyDialog>
  );
}
