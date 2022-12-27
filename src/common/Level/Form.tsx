import React, { useMemo, useState } from "react";
import { Box, Tooltip } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import Toast from "app/Toast";
import Button from "app/Button";
import TextField from "app/TextField";
import NewDataGrid from "app/NewDataGrid";
import Confirm from "common/Confirm";
import AsyncCombo from "common/AsyncCombo";
import { LockButton, LockProvider, useLock } from "common/Lock";

import { clusterType } from "api/cluster";
import { createLevel, editLevel, deleteLevel, ILevel } from "api/level";
import { getModifiedValues } from "logic/utils";
import ValidValuesForm from "./ValidValues";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  valid: Yup.array().required(),
});

type formInitialValuesType = Omit<Partial<ILevel>, "valid"> & {
  valid: string;
};
export interface IVals {
  value: string;
  uom: string;
  id?: string;
}

export default function LevelForm({ cluster }: { cluster?: clusterType }) {
  const [refresh, setRefresh] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<ILevel>();
  const [vals, setVals] = useState<IVals[]>([]);
  const [addArray, setAddArray] = useState([]);
  const [deleteArray, setDeleteArray] = useState([]);

  const { lock } = useLock();

  const handleFormSubmit = async (data: any) => {
    try {
      if (data.id) {
        const modified = getModifiedValues(data, selectedLevel);
        await editLevel(data.id, { ...modified, add: addArray, delete: deleteArray });
        Toast("Level updated.", "success");
      } else {
        await createLevel(data);
        Toast("Level created.", "success");
      }
    } catch (error) {
      Toast("An error ocurred", "error");
    } finally {
      setRefresh((p) => p + 1);
      setAddArray([]);
      setDeleteArray([]);
    }
  };

  const { values, handleChange, handleBlur, setFieldValue, setValues, handleSubmit, resetForm } = useFormik({
    validationSchema: schema,
    initialValues: cluster ? ({ clusterId: cluster.id } as any) : ({} as formInitialValuesType),
    onSubmit: handleFormSubmit,
  });

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    Confirm({
      text: `You are going to delete a level with name ${values.name}!`,
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <LockProvider>
        <ValidValuesForm
          open={open}
          onClose={() => setOpen(false)}
          setValuesParent={setValues}
          valuesParent={values}
          setAddArray={setAddArray}
          setDeleteArray={setDeleteArray}
          addArray={addArray}
        />
      </LockProvider>
      <Box display="grid" gridTemplateColumns={values.id ? "1fr 1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr"} gridGap={5}>
        <TextField
          name="name"
          value={values?.name?.split("__")[0]}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Level Name"
          placeholder="Name"
          InputLabelProps={{ shrink: true }}
          disabled={lock}
        />
        <AsyncCombo
          url="/cluster"
          label="Cluster Value"
          filterBy="clusterValue"
          getOptionLabel={(o) => o?.clusterValue}
          getOptionSelected={(o, v) => o?.id === v?.id}
          value={values.clusterId}
          onChange={(e, nv) => setFieldValue("clusterId", nv)}
          disabled={lock || Boolean(cluster && cluster?.id)}
        />
        <TextField
          name="valid"
          value={
            Array.isArray(values.valid) ? values?.valid?.map((val: IVals) => val.value + " " + val.uom).join(" , ") : ""
          }
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Valid Values"
          label="Valid Values"
          InputLabelProps={{ shrink: true }}
          disabled={lock}
          onClick={() => {
            setOpen(true);
          }}
          onKeyDown={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        />
        <Box display="flex" style={{ gap: 5, width: "100%" }} alignItems="center">
          <Button kind={values && values.id ? "edit" : "add"} type="submit" style={{ flex: 1 }} disabled={lock}>
            save
          </Button>
        </Box>
        {values && values.id && (
          <Button kind="delete" disabled={lock} onClick={handleDelete}>
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
        <LevelsDataGrid cluster={cluster} refresh={refresh} setValues={setValues} setSelectedLevel={setSelectedLevel} />
      </Box>
    </form>
  );
}

const LevelsDataGrid = React.memo(
  ({
    cluster,
    refresh,
    setSelectedLevel,
    setValues,
  }: {
    cluster?: clusterType;
    refresh: number;
    setValues: (v: any) => void;
    setSelectedLevel: any;
  }) => {
    const cols = useMemo(
      () => [
        {
          name: "name",
          flex: 1,
          render: ({ data }: any) => (
            <Tooltip title={data.name.split("__")[0]}>
              <span>{data.name.split("__")[0]}</span>
            </Tooltip>
          ),
        },
        {
          name: "clusterValueRef",
          flex: 1,
          header: "Cluster Value",
          render: ({ data }: any) => (
            <Tooltip title={data?.clusterId?.clusterValue}>
              <span>{data?.clusterId?.clusterValue}</span>
            </Tooltip>
          ),
        },
        {
          name: "valid",
          header: "Valid Values",
          flex: 1,
          render: ({ data }: any) => {
            let temp = data.valid;
            temp = temp.map((val: IVals) => val.value + " " + val.uom);
            return (
              <Tooltip title={temp.join(",")}>
                <span>{temp.join(",")}</span>
              </Tooltip>
            );
          },
        },
      ],
      []
    );

    return (
      <NewDataGrid
        columns={cols}
        url="/level"
        initParams={{ clusterId: cluster?.id }}
        style={{ height: 450 }}
        refresh={refresh}
        onRowSelected={(r) => {
          setSelectedLevel(r);
          setValues(r);
        }}
      />
    );
  }
);
