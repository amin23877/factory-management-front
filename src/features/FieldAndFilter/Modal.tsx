import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";

import Dialog from "../../app/Dialog";
import { AddFieldModal } from "../../features/Field/Modal"
import Filters from '../../features/Filter/Modals'
import List from './List'
export default function FieldNFilter({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} title="Filters" maxWidth="md" fullWidth>
            <Box p={1} display="flex" flexDirection="column">
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Filter" />
                    <Tab label="Field" />
                    <Tab label="Flowchart" />
                </Tabs>
                {activeTab === 0 && (
                    <>
                        <Filters />
                    </>
                )}
                {activeTab === 1 &&
                    <>
                        <AddFieldModal />
                    </>
                }
                {activeTab === 2 &&
                    <>
                        <List />
                    </>
                }
            </Box>
        </Dialog>
    );
}


