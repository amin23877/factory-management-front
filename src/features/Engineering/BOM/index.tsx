import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";

import BOMTable from "./Table";
import DevicesList from "./DevicesList";

function BOM() {
    const [activeTab, setActiveTab] = useState(0);
    const [productFamily, setProductFamily] = useState<string>();

    const handleSelectDevice = (device: any) => {
        setProductFamily(device["Product Family"]);
        setActiveTab(1);
    };

    return (
        <Box>
            <Box mb={1}>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!productFamily} />
                </Tabs>
            </Box>
            {activeTab === 0 && <DevicesList onDeviceSelected={handleSelectDevice} />}
            {activeTab === 1 && productFamily && <BOMTable productFamily={productFamily} />}
        </Box>
    );
}

export default BOM;
