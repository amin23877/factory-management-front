import React, { useState } from "react";

import { Tabs, Tab, Box } from "@material-ui/core";

import UnitTable from "./UnitList/Table";
import UnitDetails from "./UnitList/Details";
import { IUnit } from "../../../api/units";
import TicketTable from "./ServiceList/Table";
import TicketDetails from "./ServiceList/Details";

import { ITicket } from "../../../api/ticket";
import { BasePaper } from "../../../app/Paper";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

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
                        // label="List"
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded style={{ marginRight: "5px" }} /> Unit List
                            </span>
                        }
                        wrapped
                    />
                    <Tab
                        // label="List"
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <ListAltRounded style={{ marginRight: "5px" }} /> Service List
                            </span>
                        }
                        wrapped
                    />
                    <Tab
                        // label="Details"
                        disabled={!(selectedTicket || selectedUnit)}
                        icon={
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                            </span>
                        }
                    />
                    {/* <Tab label="Unit List" />
                    <Tab label="Service List" />
                    <Tab label="Details" /> */}
                </Tabs>
                <div style={{ flex: 1 }}></div>
            </Box>
            {activeTab === 0 && (
                <UnitTable
                    onRowSelected={(u) => {
                        setSelectedTicket(null);
                        setActiveTab(2);
                        setSelectedUnit(u?.data);
                    }}
                />
            )}
            {activeTab === 1 && (
                <TicketTable
                    onRowSelected={(t) => {
                        setSelectedUnit(null);
                        setActiveTab(2);
                        setSelectedTicket(t);
                    }}
                />
            )}
            {activeTab === 2 && selectedUnit && <UnitDetails unit={selectedUnit} />}
            {activeTab === 2 && selectedTicket && <TicketDetails ticket={selectedTicket} />}
            {/* {activeTab === 0 && <UnitList />}
            {activeTab === 1 && <ServiceList />} */}
        </BasePaper>
    );
}

export default Index;
