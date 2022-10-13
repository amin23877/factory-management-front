import React, { useMemo } from "react";

import { ParameterType } from "logic/utils";
import DataGrid from "app/NewDataGrid";

export default function QuoteDataGrid({
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
  const columns = useMemo(
    () => [
      {
        name: "createdAt",
        header: "Date",
        type: "date",
        minWidth: 100,
      },
      { name: "number", header: "Quote ID", minWidth: 100 },
      {
        name: "ClientId",
        header: "Client",
        minWidth: 100,
        render: ({ data }: any) => data?.ClientId?.name,
      },
      { name: "RepId", header: "Rep", minWidth: 100, render: ({ data }: any) => data.RepId?.name },
      {
        name: "RepId.state",
        header: "State",
        minWidth: 100,
        render: ({ data }: any) => data.RepId?.state,
      },
      {
        name: "requester",
        header: "Requester",
        render: ({ data }: any) => `${data.requester?.firstName || ""} ${data.requester?.lastName || ""}`,
        minWidth: 100,
      },
      {
        name: "ProjectId",
        header: "Project Name",
        minWidth: 100,
        render: ({ data }: any) => data.ProjectId?.name,
      },
      {
        name: "salesPerson",
        type: "string",
        header: "Quoted By",
        minWidth: 100,
        render: ({ data }: any) => data.salesPerson?.username,
      },
      { name: "SOId", header: "SO", minWidth: 100, render: ({ data }) => data.SOId?.number },
      { name: "status", header: "Status", minWidth: 100 },
      { name: "total", header: "Total Amount", minWidth: 100, type: "number" },
    ],
    []
  );

  return (
    <DataGrid
      style={style}
      url={url || "/quote"}
      onRowSelected={onRowSelected}
      columns={columns}
      initParams={params}
      refresh={refresh}
      setUrlFilters={setUrlFilters}
    />
  );
}
