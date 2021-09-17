import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import Table from "./Table";
import Details from "./Details";

import { ITicket } from "../../../../api/ticket";

export default function ServiceList() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedTicket, setSelectedTicket] = useState<ITicket>();

    return (
        <div>
            <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="List" />
                <Tab label="Details" disabled={!selectedTicket} />
            </Tabs>
            {activeTab === 0 && (
                <Table
                    onRowSelected={(t) => {
                        setSelectedTicket(t);
                        setActiveTab(1);
                    }}
                />
            )}
            {activeTab === 1 && selectedTicket && <Details ticket={selectedTicket} />}
        </div>
    );
}
