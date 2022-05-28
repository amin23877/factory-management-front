import React from "react";

import PricingTabContent from "./Tab";
import { LockProvider } from "../Lock";

export default function PricingTab({
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
  return (
    <LockProvider>
      <PricingTabContent
        handleBlur={handleBlur}
        handleChange={handleChange}
        boms={boms}
        itemId={itemId}
        values={values}
      />
    </LockProvider>
  );
}
