import React from "react";
import { IItem } from "api/items";
import NewDataGrid from "app/NewDataGrid";

const columns = [
  { name: "vendor", header: "Vendor", render: ({ data }: any) => data?.VendorId?.name, minWidth: 120 },
  { name: "vendorSKU", header: "Vendor Item Number", minWidth: 100 },
  { name: "vendorPartName", header: "Vendor Description ", minWidth: 100, flex: 1 },
  { name: "lastLeadTime", header: "Last Replenish Time", type: "date", maxWidth: 120 },
  { name: "lastOrderCost", header: "Cost", maxWidth: 70, type: "number" },
  { name: "lastQuantityOrdered", header: "Last QTY Ordered", maxWidth: 100, type: "number" },
  { name: "preferred", header: "Preferred", type: "boolean", maxWidth: 60 },
];

export default function VendorsTable({ selectedItem, refresh }: { refresh?: number; selectedItem: IItem }) {
  return (
    <NewDataGrid
      url={`/item/${selectedItem.id}/vendors`}
      columns={columns}
      onRowSelected={() => {}}
      refresh={refresh}
      style={{ minHeight: "calc(100vh - 250px)" }}
    />
  );
}
