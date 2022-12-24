import React, { useState } from "react";
import useSWR from "swr";

import AddPricing, { pricingType } from "../AddPricing";
import TextField from "app/TextField";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";

import { useLock } from "common/Lock";
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, useMediaQuery } from "@material-ui/core";

const pricingCols = [
  { field: "label", headerName: "Label", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  {
    field: "nonCommissionable",
    headerName: "no Com.",
    valueFormatter: (params: any) => params?.row?.nonCommissionable,
    flex: 1,
    type: "boolean",
  },
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
  const { data } = useSWR<any>(`/item/${itemId}`);

  const selected = data?.result?.find(() => true);

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
          rows={selected?.pricing || []}
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
            value={selected.laborCost}
            disabled={lock}
            style={{ marginBottom: 3 }}
            // onChange={handleChange}
            // onBlur={handleBlur}
          />
          <TextField
            name="totalCost"
            label="Total Cost"
            value={selected.overrideUse ? selected.override : selected.totalCost}
            disabled
          />

          {!selected.bom ? (
            <div style={phone ? { gridColumnEnd: "span 2", display: "flex" } : { display: "flex" }}>
              <FormControlLabel
                name="overrideUse"
                label=" "
                checked={selected.overrideUse}
                control={<Checkbox />}
                disabled={lock}
                style={{ fontSize: "0.7rem" }}
              />
              <TextField
                name="override"
                label="Override"
                type="number"
                value={selected.override}
                style={{ marginBottom: 3 }}
                disabled={!selected.overrideUse || lock}
              />
            </div>
          ) : (
            <RadioGroup row value={selected.bomCostEstimateUse}>
              <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
                <FormControlLabel value={"false"} control={<Radio size="small" />} label="" disabled={lock} />
                <TextField
                  name="bomCost"
                  label=" Bom  Cost"
                  value={selected.bomCost}
                  style={{ marginBottom: 3 }}
                  disabled={lock}
                />
              </div>
              <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
                <FormControlLabel value={"true"} control={<Radio size="small" />} label="" disabled={lock} />
                <TextField
                  name="bomCostEstimate"
                  label=" Bom Cost Estimate"
                  value={selected.bomCostEstimate}
                  style={{ marginBottom: 3 }}
                  disabled={lock}
                />
              </div>
            </RadioGroup>
          )}

          <RadioGroup row value={selected.retailPriceEstimateUse}>
            <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
              <FormControlLabel value={"false"} control={<Radio size="small" />} label="" disabled={lock} />
              <TextField
                name="retailPrice"
                label="retail price"
                value={selected.retailPrice}
                style={{ marginBottom: 3 }}
                disabled={lock}
              />
            </div>
            <div style={phone ? { gridColumnEnd: "span 2" } : {}}>
              <FormControlLabel value={"true"} control={<Radio size="small" />} label="" disabled={lock} />
              <TextField
                name="retailPriceEstimate"
                label=" Retail Price Estimate"
                value={selected.retailPriceEstimate}
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
