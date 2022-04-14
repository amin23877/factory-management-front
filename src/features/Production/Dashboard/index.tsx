import React, { useState } from "react";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { Tabs, Tab, Box } from "@material-ui/core";

import UnitTable from "./UnitList/Table";
import UnitDetails from "./UnitList/Details";
import ServiceTable from "./ServiceList/Table";
import TicketDetails from "./ServiceList/Details";
import { BasePaper } from "app/Paper";

import { IUnit } from "api/units";
import { ITicket } from "api/ticket";

function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<IUnit | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

  return (
    <BasePaper>
      <Box display="flex">
        <Tabs
          value={activeTab}
          onChange={(e, nv) => setActiveTab(nv)}
          textColor="primary"
          style={{ marginBottom: "10px" }}
        >
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> Unit List
              </span>
            }
            wrapped
          />
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> Service List
              </span>
            }
            wrapped
          />
          <Tab
            disabled={!(selectedTicket || selectedUnit)}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
              </span>
            }
          />
        </Tabs>
        <div style={{ flex: 1 }}></div>
      </Box>
      {activeTab === 0 && (
        <UnitTable
          onRowSelected={(u) => {
            setSelectedTicket(null);
            setActiveTab(2);
            setSelectedUnit(u);
          }}
        />
      )}
      {activeTab === 1 && (
        <ServiceTable
          onRowSelected={(t) => {
            setSelectedUnit(null);
            setSelectedTicket(t);
            setActiveTab(2);
          }}
        />
      )}
      {activeTab === 2 && selectedUnit && <UnitDetails unit={selectedUnit} />}
      {activeTab === 2 && selectedTicket && <TicketDetails ticket={selectedTicket} />}
    </BasePaper>
  );
}

export default Index;
