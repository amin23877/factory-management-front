import React, { useMemo, useState, useRef } from "react";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { host } from "host";
import { General, Warranty, Battery, Inverter, Control } from "./Forms";
import MyQRCode from "app/QRCode";

import Button from "app/Button";
import { BasePaper } from "app/Paper";
import BaseDataGrid from "app/BaseDataGrid";

import { exportPdf } from "logic/pdf";
import BatteryDiagram from "./BatteryDiagram";

import DocumentTab from "common/Document/Tab";
import NotesTab from "common/Note/Tab";

const schema = Yup.object().shape({});

function Details({ up }: { up: any }) {
  const handleSubmit = async (data: any) => {
    // try {
    //     if (up?.id) {
    //         await updateup(up.id, getModifiedValues(data, up));
    //         await mutate("/up");
    //         Toast("up updated", "success");
    //     }
    // } catch (e) {
    //     console.log(e);
    // }
  };

  const qrCode = useRef<HTMLElement | null>(null);
  const [infoActiveTab, setInfoActiveTab] = useState(0);
  const [gridActiveTab, setGridActiveTab] = useState(0);
  const [batteryTab, setBatteryTab] = useState(0);

  const bomCols = useMemo<GridColDef[]>(
    () => [
      { field: "Line", width: 80 },
      { field: "Component", width: 180 },
      { field: "Component Name", width: 180 },
      { field: "Component Location", flex: 1 },
      { field: "UM", width: 120 },
      { field: "QTY", width: 120 },
      { field: "Note", width: 200 },
    ],
    []
  );

  // const warCols = useMemo<GridColumns>(
  //     () => [
  //         { field: "date", headerName: "Date", type: "date", width: 120 },
  //         { field: "number", headerName: "Warranty Number", width: 160 },
  //         { field: "name", headerName: "Name", width: 160 },
  //         { field: "description", headerName: "Note", flex: 1 },
  //         { field: "term", headerName: "Term", flex: 1 },
  //         { field: "status", headerName: "Status", width: 150 },
  //     ],
  //     []
  // );
  const UnitLogsCols = useMemo<GridColumns>(
    () => [
      { field: "date", headerName: "Timestamp", type: "date", width: 120 },
      { field: "number", headerName: "Error Number", width: 160 },
      { field: "description", headerName: "Error Description", flex: 1 },
    ],
    []
  );

  const optionCols = useMemo<GridColumns>(
    () => [
      {
        field: "Option Number",
        valueFormatter: (params) => params.row?.ItemId?.no,
        flex: 1,
      },
      {
        field: "Option Name",
        valueFormatter: (params) => params.row?.ItemId?.name,
        flex: 1,
      },
      {
        field: "Option Description",
        valueFormatter: (params) => params.row?.ItemId?.description,
        flex: 1,
      },
      { field: "quantity", headerName: "Quantity", width: 100 },
    ],
    []
  );

  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Formik initialValues={up} validationSchema={schema} onSubmit={handleSubmit}>
      {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <Box
            display="grid"
            gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}
            gridGap={10}
            height={phone ? "" : "calc(100vh - 160px)"}
          >
            <Box display="flex" flexDirection="column" gridGap={10} height={phone ? "auto" : "100%"}>
              <BasePaper>
                <General
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
                <Box textAlign="center" my={1} width="100%">
                  <Button disabled={isSubmitting} kind="edit" type="submit" style={{ width: "200px" }}>
                    Save
                  </Button>
                </Box>
              </BasePaper>
              <BasePaper style={{ flex: 1, overflowY: "auto" }}>
                <Tabs
                  value={infoActiveTab}
                  onChange={(e, nv) => setInfoActiveTab(nv)}
                  variant="scrollable"
                  style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }}
                  scrollButtons={phone ? "on" : "auto"}
                >
                  <Tab label="Image" />
                  <Tab label="UPC" />
                  <Tab label="Options" />
                  <Tab label="Battery Info" />
                  <Tab label="Warranty Info" />
                  <Tab label="Control" />
                </Tabs>
                {infoActiveTab === 0 && (
                  <Box
                    mt={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    gridGap={10}
                  >
                    {up?.item?.photo && (
                      <img
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: 300,
                          margin: "0px auto",
                        }}
                        alt=""
                        src={`http://${host}${up?.item?.photo}`}
                      />
                    )}
                  </Box>
                )}
                {infoActiveTab === 1 && (
                  <Box mt={1} display="flex" justifyContent="space-around" alignItems="center" flexDirection="column">
                    <Box display="flex" justifyContent="space-evenly" alignItems="center" width="100%">
                      <div ref={(e) => (qrCode.current = e)}>
                        <MyQRCode value={String(up.number)} />
                      </div>
                      <div>
                        <Typography variant="subtitle1">Unit Number: {up.item.no}</Typography>
                        <Typography variant="subtitle1">Unit Name: {up.item.name}</Typography>
                        <Typography variant="subtitle1">Sales Order NO.: {up.number}</Typography>
                      </div>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={async () => {
                        if (qrCode.current) {
                          await exportPdf(qrCode.current);
                        }
                      }}
                    >
                      Print
                    </Button>
                  </Box>
                )}
                {infoActiveTab === 2 && (
                  <BaseDataGrid height={300} rows={up.options || []} cols={optionCols} onRowSelected={() => {}} />
                )}
                {infoActiveTab === 3 && (
                  <Battery
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                {infoActiveTab === 4 && (
                  <Warranty
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                {infoActiveTab === 5 && (
                  <Control
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
              </BasePaper>
            </Box>
            <BasePaper style={{ width: "100%" }}>
              <Box display="flex">
                <Tabs
                  value={gridActiveTab}
                  onChange={(e, nv) => setGridActiveTab(nv)}
                  textColor="primary"
                  variant="scrollable"
                  style={
                    phone
                      ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" }
                      : { marginBottom: "10px", maxWidth: "700px" }
                  }
                  scrollButtons={phone ? "on" : "auto"}
                >
                  <Tab label="Documents" />
                  <Tab label="Job" />
                  <Tab label="Field Service History" />
                  <Tab label="Unit Images" />
                  <Tab label="Inverter measurements" />
                  <Tab label="Battery Measurements" />
                  <Tab label="Unit Logs" />
                  <Tab label="Note" />
                  <Tab label="Auditing" />
                </Tabs>
              </Box>
              {gridActiveTab === 0 && <DocumentTab itemId={up?.id} model="up" />}
              {gridActiveTab === 1 && (
                <BaseDataGrid cols={bomCols} rows={[]} onRowSelected={(r) => {}} height={"calc(100% - 60px)"} />
              )}
              {gridActiveTab === 3 && (
                <BaseDataGrid cols={[]} rows={[]} onRowSelected={(r) => {}} height={"calc(100% - 60px)"} />
              )}
              {gridActiveTab === 4 && (
                <Inverter
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {gridActiveTab === 5 && (
                <>
                  <Tabs value={batteryTab} onChange={(e, nv) => setBatteryTab(nv)} style={{ marginBottom: "0.5em" }}>
                    <Tab label="List" />
                    <Tab label="Diagram" />
                  </Tabs>
                  {batteryTab === 1 && <BatteryDiagram />}
                </>
              )}
              {gridActiveTab === 6 && (
                <BaseDataGrid cols={UnitLogsCols} rows={[]} onRowSelected={(r) => {}} height={"calc(100% - 60px)"} />
              )}
              {gridActiveTab === 7 && <NotesTab itemId={up?.id} model="up" />}
            </BasePaper>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default Details;
