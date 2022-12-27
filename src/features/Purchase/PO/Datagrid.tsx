import React, { useMemo } from "react";

import { ParameterType } from "logic/utils";
import DataGrid from "app/NewDataGrid";

function SODataGrid({
  onRowSelected,
  params,
  refresh,
  url,
  style,
  setUrlFilters,
}: {
  onRowSelected: (row: any) => void;
  params?: ParameterType;
  refresh?: number;
  url?: string;
  style?: any;
  setUrlFilters?: boolean;
}) {
  const cols = useMemo(
    () => [
      {
        name: "date",
        header: "Date",
        width: 100,
        type: "date",
      },
      { name: "number", header: "ID", width: 110 },
      { name: "Vendor", width: 110, render: ({ data }: any) => data?.VendorId?.name }, // change this
      { name: "TrackNumber", header: "Trac. No.", width: 120 },
      {
        name: "acknowledgeDate",
        header: "Ack. Date",
        width: 110,
        type: "date",
      },
      { name: "estimatedShipDate", header: "Est. Ship", width: 110, type: "date" },
      { name: "actualShipDate", header: "act. Ship", width: 110, type: "date" },
      { name: "SO", width: 110, render: ({ data }: any) => data?.SOId?.number },
      { name: "requiredBy", header: "Required By", width: 110, type: "date" },
      { name: "Staff", width: 110, render: ({ data }: any) => data?.EmployeeId?.username },
      { name: "status", header: "Status", width: 100 },
      { name: "totalCost", header: "Total Cost", width: 100, type: "number" },
      { name: "approved", header: "Appr.", width: 80, type: "boolean" },
      { name: "Appr. By", width: 110, render: ({ data }: any) => data?.ApprovedBy?.username },
      { name: "QuickBooks Info", header: "QuickBooks Info", width: 120 },
    ],
    []
  );

  return (
    <DataGrid
      style={style}
      url={url || "/po"}
      onRowSelected={onRowSelected}
      columns={cols}
      initParams={params}
      refresh={refresh}
      setUrlFilters={setUrlFilters}
    />
  );
}

export default SODataGrid;
