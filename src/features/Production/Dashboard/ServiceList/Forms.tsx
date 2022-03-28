import React from "react";
import { Box } from "@material-ui/core";

import TextField from "../../../../app/TextField";
import { formatTimestampToDate } from "../../../../logic/date";
import { ArraySelect } from "../../../../app/Inputs";
// import { DateTimePicker } from "@material-ui/pickers";
// import { getAllEmployees } from "../../../../api/employee";

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

export const General = ({
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
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
        <ArraySelect
          fullWidth
          label="Status"
          items={["New", "Done"]}
          name="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.status)}
        />
        <TextField
          label="SO Date"
          value={formatTimestampToDate(values.date)}
          name="soDate"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.soDate && touched.soDate)}
          placeholder="SO Date"
          disabled
        />
        <ArraySelect
          fullWidth
          label="Production Status"
          items={["Manufacturing", "Evaluation", "Test"]}
          name="productionStatus"
          value={values.productionStatus}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.productionStatus)}
        />
        <TextField
          label="Ticket Number"
          value={values.number}
          name="number"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.number && touched.number)}
          placeholder="Ticket Number"
        />
        <TextField
          label="Ticket Name"
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.name && touched.name)}
          placeholder="Ticket Name"
        />
        <TextField
          label="Ticket Description"
          value={values.description}
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.description && touched.description)}
          placeholder="Ticket Description"
        />
      </Box>
    </>
  );
};

export const UnitInfo = ({
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
        {/* <TextField
                    name="laborCost"
                    value={values.laborCost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.laborCost)}
                    helperText={errors.laborCost}
                    size="small"
                    placeholder="Labor Cost"
                    label="Labor Cost"
                /> */}
        {/* <FieldSelect
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    name="assignee"
                    onChange={handleChange}
                    label="Employee"
                    placeholder="Employee"
                    value={typeof values.assignee === "string" ? values.assignee : values.assignee?.id}
                /> */}
        <TextField
          label="Unit"
          placeholder="Unit"
          name="number"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.number && touched.number)}
          value={values.number}
          disabled
        />
        <TextField
          label="Device Number"
          value={values?.ItemId?.no}
          name="no"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.no && touched.no)}
          placeholder="Device Number"
          disabled
        />
        <TextField
          label="Device name"
          placeholder="Device name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.name && touched.name)}
          value={values?.ItemId?.name}
          style={{ gridColumnEnd: "span 2" }}
          disabled
        />

        <TextField
          multiline
          style={{ gridColumnEnd: "span 2" }}
          rows={4}
          placeholder="Description"
          label="Description"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.ItemId?.description}
          disabled
        />
      </Box>
    </>
  );
};

export const Warranty = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
      <TextField
        label="Warranty Number"
        placeholder="Warranty Number"
        name="warrantyNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.warrantyNumber && touched.warrantyNumber)}
        value={values.warrantyNumber}
      />
      <TextField
        label="Warranty Name"
        placeholder="Warranty Name"
        name="warrantyName"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.warrantyName && touched.warrantyName)}
        value={values.warrantyName}
      />
      <TextField
        label="Expiration Date"
        placeholder="Expiration Date"
        name="expireDate"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.expireDate && touched.expireDate)}
        value={values.expireDate}
      />
      <TextField
        label="Purchase Date"
        placeholder="Purchase Date"
        name="purchaseDate"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.purchaseDate && touched.purchaseDate)}
        value={values.purchaseDate}
      />
      <TextField
        label="SO Ship Date"
        placeholder="SO Ship Date"
        name="soShipDate"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.soShipDate && touched.soShipDate)}
        value={values.soShipDate}
      />
    </Box>
  );
};

export const BatteryInfo = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10}>
      <TextField
        label="Battery QTY"
        placeholder="Battery QTY"
        name="batteryQty"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.batteryQty && touched.batteryQty)}
        value={values.batteryQty}
      />
      <TextField
        label="Battery Cabinet QTY"
        placeholder="Battery Cabinet QTY"
        name="batteryCabinetQty"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.batteryCabinetQty && touched.batteryCabinetQty)}
        value={values.batteryCabinetQty}
      />
      <TextField
        label="Battery Type"
        placeholder="Battery Type"
        name="batteryType"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.batteryType && touched.batteryType)}
        value={values.batteryType}
      />
      <TextField
        label="Cabinet"
        placeholder="Cabinet"
        name="cabinet"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.cabinet && touched.cabinet)}
        value={values.cabinet}
      />
      <TextField
        label="Battery Diagram"
        placeholder="Battery Diagram"
        name="batteryDiagram"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.batteryDiagram && touched.batteryDiagram)}
        value={values.batteryDiagram}
      />
      <TextField
        label="Battery Order Date"
        placeholder="Battery Order Date"
        name="orderDate"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.orderDate && touched.orderDate)}
        value={values.orderDate}
      />
      <TextField
        label="PO"
        placeholder="PO"
        name="batteryPO"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.batteryPO && touched.batteryPO)}
        value={values.batteryPO}
      />
      <TextField
        label="Date Required"
        placeholder="Date Required"
        name="dateRequired"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.dateRequired && touched.dateRequired)}
        value={values.dateRequired}
        style={{ gridColumnEnd: "span 2" }}
      />
      <TextField
        label="Battery Shipping Address"
        placeholder="Battery Shipping Address"
        name="batteryShippingAddress"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.batteryShippingAddress && touched.batteryShippingAddress)}
        value={values.batteryShippingAddress}
        multiline
        rows={2}
        style={{ gridColumnEnd: "span 3" }}
      />
    </Box>
  );
};
