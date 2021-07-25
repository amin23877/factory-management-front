import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import Overview from "../features/Production/Overview";
import UnitBomModal from "../features/UBOM/Modal";
import Details from "../features/Production";

import { MyTabs, MyTab } from "../app/Tabs";

import { IUnit } from "../api/units";

export default function Unit() {
    const [selectedUnit, setSelectedUnit] = useState<IUnit | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    const [bOpen, setBOpen] = useState(false);

    return (
        <Container>
            {selectedUnit && <UnitBomModal open={bOpen} onClose={() => setBOpen(false)} unitId={selectedUnit.id} />}

            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="secondary">
                    <MyTab color="primary" label="Overview" />
                    <MyTab label="Details" disabled={!selectedUnit} />
                </MyTabs>
            </Box>
            {activeTab === 0 && <Overview setActiveTab={setActiveTab} setSelectedUnit={setSelectedUnit} />}
            {activeTab === 1 && selectedUnit && <Details unit={selectedUnit} />}
        </Container>
    );
}
