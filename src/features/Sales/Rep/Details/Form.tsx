import React from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from "@material-ui/core";
import { Formik, Form } from "formik";

import Toast from "app/Toast";
import Button from "app/Button";
import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";

import { updateRep, repType } from "api/rep";
import { getModifiedValues } from "logic/utils";
import { useLock, LockButton } from "common/Lock";

export default function EditForm({ initialValues }: { initialValues: repType }) {
  const { lock } = useLock();

  const handleSubmit = async (data: any) => {
    try {
      const modifiedData = getModifiedValues(data, initialValues);
      await updateRep(initialValues.id, modifiedData);
      Toast("Rep updated successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ getFieldProps, values, setFieldValue }) => (
        <Form>
          <Paper
            style={{
              margin: "0 0 2em 0",
              padding: "0.5em",
              backgroundColor: "#eee",
              gridColumnEnd: "span 3",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              columnGap: "15px",
            }}
          >
            <FormControl style={{ gridColumnEnd: "span 3" }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup {...getFieldProps("type")} row>
                <FormControlLabel control={<Radio />} value="Rep" label="Rep" disabled={lock} />
                <FormControlLabel control={<Radio />} value="OEM" label="OEM" disabled={lock} />
                <FormControlLabel control={<Radio />} value="Buy/Resell" label="Buy/Resell" disabled={lock} />
              </RadioGroup>
            </FormControl>
            <FormControlLabel control={<Checkbox />} label="Active" {...getFieldProps("active")} disabled={lock} />
          </Paper>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
            <TextField label="Name" {...getFieldProps("name")} disabled={lock} />
            <TextField label="Phone" {...getFieldProps("phone")} disabled={lock} />
            <TextField label="Ext" {...getFieldProps("ext")} disabled={lock} />
            <TextField label="Email" {...getFieldProps("email")} disabled={lock} />
            <TextField label="Product Line" {...getFieldProps("productLine")} disabled={lock} />
            <TextField
              type="number"
              label="Regular Commission"
              {...getFieldProps("regularCommission")}
              disabled={lock}
            />
            <TextField
              type="number"
              label="Overage Commission"
              {...getFieldProps("overageCommission")}
              disabled={lock}
            />
            <LinkField
              label="Sales Person"
              filterLabel="username"
              getOptionLabel={(o) => o?.username || ""}
              getOptionList={(res) => res}
              getOptionValue={(r) => r.id}
              path="/employee"
              value={values.salesPerson}
              onChange={(c, nv) => setFieldValue("salesPerson", nv.id)}
              disabled={lock}
            />

            <Box display="flex" style={{ gridColumnEnd: "span 2" }}>
              <Button type="submit" kind="edit" disabled={lock} fullWidth style={{ display: "none" }}>
                Submit
              </Button>
              <LockButton />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
