import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { IActivity } from "api/activity";

import EditActivityForm from "./Forms";

import { BasePaper } from "app/Paper";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

export default function EditForm({ selectedActivity, onDone }: { selectedActivity: IActivity; onDone: () => void }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <EditActivityForm init={selectedActivity} onDone={onDone} />

      <BasePaper style={{ marginTop: "1em" }}>
        <Box>
          <Tabs
            style={{ marginBottom: 10 }}
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => setActiveTab(nv)}
          >
            <Tab label="Notes" />
            <Tab label="Documents" />
          </Tabs>
          {activeTab === 0 && <NoteTab itemId={selectedActivity.id} model="activity" />}
          {activeTab === 1 && <DocumentTab itemId={selectedActivity.id} model="activity" />}
        </Box>
      </BasePaper>
    </Box>
  );
}
