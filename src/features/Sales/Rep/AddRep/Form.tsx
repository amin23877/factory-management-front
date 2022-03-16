import React from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { Formik, Form } from "formik";

import Button from "app/Button";
import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";

import { createRep } from "api/rep";

export default function AddForm({ onDone }: { onDone: () => void }) {
  const handleSubmit = async (data: any) => {
    try {
      await createRep(data);
      onDone();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={{} as any} onSubmit={handleSubmit}>
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
            <FormControlLabel control={<Checkbox />} label="Active" {...getFieldProps("active")} />
            <LinkField
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
            <Button type="submit" kind="add" style={{ gridColumn: "span 2" }}>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
