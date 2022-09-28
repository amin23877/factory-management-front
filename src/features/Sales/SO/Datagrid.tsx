import React from "react";

import { ParameterType } from "logic/utils";
import DataGrid from "app/NewDataGrid";
import { Tooltip } from "@material-ui/core";

function SODataGrid({
  onRowSelected,
  params,
  refresh,
  url,
}: {
  onRowSelected: (row: any) => void;
  params?: ParameterType;
  refresh?: number;
  url?: string;
}) {
  const columns = [
    {
      name: "createdAt",
      header: "Date",
      minWidth: 100,
      type: "date",
    },
    { name: "number", header: "SO NO.", minWidth: 100 },
    {
      name: "Client",
      minWidth: 100,
      render: ({ data }: any) => (
        <Tooltip title={data?.ClientId?.name}>
          <span>{data?.ClientId?.name}</span>
        </Tooltip>
      ),
      visible: params?.ClientId ? false : true,
    },
    {
      name: "Rep",
      minWidth: 130,
      render: ({ data }: any) => (
        <Tooltip title={data?.RepId?.name}>
          <span>{data?.RepId?.name}</span>
        </Tooltip>
      ),
      visible: params?.RepId ? false : true,
    },
    {
      name: "state",
      header: "State",
      minWidth: 120,
      render: ({ data }: any) => (
        <Tooltip title={data?.RepId?.state}>
          <span>{data?.RepId?.state}</span>
        </Tooltip>
      ),
    },

    {
      name: "estimatedShipDate",
      header: "Estimated SD.",
      minWidth: 120,
      type: "date",
    },
    {
      name: "actualShipDate",
      header: "Actual SD.",
      minWidth: 120,
      type: "date",
    },
    { name: "status", header: "Status", minWidth: 120 },
    {
      name: "totalOrder",
      header: "Total Amount",
      minWidth: 120,
      type: "number",
    },
  ];
  return (
    <DataGrid
      url={url || "/so"}
      onRowSelected={onRowSelected}
      columns={columns}
      initParams={params}
      refresh={refresh}
      setUrlFilters
    />
  );
}

export default SODataGrid;
