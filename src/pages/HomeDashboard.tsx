import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Quote from "../features/Dashboard/Quote";
import { Ship } from "../features/Dashboard/Ship";
import { Sales } from "../features/Dashboard/Sales";
import { MyTab, MyTabs } from "../app/Tabs";

import { SearchBar } from "../app/TextField";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Box display="flex" alignItems="center" style={{ margin: "1em 0" }}>
        <SearchBar />
        <div style={{ flexGrow: 1 }} />
        <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ height: "40px" }}>
          <MyTab label="Quote" />
          <MyTab label="Sales" />
          <MyTab label="Ship" />
        </MyTabs>
      </Box>
      {activeTab === 0 && <Quote />}
      {activeTab === 1 && <Sales />}
      {activeTab === 2 && <Ship />}
    </>
  );
}
