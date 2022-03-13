import React, { useMemo, useState } from "react";
import { LinearProgress } from "@material-ui/core";

import DataGrid from "../../app/NewDataGrid";

function ItemTable({
  onRowSelected,
  onSelectionChange,
  refresh,
}: {
  onRowSelected: (r: any) => void;
  onSelectionChange: (c: any) => void;
  refresh?: number;
}) {
  const [finish, setFinish] = useState(false);

  const columns = useMemo(() => {
    let res: any[] = [
      { name: "no", header: "Number", minWidth: 100 },
      { name: "name", header: "Name", minWidth: 100 },
      { name: "description", header: "Description", defaultWidth: 180 },
      {
        name: "approvedForSale",
        header: "Sales Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "engineeringApproval",
        header: "Eng. Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "shippingApproved",
        header: "Ship Ap.",
        type: "boolean",
        defaultWidth: 100,
      },
      {
        name: "prefVendor",
        header: "Preferred Vendor",
        render: ({ data }: any) => data?.prefVendor?.name,
        defaultWidth: 140,
      },
      { name: "vendorPartNumber", header: "V. Part NO.", minWidth: 100 },
      { name: "cost", header: "Cost", minWidth: 80, type: "number" },
      { name: "location", header: "Location", minWidth: 100 },
      {
        name: "option",
        header: "Option",
        type: "boolean",
        defaultWidth: 100,
      },
      { name: "qtyOnHand", header: "QOH.", minWidth: 80, type: "number" },
      { name: "qtyRemain", header: " Remain", minWidth: 80, type: "number" },
      { name: "qtyOnOrder", header: "on Order", minWidth: 80, type: "number" },
      { name: "qtyAllocated", header: "Allocated", minWidth: 80, type: "number" },
      { name: "usedInLastQuarter", header: "Used 90", minWidth: 80, type: "number" },
      { name: "fifo", header: "FIFO Val.", minWidth: 80, type: "number" },
      {
        name: "qohVal",
        header: "QOH Val.",
        minWidth: 80,
        render: ({ data }: any) => data?.cost * data?.qtyOnHand,
        type: "number",
      },
      {
        name: "uom",
        header: "UOM",
        minWidth: 100,
      },
      {
        name: "obsolete",
        header: "Obsolete",
        type: "boolean",
      },
      {
        name: "nonInventoryItem",
        header: "NON Inv.",
        type: "boolean",
      },
      {
        name: "rndOnly",
        header: "R&D",
        type: "boolean",
      },
    ];

    // if (fields && clusters) {
    //   fields?.map((f: any) => res.splice(3, 0, { name: f.name, header: f.name, minWidth: 120 }));
    //   clusters?.map((f: any) => res.splice(3, 0, { name: f.name, header: splitLevelName(f.name), minWidth: 120 }));
    // }
    setFinish(true);

    return res;
  }, []);

  return (
    <>
      {finish ? (
        <DataGrid
          refresh={refresh}
          checkboxColumn
          onSelectionChange={onSelectionChange}
          columns={columns}
          url="/item"
          onRowSelected={onRowSelected}
        />
      ) : (
        <div style={{ width: "100%" }}>
          <LinearProgress />
        </div>
      )}
    </>
  );
}

export default ItemTable;
