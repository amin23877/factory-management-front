import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, TextField, IconButton } from "@material-ui/core";
import { Formik } from "formik";

import { BasePaper } from "../app/Paper";
import { SearchRounded } from "@material-ui/icons";
import { getSOLineServices } from "../api/lineService";
import { createJob, getJobs, IJob, schema } from "../api/job";
import Snack from "../app/Snack";
import BaseDataGrid from "../app/BaseDataGrid";
import { GridColDef } from "@material-ui/data-grid";
import { JobDetails } from "../features/Job/Forms";
import JobModal from "../features/Job/Modals";

export default function Calls() {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [jobModal, setJobModal] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedSO, setSelectedSO] = useState<string>();
    const [selectedJob, setSelectedJob] = useState<IJob>();
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");

    const cols: GridColDef[] = [{ field: "description" }, { field: "deadline" }, { field: "callTime" }, { field: "status" }];

    const refreshJobs = async () => {
        try {
            const resp = await getJobs();
            if (resp) {
                setJobs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshServices = async () => {
        try {
            if (selectedSO) {
                const resp = await getSOLineServices(selectedSO);
                if (resp) {
                    setServices(resp);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshJobs();
        refreshServices();
    }, [selectedSO]);

    const handleSubmit = async (d: any) => {
        try {
            // console.log(d);
            const resp = await createJob(d);
            if (resp) {
                setMsg("Job created!");
                setSeverity("success");
                setSnack(true);
                refreshJobs();
            }
        } catch (error) {
            setMsg("an error occurred !");
            setSeverity("error");
            setSnack(true);
            console.log(error);
        }
    };

    return (
        <Container>
            <Snack open={snack} onClose={() => setSnack(false)} severity={severity}>
                {msg}
            </Snack>
            {selectedJob && (
                <JobModal
                    open={jobModal}
                    onClose={() => setJobModal(false)}
                    onDone={refreshJobs}
                    selectedJob={selectedJob}
                    services={services}
                    setSelectedSO={setSelectedSO}
                />
            )}

            <Typography style={{ marginBottom: 8 }} variant="h5">
                Calls
            </Typography>
            <Formik initialValues={selectedJob ? selectedJob : ({} as IJob)} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} lg={5}>
                            <BasePaper>
                                <Typography>Client search</Typography>
                                <Box mt={1} mb={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridColumnGap={5}>
                                    <TextField size="small" placeholder="Name" label="Name" />
                                    <TextField size="small" placeholder="Phone" label="Phone" />
                                    <TextField size="small" placeholder="Street" label="Street" />
                                    <IconButton color="primary" style={{ justifySelf: "center", alignSelf: "center" }}>
                                        <SearchRounded />
                                    </IconButton>
                                </Box>
                                <JobDetails
                                    errors={errors}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                    services={services}
                                    setSelectedSO={setSelectedSO}
                                />
                            </BasePaper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={7}>
                            <BasePaper>
                                <BaseDataGrid
                                    cols={cols}
                                    rows={jobs}
                                    onRowSelected={(d) => {
                                        setSelectedJob(d);
                                        setJobModal(true);
                                    }}
                                />
                            </BasePaper>
                        </Grid>
                    </Grid>
                )}
            </Formik>
        </Container>
    );
}
