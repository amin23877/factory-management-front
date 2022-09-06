import { Box, useMediaQuery } from "@material-ui/core";
import { useLock } from "common/Lock";
import React from "react";
import TextField from "app/TextField";
import Button from "app/Button";
import DateTimePicker from "app/DateTimePicker";

interface IQForm {
  handleManualCount?: () => void;
  handleUpdateQuantity?: () => void;
  values: any;
  getFieldProps: any;
  setFieldValue: any;
}
export default function QuantityTab({
  handleManualCount,
  values,
  handleUpdateQuantity,
  getFieldProps,
  setFieldValue,
}: IQForm) {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();
  return (
    <Box
      mt={1}
      display="grid"
      gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
      gridRowGap={10}
      gridColumnGap={10}
    >
      <TextField
        label="last Used In Bom"
        value={values.lastUsedInJOB}
        {...getFieldProps("lastUsedInJOB")}
        disabled={lock}
      />
      <DateTimePicker
        value={values.lastCount}
        label="lastCount"
        {...getFieldProps("lastCount")}
        disabled={lock}
        onChange={(lastCount) => setFieldValue("lastCount", lastCount)}
        format="yyyy-mm-dd"
      />
      <TextField
        {...getFieldProps("usedInQuarter")}
        disabled={lock}
        label="last used in 90 days"
        value={values.usedInQuarter}
      />
      <TextField
        {...getFieldProps("usedInHalf")}
        disabled={lock}
        label="last used in 180 days"
        value={values.usedInHalf}
      />
      <TextField
        label="last used in 360 days"
        value={values.usedInYear}
        {...getFieldProps("usedInYear")}
        disabled={lock}
      />
      <TextField
        label="Total Quantity"
        placeholder="Total Quantity"
        name="total"
        value={values.onHandQty + values.onOrderQty}
        disabled
      />
      <TextField
        label="Quantity on hand"
        placeholder="Quantity on hand"
        name="onHandQty"
        value={values.onHandQty}
        disabled
      />
      <TextField
        label="Quantity Available"
        placeholder="Quantity Available"
        name="qtyAvailable"
        value={values.onHandQty - values.allocatedQty}
        disabled
      />
      <TextField
        label="Quantity on order"
        placeholder="Quantity on order"
        name="onOrderQty"
        value={values.onOrderQty}
        disabled
      />
      <TextField
        label="Quantity allocated"
        placeholder="Quantity allocated"
        name="allocatedQty"
        value={values.allocatedQty}
        disabled
      />

      <TextField
        label="Trigger Quantity"
        value={values.triggerQty}
        style={{ marginBottom: 3 }}
        {...getFieldProps("triggerQty")}
        disabled={lock}
      />
      <TextField
        label="Reorder Quantity"
        value={values.reorderQty}
        style={{ marginBottom: 3 }}
        {...getFieldProps("reorderQty")}
        disabled={lock}
      />

      <TextField
        label="QOH Value"
        name="qohVal"
        placeholder="QOH Value"
        value={values.totalCost * values.onHandQty}
        disabled
        style={{ marginBottom: 3 }}
      />
      <div
        style={
          phone
            ? { gridColumnEnd: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }
            : { gridColumnEnd: "span 3", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }
        }
      >
        {handleUpdateQuantity && (
          <Button kind="edit" onClick={handleUpdateQuantity} disabled={lock}>
            Update quantity
          </Button>
        )}
        {handleManualCount && (
          <Button kind="add" disabled={lock} onClick={handleManualCount}>
            Adjust manual count
          </Button>
        )}
      </div>
    </Box>
  );
}
