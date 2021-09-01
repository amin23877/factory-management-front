import React, { Suspense, useState } from "react";
import { Box, Container, LinearProgress } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

const ServiceIndex = React.lazy(() => import("../features/FieldService"));
const Tickets = React.lazy(() => import("../features/Tickets"));
const Tasks = React.lazy(() => import("../features/Tasks"));

export default function FieldService() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Managment" />
                    <MyTab label="Tickets" />
                    <MyTab label="Tasks" />
                </MyTabs>
            </Box>
            <Box>
                <Suspense fallback={<LinearProgress />}>
                    {activeTab === 0 && <ServiceIndex />}
                    {activeTab === 1 && <Tickets />}
                    {activeTab === 2 && <Tasks />}
                </Suspense>
            </Box>
        </Container>
    );
}
