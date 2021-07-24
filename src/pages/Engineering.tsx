import React, { Fragment, useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import DevicesPanel from "../features/Devices";
import Project from "../features/projects";

import BOM from "../features/Engineering/BOM";
import Monitoring from "../features/Engineering/Monitoring";

export default function Sales() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Fragment>
      <Box display="flex" alignItems="center" my={2}>
        <SearchBar />
        <div style={{ flexGrow: 1 }} />
        <MyTabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => setActiveTab(nv)}
        >
          <MyTab label="Devices" />
          <MyTab label="Phocus Monitoring" />
          <MyTab label="Projects" />
          <MyTab label="Dashboard" />
          <MyTab label="Devices BOM" />
        </MyTabs>
      </Box>
      {activeTab === 0 && <DevicesPanel />}
      {activeTab === 1 && <Monitoring />}
      {activeTab === 2 && <Project />}
      {activeTab === 3 && <div>Engineering Dashboard</div>}
      {activeTab === 4 && <BOM />}
    </Fragment>
  );
}
