import React, { useState, useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab, LinearProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";
import { useParams } from "react-router";

import { CommissionForm, GeneralForm, MainContactForm, MoreInfoForm } from "features/Sales/Customer/Forms";
import Button from "app/Button";
import { BasePaper } from "app/Paper";
import BaseDataGrid from "app/BaseDataGrid";

import { editClient, IClient } from "api/client";

import SOTable from "features/Items/SOTable";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import ContactTab from "common/Contact/Tab";

import Toast from "app/Toast";
import { IDocument } from "api/document";
import { getModifiedValues } from "logic/utils";

export default function ClientDetails({ req, changeTab }: { req?: any; changeTab: (a: number) => void }) {
  const { cusNumber } = useParams<{ cusNumber: string }>();
  const { data: selectedRow } = useSWR<IClient>(cusNumber ? `/customer/${cusNumber}` : null);

  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);

  const { data: activities } = useSWR<IDocument[]>(activeTab === 2 ? `/activity/customer/${selectedRow?.id}` : null);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (selectedRow) {
        await editClient(selectedRow.id, getModifiedValues(values, selectedRow));
        mutate("/customer");
        mutate("/customer?approved=false");
        setSubmitting(false);
        Toast("Record updated", "success");
      }
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

  if (!selectedRow) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Box pb="8px" display="flex" style={{ gap: 10 }}>
              <Box flex={3}>
                <Box display="flex" flexDirection="column" style={{ gap: 10 }}>
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
                  <BasePaper style={{ height: "100%" }}>
                    <Tabs
                      textColor="primary"
                      value={activeSubTab}
                      onChange={(e, nv) => setActiveSubTab(nv)}
                      variant="scrollable"
                      style={{ maxWidth: 700 }}
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
                      {activeSubTab === 1 && <MainContactForm selectedRow={selectedRow} />}
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
              <Box flex={4}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, v) => setActiveTab(v)} variant="scrollable">
                  <Tab label="Contacts" />
                  <Tab label="Documents" />
                  <Tab label="Activities" />
                  <Tab label="Sales History" />
                  <Tab label="Work Orders" />
                  <Tab label="Notes" />
                  <Tab label="Auditing" />
                </Tabs>
                <BasePaper>
                  {activeTab === 0 && <ContactTab itemId={selectedRow.id} model="client" />}
                  {activeTab === 1 && <DocumentTab itemId={selectedRow.id} model="client" />}
                  {activeTab === 2 && (
                    <BaseDataGrid
                      height="62.5vh"
                      cols={activityCols}
                      rows={activities || []}
                      onRowSelected={() => {}}
                    />
                  )}
                  {activeTab === 3 && <SOTable rows={[]} />}
                  {activeTab === 5 && <NoteTab itemId={selectedRow.id} model="client" />}
                </BasePaper>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
