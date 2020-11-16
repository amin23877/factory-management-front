import React, { useState } from "react";
import { Container, Box, Breadcrumbs, Link } from "@material-ui/core";

import { Production } from "../features/Production";
import { Ship } from "../features/Ship";
import { Sales } from "../features/Sales";
import { MainTabs } from "../app/Tabs";

export default function Dashboard() {
    const [curTab, setCurTab] = useState(0);

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" my={2}>
                <Box>
                    <Breadcrumbs separator=">">
                        <Link>Home</Link>
                        <Link>Website</Link>
                        <Link>Dashboard</Link>
                    </Breadcrumbs>
                </Box>
                <Box>
                    <MainTabs tabs={["Production", "Ship", "Sales"]} currentTab={curTab} onChange={setCurTab} />
                </Box>
            </Box>
            {curTab === 0 && <Production />}
            {curTab === 1 && <Ship />}
            {curTab === 2 && <Sales />}
        </Container>
    );
}
