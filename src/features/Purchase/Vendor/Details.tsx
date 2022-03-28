import React, { useMemo, useState } from "react";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import useSWR from "swr";

import { BasePaper } from "app/Paper";
import BaseDataGrid from "app/BaseDataGrid";

import { UpdateVendorForm } from "./Forms";
import { formatTimestampToDate } from "logic/date";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import ContactTab from "common/Contact/Tab";

import { IVendor } from "api/vendor";

export default function VendorDetails({ vendor }: { vendor: IVendor }) {
  const [activeTab, setActiveTab] = useState(0);

  const { data: items } = useSWR(activeTab === 0 ? `/vendor/${vendor.id}/items` : null);
  const { data: POs } = useSWR(activeTab === 3 ? `/purchasepo?VendorId=${vendor.id}` : null);

  const itemCols: GridColDef[] = [
    { field: "ItemId", headerName: "Item NO.", valueFormatter: (r) => r.row?.ItemId?.no, width: 120 },
    { field: "ItemName", headerName: "Item Name", valueFormatter: (r) => r.row?.ItemId?.name, flex: 1 },
    {
      field: "vendorPartName",
      headerName: "Vendor P.NO.",
      width: 120,
      valueFormatter: (r) => r.row?.vending?.vendorPartName,
    },
    { field: "vendorSKU", headerName: "Vendor SKU", width: 120, valueFormatter: (r) => r.row?.vending?.vendorSKU },
    { field: "lastLeadTime", headerName: "Last Lead", width: 120 },
    { field: "QOH", width: 100, valueFormatter: (r) => r.row?.ItemId?.onHandQty },
    { field: "lastOrderCost", headerName: "Cost", width: 100 },
    { field: "Inventory Val.", width: 130, valueFormatter: (r) => r.row?.ItemId?.qohValue },
    { field: "Min Order", valueFormatter: (r) => r.row?.ItemId?.minOrder, width: 100 },
  ];

  const POCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        width: 120,
      },
      { field: "Number", headerName: "PO NO.", width: 100 },
      { field: "qtyOrdered", headerName: "Qty Ordered", width: 120 },
      { field: "qtyReceived", headerName: "Qty Received", width: 120 },
      { field: "qtySold", headerName: "Qty Sold", width: 120 },
      { field: "uom", headerName: "PO UOM", width: 120 },
      { field: "dateReceived", headerName: "Date Received", width: 120 },
      { field: "cost", headerName: "Cost", width: 80 },
      { field: "total", headerName: "Total Cost", width: 120 },
      { field: "status", headerName: "Status", width: 100 },
    ],
    []
  );

  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box
      display="grid"
      gridGap={10}
      gridTemplateColumns={phone ? "1fr" : "2fr 3fr"}
      height={phone ? "" : "calc(100vh - 160px)"}
    >
      <UpdateVendorForm initialValues={vendor} />
      <BasePaper>
        <Tabs
          value={activeTab}
          onChange={(e, nv) => setActiveTab(nv)}
          textColor="primary"
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
        >
          <Tab label="Items" />
          <Tab label="Documents" />
          <Tab label="Contacts" />
          <Tab label="PO History" />
          <Tab label="Notes" />
          <Tab label="Auditing" />
        </Tabs>
        {activeTab === 0 && (
          <BaseDataGrid
            cols={itemCols}
            rows={(items && items.map((r: any, i: number) => ({ ...r, id: i }))) || []}
            onRowSelected={() => {}}
            height="calc(100% - 60px)"
          />
        )}
        {activeTab === 1 && <DocumentTab itemId={vendor.id} model="vendor" />}
        {activeTab === 2 && <ContactTab itemId={vendor.id} model="vendor" />}
        {activeTab === 3 && (
          <BaseDataGrid cols={POCols} rows={POs?.result || []} onRowSelected={() => {}} height="calc(100% - 60px)" />
        )}
        {activeTab === 4 && <NoteTab itemId={vendor.id} model="vendor" />}
      </BasePaper>
    </Box>
  );
}
