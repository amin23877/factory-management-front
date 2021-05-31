import React, { useState } from "react";
import { Container, Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";

import Table from "./Table";
import Details from "./Details";

import List from "../../app/SideUtilityList";
import JobModal from "../../features/Tickets/Modals";

import { IJob } from "../../api/job";
import { AddRounded } from "@material-ui/icons";

export default function Tickets() {
    const [jobModal, setJobModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<IJob>();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <JobModal open={jobModal} onClose={() => setJobModal(false)} />

            <Box display="flex">
                <div style={{ flexGrow: 1 }} />
                <Tabs textColor="primary" value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedJob} />
                </Tabs>
            </Box>

            <Box display="flex">
                <Box>
                    <List>
                        <ListItem>
                            <IconButton onClick={() => setJobModal(true)}>
                                <AddRounded />
                            </IconButton>
                        </ListItem>
                    </List>
                </Box>
                <Box flex={1} flexGrow={1} ml={2}>
                    {activeTab === 0 && (
                        <Box flex={11} ml={2}>
                            <Table
                                onRowSelected={(r) => {
                                    setSelectedJob(r);
                                    setActiveTab(1);
                                    // setJobModal(true);
                                }}
                            />
                        </Box>
                    )}
                    {activeTab === 1 && selectedJob && <Details initialValue={selectedJob} />}
                </Box>
            </Box>
        </Container>
    );
}
