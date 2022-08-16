import React, { useMemo, useRef, useState } from "react";
import { Box, Tabs, Tab, LinearProgress, Typography, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR from "swr";

import SalesReport from "../../../features/Engineering/Devices/SalesReport";
import { EditTaskModal } from "../../../features/Engineering/Devices/TaskModal";
import ItemBomTable from "features/BOM/ItemBomTable";

import Toast from "app/Toast";
import Button from "app/Button";
import { BasePaper } from "app/Paper";
import DeviceQRCode from "app/QRCode";
import BaseDataGrid from "app/BaseDataGrid";
import DataGrid from "app/NewDataGrid";

import { General } from "../../../features/Engineering/Devices/Forms";
import AddServiceModal from "../../../features/Engineering/Devices/AddServiceModal";
import UnitHistoryModal from "../../../features/Unit/Modal";

import { IBom } from "api/bom";
import { IUnitHistory } from "api/units";
import { IItem, updateAnItem } from "api/items";
import { exportPdf } from "logic/pdf";
import { getModifiedValues } from "logic/utils";
import { formatTimestampToDate } from "logic/date";

import PricingTab from "common/Pricing";
import DocumentTab from "common/Document/Tab";
import NoteTab from "common/Note/Tab";
import PhotoTab from "common/PhotoTab";
import LevelsTab from "common/Level/Tab";
import { LockButton } from "common/Lock";
import AuditTable from "common/Audit";
import { AddRounded } from "@material-ui/icons";
import ProcessTab from "../../../features/Engineering/Devices/Tabs/ProcessTab";
import { useParams } from "react-router-dom";

function DeviceDetails({
  sales,
  onStepSelected,
  onFlagSelected,
  onDone,
}: {
  sales?: boolean;
  onDone?: () => void;
  onStepSelected: (a: any) => void;
  onFlagSelected: (a: any) => void;
}) {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { data: selectedRow } = useSWR<IItem>(deviceId ? `/item/${deviceId}` : null);

  const qrCode = useRef<HTMLElement | null>(null);
  const [moreInfoTab, setMoreInfoTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [AddService, setAddService] = useState(false);

  const [unitHistoryModal, setUnitHistoryModal] = useState(false);

  const [selectedStep] = useState<any>();
  const [selectedUnit, setSelectedUnit] = useState<IUnitHistory>();
  const [selectedService, setSelectedService] = useState<any>();

  const [stepModal, setStepModal] = useState(false);

  const { data: boms, mutate: mutateBoms } = useSWR<{ result: IBom[]; total: number }>(
    selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null
  );

  const { data: itemObject } = useSWR<IItem>(selectedRow && selectedRow.id ? `/item/${selectedRow.id}` : null);

  const { data: flags } = useSWR(
    activeTab === 10 ? (selectedRow && selectedRow.id ? `/qccase/item/${selectedRow.id}` : null) : null
  );

  const serviceCols = useMemo<GridColumns>(
    () => [
      { field: "no", headerName: "ID", width: 150 },
      { field: "name", headerName: "Name", flex: 1 },
      {
        field: "class",
        headerName: "Class",
        width: 120,
      },
      {
        field: "type",
        headerName: "Type",

        width: 120,
      },
      { field: "price", headerName: "Price", width: 90 },
    ],
    []
  );

  const flagCols = useMemo(
    () => [
      { field: "date", headerName: "Date", flex: 2 },
      { field: "number", headerName: "Flag ID", flex: 2 },
      { field: "name", headerName: "Name", flex: 4 },
      { field: "serial", headerName: "Serial", flex: 2 },
      { field: "section", headerName: "Section", flex: 2 },
      { field: "id", headerName: "ID", flex: 2 },
      { field: "note", headerName: "Note", flex: 4 },
      { field: "auditing", headerName: "Auditing", flex: 2 },
    ],
    []
  );

  const unitHistoryCols = useMemo(
    () => [
      { name: "SOId", header: "SO NO.", flex: 1 },
      {
        name: "SODate",
        header: "SO Date",
        render: ({ data }: any) => formatTimestampToDate(data.so.date),
        flex: 1,
        type: "date",
      },
      { name: "serialNumber", header: "Device NO.", flex: 1 },
      {
        name: "estimatedShipDate",
        header: "Estimated Ship Date",
        flex: 1,
        disableColumnMenu: true,
      },
      { name: "actualShipDate", header: "Actual Ship Date", flex: 1 },
      { name: "status", header: "Status", flex: 1 },
      { name: "price", header: "Price", flex: 1 },
      { name: "cost", header: "Cost", flex: 1 },
    ],
    []
  );

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      if (selectedRow) {
        const resp = await updateAnItem(selectedRow.id, getModifiedValues(data, selectedRow));
        if (resp) {
          setSubmitting(false);
          Toast("Record updated successfully", "success");

          onDone && onDone();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const phone = useMediaQuery("(max-width:900px)");
  // const { lock } = useLock();

  if (!selectedRow) {
    return <LinearProgress />;
  }

  return (
    <>
      {selectedStep && selectedRow && selectedRow.id && (
        <EditTaskModal
          device={selectedRow}
          tab={selectedStep.tab}
          task={selectedStep}
          itemId={selectedRow.id as any}
          open={stepModal}
          onClose={() => setStepModal(false)}
        />
      )}
      <AddServiceModal
        device={selectedRow}
        open={AddService}
        onClose={() => setAddService(false)}
        initialValues={selectedService}
        onDone={() => {
          setSelectedService(undefined);
        }}
      />
      {selectedUnit && (
        <UnitHistoryModal open={unitHistoryModal} onClose={() => setUnitHistoryModal(false)} unit={selectedUnit} />
      )}

      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "5fr 7fr"}>
              <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 10, height: "100%" }}>
                <BasePaper>
                  <General
                    sales={sales}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <Box
                    mt={2}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button style={{ display: "none", margin: "0 auto", width: "200px" }} kind="edit" type="submit">
                      Save
                    </Button>
                    <LockButton />
                  </Box>
                </BasePaper>
                <BasePaper style={{ flex: 1, overflowY: "auto" }}>
                  <Tabs
                    value={moreInfoTab}
                    variant="scrollable"
                    scrollButtons={phone ? "on" : "auto"}
                    style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: 16 } : { marginBottom: 16 }}
                    textColor="primary"
                    onChange={(e, v) => setMoreInfoTab(v)}
                  >
                    <Tab label="Image" />
                    <Tab label="UPC" />
                    <Tab label="Pricing" />
                    {!sales && <Tab label="Clusters and Levels" />}
                  </Tabs>
                  {moreInfoTab === 0 && <PhotoTab model="item" id={selectedRow.id} />}
                  {moreInfoTab === 1 && (
                    <Box display="flex" justifyContent="space-around" alignItems="center" maxWidth="83vw">
                      <div ref={(e) => (qrCode.current = e)}>
                        <DeviceQRCode
                          value={JSON.stringify({
                            type: "device",
                            no: selectedRow.no,
                          })}
                        />
                        <Typography variant="subtitle1">Device Number: {selectedRow.no}</Typography>
                        <Typography variant="subtitle1">Device Name: {selectedRow.name}</Typography>
                      </div>
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
                  {moreInfoTab === 2 && (
                    <PricingTab
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      itemId={selectedRow.id}
                      values={values}
                      boms={boms || { result: [], total: 0 }}
                    />
                  )}
                  {moreInfoTab === 3 && !sales && (
                    <LevelsTab
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      itemType={selectedRow.class}
                    />
                  )}
                </BasePaper>
              </Box>
              <BasePaper>
                <Box display="flex" mb={1}>
                  {!sales ? (
                    <Tabs
                      value={activeTab}
                      onChange={(e, v) => setActiveTab(v)}
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons={phone ? "on" : "auto"}
                      style={phone ? { maxWidth: "calc(100vw - 63px)" } : { maxWidth: "50vw" }}
                    >
                      <Tab label="Design documents" /> 0
                      <Tab label="BOM" /> 1
                      <Tab label="Services" /> 2
                      <Tab label="Manufacturing" /> 3
                      <Tab label="Evaluation" /> 4
                      <Tab label="Test" /> 5
                      <Tab label="Field Start-up" /> 6
                      <Tab label="Label" /> 7
                      <Tab label="Unit History" /> 8
                      <Tab label="Sales Report" /> 9
                      <Tab label="Quality Control" /> 10
                      <Tab label="Notes" /> 11
                      <Tab label="Auditing" /> 12
                    </Tabs>
                  ) : (
                    <Tabs
                      value={activeTab}
                      onChange={(e, v) => setActiveTab(v)}
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons={phone ? "on" : "auto"}
                      style={phone ? { maxWidth: "calc(100vw - 63px)" } : { maxWidth: "50vw" }}
                    >
                      <Tab label="Design documents" />
                      <Tab label="Services" />
                      <Tab label="Sales Report" />
                      <Tab label="Notes" />
                      <Tab label="Auditing" />
                    </Tabs>
                  )}
                </Box>
                {!sales ? (
                  <>
                    {activeTab === 0 && <DocumentTab itemId={selectedRow.id} model="item" />}
                    {activeTab === 1 && (
                      <div style={{ maxWidth: "79vw", overflow: "auto" }}>
                        <ItemBomTable item={selectedRow} boms={boms?.result || []} mutateBoms={mutateBoms} />
                      </div>
                    )}
                    {activeTab === 2 && (
                      <>
                        <Button
                          onClick={() => setAddService(true)}
                          variant="outlined"
                          style={{ marginBottom: "10px" }}
                          startIcon={<AddRounded />}
                        >
                          Service
                        </Button>
                        <BaseDataGrid
                          height={"calc(100% - 100px)"}
                          cols={serviceCols}
                          rows={itemObject?.services || []}
                          onRowSelected={(d) => {
                            setSelectedService(d);
                            setAddService(true);
                          }}
                        />
                      </>
                    )}
                    {activeTab === 3 && <ProcessTab type={"manufacturing"} ItemId={selectedRow.id} />}
                    {activeTab === 4 && <ProcessTab type={"evaluation"} ItemId={selectedRow.id} />}
                    {activeTab === 5 && <ProcessTab type={"test"} ItemId={selectedRow.id} />}
                    {activeTab === 6 && <ProcessTab type={"fieldStartUp"} ItemId={selectedRow.id} />}
                    {activeTab === 8 && (
                      <DataGrid
                        columns={unitHistoryCols}
                        url={`/unit?ItemId=${selectedRow.id}`}
                        // rows={
                        //   uniteHistory
                        //     ? uniteHistory.map((item: any, i: any) => ({
                        //         id: i,
                        //         ...item,
                        //       }))
                        //     : []
                        // }
                        onRowSelected={(d) => {
                          setSelectedUnit(d);
                          setUnitHistoryModal(true);
                        }}
                      />
                    )}
                    {activeTab === 9 && <SalesReport />}
                    {activeTab === 10 && (
                      <BaseDataGrid
                        height={"calc()100% - 60px"}
                        cols={flagCols}
                        rows={flags || []}
                        onRowSelected={onFlagSelected}
                      />
                    )}
                    {activeTab === 11 && <NoteTab itemId={selectedRow.id} model="item" />}
                    {activeTab === 12 && <AuditTable itemId={selectedRow.id} />}
                  </>
                ) : (
                  <>
                    {activeTab === 0 && <DocumentTab itemId={selectedRow.id} model="item" />}
                    {activeTab === 1 && (
                      <>
                        <BaseDataGrid
                          height={"calc(100% - 100px)"}
                          cols={serviceCols}
                          rows={itemObject?.services || []}
                          onRowSelected={(d) => {}}
                        />
                      </>
                    )}
                    {activeTab === 2 && <SalesReport />}
                    {activeTab === 3 && <NoteTab itemId={selectedRow.id} model="item" />}
                    {activeTab === 4 && <AuditTable itemId={selectedRow.id} />}
                  </>
                )}
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default DeviceDetails;
