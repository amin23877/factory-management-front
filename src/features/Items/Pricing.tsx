import React, { useState } from "react";
import useSWR from "swr";

import { Pricing } from "./Forms";
import AddPricing, { pricingType } from "./AddPricing";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import { IItem } from "api/items";

import { useLock } from "common/Lock";

const pricingCols = [
  { field: "label", headerName: "Label", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "nonCommissionable", headerName: "no Com.", flex: 1, type: "boolean" },
];

export default function PricingTab({
  boms,
  errors,
  handleBlur,
  handleChange,
  itemId,
  setFieldValue,
  touched,
  values,
}: {
  itemId: string;
  values: any;
  handleChange: any;
  handleBlur: any;
  setFieldValue: any;
  errors: any;
  touched: any;
  boms?: { result: any[]; total: number };
}) {
  const [addPricing, setAddPricing] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<pricingType>();
  const { data } = useSWR<IItem>(`/item/${itemId}`);
  const { lock } = useLock();

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
        <Pricing
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          boms={boms?.result?.length === 0 ? false : true}
        />
      </div>
    </>
  );
}
