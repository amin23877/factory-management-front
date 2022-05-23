import React, { useState, useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import { CommissionForm, GeneralForm, MainContactForm, MoreInfoForm } from "./Forms";
import Button from "app/Button";
import { BasePaper } from "app/Paper";
import BaseDataGrid from "app/BaseDataGrid";

import { editClient, IClient } from "api/client";

import SOTable from "../../Items/SOTable";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import ContactTab from "common/Contact/Tab";
import AddressTab from "common/Address/Tab";
import { useLock, LockButton } from "common/Lock";

import Toast from "app/Toast";
import { getModifiedValues } from "logic/utils";

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

  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  const { data: activities } = useSWR<{ result: IActivity[]; total: number }>(
    activeTab === 2 ? `/activity/client/${selectedRow.id}` : null
  );

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await editClient(selectedRow.id, getModifiedValues(values, selectedRow));
      mutate("/client");
      mutate("/client?approved=false");
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

  return (
    <Box>
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
                    <Box display="flex" textAlign="center" style={{ width: "100%" }}>
                      <Button type="submit" kind="edit" style={{ width: "100%" }} disabled={lock}>
                        Save
                      </Button>
                      <LockButton />
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
                    <Tab label="Addresses" />
                    <Tab label="Auditing" />
                  </Tabs>
                  {activeTab === 0 && <ContactTab itemId={selectedRow.id} model="client" lock={lock} />}
                  {activeTab === 1 && <DocumentTab itemId={selectedRow.id} model="client" lock={lock} />}
                  {activeTab === 2 && (
                    <BaseDataGrid
                      height="calc(100% - 60px)"
                      cols={activityCols}
                      rows={activities?.result || []}
                      onRowSelected={() => {}}
                    />
                  )}
                  {activeTab === 3 && <SOTable rows={[]} />}
                  {activeTab === 5 && <NoteTab itemId={selectedRow.id} model="client" lock={lock} />}
                  {activeTab === 6 && <AddressTab model="client" itemId={selectedRow.id} lock={lock} />}
                </BasePaper>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
