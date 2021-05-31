import React, { useState } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { mutate } from "swr";
import { Formik } from "formik";

import { BasePaper } from "../../app/Paper";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import JobForm from "./Forms";
import { IJob, schema, updateJob } from "../../api/job";
import Snack from "../../app/Snack";

export default function Details({ initialValue }: { initialValue: IJob }) {
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");

    const handleSubmit = async (d: any) => {
        try {
            // console.log(d);
            const resp = await updateJob(initialValue.id, d);
            if (resp) {
                setMsg("Job updated!");
                setSeverity("success");
                setSnack(true);

                mutate("/jobs");
            }
        } catch (error) {
            setMsg("an error occurred !");
            setSeverity("error");
            setSnack(true);

            console.log(error);
        }
    };

    return (
        <>
            <Snack open={snack} onClose={() => setSnack(false)} severity={severity}>
                {msg}
            </Snack>

            <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                    <BasePaper>
                        <Box display="grid" gridTemplateColumns="1fr 5fr" gridColumnGap={24}>
                            <div>
                                <Typography>Client search</Typography>
                                <Box mt={1} mb={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                    <TextField size="small" placeholder="Name" label="Name" />
                                    <TextField size="small" placeholder="Phone" label="Phone" />
                                    <TextField size="small" placeholder="Street" label="Street" />
                                    <Button color="primary" variant="contained" fullWidth>
                                        <SearchRounded />
                                    </Button>
                                </Box>
                            </div>
                            <JobForm
                                errors={errors}
                                values={values}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        </Box>
                    </BasePaper>
                )}
            </Formik>
        </>
    );
}
