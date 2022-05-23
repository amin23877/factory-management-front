import React from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
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
          <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
            <TextField label="Name" {...getFieldProps("name")} />
            <TextField label="Phone" {...getFieldProps("phone")} />
            <TextField label="Ext" {...getFieldProps("ext")} />
            <TextField label="Email" {...getFieldProps("email")} />
            <TextField label="Product Line" {...getFieldProps("productLine")} />
            <TextField type="number" label="Regular Commission" {...getFieldProps("regularCommission")} />
            <TextField type="number" label="Overage Commission" {...getFieldProps("overageCommission")} />
            <LinkField
              label="Sales Person"
              filterLabel="username"
              getOptionLabel={(o) => o?.username || ""}
              getOptionList={(res) => res}
              getOptionValue={(r) => r.id}
              path="/employee"
              value={values.salesPerson}
              onChange={(c, nv) => setFieldValue("salesPerson", nv.id)}
            />
            <FormControl>
              <FormLabel>Type</FormLabel>
              <RadioGroup {...getFieldProps("type")}>
                <FormControlLabel control={<Radio />} value="Rep" label="Rep" />
                <FormControlLabel control={<Radio />} value="OEM" label="OEM" />
                <FormControlLabel control={<Radio />} value="Buy/Resell" label="Buy/Resell" />
              </RadioGroup>
            </FormControl>
            <FormControlLabel control={<Checkbox />} label="Active" {...getFieldProps("active")} />
            <Box display="flex" style={{ gridColumnEnd: "span 2" }}>
              <Button type="submit" kind="edit" disabled={lock} fullWidth>
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
