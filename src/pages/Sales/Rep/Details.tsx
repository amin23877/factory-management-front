import React, { useState } from "react";
import { Box, Grid, LinearProgress, Tab, Tabs } from "@material-ui/core";

import ContactTab from "common/Contact/Tab";
import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import SOTab from "features/Sales/SO/Datagrid";
import QuoteTab from "features/Sales/Quote/Datagrid";

import Form from "../../../features/Sales/Rep/Details/Form";
import { BasePaper } from "app/Paper";

import { repType } from "api/rep";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { LockButton, LockProvider, useLock } from "common/Lock";

export default function RepDetails() {
  const { repId } = useParams<{ repId: string }>();
  const { data: selectedRep } = useSWR<repType>(repId ? `/rep/${repId}` : null);
  const { setLock } = useLock();

  const [activeTab, setActiveTab] = useState(0);

  if (!selectedRep) {
    return <LinearProgress />;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <BasePaper>
          <LockProvider>
            <Form initialValues={selectedRep} />
          </LockProvider>
        </BasePaper>
      </Grid>
      <Grid item xs={12} md={9}>
        <BasePaper>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Tabs
              value={activeTab}
              onChange={(e, nv) => {
                setActiveTab(nv);
                setLock(true);
              }}
            >
              <Tab label="Contacts" /> 0
              <Tab label="Notes" /> 1
              <Tab label="Documents" /> 2
              <Tab label="Activities" /> 3
              <Tab label="Sales" /> 4
              <Tab label="Work Orders" /> 5
              <Tab label="Leads" /> 6
              <Tab label="Auditing" /> 8
            </Tabs>
            <LockButton />
          </Box>
          {activeTab === 0 && <ContactTab model="rep" itemId={selectedRep.id} />}
          {activeTab === 1 && <NoteTab model="rep" itemId={selectedRep.id} />}
          {activeTab === 2 && <DocumentTab model="rep" itemId={selectedRep.id} />}
          {activeTab === 4 && (
            <SOTab onRowSelected={() => {}} params={{ RepId: selectedRep.id }} style={{ height: "64vh" }} />
          )}
          {activeTab === 5 && (
            <QuoteTab onRowSelected={() => {}} params={{ RepId: selectedRep.id }} style={{ height: "64vh" }} />
          )}
        </BasePaper>
      </Grid>
    </Grid>
  );
}
