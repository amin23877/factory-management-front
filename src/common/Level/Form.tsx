import React, { useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Toast from "app/Toast";
import Button from "app/Button";
import TextField from "app/TextField";
import NewDataGrid from "app/NewDataGrid";
import Confirm from "common/Confirm";

import { createLevel, editLevel, deleteLevel, ILevel } from "api/level";
import { getModifiedValues } from "logic/utils";
import { clusterType } from "api/cluster";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  clusterValueRef: Yup.string().required(),
  valid: Yup.string().required(),
});

type formInitialValuesType = Omit<Partial<ILevel>, "valid"> & {
  valid: string;
};

export default function LevelForm({ cluster }: { cluster?: clusterType }) {
  const [refresh, setRefresh] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<ILevel>();

  const cols = useMemo(
    () => [
      { name: "name", flex: 1, render: ({ data }: any) => data.name.split("__")[0] },
      {
        name: "clusterValueRef",
        flex: 1,
        header: "Cluster Value",
        render: ({ data }: any) => data?.clusterId?.clusterValue,
      },
      {
        name: "valid",
        header: "Valid Values",
        flex: 1,
        render: ({ data }: any) => data.valid.join(","),
      },
    ],
    []
  );

  const handleSubmit = async (data: any) => {
    try {
      if (data.id) {
        data = { ...data, name: data.name + "__" + data.clusterValueRef };
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
      setRefresh((p) => p + 1);
    }
  };

  return (
    <Formik validationSchema={schema} initialValues={{} as formInitialValuesType} onSubmit={handleSubmit}>
      {({ resetForm, values, handleChange, handleBlur, setValues }) => (
        <Form>
          <Box
            display="grid"
            gridTemplateColumns={values.id ? "1fr 1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr"}
            gridGap={5}
          >
            <TextField
              name="name"
              value={values?.name?.split("__")[0]}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Level Name"
              placeholder="Name"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="clusterValueRef"
              value={values.clusterValueRef}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Cluster Value "
              label="Cluster Value"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="valid"
              value={values.valid}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Valid Values"
              label="Valid Values"
              InputLabelProps={{ shrink: true }}
            />
            <Button kind={values && values.id ? "edit" : "add"} type="submit">
              save
            </Button>
            {values && values.id && (
              <Button
                kind="delete"
                onClick={() => {
                  Confirm({
                    text: "Delete This Level ? ",
                    onConfirm: async () => {
                      try {
                        if (values?.id) {
                          await deleteLevel(values.id);
                          Toast("Level Deleted.", "success");
                          resetForm({
                            values: { id: undefined, name: "", clusterValueRef: "", valid: "" },
                          });
                        }
                      } catch (error) {
                        Toast("An error ocurred", "error");
                      } finally {
                        setRefresh((p: number) => p + 1);
                      }
                    },
                  });
                }}
              >
                Delete
              </Button>
            )}
            {values && values.id && (
              <Button
                variant="outlined"
                onClick={() => {
                  resetForm({
                    values: { id: undefined, name: "", clusterValueRef: "", valid: "" },
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </Box>
          <Box mt={1}>
            <NewDataGrid
              columns={cols}
              url="/level"
              initParams={{ clusterId: cluster?.id }}
              style={{ height: 360 }}
              refresh={refresh}
              onRowSelected={(r) => {
                setSelectedLevel(r);
                setValues(r);
              }}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}
