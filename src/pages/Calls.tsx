import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, TextField, IconButton } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../app/Button";
import { BasePaper } from "../app/Paper";
import { SearchRounded } from "@material-ui/icons";
import { MaterialFieldSelect } from "../app/Inputs";
import { getContacts } from "../api/contact";
import { getSO, ISO } from "../api/so";
import { getSOLineServices } from "../api/lineService";
import { Autocomplete } from "@material-ui/lab";
import { createJob, getJobs, IJob } from "../api/job";
import Snack from "../app/Snack";
import BaseDataGrid from "../app/BaseDataGrid";
import { GridColDef } from "@material-ui/data-grid";

export default function Calls() {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [services, setServices] = useState([]);
    const [selectedSO, setSelectedSO] = useState<string>();
    const [selectedJob, setSelectedJob] = useState<IJob>();
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");

    const cols: GridColDef[] = [{ field: "name" }, { field: "description" }, { field: "status" }];

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

            <Typography style={{ marginBottom: 8 }} variant="h5">
                Calls
            </Typography>
            <Formik initialValues={selectedJob ? selectedJob : ({} as IJob)} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, setFieldValue, setValues }) => (
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

                                <Form>
                                    <Typography>Job details</Typography>
                                    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap={10} gridColumnGap={5}>
                                        <TextField
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name}
                                            size="small"
                                            placeholder="Name"
                                            label="Name"
                                        />
                                        <TextField
                                            name="callTime"
                                            type="date"
                                            value={values.callTime}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.callTime)}
                                            helperText={errors.callTime}
                                            size="small"
                                            placeholder="Call time"
                                            label="Call time"
                                        />
                                        <TextField
                                            name="tags"
                                            value={values.tags}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.tags)}
                                            helperText={errors.tags}
                                            size="small"
                                            placeholder="Tags"
                                        />
                                        <MaterialFieldSelect
                                            style={{ gridColumn: "1 / span 3" }}
                                            label="Contact"
                                            value={values.ContactId}
                                            request={getContacts}
                                            onChange={(e, nv) => setFieldValue("ContactId", nv?.id)}
                                            getOptionLabel={(option: any) => option.name}
                                            getOptionValue={(option: any) => option.id}
                                        />
                                        <MaterialFieldSelect
                                            label="SO"
                                            request={getSO}
                                            onChange={(e, nv) => {
                                                setSelectedSO(nv?.id);
                                                setFieldValue("SOId", nv?.id);
                                            }}
                                            getOptionLabel={(option: any) => option.id}
                                            getOptionValue={(option: any) => option.id}
                                        />
                                        <Autocomplete
                                            style={{ gridColumn: "2 / span 2" }}
                                            // value={values.LineServiceRecordId}
                                            options={services}
                                            getOptionLabel={(option: any) => option.id}
                                            onChange={(e, nv) => setFieldValue("LineServiceRecordId", nv?.id)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Line service"
                                                    placeholder="Line service"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Box mt={1}>
                                        <TextField
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.description)}
                                            helperText={errors.description}
                                            size="small"
                                            placeholder="Description"
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Box>
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <Button type="submit" kind="add" style={{ marginRight: "0.5em" }}>
                                            Book a job
                                        </Button>
                                        <Button type="submit" kind="edit" style={{ marginRight: "0.5em" }}>
                                            Edit a job
                                        </Button>
                                        <Button>Show calendar</Button>
                                    </Box>
                                </Form>
                            </BasePaper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={7}>
                            <BasePaper>
                                <BaseDataGrid
                                    cols={cols}
                                    rows={jobs}
                                    onRowSelected={(d) => {
                                        setSelectedJob(d);
                                        setValues(d);
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
