import React, { useState } from "react";
import { makeStyles, Box, FormControlLabel, Checkbox, Divider, Paper, useMediaQuery } from "@material-ui/core";

import TextField from "app/TextField";
import Button from "app/Button";

import { formatTimestampToDate } from "logic/date";

import { IItem } from "api/items";

import ItemTypeCombo from "common/ItemTypeCombo";
import { LockButton, useLock } from "common/Lock";

import AsyncCombo from "common/AsyncCombo";
import { MenuRounded } from "@material-ui/icons";
import LevelsMenu from "features/Engineering/BOM/ChangePartModal/LevelsMenu";

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
  add?: boolean;
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
  add,
}: IForm) => {
  const classes = useStyles();
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();
  const [clusterId, setClusterId] = useState<string>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [levelFilters, setLevelFilters] = useState<{ [key: string]: string }>();

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
      <LevelsMenu
        onClose={() => setAnchorEl(undefined)}
        anchorEl={anchorEl}
        clusterId={clusterId}
        levelFilters={levelFilters}
        setLevelFilters={setLevelFilters}
      />
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
              disabled={!add && lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.engineeringApproval}
              label="En. Ap."
              name="engineeringApproval"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={!add && lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.obsolete}
              label="Obsolete"
              name="obsolete"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={!add && lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.nonInventoryItem}
              label="Non-Inventory Item"
              name="nonInventoryItem"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={!add && lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.rndOnly}
              label="R&D Only"
              name="rndOnly"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={!add && lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.dontTrackQoh}
              label="Don't Track QOH"
              name="dontTrackQoh"
              onChange={handleChange}
              disabled={!add && lock}
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
              disabled={!add && lock}
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.taxable}
              label="Taxable"
              name="taxable"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={!add && lock}
            />

            <FormControlLabel
              classes={{ label: classes.label }}
              style={{ fontSize: "0.7rem" }}
              checked={values.canBom}
              label="BOM"
              name="canBom"
              onChange={handleChange}
              control={<Checkbox size="small" />}
              disabled={!add && lock}
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
                disabled={!add && lock}
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
          disabled={!add && lock}
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
          disabled={!add && lock}
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
          disabled={!add && lock}
        />
        <TextField
          label="Manufacturer"
          placeholder="Manufacturer"
          name="manufacturer"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.manufacturer && touched.manufacturer)}
          value={values.manufacturer}
          disabled={!add && lock}
        />
        <TextField
          label="Manufacturer Product Number"
          placeholder="Manufacturer Product Number"
          name="manufacturerProductNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.manufacturerProductNumber && touched.manufacturerProductNumber)}
          value={values.manufacturerProductNumber}
          disabled={!add && lock}
        />
        <AsyncCombo
          label="Cluster"
          filterBy="clusterValue"
          getOptionLabel={(o) => o?.clusterValue || "No-Name"}
          getOptionSelected={(o, v) => o?.id === v?.id}
          url="/cluster"
          defaultParams={{ class: values.class }}
          value={clusterId}
          onChange={(e, nv) => nv?.id && setClusterId(nv?.id)}
        />
        <Button
          startIcon={<MenuRounded />}
          color="secondary"
          disabled={!clusterId}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          Levels
        </Button>
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
          disabled={!add && lock}
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
        {!add && <LockButton />}
      </div>
    </>
  );
};

export const Pricing = ({ values, errors, handleChange, handleBlur, touched, boms, add }: IForm) => {
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
        disabled={!add && lock}
      />
      <TextField
        label="retail price"
        name="retailPrice"
        placeholder="Retail Price"
        value={values.retailPrice}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ marginBottom: 3 }}
        disabled={!add && lock}
      />
      <TextField
        label="Total Cost"
        value={values.overrideUse ? values.override : values.totalCost}
        name="totalCost"
        disabled={!add && lock}
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
            disabled={!add && lock}
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
            disabled={!add && (!values.overrideUse || lock)}
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
            disabled={!add && lock}
          />
          <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
            <FormControlLabel
              style={{ fontSize: "0.7rem" }}
              checked={values.bomCostEstimateUse}
              name="bomCostEstimateUse"
              label=" "
              onChange={handleChange}
              control={<Checkbox />}
              disabled={!add && lock}
            />
            <TextField
              label=" Bom Cost Estimate"
              name="bomCostEstimate"
              placeholder=" Bom Cost Estimate"
              value={values.bomCostEstimate}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ marginBottom: 3 }}
              disabled={!add && lock}
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
