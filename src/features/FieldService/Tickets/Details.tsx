import React, { useMemo, useState } from "react";
import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { Form, Formik } from "formik";

import BaseDataGrid from "app/BaseDataGrid";
import { BasePaper } from "app/Paper";
import Snack from "app/Snack";
import JobForm, { ContactForm, TechnicianForm, EntitiesForm } from "./Forms";
import { ITicket, schema, updateTicket } from "api/ticket";

import { getModifiedValues } from "logic/utils";
import { formatTimestampToDate } from "logic/date";

import DocumentTab from "common/Document/Tab";
import NotesTab from "common/Note/Tab";
import AuditTable from "common/Audit";

export default function Details({ initialValue }: { initialValue: ITicket }) {
  const [activeTab, setActiveTab] = useState(0);
  const [moreActiveTab, setMoreActiveTab] = useState(0);
  const [snack, setSnack] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");
  const phone = useMediaQuery("(max-width:900px)");
  const { data: serviceHistory } = useSWR(activeTab === 0 ? `/ticket?UnitId=${initialValue?.UnitId?.id}` : null);

  const historyCols = useMemo<GridColumns>(
    () => [
      {
        field: "startDate",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.startDate),
        width: 110,
      },
      { field: "number", headerName: "Ticket ID", width: 110 },
      { field: "subject", headerName: "Subject", width: 110 },
      { field: "Company", headerName: "Company", width: 110, valueFormatter: (params) => params.row?.name },
      { field: "contact", headerName: "Contact Name", width: 130 },
      { field: "phone", headerName: "Contact Number", width: 130 },
      { field: "email", headerName: "Contact Email", width: 130 },
      { field: "state", headerName: "State", width: 110, valueFormatter: (params) => params.row?.state },
      {
        field: "Zip Code",
        headerName: "Zip Code",
        width: 110,
        valueFormatter: (params) => params.row?.zipcode,
      },
      {
        field: "assignee",
        headerName: "Assigned to",
        width: 120,
      },
      {
        field: "createdBy",
        headerName: "Created By",
        width: 120,
        valueFormatter: (params) => params.row?.AssignedTo?.username,
      },
      { field: "category", headerName: "Category", width: 110 },
      {
        field: "targetDate",
        headerName: "Target Date",
        width: 120,
        type: "date",
      },
      { field: "status", headerName: "Status", width: 110 },
      { field: "tag", headerName: "tag", width: 110, valueFormatter: (params) => params.row?.tag?.name },
    ],
    []
  );

  const handleSubmit = async (d: any) => {
    try {
      const data = getModifiedValues(d, initialValue);
      const resp = await updateTicket(initialValue.id, data);
      if (resp) {
        setMsg("Job updated!");
        setSeverity("success");
        setSnack(true);

        mutate("/jobs");
      }
    } catch (error) {
      setMsg("an error occurred !");
      setSeverity("error");
      setSnack(true);

      console.log(error);
    }
  };

  return (
    <>
      <Snack open={snack} onClose={() => setSnack(false)} severity={severity}>
        {msg}
      </Snack>

      <Box
        display="grid"
        gridTemplateColumns={phone ? "1fr" : "1fr 1fr"}
        gridGap={10}
        flex={1}
        height={phone ? "" : "calc(100vh - 160px)"}
      >
        <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 10 }} height={phone ? "" : "100%"}>
                <BasePaper>
                  <JobForm
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </BasePaper>
                <BasePaper style={phone ? {} : { flex: 1, overflowY: "auto" }}>
                  <Tabs
                    onChange={(e, nv) => setMoreActiveTab(nv)}
                    value={moreActiveTab}
                    textColor="primary"
                    variant="scrollable"
                    style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
                    scrollButtons={phone ? "on" : "auto"}
                  >
                    <Tab label="Contact" />
                    <Tab label="Entities" />
                    <Tab label="Technician" />
                  </Tabs>
                  {moreActiveTab === 0 && (
                    <ContactForm values={values} handleBlur={handleBlur} handleChange={handleChange} />
                  )}
                  {moreActiveTab === 1 && (
                    <EntitiesForm
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {moreActiveTab === 2 && (
                    <TechnicianForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </BasePaper>
              </Box>
            </Form>
          )}
        </Formik>
        <BasePaper style={{ height: "100%" }}>
          <Tabs
            variant="scrollable"
            style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }}
            scrollButtons={phone ? "on" : "auto"}
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            textColor="primary"
          >
            <Tab label="Filed Service History" />
            <Tab label="Device Document" />
            <Tab label="Device Forms" />
            <Tab label="Ticket Documents" />
            <Tab label="Device RMA History" />
            <Tab label="Notes" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && (
            <BaseDataGrid
              cols={historyCols}
              rows={serviceHistory?.result || []}
              onRowSelected={() => {}}
              height={"calc(100% - 60px)"}
            />
          )}
          {activeTab === 1 && <DocumentTab itemId={initialValue?.UnitId?.id} model="unit" />}
          {activeTab === 3 && <DocumentTab itemId={initialValue?.id} model="ticket" />}
          {activeTab === 4 && (
            <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} height={"calc(100% - 60px)"} />
          )}
          {activeTab === 5 && <NotesTab itemId={initialValue.id} model="ticket" />}
          {activeTab === 6 && <AuditTable itemId={initialValue.id} />}
        </BasePaper>
      </Box>
    </>
  );
}
