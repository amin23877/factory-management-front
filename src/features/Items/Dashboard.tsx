import { Box, Tabs, Tab } from "@material-ui/core";
import React, { Fragment, useState } from "react";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Fragment>
            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Recently Added Items" />
                    <Tab label="Items On Order" />
                    <Tab label="Low Quantity Items" />
                </Tabs>
                <div style={{ flexGrow: 1 }} />
            </Box>
        </Fragment>
    );
};

export default Dashboard;
