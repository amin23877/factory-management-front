import React, { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import Toast from "app/Toast";
import Button from "app/Button";
import TextField from "app/TextField";
import Confirm from "common/Confirm";
import { LockButton, useLock } from "common/Lock";

import { deleteLevel, ILevel } from "api/level";
import MyDialog from "app/Dialog";
import { IVals } from "./Form";

const schema = Yup.object().shape({
  value: Yup.string().required(),
  UOM: Yup.string().required(),
});

export default function ValidValuesForm({
  open,
  onClose,
  vals,
  setVals,
}: {
  open: boolean;
  onClose: () => void;
  vals: IVals[];
  setVals: Dispatch<SetStateAction<IVals[]>>;
}) {
  const [selectedValue, setSelectedValue] = useState<ILevel>();
  const [validValues, setValidValues] = useState<IVals[]>(vals);
  const [refresh, setRefresh] = useState(0);
  const { lock } = useLock();

  const handleFormSubmit = (data: any) => {
    if (selectedValue) {
      let temp = validValues;
      temp[selectedValue.index].UOM = data.UOM;
      temp[selectedValue.index].value = data.value;
      setValidValues(temp);
      setVals(temp);
      setRefresh((p) => p + 1);
    } else {
      let temp = validValues;
      temp.push({ ...data, id: temp.length });
      setValidValues(temp);
      setVals(temp);
      setRefresh((p) => p + 1);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, resetForm, setValues } = useFormik({
    validationSchema: schema,
    initialValues: {} as any,
    onSubmit: handleFormSubmit,
  });

  const handleDelete = () => {
    let temp = validValues;
    let newArr = temp.filter(function (value, index, arr) {
      return index !== selectedValue?.index;
    });
    setValidValues(newArr);
    setVals(newArr);
    setRefresh((p) => p + 1);
  };

  return (
    <MyDialog open={open} onClose={onClose} title="Valid Values" maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gridTemplateColumns={values.id ? "1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr"}
          gridGap={5}
          p={2}
          pb={0}
        >
          <TextField
            name="value"
            value={values?.value?.split("__")[0]}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Value"
            placeholder="value"
            InputLabelProps={{ shrink: true }}
            disabled={lock}
          />
          <TextField
            name="UOM"
            value={values.UOM}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="UOM"
            label="UOM"
            InputLabelProps={{ shrink: true }}
            disabled={lock}
          />
          <Box display="flex" style={{ gap: 5, width: "100%" }}>
            <Button kind={selectedValue ? "edit" : "add"} type="submit" style={{ flex: 1 }} disabled={lock}>
              add
            </Button>
            <LockButton />
          </Box>
          {selectedValue && (
            <Button kind="delete" disabled={lock} onClick={handleDelete} style={{ padding: "2px 10px" }}>
              Delete
            </Button>
          )}
          {selectedValue && (
            <Button
              variant="outlined"
              onClick={() => {
                resetForm({
                  values: { value: "", UOM: "" },
                });
                setSelectedValue(undefined);
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
        <Box mt={1}>
          <ValidValuesDataGrid
            vals={validValues}
            setValues={setValues}
            setSelectedValue={setSelectedValue}
            refresh={refresh}
          />
        </Box>
      </form>
    </MyDialog>
  );
}

const ValidValuesDataGrid = React.memo(
  ({
    vals,
    setSelectedValue,
    refresh,
    setValues,
  }: {
    setSelectedValue: any;
    vals: IVals[];
    refresh: any;
    setValues: (v: any) => void;
  }) => {
    return (
      <Box m={2} style={{ maxHeight: "450px", overflowY: "scroll" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr style={{ background: "#202731", color: "#fff" }}>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>Value</td>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>UOM</td>
            </tr>
            {vals.map((val, index) => (
              <tr>
                <td
                  onClick={() => {
                    setSelectedValue({ ...val, index: index });
                    setValues(val);
                  }}
                  style={{ padding: "10px", border: "1px solid #eee", cursor: "pointer" }}
                >
                  {val.value}
                </td>
                <td
                  onClick={() => {
                    setSelectedValue({ ...val, index: index });
                    setValues(val);
                  }}
                  style={{ padding: "10px", border: "1px solid #eee", cursor: "pointer" }}
                >
                  {val.UOM}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
);
