import React from "react";
import { Typography, Box, TextField } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import { Form } from "formik";

import Button from "../../app/Button";
import { ArraySelect, MaterialFieldSelect } from "../../app/Inputs";
import { getContacts } from "../../api/contact";
import { getSO } from "../../api/so";

export const JobDetails = ({
    values,
    errors,
    services,
    handleChange,
    handleBlur,
    handleDelete,
    setFieldValue,
    setSelectedSO,
}: {
    values: any;
    errors: any;
    services: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    handleDelete?: () => void;
    setFieldValue: (a: any, b: any) => void;
    setSelectedSO: (a: any) => void;
}) => {
    return (
        <Form>
            <Typography>Job details</Typography>
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap={10} gridColumnGap={5}>
                <ArraySelect
                    fullWidth
                    label="Status"
                    style={{ gridColumnEnd: "span 3" }}
                    items={["new", "done"]}
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.status)}
                />
                <DateTimePicker
                    name="callTime"
                    value={values.callTime || null}
                    onChange={(d) => setFieldValue("callTime", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.callTime)}
                    helperText={errors.callTime}
                    size="small"
                    placeholder="Call time"
                    label="Call time"
                />
                <DateTimePicker
                    name="deadline"
                    value={values.deadline || null}
                    onChange={(d) => setFieldValue("deadline", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.deadline)}
                    helperText={errors.deadline}
                    size="small"
                    placeholder="Deadline"
                    label="Deadline"
                />
                <MaterialFieldSelect
                    label="Contact"
                    value={values.ContactId}
                    request={getContacts}
                    onChange={(e, nv) => setFieldValue("ContactId", nv?.id)}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.id}
                />
                <TextField
                    style={{ gridColumnEnd: "span 3" }}
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
                    label="SO"
                    request={getSO}
                    onChange={(e, nv) => {
                        setSelectedSO(nv?.id);
                        setFieldValue("SOId", nv?.id);
                    }}
                    getOptionLabel={(option: any) => option?.number || option?.id}
                    getOptionValue={(option: any) => option.id}
                />
                <Autocomplete
                    style={{ gridColumn: "2 / span 2" }}
                    // value={values.LineServiceRecordId}
                    options={services}
                    getOptionLabel={(option: any) => option.description}
                    onChange={(e, nv) => setFieldValue("LineServiceRecordId", nv?.id)}
                    renderInput={(params) => (
                        <TextField {...params} label="Line service" placeholder="Line service" size="small" variant="outlined" />
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
                {!values.id ? (
                    <>
                        <Button type="submit" kind="add" style={{ marginRight: "0.5em" }}>
                            Book a job
                        </Button>
                        <Button>Show calendar</Button>
                    </>
                ) : (
                    <>
                        <Button type="submit" kind="edit" style={{ marginRight: "0.5em" }}>
                            Save
                        </Button>
                        <Button kind="delete" onClick={handleDelete ? handleDelete : () => {}}>
                            Delete
                        </Button>
                    </>
                )}
            </Box>
        </Form>
    );
};
