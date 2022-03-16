import React, { useState, useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import { CommissionForm, GeneralForm, MainContactForm, MoreInfoForm } from "./Forms";
import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

import { editClient, IClient } from "../../../api/client";
import { INote } from "../../../api/note";

import SOTable from "../../Items/SOTable";

import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";

import NoteModal from "../../../common/NoteModal";
import DocumentModal from "../../../common/DocumentModal";
import { ContactModal } from "../../Modals/ContactModal";
import Toast from "../../../app/Toast";
import { IDocument } from "../../../api/document";
import { getModifiedValues } from "../../../logic/utils";
import { IContact } from "api/contact";
import { IActivity } from "api/activity";

export default function ClientDetails({
  selectedRow,
  req,
  changeTab,
}: {
  selectedRow: IClient;
  req?: any;
  changeTab: (a: number) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);

  const { data: contacts } = useSWR<IContact[]>(activeTab === 0 ? `/contact/client/${selectedRow.id}` : null);
  const { data: documents } = useSWR<{ result: IDocument[]; total: number }>(
    activeTab === 1 ? `/document/client/${selectedRow.id}` : null
  );
  const { data: activities } = useSWR<{ result: IActivity[]; total: number }>(
    activeTab === 2 ? `/activity/client/${selectedRow.id}` : null
  );
  const { data: notes } = useSWR<{ result: INote[]; total: number }>(
    activeTab === 5 ? `/note/client/${selectedRow.id}` : null
  );

  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addDocModal, setAddDocModal] = useState(false);
  const [addContact, setAddContact] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await editClient(selectedRow.id, getModifiedValues(values, selectedRow));
      mutate("/customer");
      mutate("/customer?approved=false");
      setSubmitting(false);

      Toast("Record updated", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const activityCols = useMemo<GridColumns>(
    () => [
      { field: "startTime", headerName: "Entry Date", width: 150, type: "date" },
      { field: "number", headerName: "Quote ID", flex: 1 },
      { field: "project", headerName: "Project Name", flex: 1 },
      { field: "quotedBy", headerName: "Quoted By", flex: 1 },
      { field: "requestedBy", headerName: "Requested By", flex: 1 },
      { field: "note", headerName: "Note" },
    ],
    []
  );
  const noteCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        width: 120,
      },
      {
        field: "creator",
        headerName: "Creator",
        width: 180,
        valueFormatter: (params) => params.row?.EmployeeId?.username,
      },
      { field: "subject", headerName: "Subject", width: 300 },
      { field: "note", headerName: "Note", flex: 1 },
    ],
    []
  );

  const docCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        width: 120,
      },
      {
        field: "EmployeeId",
        headerName: "Creator",
        valueFormatter: (params) => params.row?.employee?.username,
        width: 120,
      },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "id", headerName: "ID", width: 200 },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "type",
        headerName: "File Type",
        valueFormatter: (params) => fileType(params.row?.path),
        width: 120,
      },
    ],
    []
  );

  const contactsCols = [
    { field: "firstName", headerName: "First Name", width: 110 },
    { field: "lastName", headerName: "Last Name" },
    { field: "phone", headerName: "Phone" },
    { field: "ext", headerName: "Ext" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "title", headerName: "Title" },
    { field: "department", headerName: "Department", width: 120 },
    { field: "main", headerName: "Main", type: "boolean" },
    { field: "active", headerName: "Active", type: "boolean" },
  ];
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box>
      <ContactModal itemId={selectedRow?.id} model="client" open={addContact} onClose={() => setAddContact(false)} />
      <NoteModal itemId={selectedRow?.id} model="client" open={addNoteModal} onClose={() => setAddNoteModal(false)} />
      <DocumentModal open={addDocModal} onClose={() => setAddDocModal(false)} itemId={selectedRow?.id} model="client" />

      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            {/* <Box display="flex" style={{ gap: 10 }} flexDirection={phone ? "column" : "row"}> */}
            <Box
              display="grid"
              gridGap={10}
              gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}
              height={phone ? "" : "calc(100vh - 200px)"}
            >
              <Box>
                <Box display="flex" flexDirection="column" style={phone ? { gap: 10 } : { gap: 10, height: "100%" }}>
                  <BasePaper>
                    <GeneralForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      req={req}
                      cId={selectedRow.id}
                      changeTab={changeTab}
                    />
                    <Box textAlign="center" style={{ width: "100%" }}>
                      <Button type="submit" kind="edit" style={{ width: "100%" }}>
                        Save
                      </Button>
                    </Box>
                  </BasePaper>
                  <BasePaper style={{ height: "100%", flex: 1 }}>
                    <Tabs
                      textColor="primary"
                      value={activeSubTab}
                      onChange={(e, nv) => setActiveSubTab(nv)}
                      variant="scrollable"
                      scrollButtons={phone ? "on" : "auto"}
                      style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
                    >
                      <Tab label="More Info" />
                      <Tab label="Main Contact" />
                      <Tab label="Commission" />
                    </Tabs>
                    <Box>
                      {activeSubTab === 0 && (
                        <MoreInfoForm
                          values={values}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          touched={touched}
                        />
                      )}
                      {activeSubTab === 1 && (
                        <MainContactForm
                          values={values}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          touched={touched}
                        />
                      )}
                      {activeSubTab === 2 && (
                        <CommissionForm
                          values={values}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          touched={touched}
                        />
                      )}
                    </Box>
                  </BasePaper>
                </Box>
              </Box>
              <Box>
                <BasePaper style={{ height: "100%" }}>
                  <Tabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, v) => setActiveTab(v)}
                    variant="scrollable"
                    style={phone ? { marginBottom: "10px", maxWidth: "calc(100vw - 63px)" } : { marginBottom: "10px" }}
                    scrollButtons={phone ? "on" : "auto"}
                  >
                    <Tab label="Contacts" />
                    <Tab label="Documents" />
                    <Tab label="Activities" />
                    <Tab label="Sales History" />
                    <Tab label="Work Orders" />
                    <Tab label="Notes" />
                    <Tab label="Auditing" />
                  </Tabs>
                  {activeTab === 0 && (
                    <>
                      <Button
                        onClick={() => {
                          setAddContact(true);
                        }}
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                      >
                        + Add Contact
                      </Button>
                      <BaseDataGrid
                        height="calc(100% - 100px)"
                        cols={contactsCols}
                        rows={contacts || []}
                        onRowSelected={(c) => {}}
                      />
                    </>
                  )}
                  {activeTab === 1 && (
                    <>
                      <Button
                        onClick={() => {
                          setAddDocModal(true);
                        }}
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                      >
                        + Add Document
                      </Button>
                      <BaseDataGrid
                        height="calc(100% - 100px)"
                        cols={docCols}
                        rows={documents?.result || []}
                        onRowSelected={(v) => {}}
                      />
                    </>
                  )}
                  {activeTab === 2 && (
                    <BaseDataGrid
                      height="calc(100% - 60px)"
                      cols={activityCols}
                      rows={activities?.result || []}
                      onRowSelected={() => {}}
                    />
                  )}
                  {activeTab === 3 && <SOTable rows={[]} />}
                  {activeTab === 5 && (
                    <>
                      <Button onClick={() => setAddNoteModal(true)} variant="outlined" style={{ marginBottom: "10px" }}>
                        + Add Note
                      </Button>
                      <BaseDataGrid
                        height="calc(100% - 100px)"
                        cols={noteCols}
                        rows={notes?.result || []}
                        onRowSelected={(v) => {}}
                      />
                    </>
                  )}
                </BasePaper>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
