import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";

import { getProjects } from "../api/project";

import { ProjectModal } from "../features/Modals/ProjectModals";
import BaseDataGrid from "../app/BaseDataGrid";

export default function Project() {
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

    useEffect(() => {
        refreshProjects();
    }, []);

    const cols: ColDef[] = [{ field: "name" }];

    return (
        <Container>
            <ProjectModal open={projectModal} onClose={() => setProjectModal(false)} onDone={refreshProjects} data={pData} />

            <Box>
                <Button
                    onClick={() => {
                        setProjectModal(true);
                        setPData(undefined);
                    }}
                >
                    Add new Project
                </Button>
            </Box>
            <Box>
                <BaseDataGrid
                    cols={cols}
                    onRowSelected={(data) => {
                        setPData(data);
                        setProjectModal(true);
                    }}
                    rows={projects}
                />
            </Box>
        </Container>
    );
}
