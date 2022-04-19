import React from "react";
import { Box } from "@material-ui/core";
import DateTimePicker from "app/DateTimePicker";

import TextField from "app/TextField";
import { formatTimestampToDate } from "logic/date";

interface IForm {
  values: any;
  errors: any;
  touched: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: any;
  isSubmitting?: boolean;
  device?: boolean;
}
export const General = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
        <TextField
          label="Unit name"
          placeholder="Unit name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.name && touched.name)}
          value={values?.name}
          style={{ gridColumnEnd: "span 2" }}
          disabled
        />
        <TextField
          multiline
          style={{ gridColumnEnd: "span 2" }}
          rows={3}
          placeholder="Unit Description"
          label="Unit Description"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.description}
          disabled
        />
        <TextField
          label="Serial Number"
          value={values?.serial}
          name="no"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.no && touched.no)}
          placeholder="Serial Number"
          disabled
        />
        <TextField
          label="Status"
          name="status"
          value={values.status}
          defaultValue={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.status)}
        />
        <TextField
          label="Number"
          placeholder="Number"
          name="number"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.number && touched.number)}
          value={values.number}
          disabled
        />
        <TextField
          label="SO"
          value={values?.SOId?.number}
          name="so"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.SOId && touched.SOId)}
          placeholder="SO"
          disabled
        />
      </Box>
    </>
  );
};

export const Status = ({
  isSubmitting,
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  setFieldValue,
  device,
}: IForm) => {
  return (
    <>
      <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
        <DateTimePicker
          size="small"
          value={values.warrantyExpDate}
          name="warrantyExpDate"
          label="Warranty exp date"
          onChange={(date) => setFieldValue("warrantyExpDate", date)}
          onBlur={handleBlur}
        />
        <TextField
          value={formatTimestampToDate(values?.SOId?.date)}
          name="purchaseDate"
          label="purchase date"
          onBlur={handleBlur}
          disabled
        />
        <TextField
          value={formatTimestampToDate(values?.SOId?.estimatedShipDate)}
          name="estimatedShipDate"
          label="Estimated ship date"
          onBlur={handleBlur}
          disabled
        />

        <TextField
          value={formatTimestampToDate(values?.SOId?.actualShipDate)}
          name="actualShipDate"
          label="Actual ship date"
          onBlur={handleBlur}
          disabled
        />
        <DateTimePicker
          value={values.estimatedLeadTime}
          name="estimatedLeadTime"
          label="Estimated Lead time"
          onChange={(date) => setFieldValue("estimatedLeadTime", date)}
          onBlur={handleBlur}
        />
        <DateTimePicker
          value={values.actualLeadTime}
          name="actualLeadTime"
          label="Actual Lead Time"
          onChange={(date) => setFieldValue("actualLeadTime", date)}
          onBlur={handleBlur}
        />
      </Box>
    </>
  );
};

export const Expense = ({
  isSubmitting,
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  setFieldValue,
  device,
}: IForm) => {
  return (
    <>
      <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
        <TextField
          label="Item Labor Time"
          value={values.itemLaborTime}
          name="itemLaborTime"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.itemLaborTime && touched.itemLaborTime)}
          placeholder="Item Labor Time"
          disabled
        />
        <TextField
          label="Item Labor Cost"
          value={values.itemLaborCost}
          name="itemLaborCost"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.itemLaborCost && touched.itemLaborCost)}
          placeholder="Item Labor Cost"
          disabled
        />
        <TextField
          label="Item BOM Cost"
          value={values.bomCost}
          name="bomCost"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.bomCost && touched.bomCost)}
          placeholder="Item BOM Cost"
        />
        <TextField
          label="Item Total Cost"
          value={values.ItemId?.cost}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.ItemId?.cost && touched.ItemId?.cost)}
          placeholder="Item Total Cost"
          disabled
        />
      </Box>
    </>
  );
};

export const Shipping = ({
  isSubmitting,
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  setFieldValue,
  device,
}: IForm) => {
  return (
    <>
      <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
        <TextField
          label="Entity"
          value={values.entity}
          name="entity"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.entity && touched.entity)}
          placeholder="Entity"
        />
        <TextField
          label="Shipping Address"
          value={values?.SOId?.shippingAddress}
          name="shippingAddress"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors?.SOId?.shippingAddress && touched?.SOId?.shippingAddress)}
          placeholder="Shipping Address"
        />
        <TextField
          label="Contact Person"
          value={values.contactPerson}
          name="contactPerson"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.contactPerson && touched.contactPerson)}
          placeholder="Contact Person"
        />
        <TextField
          label="Contact Person Email"
          value={values.contactPersonEmail}
          name="contactPersonEmail"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.contactPersonEmail && touched.contactPersonEmail)}
          placeholder="Contact Person Email"
        />
        <TextField
          label="Contact Person Phone Number"
          value={values.contactPersonPhone}
          name="contactPersonPhone"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.contactPersonPhone && touched.contactPersonPhone)}
          placeholder="Contact Person Phone Number"
        />
        <TextField
          label="Unit Location"
          value={values.unitLocation}
          name="unitLocation"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.unitLocation && touched.unitLocation)}
          placeholder="Unit Location"
        />
      </Box>
    </>
  );
};
