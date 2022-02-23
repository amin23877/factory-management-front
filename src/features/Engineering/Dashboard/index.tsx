import React, { useState, useMemo } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";

import useSWR from "swr";

import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

import Reports from "./Report";
import { FieldModal, PurchaseModal } from "./Modals";
import { formatTimestampToDate } from "../../../logic/date";
import { useHistory } from "react-router-dom";

export default function EngineeringDashboard() {
  const history = useHistory();

  const [activeTab, setActiveTab] = useState(0);
  const [fieldOpen, setFieldOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [selectedField, setSelectedField] = useState();
  const [selectedPurchase, setSelectedPurchase] = useState();

  const { data: engAp } = useSWR("/engapp");
  const { data: FSH } = useSWR("/fsh"); // Field Service Help
  const { data: PQ } = useSWR("/pq"); // purchasing question
  const { data: GQ } = useSWR("/gq"); //general question
  const { data: QCCase } = useSWR("/qccase"); //general question

  const EACols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        type: "date",
        width: 180,
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
      },
      { field: "so", headerName: "SO", flex: 1 },
      { field: "unit", headerName: "Unit", flex: 1 },
      { field: "no", headerName: "Device ID", flex: 2, valueFormatter: (params) => params.row?.ItemId?.no },
      { field: "note", headerName: "Note", flex: 1 },
      {
        field: "EA",
        headerName: "E.A.",
        flex: 1,
        type: "boolean",
        valueFormatter: (params) => params.row?.ItemId?.engineeringApproved,
      },
      { field: "priority", headerName: "Priority", flex: 1 },
    ],
    []
  );
  const FSCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        type: "date",
        width: 180,
        valueFormatter: (params) => formatTimestampToDate(params.row?.fsh?.date),
      },
      { field: "so", headerName: "SO", flex: 1, valueFormatter: (params) => params.row?.so?.number },
      { field: "unit", headerName: "Unit", flex: 1, valueFormatter: (params) => params.row?.unit?.number },
      { field: "device", headerName: "Device ID", flex: 3, valueFormatter: (params) => params.row?.item?.no },
      { field: "note", headerName: "Note", flex: 1, valueFormatter: (params) => params.row?.ticket?.note },
      {
        field: "done",
        headerName: "Done",
        flex: 1,
        type: "boolean",
        valueFormatter: (params) => params.row?.fsh?.done,
      },
      {
        field: "priority",
        headerName: "Priority",
        flex: 1,
        valueFormatter: (params) => params.row?.fsh?.priority,
      },
    ],
    []
  );
  const PCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        type: "date",
        width: 180,
        valueFormatter: (params) => formatTimestampToDate(params.row?.pq?.date),
      },
      { field: "so", headerName: "SO", flex: 1, valueFormatter: (params) => params.row?.so?.number },
      { field: "unit", headerName: "Unit", flex: 1, valueFormatter: (params) => params.row?.unit?.number },
      { field: "device", headerName: "Device ID", flex: 3, valueFormatter: (params) => params.row?.item?.no },
      { field: "note", headerName: "Note", flex: 1, valueFormatter: (params) => params.row?.pq?.note },
      {
        field: "done",
        headerName: "Done",
        flex: 1,
        type: "boolean",
        valueFormatter: (params) => params.row?.pq?.done,
      },
      {
        field: "priority",
        headerName: "Priority",
        flex: 1,
        valueFormatter: (params) => params.row?.pq?.priority,
      },
    ],
    []
  );
  const QuestionCols: GridColDef[] = useMemo(
    () => [
      { field: "date", headerName: "Date", type: "date", width: 180 },
      { field: "department", headerName: "Department", flex: 2 },
      { field: "question", headerName: "Question", flex: 4 },
      { field: "note", headerName: "Note", flex: 2 },
      { field: "priority", headerName: "Priority", flex: 1 },
    ],
    []
  );
  const QCCols: GridColDef[] = useMemo(
    () => [
      {
        field: "date",
        headerName: "Date",
        type: "date",
        width: 180,
        valueFormatter: (params) => formatTimestampToDate(params.row?.qcCase?.date),
      },
      { field: "FlagId", headerName: "Flag ID", flex: 2, valueFormatter: (params) => params.row?.qcFlag?.number },
      {
        field: "section",
        headerName: "Section",
        flex: 2,
        valueFormatter: (params) => params.row?.qcFlag?.section,
      },
      { field: "so", headerName: "SO", flex: 1, valueFormatter: (params) => params.row?.so?.number },
      { field: "unit", headerName: "Unit", flex: 1, valueFormatter: (params) => params.row?.unit?.number },
      { field: "note", headerName: "Note", flex: 3, valueFormatter: (params) => params.row?.qcCase?.note },
    ],
    []
  );

  return (
    <Box>
      {selectedField && <FieldModal open={fieldOpen} onClose={() => setFieldOpen(false)} help={selectedField} />}
      {selectedPurchase && (
        <PurchaseModal open={purchaseOpen} onClose={() => setPurchaseOpen(false)} help={selectedPurchase} />
      )}
      <BasePaper>
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
          <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
            <Tab label="Report" />
            <Tab label="EN. Approval" />
            <Tab label="Field Service Help" />
            <Tab label="Purchasing Help" />
            <Tab label="Questions" />
            <Tab label="Quality Control" />
          </Tabs>
          <div style={{ flexGrow: 1 }} />
        </Box>
        {activeTab === 0 && <Reports />}
        {/* /panel/engineering/:deviceId */}
        {activeTab === 1 && (
          <BaseDataGrid
            rows={engAp || []}
            cols={EACols}
            onRowSelected={(d) => {
              history.push(`/panel/engineering/${d.ItemId.id}`);
            }}
            height={"78.7vh"}
          />
        )}
        {activeTab === 2 && (
          <BaseDataGrid
            rows={FSH ? FSH.map((item: any, i: any) => ({ ...item, id: i })) : []}
            cols={FSCols}
            onRowSelected={(d) => {
              setSelectedField(d);
              setFieldOpen(true);
            }}
            height={"78.7vh"}
          />
        )}
        {activeTab === 3 && (
          <BaseDataGrid
            rows={PQ || []}
            cols={PCols}
            onRowSelected={(d) => {
              setSelectedPurchase(d);
              setPurchaseOpen(true);
            }}
            height={"78.7vh"}
          />
        )}
        {activeTab === 4 && (
          <BaseDataGrid rows={GQ || []} cols={QuestionCols} onRowSelected={() => {}} height={"78.7vh"} />
        )}
        {activeTab === 5 && (
          <BaseDataGrid rows={QCCase || []} cols={QCCols} onRowSelected={() => {}} height={"78.7vh"} />
        )}
      </BasePaper>
    </Box>
  );
}
