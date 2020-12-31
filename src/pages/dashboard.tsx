import React, { useState } from "react";
import { Container, Box, Breadcrumbs, Link, Grid } from "@material-ui/core";

import { Production } from "../features/Production";
import { Ship } from "../features/Ship";
import { Sales } from "../features/Sales";
import { MainTabs } from "../app/Tabs";

export default function Dashboard() {
    const [curTab, setCurTab] = useState(0);

    return (
        <Container>
            <Grid container style={{ margin: "1em 0" }}>
                <Grid item xs={12} md={4}>
                    <Breadcrumbs separator=">">
                        <Link>Website</Link>
                        <Link>Home</Link>
                        <Link>Dashboard</Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12} md={8}>
                    <MainTabs tabs={["Production", "Ship", "Sales"]} currentTab={curTab} onChange={setCurTab} />
                </Grid>
            </Grid>
            {curTab === 0 && <Production />}
            {curTab === 1 && <Ship />}
            {curTab === 2 && <Sales />}
        </Container>
    );
}
