import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";

import { IBom } from "api/bom";
import BaseDataGrid from "app/BaseDataGrid";
import NewDataGrid from "app/NewDataGrid";
import Button from "app/Button";

import { formatTimestampToDate } from "logic/date";

import AddServiceModal from "features/Engineering/Devices/AddServiceModal";
import UnitHistoryModal from "features/Unit/Modal";
import { EditTaskModal } from "features/Engineering/Devices/TaskModal";
import { IUnitHistory } from "api/units";

import DocumentTab from "common/Document/Tab";
import NoteTab from "common/Note/Tab";
import AuditTable from "common/Audit";
import { AddRounded } from "@material-ui/icons";
import ProcessTab from "features/Engineering/Devices/Tabs/ProcessTab";

import SalesReport from "features/Engineering/Devices/SalesReport";
import ItemBomTable from "features/BOM/ItemBomTable";
import { useLock, LockButton } from "common/Lock";
import { IItem } from "api/items";
import useSWR from "swr";

export default function DataGridsTabs({
  selectedRow,
  sales,
  onFlagSelected,
}: {
  selectedRow: any;
  sales?: boolean;
  onFlagSelected: (a: any) => void;
}) {
  // const selected = selectedRow?.result?.find(() => true);

  const phone = useMediaQuery("(max-width:900px)");
  const { setLock, lock } = useLock();
  const [activeTab, setActiveTab] = useState(0);
  const [AddService, setAddService] = useState(false);
  const [unitHistoryModal, setUnitHistoryModal] = useState(false);
  const [selectedStep] = useState<any>();
  const [selectedUnit, setSelectedUnit] = useState<IUnitHistory>();
  const [selectedService, setSelectedService] = useState<any>();
  const [stepModal, setStepModal] = useState(false);

  const { data: boms, mutate: mutateBoms } = useSWR<{ result: IBom[]; total: number }>(
    selectedRow && selectedRow?.id ? `/bom?ItemId=${selectedRow?.id}` : null
  );

  const { data: itemObject } = useSWR<IItem>(selectedRow && selectedRow?.id ? `/item/${selectedRow?.id}` : null);
  // console.log("itemObject123: ", itemObject);

  // const { data: flags } = useSWR(
  //   activeTab === 10 ? (selectedRow && selectedRow?.id ? `/qccase/item/${selectedRow?.id}` : null) : null
  // );
  const { data: flags } = useSWR(`/qccase/item/${selectedRow?.id}`);

  const serviceCols = [
    { name: "no", header: "ID", width: 150 },
    {
      name: "name",
      header: "Name",
      flex: 1,
      // renderCell: ({ row }) => (
      //   <Tooltip title={row.name}>
      //     <span>{row.name}</span>
      //   </Tooltip>
      // ),
    },
    {
      name: "class",
      header: "Class",
      width: 120,
    },
    {
      name: "type",
      header: "Type",

      width: 120,
    },
    { name: "price", header: "Price", width: 90 },
  ];

  const flagCols = useMemo(
    () => [
      { name: "date", header: "Date", flex: 2 },
      { name: "number", header: "Flag ID", flex: 2 },
      { name: "name", header: "Name", flex: 4 },
      { name: "serial", header: "Serial", flex: 2 },
      { name: "section", header: "Section", flex: 2 },
      { name: "id", header: "ID", flex: 2 },
      { name: "note", header: "Note", flex: 4 },
      { name: "auditing", header: "Auditing", flex: 2 },
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

  const { data: qs } = useSWR(`/qccase/item/${selectedRow?.id}`);
  // console.log("qs: ", qs);

  return (
    <>
      {selectedStep && selectedRow && selectedRow?.id && (
        <EditTaskModal
          device={selectedRow}
          tab={selectedStep.tab}
          task={selectedStep}
          itemId={selectedRow?.id as any}
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
      <Box display={"flex"} alignItems="center" mb={2} justifyContent="space-between">
        {!sales ? (
          <Tabs
            value={activeTab}
            onChange={(e, v) => {
              setActiveTab(v);
              setLock(true);
            }}
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
            onChange={(e, v) => {
              setActiveTab(v);
              setLock(true);
            }}
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
        <LockButton />
      </Box>
      {!sales ? (
        <>
          {activeTab === 0 && <DocumentTab itemId={selectedRow?.id} model="item" />}
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
                disabled={lock}
              >
                Service
              </Button>
              {/* <BaseDataGrid
                height={"calc(100% - 100px)"}
                cols={serviceCols}
                rows={itemObject?.services || []}
                onRowSelected={(d) => {
                  setSelectedService(d);
                  setAddService(true);
                }}
              /> */}
              <NewDataGrid
                columns={serviceCols}
                url={`/item/${selectedRow?.id}`}
                onRowSelected={(d) => {
                  setSelectedService(d);
                  setAddService(true);
                }}
                // style={{ marginBottom: "10px" }}
              />
            </>
          )}
          {activeTab === 3 && <ProcessTab type={"manufacturing"} ItemId={selectedRow?.id} />}
          {activeTab === 4 && <ProcessTab type={"evaluation"} ItemId={selectedRow?.id} />}
          {activeTab === 5 && <ProcessTab type={"test"} ItemId={selectedRow?.id} />}
          {activeTab === 6 && <ProcessTab type={"fieldStartUp"} ItemId={selectedRow?.id} />}
          {activeTab === 8 && (
            <NewDataGrid
              columns={unitHistoryCols}
              url={`/unit?ItemId=${selectedRow?.id}`}
              onRowSelected={(d) => {
                setSelectedUnit(d);
                setUnitHistoryModal(true);
              }}
            />
          )}
          {activeTab === 9 && <SalesReport />}
          {activeTab === 10 && (
            // <BaseDataGrid
            //   height={"calc()100% - 60px"}
            //   cols={flagCols}
            //   rows={flags || []}
            //   onRowSelected={onFlagSelected}
            // />
            <NewDataGrid
              columns={flagCols}
              url={`/qccase/item/${selectedRow?.id}`}
              onRowSelected={onFlagSelected}
              // style={{ marginBottom: "10px" }}
            />
          )}
          {activeTab === 11 && <NoteTab itemId={selectedRow?.id} model="item" />}
          {activeTab === 12 && <AuditTable itemId={selectedRow?.id} />}
        </>
      ) : (
        <>
          {activeTab === 0 && <DocumentTab itemId={selectedRow?.id} model="item" />}
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
          {activeTab === 3 && <NoteTab itemId={selectedRow?.id} model="item" />}
          {activeTab === 4 && <AuditTable itemId={selectedRow?.id} />}
        </>
      )}
    </>
  );
}
