import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";

import { MyTabs, MyTab } from "../app/Tabs";
import BaseDataGrid from "../app/BaseDataGrid";
import { ProjectModal } from "../features/Modals/ProjectModals";

import { getProjectActivities } from "../api/activity";
import { getProjects } from "../api/project";

export default function Project() {
    const [activeTab, setActiveTab] = useState(0);
    const [activities, setActivities] = useState([]);
    const [projectModal, setProjectModal] = useState(false);
    const [pData, setPData] = useState<any>();
    const [projects, setProjects] = useState([]);

    const refreshProjects = async () => {
        try {
            const resp = await getProjects();
            setProjects(resp);
            setPData(null);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshActivities = async () => {
        try {
            if (pData) {
                const resp = await getProjectActivities(pData.id);
                setActivities(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshProjects();
    }, []);

    useEffect(() => {
        if (activeTab === 1) {
            refreshActivities();
        }
    }, [activeTab]);

    const activityCols: ColDef[] = [
        { field: "name" },
        { field: "subject" },
        { field: "location" },
        { field: "startTime", width: 180 },
        { field: "endTime", width: 180 },
        { field: "ActivityPriority", valueGetter: ({ data }) => data.ActivityPriority.name, width: 180 },
        { field: "ActivityStatus", valueGetter: ({ data }) => data.ActivityStatus.name, width: 180 },
        { field: "notes" },
    ];

    const cols: ColDef[] = [{ field: "name" }];

    return (
        <Container>
            <ProjectModal open={projectModal} onClose={() => setProjectModal(false)} onDone={refreshProjects} data={pData} />

            <Box my={2} display="flex" alignItems="center">
                <Button
                    onClick={() => {
                        setProjectModal(true);
                        setPData(undefined);
                    }}
                >
                    Add new Project
                </Button>
                <Button onClick={() => setProjectModal(true)} disabled={!pData}>
                    Edit project
                </Button>
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Overview" />
                    <MyTab label="Details" />
                </MyTabs>
            </Box>
            <Box>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={cols}
                        onRowSelected={(data) => {
                            setPData(data);
                            setActiveTab(1);
                        }}
                        rows={projects}
                    />
                )}
                {activeTab === 1 && (
                    <Box>
                        <h4>Activities</h4>
                        <BaseDataGrid cols={activityCols} rows={activities} onRowSelected={() => {}} />{" "}
                    </Box>
                )}
            </Box>
        </Container>
    );
}
