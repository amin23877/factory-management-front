import React from "react";
import Box from "@material-ui/core/Box";

import TextField from "app/TextField";
import { useLock, LockProvider, LockButton } from "common/Lock";

function formatDateValue(v: any) {
  if (v) {
    return new Date(v).toISOString().slice(0, 10);
  }
  return null;
}

function SummaryContent({ getFieldProps, values }: { getFieldProps: any; values?: any }) {
  //   const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="repeat(4, 1fr)" gridGap={8}>
      {/* <LockButton /> */}
      <TextField label="Sub Total" {...getFieldProps("subTotal")} disabled />
      <TextField label="Sub Total Taxable" {...getFieldProps("subTotal")} disabled />
      <TextField label="Discount Rate" {...getFieldProps("discountRate")} disabled />
      <TextField label="Discount" {...getFieldProps("discount")} disabled />
      <TextField label="Sales Tax Rate" {...getFieldProps("salesTaxRate")} disabled />
      <TextField label="Total Tax" {...getFieldProps("totalTax")} disabled />
      <TextField label="Total Freight" {...getFieldProps("totalFreight")} disabled />
      <TextField label="Total" {...getFieldProps("total")} disabled />
    </Box>
  );
}

export default function Approvals({ getFieldProps, values }: { getFieldProps: any; values?: any }) {
  return (
    <LockProvider>
      <SummaryContent getFieldProps={getFieldProps} values={values} />
    </LockProvider>
  );
}
