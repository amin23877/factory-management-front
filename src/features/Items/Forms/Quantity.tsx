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
  add?: boolean;
}
export default function QuantityTab({
  handleManualCount,
  values,
  handleUpdateQuantity,
  getFieldProps,
  setFieldValue,
  add,
}: IQForm) {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  const selected = values.result?.find(() => true);

  return (
    <Box
      mt={1}
      display="grid"
      gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
      gridRowGap={10}
      gridColumnGap={10}
    >
      {!add && (
        <>
          <TextField
            name="lastUsedInJOB"
            label="last Used In Bom"
            value={selected?.lastUsedInJOB}
            disabled={lock}
            // onChange={handleChange}
            // onBlur={handleBlur}
          />
          <DateTimePicker
            name="lastCount"
            label="lastCount"
            value={selected?.lastCount}
            disabled={lock}
            format="yyyy-mm-dd"
            onChange={(lastCount) => setFieldValue("lastCount", lastCount)}
            // onBlur={handleBlur}
          />
          <TextField
            name="usedInQuarter"
            label="last used in 90 days"
            value={selected?.usedInQuarter}
            disabled={lock}
            // onChange={handleChange}
            // onBlur={handleBlur}
          />
          <TextField
            name="usedInHalf"
            label="last used in 180 days"
            value={selected?.usedInHalf}
            disabled={lock}
            // onChange={handleChange}
            // onBlur={handleBlur}
          />
          <TextField
            name="usedInYear"
            label="last used in 360 days"
            value={selected?.usedInYear}
            disabled={lock}
            // onChange={handleChange}
            // onBlur={handleBlur}
          />
          <TextField
            name="total"
            label="Total Quantity"
            placeholder="Total Quantity"
            value={selected?.onHandQty + selected?.onOrderQty}
            disabled
          />
        </>
      )}
      <TextField
        name="onHandQty"
        label="Quantity on hand"
        placeholder="Quantity on hand"
        value={selected?.onHandQty}
        disabled={!add}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      {!add && (
        <>
          <TextField
            name="qtyAvailable"
            label="Quantity Available"
            placeholder="Quantity Available"
            value={selected?.onHandQty - selected?.allocatedQty}
            disabled
          />
          <TextField
            name="onOrderQty"
            label="Quantity on order"
            placeholder="Quantity on order"
            value={selected?.onOrderQty}
            disabled
          />
          <TextField
            name="allocatedQty"
            label="Quantity allocated"
            placeholder="Quantity allocated"
            value={selected?.allocatedQty}
            disabled
          />
        </>
      )}

      <TextField
        name="triggerQty"
        label="Trigger Quantity"
        value={selected?.triggerQty}
        style={{ marginBottom: 3 }}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="reorderQty"
        label="Reorder Quantity"
        value={selected?.reorderQty}
        style={{ marginBottom: 3 }}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />

      {!add && (
        <>
          <TextField
            name="qohVal"
            label="QOH Value"
            placeholder="QOH Value"
            value={selected?.totalCost * selected?.onHandQty}
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
        </>
      )}
    </Box>
  );
}
