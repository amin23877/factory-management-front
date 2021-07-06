import React from "react";
import { Box } from "@material-ui/core";

import { OverDueServices, SearchForSO, UnitsDueDateList } from "../Dashboard/Quote";

import Table from "./Table";

function Overview({ setActiveTab, setSelectedUnit }: { setActiveTab: any; setSelectedUnit: any }) {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr 2fr" gridGap={10}>
            <UnitsDueDateList />
            <SearchForSO />
            <OverDueServices />
            <Box style={{ gridColumnEnd: "span 4" }}>
                <Table setActiveTab={setActiveTab} setSelectedUnit={setSelectedUnit} />
            </Box>
        </Box>
    );
}

export default Overview;
