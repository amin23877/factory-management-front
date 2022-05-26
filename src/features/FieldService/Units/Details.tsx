import React, { useMemo, useState, Fragment } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { General, Status, Expense, Shipping } from "./Forms";

import Button from "app/Button";
import { BasePaper } from "app/Paper";
import BaseDataGrid from "app/BaseDataGrid";

import { IUnit, updateUnit } from "api/units";

import Toast from "app/Toast";
import { formatTimestampToDate } from "logic/date";
import { getModifiedValues } from "logic/utils";

import ShipmentModal, { EditShipModal } from "../../Modals/ShipmentModal";
import { Levels } from "../../Items/Forms";
import { IShipment } from "api/shipment";

import DocumentTab from "common/Document/Tab";
import NotesTab from "common/Note/Tab";
import JobRecordsTable from "common/JobRecords/Table";

import { useLock, LockButton, LockProvider } from "common/Lock";

const schema = Yup.object().shape({});

function Details({ unit }: { unit: IUnit }) {
  const handleSubmit = async (data: any) => {
    try {
      if (unit?.id) {
        await updateUnit(unit.id, getModifiedValues(data, unit));
        await mutate("/unit");
        Toast("Unit updated", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [infoActiveTab, setInfoActiveTab] = useState(0);
  const [gridActiveTab, setGridActiveTab] = useState(2);
  const [addShipModal, setAddShipModal] = useState(false);
  const [editShip, setEditShip] = useState(false);
  const [selectedShip, setSelectedShip] = useState<IShipment>();

  const { lock, setLock } = useLock();
  const { data: shipments } = useSWR(gridActiveTab === 4 ? `/shipment?UnitId=${unit.id}` : null);

  const warCols = useMemo<GridColumns>(
    () => [
      { field: "date", headerName: "Date", type: "date", width: 120 },
      { field: "number", headerName: "Warranty Number", width: 160 },
      { field: "name", headerName: "Name", width: 160 },
      { field: "description", headerName: "Note", flex: 1 },
      { field: "term", headerName: "Term", flex: 1 },
      { field: "status", headerName: "Status", width: 150 },
    ],
    []
  );

  const shipCols = useMemo<GridColumns>(
    () => [
      { field: "targetDate", headerName: "Target Date", type: "date", width: 130 },
      { field: "shipDate", headerName: "Actual Date", width: 130 },
      { field: "shipmentNo", headerName: "Shipment No", width: 130 },
      { field: "carrier", headerName: "Carrier", flex: 1 },
      { field: "deliveryMethod", headerName: "Delivery Method", flex: 1 },
      { field: "trackingNumber", headerName: "Tracking Number", width: 150 },
    ],
    []
  );

  const fshCols = useMemo<GridColumns>(
    () => [
      { field: "Date", valueFormatter: (params) => formatTimestampToDate(params.row?.date), width: 120 },
      { field: "Ticket ID", valueFormatter: (params) => params.row?.number, width: 120 },
      { field: "Subject", valueFormatter: (params) => params.row?.subject, flex: 1 },
      { field: "Unit", valueFormatter: (params) => params.row?.UnitId?.number, width: 150 },
      { field: "Assigned To", valueFormatter: (params) => params.row?.assignee?.username, width: 120 },
      { field: "Contact", valueFormatter: (params) => params.row?.ContactId.lastName, width: 120 },
      { field: "Status", valueFormatter: (params) => params.row?.status, width: 120 },
    ],
    []
  );

  const SOICols = useMemo<GridColumns>(
    () => [
      { field: "Option Number", valueFormatter: (params) => params.row?.ItemId?.no, flex: 1 },
      { field: "Option Description", valueFormatter: (params) => params.row?.ItemId?.description, flex: 1 },
    ],
    []
  );
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      {unit && unit.id && <ShipmentModal open={addShipModal} onClose={() => setAddShipModal(false)} unitId={unit.id} />}
      {unit && unit.id && selectedShip && (
        <EditShipModal open={editShip} onClose={() => setEditShip(false)} unitId={unit.id} init={selectedShip} />
      )}
      <Box display="grid" gridTemplateColumns={phone ? "1fr" : "1fr 2fr"} gridGap={10} height="calc(100vh - 160px)">
        <LockProvider>
          <Formik initialValues={unit as IUnit} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
              <Form>
                <Box display="flex" flexDirection="column" gridGap={10} height={phone ? "" : "100%"}>
                  <BasePaper>
                    <General
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                    <Box textAlign="center" my={1} width="100%" display="flex">
                      <Button disabled={isSubmitting || lock} kind="edit" type="submit" style={{ flex: 3 }}>
                        Save
                      </Button>
                      <LockButton />
                    </Box>
                  </BasePaper>
                  <BasePaper style={{ flex: 1 }}>
                    <Tabs
                      textColor="primary"
                      value={infoActiveTab}
                      onChange={(e, nv) => setInfoActiveTab(nv)}
                      variant="scrollable"
                      scrollButtons={phone ? "on" : "auto"}
                      style={
                        phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }
                      }
                    >
                      <Tab label="Image" />
                      <Tab label="Status" />
                      <Tab label="Expense" />
                      <Tab label="Shipping" />
                      <Tab label="Cluster & Level" />
                    </Tabs>
                    {infoActiveTab === 0 && (
                      <Box
                        mt={1}
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        gridGap={10}
                      >
                        {/* {unit?.item?.photo && (
                        <img
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            maxHeight: 400,
                            margin: "0px auto",
                          }}
                          alt=""
                          src={`http://${host}${unit?.item?.photo}`}
                        />
                      )} */}
                      </Box>
                    )}
                    {infoActiveTab === 1 && (
                      <Status
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {infoActiveTab === 2 && (
                      <Expense
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {infoActiveTab === 3 && (
                      <Shipping
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {infoActiveTab === 4 && (
                      <Levels
                        values={values?.ItemId}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        selectedItem={unit?.ItemId}
                      />
                    )}
                  </BasePaper>
                </Box>
              </Form>
            )}
          </Formik>
        </LockProvider>
        <LockProvider>
          <BasePaper style={{ height: "100%" }}>
            <Tabs
              textColor="primary"
              value={gridActiveTab}
              onChange={(e, nv) => setGridActiveTab(nv)}
              variant="scrollable"
              scrollButtons={phone ? "on" : "auto"}
              style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }}
            >
              <Tab label="Phocus Monitor" />
              <Tab label="Warranties" />
              <Tab label="Job" />
              <Tab label="Documents" />
              <Tab label="Shipment" />
              <Tab label="Quality Control" />
              <Tab label="Sales Order Items" />
              <Tab label="Field Service History" />
              <Tab label="Note" />
              <Tab label="Auditing" />
            </Tabs>
            {gridActiveTab === 1 && (
              <Box>
                <BaseDataGrid cols={warCols} rows={[]} onRowSelected={(d) => {}} height="67.3vh" />
              </Box>
            )}
            {gridActiveTab === 2 && <JobRecordsTable unit={unit} lock={lock} setLock={setLock} />}
            {gridActiveTab === 3 && <DocumentTab itemId={unit.id} model="unit" />}
            {gridActiveTab === 4 && (
              <>
                <Button
                  onClick={() => {
                    setAddShipModal(true);
                  }}
                  variant="outlined"
                  style={{ marginBottom: "10px" }}
                >
                  + Add Shipment
                </Button>
                <BaseDataGrid
                  cols={shipCols}
                  rows={shipments || []}
                  onRowSelected={(v) => {
                    setSelectedShip(v);
                    setEditShip(true);
                  }}
                  height={"63.2vh"}
                />
              </>
            )}
            {gridActiveTab === 6 && <BaseDataGrid cols={SOICols} rows={[]} onRowSelected={(r) => {}} height="67.3vh" />}
            {gridActiveTab === 7 && <BaseDataGrid cols={fshCols} rows={[]} onRowSelected={(r) => {}} height="67.3vh" />}
            {gridActiveTab === 8 && <NotesTab itemId={unit.id} model="unit" />}
          </BasePaper>
        </LockProvider>
      </Box>
    </>
  );
}

export default Details;
