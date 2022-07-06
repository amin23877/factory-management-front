import React from "react";
import { makeStyles, Box, FormControlLabel, Checkbox, Divider, Paper, useMediaQuery } from "@material-ui/core";

import TextField from "app/TextField";
import Button from "app/Button";
import DateTimePicker from "app/DateTimePicker";

import { formatTimestampToDate } from "logic/date";

import { IItem } from "api/items";
import LinkField from "app/Inputs/LinkFields";

import ItemTypeCombo from "common/ItemTypeCombo";
import { LockButton, useLock } from "common/Lock";

const useStyles = makeStyles({
  label: {
    fontSize: "0.8rem",
  },
});
interface IForm {
  values: IItem;
  errors: any;
  touched: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: any;
  isSubmitting?: boolean;
  device?: boolean;
  boms?: boolean;
}

interface IQForm extends IForm {
  itemId: string;
  handleManualCount?: () => void;
  handleUpdateQuantity?: () => void;
}

const types = [
  { value: "option", title: "Option" },
  { value: "device", title: "Device" },
  { value: "assembly", title: "Assembly" },
  { value: "part", title: "Part" },
  { value: "fru", title: "FRU" },
];

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
  const classes = useStyles();
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();
  // const itemTypes = types.map((t) => (values as any)[t.value] && { value: t.value, title: t.title }).filter((t) => t);

  // const handleItemTypeChange: ((e: any, nv: { value: string }[]) => void) | undefined = (e, nv) => {
  //   const typeMap = types.map((t) => {
  //     if (nv.find((vt) => vt.value === t.value)) {
  //       return { key: t.value, value: true };
  //     }

  //     return { key: t.value, value: false };
  //   });

  //   typeMap.forEach((t) => {
  //     setFieldValue(t.key, t.value);
  //   });
  // };
  return (
    <>
      <Box display="grid" gridTemplateColumns={"1fr 1fr 1fr 1fr"} gridRowGap={10} gridColumnGap={10}>
        <Paper
          style={{
            margin: "0.5em 0",
            padding: "0 0.5em 0 1em",
            backgroundColor: "#eee",
            gridColumnEnd: "span 4",
          }}
        >
          <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"} gridColumnGap={10}>
            <FormControlLabel
              style={{ fontSize: "0.1rem" }}
              checked={values.approvedForSale}
              label="Sales Ap."
              name="approvedForSale"
              onChange={handleChange}
              classes={{ label: classes.label }}
              control={<Checkbox size="small" />}
              disabled={lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.engineeringApproval}
              label="En. Ap."
              name="engineeringApproval"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.obsolete}
              label="Obsolete"
              name="obsolete"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.nonInventoryItem}
              label="Non-Inventory Item"
              name="nonInventoryItem"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.rndOnly}
              label="R&D Only"
              name="rndOnly"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.dontTrackQoh}
              label="Don't Track QOH"
              name="dontTrackQoh"
              onChange={handleChange}
              disabled={lock}
              control={<Checkbox size="small" />}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.dontOrderOnPOs}
              label="Don't order on POs"
              name="dontOrderOnPOs"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.taxable}
              label="Taxable"
              name="taxable"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={lock}
            />

            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.bom}
              label="BOM"
              name="bom"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={lock}
            />
            <div style={{ display: "flex", gridColumnEnd: "span 2", alignItems: "center" }}>
              <FormControlLabel
                classes={{ label: classes.label }}
                style={{ fontSize: "0.7rem" }}
                checked={values.archived}
                label="Archive"
                name="archived"
                onChange={handleChange}
                control={<Checkbox size="small" />}
                disabled={lock}
              />
              {values.archived && (
                <TextField
                  label="Archive Date"
                  value={formatTimestampToDate(values.archiveDate)}
                  name="archiveDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.archiveDate && touched.archiveDate)}
                  placeholder="archiveDate"
                  disabled
                  style={{ gridColumnEnd: "span 2", marginBottom: 10 }}
                />
              )}
            </div>
          </Box>
        </Paper>
        <ItemTypeCombo
          // value={itemTypes}
          value={types.find((t) => t.value === values.class)}
          onChange={(e, nv) => nv && setFieldValue("class", nv.value)}
          style={{ gridColumnEnd: "span 4" }}
          disabled={lock}
        />
        <TextField
          style={{ gridColumnEnd: "span 2" }}
          label="no"
          value={values.no}
          name="no"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.no && touched.no)}
          placeholder="no"
          disabled={lock}
        />
        <TextField
          style={{ gridColumnEnd: "span 2" }}
          label="Item name"
          placeholder="Item name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.name && touched.name)}
          value={values.name}
          disabled={lock}
        />
        <TextField
          multiline
          style={{ gridColumnEnd: "span 4" }}
          rows={3}
          placeholder="description"
          label="Description"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          disabled={lock}
        />
      </Box>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <LockButton />
      </div>
    </>
  );
};

