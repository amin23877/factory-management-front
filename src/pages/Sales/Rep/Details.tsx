import React, { useState } from "react";
import { Box, Grid, LinearProgress, Tab, Tabs } from "@material-ui/core";

import ContactTab from "common/Contact/Tab";
import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

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
              <Tab label="Contacts" />
              <Tab label="Notes" />
              <Tab label="Documents" />
              <Tab label="Activities" />
              <Tab label="Sales" />
              <Tab label="Work Orders" />
              <Tab label="Leads" />
              <Tab label="Auditing" />
            </Tabs>
            <LockButton />
          </Box>
          {activeTab === 0 && <ContactTab model="rep" itemId={selectedRep.id} />}
          {activeTab === 1 && <NoteTab model="rep" itemId={selectedRep.id} />}
          {activeTab === 2 && <DocumentTab model="rep" itemId={selectedRep.id} />}
        </BasePaper>
      </Grid>
    </Grid>
  );
}
