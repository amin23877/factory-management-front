import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, useMediaQuery } from "@material-ui/core";
import useSWR from "swr";

import AddPricing, { pricingType } from "./Modal";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import TextField from "app/TextField";
import { IItem } from "api/items";

import { useLock, LockButton } from "common/Lock";

const pricingCols = [
  { field: "label", headerName: "Label", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "nonCommissionable", headerName: "no Com.", flex: 1, type: "boolean" },
];

export default function PricingTabContent({
  boms,
  handleBlur,
  handleChange,
  itemId,
  values,
}: {
  boms?: { result: any[]; total: number };
  handleBlur: any;
  handleChange: any;
  itemId: string;
  values: any;
}) {
  const phone = useMediaQuery("(max-width:900px)");
  const { data } = useSWR<IItem>(`/item/${itemId}`);
  const { lock } = useLock();

  const [addPricing, setAddPricing] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<pricingType>();

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
        <Box display="flex" alignItems="center" justifyContent="space-between">
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
          <LockButton />
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
      </div>
    </>
  );
}