export const Pricing = ({ values, errors, handleChange, handleBlur, touched, boms }: IForm) => {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  return (
    <Box mt={1} display="grid" gridTemplateColumns="auto auto" gridColumnGap={10} gridRowGap={10}>
      <TextField
        label="Labor Cost"
        name="laborCost"
        placeholder="Labor Cost"
        value={values.laborCost}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ marginBottom: 3 }}
        disabled={lock}
      />
      <TextField
        label="retail price"
        name="retailPrice"
        placeholder="Retail Price"
        value={values.retailPrice}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ marginBottom: 3 }}
        disabled={lock}
      />
      <TextField
        label="Total Cost"
        value={values.overrideUse ? values.override : values.totalCost}
        name="totalCost"
        disabled
      />
      {!boms ? (
        <div style={phone ? { gridColumnEnd: "span 2", display: "flex" } : { display: "flex" }}>
          <FormControlLabel
            style={{ fontSize: "0.7rem" }}
            checked={values.overrideUse}
            name="overrideUse"
            label=" "
            onChange={handleChange}
            control={<Checkbox />}
            disabled={lock}
          />
          <TextField
            type="number"
            label="Override"
            name="override"
            placeholder="Override"
            value={values.override}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{ marginBottom: 3 }}
            disabled={!values.overrideUse || lock}
          />
        </div>
      ) : (
        <>
          <TextField
            label=" Bom Total Part Cost"
            name="bomCost"
            placeholder=" Bom Total Part Cost"
            value={values.bomCost}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{ marginBottom: 3 }}
            disabled={lock}
          />
          <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
            <FormControlLabel
              style={{ fontSize: "0.7rem" }}
              checked={values.bomCostEstimateUse}
              name="bomCostEstimateUse"
              label=" "
              onChange={handleChange}
              control={<Checkbox />}
              disabled={lock}
            />
            <TextField
              label=" Bom Cost Estimate"
              name="bomCostEstimate"
              placeholder=" Bom Cost Estimate"
              value={values.bomCostEstimate}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ marginBottom: 3 }}
              disabled={lock}
            />
          </div>
        </>
      )}
    </Box>
  );
};

export const Levels = ({ values, handleChange, handleBlur }: any) => {
  const { lock } = useLock();
  if (!values?.levels || Object.keys(values?.levels)?.length <= 0) {
    return <></>;
  }
  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
      <LockButton />
      <TextField
        label="Cluster Value"
        name="clusterValue"
        placeholder="Cluster Value"
        value={values.clusterValue}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ gridColumn: "span 2" }}
        disabled={lock}
      />
      <Divider style={{ gridColumnEnd: "span 2" }} />
      {Object.keys(values.levels).map((level: any) => (
        <TextField
          label={level}
          name={level}
          placeholder={level}
          defaultValue={values[level] || values.levels[level]}
          value={values[level]}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={lock}
        />
      ))}
    </Box>
  );
};
