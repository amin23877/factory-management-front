import React, { useState } from "react";
import { Grid, Tab, Tabs } from "@material-ui/core";

import ContactTab from "common/ContactTab";
import NoteTab from "common/NoteTab";
import DocumentTab from "common/DocumentTab";
import Form from "./Form";
import { BasePaper } from "app/Paper";

import { repType } from "api/rep";

export default function RepDetails({ selectedRep }: { selectedRep: repType }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <BasePaper>
          <Form initialValues={selectedRep} />
        </BasePaper>
      </Grid>
      <Grid item xs={12} md={9}>
        <BasePaper>
          <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
            <Tab label="Contacts" />
            <Tab label="Notes" />
            <Tab label="Documents" />
            <Tab label="Activities" />
            <Tab label="Sales" />
            <Tab label="Work Orders" />
            <Tab label="Leads" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && <ContactTab model="rep" itemId={selectedRep.id} />}
          {activeTab === 1 && <NoteTab model="rep" itemId={selectedRep.id} />}
          {activeTab === 2 && <DocumentTab model="rep" itemId={selectedRep.id} />}
        </BasePaper>
      </Grid>
    </Grid>
  );
}
