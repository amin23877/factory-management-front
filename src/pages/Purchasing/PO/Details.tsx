import React, { useMemo, useState } from "react";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { Formik } from "formik";

import { AddressesForm, UpdateForm, MoreInfoForm, VendorForm } from "../../../features/Purchase/PO/Forms";
import BaseDataGrid from "app/BaseDataGrid";
import { BasePaper } from "app/Paper";
import Toast from "app/Toast";
import NotesTab from "common/Note/Tab";
import DocumentsTab from "common/Document/Tab";

import { updatePurchasePO, IPurchasePO } from "api/purchasePO";
import { ILineItem } from "api/lineItem";

import { getModifiedValues } from "logic/utils";
import ReceivingTab from "../../../features/Purchase/PO/Receiving";
import { LockButton, LockProvider } from "common/Lock";
import AuditTable from "common/Audit";
import { useParams } from "react-router-dom";

export default function Details({ onDone }: { onDone?: () => void }) {
  const phone = useMediaQuery("(max-width:900px)");

  const { poId } = useParams<{ poId: string }>();
  const { data: selectedPO } = useSWR<IPurchasePO>(poId ? `/po/${poId}` : null);

  const { data: lines } = useSWR<{ result: ILineItem[]; total: number }>(`/polineitem?POId=${selectedPO?.id}`);

  const [activeTab, setActiveTab] = useState(0);
  const [activeMoreTab, setActiveMoreTab] = useState(0);

  const LICols = useMemo<GridColumns>(
    () => [
      { field: "ItemId", headerName: "Item No.", valueFormatter: (r) => r.row.ItemId?.no, width: 120 },
      { field: "ItemName", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId?.name, flex: 1 },
      {
        field: "Vendor P.NO.",
        valueFormatter: (r) => r.row.ItemId?.vendorPartNumber,
        width: 120,
      },
      { field: "orderedQuantity", headerName: "QTY", width: 90 },
      {
        field: "UOM",
        valueFormatter: (r) => r.row.ItemId?.uom,
        width: 100,
      },
      { field: "cost", headerName: "Cost", width: 100 },
      {
        field: "total",
        headerName: "Total",
        valueFormatter: (r) => Number(r.row?.cost) * Number(r.row?.orderedQuantity),
        width: 100,
      },
      { field: "Status", headerName: "Status", width: 100 },
      { field: "notes", headerName: "Notes", width: 100 },
    ],
    []
  );

  const handleSubmit = async (d: any) => {
    try {
      if (poId && d.status) {
        await updatePurchasePO(poId, getModifiedValues(d, selectedPO));
        Toast("Purchase Order updated.", "success");
        mutate("/po");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedPO) {
    return <LinearProgress />;
  }

  return (
    <>
      <Box display="grid" gridTemplateColumns={phone ? "1fr" : "3fr 4fr"} gridGap={10}>
        <Formik initialValues={selectedPO} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
            <Box display="flex" flexDirection="column" height={phone ? "" : "100%"} gridGap={10}>
              <Box>
                <BasePaper>
                  <UpdateForm values={values} errors={errors} handleBlur={handleBlur} handleChange={handleChange} />
                  <Box display="flex" width="100%" justifyContent="center" alignItems="center" mt={1}>
                    <LockButton />
                  </Box>
                </BasePaper>
              </Box>
              <BasePaper style={{ flex: 1 }}>
                <Tabs
                  textColor="primary"
                  value={activeMoreTab}
                  onChange={(e, nv) => setActiveMoreTab(nv)}
                  variant="scrollable"
                  scrollButtons={phone ? "on" : "auto"}
                  style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
                >
                  <Tab label="More Info" />
                  <Tab label="Vendor" />
                  <Tab label="Addresses" />
                </Tabs>
                <Box>
                  {activeMoreTab === 0 && (
                    <LockProvider>
                      <MoreInfoForm
                        errors={errors}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    </LockProvider>
                  )}
                  {activeMoreTab === 1 && (
                    <LockProvider>
                      <VendorForm values={values} handleBlur={handleBlur} handleChange={handleChange} />
                    </LockProvider>
                  )}
                  {activeMoreTab === 2 && (
                    <LockProvider>
                      <AddressesForm values={values} handleBlur={handleBlur} handleChange={handleChange} />
                    </LockProvider>
                  )}
                </Box>
              </BasePaper>
            </Box>
          )}
        </Formik>
        <BasePaper style={{ height: "100%" }}>
          <Tabs
            textColor="primary"
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            variant="scrollable"
            scrollButtons={phone ? "on" : "auto"}
            style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
          >
            <Tab label="Line items" />
            <Tab label="Documents" />
            <Tab label="Receiving" />
            <Tab label="Notes" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && (
            <BaseDataGrid
              rows={lines?.result || []}
              cols={LICols}
              onRowSelected={(d) => {
                // TODO: edit line item
              }}
              height={"calc(100% - 60px)"}
            />
          )}
          {activeTab === 1 && <DocumentsTab itemId={selectedPO.id} model="purchasePo" />}
          {activeTab === 2 && <ReceivingTab POId={selectedPO.id} />}
          {activeTab === 3 && <NotesTab itemId={selectedPO.id} model="purchasePo" />}
          {activeTab === 4 && <AuditTable itemId={selectedPO.id} />}
        </BasePaper>
      </Box>
    </>
  );
}
