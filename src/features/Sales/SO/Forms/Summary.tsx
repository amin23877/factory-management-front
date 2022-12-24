import React from "react";
import Box from "@material-ui/core/Box";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Summary({ getFieldProps, values }: { getFieldProps: any; values?: any }) {
  const { lock } = useLock();

  console.log("summary: ", values);

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="repeat(4, 1fr)" gridGap={8}>
      {/* <LockButton /> */}
      <TextField
        name="subtotal"
        label="Sub Total"
        placeholder="Sub Total"
        value={values.subtotal}
        disabled
        // {...getFieldProps("subTotal")}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="subtotalTaxable"
        label="Sub Total Taxable"
        placeholder="Sub Total Taxable"
        value={values.subtotalTaxable}
        disabled
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="discountRate"
        label="Discount Rate"
        placeholder="Discount"
        value={values.discountRate}
        disabled
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="discount"
        label="Discount"
        value={values.discount}
        disabled
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="salesTaxRate"
        label="Sales Tax Rate"
        placeholder="Sales Tax Rate"
        value={values.salesTaxRate}
        disabled
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="totalTax"
        label="Total Tax"
        placeholder="Total Tax"
        value={values.totalTax}
        disabled
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="totalFreight"
        label="Total Freight"
        placeholder="Total Freight"
        value={values.totalFreight}
        disabled
      />
      <TextField
        name="total"
        label="Total"
        placeholder="Total"
        value={values.total}
        disabled
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
    </Box>
  );
}
