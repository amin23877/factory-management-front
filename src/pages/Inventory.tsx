import React, { useState } from "react";
import { Box, Container, Link, Breadcrumbs, Typography } from "@material-ui/core";

import { MainTabs } from "../app/Tabs";

// import UnderDev from "../app/UnderDevelopment";

import ItemsList from "../features/ItemsList";
import ItemsDetails from "../features/ItemsDetails";

const Inventory = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container style={{ maxWidth: 1240 }}>
            <Box display="flex" my={2}>
                <Breadcrumbs separator=">">
                    <Link>Website</Link>
                    <Link>Home</Link>
                    <Link>Inventory</Link>
                </Breadcrumbs>
                <div style={{ flexGrow: 1 }} />
                <MainTabs tabs={["Overview", "Details"]} currentTab={activeTab} onChange={setActiveTab} />
            </Box>
            {activeTab === 0 && <ItemsList />}
            {activeTab === 1 && <ItemsDetails />}
        </Container>
    );
};

export default Inventory;
