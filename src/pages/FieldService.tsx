import React, { Suspense, useState } from "react";
import { Box, LinearProgress } from "@material-ui/core";

import { MyTabs, MyTab } from "../app/Tabs";

const FRUs = React.lazy(() => import("../features/FieldService/FRU"));
const ServiceIndex = React.lazy(() => import("../features/FieldService"));
const Tickets = React.lazy(() => import("../features/Tickets"));
const Tasks = React.lazy(() => import("../features/Tasks"));
const Units = React.lazy(() => import("../features/FieldService/Units"));
const UP = React.lazy(() => import("../features/FieldService/UP"));
const Vendors = React.lazy(() => import("../features/Vendor"));

export default function FieldService() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box display="flex">
            <MyTabs value={activeTab} orientation="vertical" textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
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

            <Box flex={1} px={1}>
                <Suspense fallback={<LinearProgress />}>
                    {activeTab === 1 && <FRUs />}
                    {activeTab === 2 && <ServiceIndex />}
                    {activeTab === 3 && <Tickets />}
                    {activeTab === 4 && <Tasks />}
                    {activeTab === 5 && <Units />}
                    {activeTab === 7 && <UP />}
                    {activeTab === 8 && <Vendors tech />}
                </Suspense>
            </Box>
        </Box>
    );
}
