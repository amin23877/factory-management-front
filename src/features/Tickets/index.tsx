import React, { useState } from "react";
import { Container, Grid, Typography, Box, TextField, IconButton } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { SearchRounded } from "@material-ui/icons";
import { Formik } from "formik";
import useSWR from "swr";

import { BasePaper } from "../../app/Paper";
import Snack from "../../app/Snack";
import BaseDataGrid from "../../app/BaseDataGrid";

import { JobDetails } from "../../features/Tickets/Forms";
import JobModal from "../../features/Tickets/Modals";

import { createJob, IJob, schema } from "../../api/job";
import { fetcher } from "../../api";
import { ILineService } from "../../api/lineService";
import { ISO } from "../../api/so";

export default function Tickets() {
    const { data: jobs, mutate: mutateJobs } = useSWR<IJob[]>("/job", fetcher);
    const { data: services, mutate: mutateServices } = useSWR<ILineService[]>(["/lineservice"], fetcher);

    const [jobModal, setJobModal] = useState(false);
    const [selectedSO, setSelectedSO] = useState<ISO>();
    const [selectedJob, setSelectedJob] = useState<IJob>();
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");

    const cols: GridColDef[] = [{ field: "description" }, { field: "deadline" }, { field: "callTime" }, { field: "status" }];

    const handleSubmit = async (d: any) => {
        try {
            // console.log(d);
            const resp = await createJob(d);
            if (resp) {
                setMsg("Job created!");
                setSeverity("success");
                setSnack(true);

                mutateJobs();
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
                    onDone={mutateJobs}
                    selectedJob={selectedJob}
                    services={services}
                />
            )}

            <Typography style={{ marginBottom: 8 }} variant="h5">
                Tickets
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
                                    setSelectedSO={() => {}}
                                />
                            </BasePaper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={7}>
                            <BasePaper>
                                {jobs && (
                                    <BaseDataGrid
                                        cols={cols}
                                        rows={jobs}
                                        onRowSelected={(d) => {
                                            setSelectedJob(d);
                                            setJobModal(true);
                                        }}
                                    />
                                )}
                            </BasePaper>
                        </Grid>
                    </Grid>
                )}
            </Formik>
        </Container>
    );
}
