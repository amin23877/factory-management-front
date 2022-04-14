import React, { useEffect, useState } from "react";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { Tabs, Tab, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import UnitTable from "features/Production/Dashboard/UnitList/Table";
import UnitDetails from "features/Production/Dashboard/UnitList/Details";
import ServiceTable from "features/Production/Dashboard/ServiceList/Table";
import TicketDetails from "features/Production/Dashboard/ServiceList/Details";
import { BasePaper } from "app/Paper";

import { IUnit } from "api/units";
import { ITicket } from "api/ticket";

function UnitDetailsPage() {
  const { unitNumber } = useParams<{ unitNumber: string }>();
  const { data: defaultUnit } = useSWR<IUnit>(unitNumber ? `/unit/${unitNumber}` : null);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<IUnit | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

  useEffect(() => {
    if (defaultUnit && selectedUnit === null) {
      setSelectedUnit(defaultUnit);
      setActiveTab(2);
    }
  }, [defaultUnit, selectedUnit]);

  if (!unitNumber) {
    return <></>;
  }
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

export default UnitDetailsPage;
