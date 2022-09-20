import React from "react";
import Dialog from "app/Dialog";
import { IItem } from "api/items";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import DataGrid from "app/NewDataGrid";
import { Tooltip } from "@material-ui/core";
import { formatTimestampToDate } from "logic/date";
import Datagrid from "features/Sales/SO/Datagrid";

export default function SOTableModal({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: any;
}) {
  const columns = [
    {
      name: "createdAt",
      header: "Date",
      minWidth: 100,
      type: "date",
    },
    {
      name: "number",
      header: "SO NO.",
      minWidth: 100,
      render: ({ data }: any) => (
        <Tooltip title={data?.SOId?.number}>
          <span>{data?.SOId?.number}</span>
        </Tooltip>
      ),
    },
    { name: "qty", header: "QTY", minWidth: 80, defaultWidth: 50 },
    { name: "price", header: "Price", minWidth: 100 },
    {
      name: "Client",
      minWidth: 100,
      render: ({ data }: any) => (
        <Tooltip title={data?.ClientId?.name}>
          <span>{data?.ClientId?.name}</span>
        </Tooltip>
      ),
    },
    {
      name: "Rep",
      minWidth: 130,
      render: ({ data }: any) => {
        <Tooltip title={data?.RepId?.name}>
          <span>{data?.RepId?.name}</span>
        </Tooltip>;
      },
    },
    {
      name: "state",
      header: "Billing State",
      minWidth: 120,
      render: ({ data }: any) => (
        <Tooltip title={data?.SOId?.billingState}>
          <span>{data?.SOId?.billingState}</span>
        </Tooltip>
      ),
    },
    {
      name: "state",
      header: "Shipping State",
      minWidth: 120,
      render: ({ data }: any) => (
        <Tooltip title={data?.SOId?.shippingState}>
          <span>{data?.SOId?.shippingState}</span>
        </Tooltip>
      ),
    },
    {
      name: "estimatedShipDate",
      header: "Estimated SD.",
      minWidth: 120,
      render: ({ data }: any) => (
        <Tooltip title={formatTimestampToDate(data?.SOId?.estimatedShipDate)}>
          <span>{formatTimestampToDate(data?.SOId?.estimatedShipDate)}</span>
        </Tooltip>
      ),
    },
    {
      name: "actualShipDate",
      header: "Actual SD.",
      minWidth: 120,
      render: ({ data }: any) => (
        <Tooltip title={formatTimestampToDate(data?.SOId?.actualShipDate)}>
          <span>{formatTimestampToDate(data?.SOId?.actualShipDate)}</span>
        </Tooltip>
      ),
    },
    {
      name: "status",
      header: "Status",
      minWidth: 120,
      render: ({ data }: any) => (
        <Tooltip title={data?.SOId?.status}>
          <span>{data?.SOId?.status}</span>
        </Tooltip>
      ),
    },
  ];

  const history = useHistory();
  const { data: item } = useSWR<{ result: IItem[]; total: number }>(`/item?no=${selectedItem.name}`);
  return (
    <Dialog open={open} onClose={onClose} title={`List of ${selectedItem.name} SOs`} maxWidth="lg" fullWidth>
      {item ? (
        <DataGrid
          url={"/lineitem"}
          onRowSelected={(d) => {
            history.push(`/panel/sales/salesOrders/${d.SOId.id}`);
          }}
          columns={columns}
          initParams={{ ItemId: item?.result[0].id }}
        />
      ) : (
        <CircularProgress />
      )}
    </Dialog>
  );
}
export function ClientOrRepSOTable({
  open,
  onClose,
  selectedItem,
  rep,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem: any;
  rep?: boolean;
}) {
  const history = useHistory();
  const { data: client } = useSWR<{ result: any[]; total: number }>(
    `/${rep ? "rep" : "client"}?name=${selectedItem?.name}`
  );
  return (
    <Dialog open={open} onClose={onClose} title={`List of ${selectedItem?.name} SOs`} maxWidth="lg" fullWidth>
      {client ? (
        <Datagrid
          onRowSelected={(d) => {
            history.push(`/panel/sales/salesOrders/${d.id}${window.location.search}`);
          }}
          params={rep ? { RepId: client?.result[0]?.id } : { ClientId: client?.result[0]?.id }}
        />
      ) : (
        <CircularProgress />
      )}
    </Dialog>
  );
}
