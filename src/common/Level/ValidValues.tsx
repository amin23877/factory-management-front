import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "app/Button";
import TextField from "app/TextField";
import { LockButton, useLock } from "common/Lock";

import { ILevel } from "api/level";
import MyDialog from "app/Dialog";
import { IVals } from "./Form";
import { DeleteRounded } from "@material-ui/icons";

const schema = Yup.object().shape({
  value: Yup.string().required(),
  uom: Yup.string().required(),
});

export default function ValidValuesForm({
  open,
  onClose,
  valuesParent,
  setValuesParent,
  setAddArray,
  setDeleteArray,
  addArray,
}: {
  open: boolean;
  onClose: () => void;
  valuesParent: any;
  setValuesParent: any;
  setAddArray: any;
  setDeleteArray: any;
  addArray: any;
}) {
  const [selectedValue, setSelectedValue] = useState<ILevel>();
  const [validValues, setValidValues] = useState<IVals[]>(valuesParent.valid);
  const [refresh, setRefresh] = useState(0);
  const { lock } = useLock();
  useEffect(() => {
    setValidValues(valuesParent.valid);
  }, [valuesParent]);

  const handleFormSubmit = (data: any) => {
    if (selectedValue) {
      let temp = validValues;
      temp[selectedValue.index].uom = data.uom;
      temp[selectedValue.index].value = data.value;
      setValidValues(temp);
      setValuesParent((p: any) => ({ ...p, valid: temp }));
      setRefresh((p) => p + 1);
    } else {
      setAddArray((prev: any) => [...prev, data]);
      let temp = validValues ? validValues : [];
      temp.push({ ...data, id: temp.length });
      setValidValues(temp);
      setValuesParent((p: any) => ({ ...p, valid: temp }));
      setRefresh((p) => p + 1);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, setValues } = useFormik({
    validationSchema: schema,
    initialValues: {} as any,
    onSubmit: handleFormSubmit,
  });

  const handleDelete = (val: any) => {
    let temp = validValues;
    let addTemp: any = addArray;
    let newArr = temp.filter(function (value, index, arr) {
      return index !== val?.index;
    });
    let newAddArray = addTemp.filter(function (value: any, index: number, arr: any[]) {
      return value.value !== val?.val.value && value.uom !== val.val.uom;
    });
    let dontAddArray = addTemp.filter(function (value: any, index: number, arr: any[]) {
      return value.value === val?.val.value && value.uom === val.val.uom;
    });
    setAddArray(newAddArray);
    if (dontAddArray.length === 0) {
      setDeleteArray((prev: any) => [...prev, { value: val.val.value, uom: val.val.uom }]);
    }
    setValidValues(newArr);
    setValuesParent((p: any) => ({ ...p, valid: newArr }));
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
            name="uom"
            value={values.uom}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="UOM"
            label="UOM"
            InputLabelProps={{ shrink: true }}
            disabled={lock}
          />
          <Box display="flex" style={{ gap: 5, width: "100%", alignItems: "center" }}>
            <Button kind={"add"} type="submit" style={{ flex: 1 }} disabled={lock}>
              add
            </Button>
            <LockButton />
          </Box>
        </Box>
        <Box mt={1}>
          <ValidValuesDataGrid
            valuesParent={validValues}
            setValues={setValues}
            setSelectedValue={setSelectedValue}
            refresh={refresh}
            handleDelete={handleDelete}
          />
        </Box>
      </form>
    </MyDialog>
  );
}

const ValidValuesDataGrid = React.memo(
  ({
    valuesParent,
    setSelectedValue,
    refresh,
    setValues,
    handleDelete,
  }: {
    setSelectedValue: any;
    valuesParent: IVals[];
    refresh: any;
    setValues: (v: any) => void;
    handleDelete: any;
  }) => {
    return (
      <Box m={2} style={{ maxHeight: "450px", overflowY: "scroll" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr style={{ background: "#202731", color: "#fff" }}>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>Value</td>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>UOM</td>
            </tr>
            {Array.isArray(valuesParent) &&
              valuesParent.map((val, index) => (
                <tr>
                  <td style={{ padding: "10px", border: "1px solid #eee" }}>{val.value}</td>
                  <td style={{ padding: "10px", border: "1px solid #eee" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ flex: 1 }}>{val.uom}</span>
                      <span
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDelete({ val, index: index })}
                      >
                        <DeleteRounded />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
    );
  }
);
