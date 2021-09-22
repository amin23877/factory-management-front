import React, { Suspense, useState } from "react";
import { Box, Container, LinearProgress } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";
const ServiceIndex = React.lazy(() => import("../features/FieldService"));
const Tickets = React.lazy(() => import("../features/Tickets"));
const Tasks = React.lazy(() => import("../features/Tasks"));
const FRUs = React.lazy(() => import("../features/FieldService/FRU"));
const Units = React.lazy(() => import("../features/FieldService/Units"));

export default function FieldService() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Dashboard" />
                    <MyTab label="FRU" />
                    <MyTab label="Services" />
                    <MyTab label="Tickets" />
                    <MyTab label="Tasks" />
                    <MyTab label="Units" />
                    <MyTab label="RMA" />
                    <MyTab label="UP" />
                    <MyTab label="Vendor Tech" />
                </MyTabs>
            </Box>
            <Box>
                <Suspense fallback={<LinearProgress />}>
                    {activeTab === 1 && <FRUs />}
                    {activeTab === 2 && <ServiceIndex />}
                    {activeTab === 3 && <Tickets />}
                    {activeTab === 4 && <Tasks />}
                    {activeTab === 5 && <Units />}
                </Suspense>
            </Box>
        </Container>
    );
}
