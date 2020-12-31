import React, { useState } from "react";
import { Box, Container, Link, Breadcrumbs, Tabs, Tab } from "@material-ui/core";

import { MainTabs } from "../app/Tabs";

// import UnderDev from "../app/UnderDevelopment";

import ItemsList from "../features/ItemsList";
import ItemsDetails from "../features/ItemsDetails";

const Inventory = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedItem, setSelectedItem] = useState({});
    const [detailDis, setDetailDis] = useState(true);

    return (
        <Container style={{ maxWidth: 1240 }}>
            <Box display="flex" my={2}>
                <Breadcrumbs separator=">">
                    <Link>Website</Link>
                    <Link>Home</Link>
                    <Link>Inventory</Link>
                </Breadcrumbs>
                <div style={{ flexGrow: 1 }} />
                {/* <MainTabs tabs={["Overview", "Details"]} currentTab={activeTab} onChange={setActiveTab} /> */}
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="secondary">
                    <Tab color="primary" label="Overview" />
                    {/* <Tab label="Details" disabled={detailDis} /> */}
                    <Tab label="Details" />
                </Tabs>
            </Box>
            {activeTab === 0 && (
                <ItemsList
                    onRowSelected={(r) => {
                        setSelectedItem(r);
                        console.log(r);
                        setDetailDis(false);
                    }}
                />
            )}
            {activeTab === 1 && <ItemsDetails selectedRow={selectedItem} />}
        </Container>
    );
};

export default Inventory;
