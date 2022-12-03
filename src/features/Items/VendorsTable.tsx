import React from "react";
import { IItem } from "api/items";
import NewDataGrid from "app/NewDataGrid";

const columns = [
  { name: "vendor", header: "Vendor", render: ({ data }: any) => data?.VendorId?.name, width: 120 },
  { name: "vendorSKU", header: "Vendor Item Number", maxWidth: 100 },
  { name: "vendorPartName", header: "Vendor Description ", maxWidth: 100 },
  { name: "lastLeadTime", header: "Last Replenish Time", type: "date", maxWidth: 120 },
  { name: "lastOrderCost", header: "Cost", maxWidth: 100 },
  { name: "lastQuantityOrdered", header: "Last Quantity Ordered", maxWidth: 100 },
  { name: "preferred", header: "Preferred", type: "boolean", maxWidth: 100 },
];

export default function VendorsTable({ selectedItem }: { selectedItem: IItem }) {
  return (
    <NewDataGrid
      url={`/item/${selectedItem.id}/vendors`}
      columns={columns}
      onRowSelected={() => {}}
      style={{ minHeight: "calc(100vh - 250px)" }}
    />
  );
}
