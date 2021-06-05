import React, { useState } from "react";
import { Typography, Box, TextField } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import { Form } from "formik";
import useSWR from "swr";

import Button from "../../app/Button";
import { ArraySelect, MaterialFieldSelect, FieldSelect } from "../../app/Inputs";
import { getContacts } from "../../api/contact";
import { getSO } from "../../api/so";
import { fetcher } from "../../api";
import { ILineService } from "../../api/lineService";

export default function JobForm({
    values,
    errors,
    handleChange,
    handleBlur,
    handleDelete,
    setFieldValue,
}: {
    values: any;
    errors: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    handleDelete?: () => void;
    setFieldValue: (a: any, b: any) => void;
}) {
    // const selectedLineService = values ? values.LineServiceRecordId : null;
    const [selectedLineService, setSelectedLineService] = useState<ILineService>(values.LineServiceRecordId);
    const [SOId, setSOId] = useState<string>(values.LineServiceRecordId?.SOId);
    const { data: services } = useSWR(SOId ? `/lineservice?SOId=${SOId}` : null);

    return (
        <Form>
            <Typography>Job details</Typography>
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 10 }}>
                <ArraySelect
                    fullWidth
                    label="Status"
                    items={["new", "done"]}
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.status)}
                />
                <FieldSelect
                    name="ContactId"
                    label="Contact"
                    value={values.ContactId}
                    request={getContacts}
                    itemTitleField="name"
                    itemValueField="id"
                    onChange={handleChange}
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
                    label="Target date"
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
                <FieldSelect
                    label="SO"
                    value={SOId ? SOId : undefined}
                    request={getSO}
                    itemTitleField="id"
                    itemValueField="id"
                    onChange={(e) => {
                        setSOId(e.target.value);
                    }}
                />
                <Autocomplete
                    disabled={!SOId}
                    value={selectedLineService}
                    style={{ gridColumnEnd: "span 2" }}
                    options={services ? services : []}
                    getOptionLabel={(option: any) => option.description}
                    onChange={(e, nv) => {
                        nv && setSelectedLineService(nv);
                        setFieldValue("LineServiceRecordId", nv?.id);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Line service" placeholder="Line service" size="small" variant="outlined" />
                    )}
                />
                <ArraySelect
                    style={{ gridColumnEnd: "span 2" }}
                    items={["1", "2", "3", "4", "5"]}
                    label="Priority"
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    label="Description"
                    fullWidth
                    multiline
                    rows={2}
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
}
