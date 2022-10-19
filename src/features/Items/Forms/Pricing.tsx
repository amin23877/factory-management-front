import React, { useState } from "react";
import useSWR from "swr";

import AddPricing, { pricingType } from "../AddPricing";
import TextField from "app/TextField";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import { IItem } from "api/items";

import { useLock } from "common/Lock";
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, useMediaQuery } from "@material-ui/core";

const pricingCols = [
  { field: "label", headerName: "Label", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "nonCommissionable", headerName: "no Com.", flex: 1, type: "boolean" },
];

export default function PricingTab({
  boms,
  itemId,
  values,
  getFieldProps,
}: {
  itemId: string;
  values: any;
  getFieldProps: any;
  boms?: { result: any[]; total: number };
}) {
  const [addPricing, setAddPricing] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<pricingType>();
  const { data } = useSWR<IItem>(`/item/${itemId}`);
  const { lock } = useLock();
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      {data && (
        <AddPricing
          item={data}
          initialValues={selectedPricing}
          open={addPricing}
          onClose={() => setAddPricing(false)}
        />
      )}
      <div style={{ maxWidth: "83vw" }}>
        <Box display="flex" justifyContent="space-between">
          {" "}
          <Button
            variant="outlined"
            style={{ marginBottom: 10 }}
            disabled={lock}
            onClick={() => {
              setSelectedPricing(undefined);
              setAddPricing(true);
            }}
          >
            Add Pricing
          </Button>
        </Box>
        <BaseDataGrid
          rows={data?.pricing || []}
          cols={pricingCols}
          height={220}
          pagination
          onRowSelected={(r) => {
            if (!lock) {
              setSelectedPricing(r);
              setAddPricing(true);
            }
          }}
        />
        <Box mt={1} display="grid" gridTemplateColumns="auto auto" gridColumnGap={10} gridRowGap={10}>
          <TextField
            label="Labor Cost"
            value={values.laborCost}
            {...getFieldProps("laborCost")}
            disabled={lock}
            style={{ marginBottom: 3 }}
          />
          <TextField
            label="Total Cost"
            value={values.overrideUse ? values.override : values.totalCost}
            name="totalCost"
            disabled
          />

          {!values.canBom ? (
            <div style={phone ? { gridColumnEnd: "span 2", display: "flex" } : { display: "flex" }}>
              <FormControlLabel
                style={{ fontSize: "0.7rem" }}
                checked={values.overrideUse}
                label=" "
                {...getFieldProps("overrideUse")}
                control={<Checkbox />}
                disabled={lock}
              />
              <TextField
                type="number"
                label="Override"
                value={values.override}
                {...getFieldProps("override")}
                style={{ marginBottom: 3 }}
                disabled={!values.overrideUse || lock}
              />
            </div>
          ) : (
            <RadioGroup row {...getFieldProps("bomCostEstimateUse")} value={values.bomCostEstimateUse}>
              <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
                <FormControlLabel value={"false"} control={<Radio size="small" />} label="" disabled={lock} />
                <TextField
                  label=" Bom  Cost"
                  value={values.bomCost}
                  {...getFieldProps("bomCost")}
                  style={{ marginBottom: 3 }}
                  disabled={lock}
                />
              </div>
              <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
                <FormControlLabel value={"true"} control={<Radio size="small" />} label="" disabled={lock} />
                <TextField
                  label=" Bom Cost Estimate"
                  value={values.bomCostEstimate}
                  {...getFieldProps("bomCostEstimate")}
                  style={{ marginBottom: 3 }}
                  disabled={lock}
                />
              </div>
            </RadioGroup>
          )}

          <RadioGroup row {...getFieldProps("retailPriceEstimateUse")} value={values.retailPriceEstimateUse}>
            <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
              <FormControlLabel value={"false"} control={<Radio size="small" />} label="" disabled={lock} />
              <TextField
                label="retail price"
                value={values.retailPrice}
                {...getFieldProps("retailPrice")}
                style={{ marginBottom: 3 }}
                disabled={lock}
              />
            </div>
            <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
              <FormControlLabel value={"true"} control={<Radio size="small" />} label="" disabled={lock} />
              <TextField
                label=" Retail Price Estimate"
                value={values.retailPriceEstimate}
                {...getFieldProps("retailPriceEstimate")}
                style={{ marginBottom: 3 }}
                disabled={lock}
              />
            </div>
          </RadioGroup>
        </Box>
      </div>
    </>
  );
}
