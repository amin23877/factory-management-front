import React, { useState } from "react";
import { Box, IconButton, Tab, Tabs, Typography } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { SearchRounded } from "@material-ui/icons";
import useSWR, { mutate } from "swr";
import { Formik } from "formik";

import { BasePaper } from "../../app/Paper";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Snack from "../../app/Snack";

import JobForm from "./Forms";

import { IJob, schema, updateJob } from "../../api/job";
import BaseDataGrid from "../../app/BaseDataGrid";
import { fetcher } from "../../api";

export default function Details({
    initialValue,
    onDocumentSelected,
    onNoteSelected,
}: {
    initialValue: IJob;
    onNoteSelected: (a: any) => void;
    onDocumentSelected: (a: any) => void;
}) {
    const { data: notes } = useSWR(`/note/job/${initialValue.id}`, fetcher);
    const { data: documents } = useSWR(`/document/job/${initialValue.id}`, fetcher);

    const { data: lineItem } = useSWR(`/lineitem/${initialValue.LineServiceRecordId.LineItemRecordId}`);
    const { data: itemNotes } = useSWR(lineItem ? `/note/item/${lineItem.ItemId}` : null);
    const { data: itemDocuments } = useSWR(lineItem ? `/document/item/${lineItem.ItemId}` : null);

    const [activeTab, setActiveTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");

    const noteCols: GridColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols: GridColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

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

            <Box display="grid" gridTemplateColumns="1fr 2fr" gridColumnGap={10}>
                <Box my={1}>
                    <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
                        {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                            <BasePaper>
                                <Box display="grid" gridTemplateColumns="1fr" gridColumnGap={24}>
                                    {/* <div>
                                    <Typography>Client search</Typography>
                                    <Box mt={1} mb={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                        <TextField size="small" placeholder="Name" label="Name" />
                                        <TextField size="small" placeholder="Phone" label="Phone" />
                                        <TextField size="small" placeholder="Street" label="Street" />
                                        <Button color="primary" variant="contained" fullWidth>
                                            <SearchRounded />
                                        </Button>
                                    </Box>
                                </div> */}
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
                </Box>
                <BasePaper>
                    <Tabs variant="scrollable" value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                        <Tab label="Sales orders" />
                        <Tab label="Quotes" />
                        <Tab label="Item Notes" />
                        <Tab label="Item Documents" />
                        <Tab label="Ticket documents" />
                        <Tab label="Ticket notes" />
                        <Tab label="RMAs" />
                        <Tab label="Forms" />
                    </Tabs>
                    {activeTab === 0 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />}
                    {activeTab === 1 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />}
                    {activeTab === 2 && (
                        <BaseDataGrid cols={noteCols} rows={itemNotes ? itemNotes : []} onRowSelected={() => {}} />
                    )}
                    {activeTab === 3 && (
                        <BaseDataGrid
                            cols={docCols}
                            rows={itemDocuments ? itemDocuments : []}
                            onRowSelected={() => {}}
                        />
                    )}
                    {activeTab === 4 && (
                        <BaseDataGrid
                            cols={noteCols}
                            rows={notes ? notes : []}
                            onRowSelected={(n) => {
                                onNoteSelected(n);
                            }}
                        />
                    )}
                    {activeTab === 5 && (
                        <BaseDataGrid
                            cols={docCols}
                            rows={documents ? documents : []}
                            onRowSelected={(d) => {
                                onDocumentSelected(d);
                            }}
                        />
                    )}
                    {activeTab === 6 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />}
                    {activeTab === 7 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />}
                </BasePaper>
            </Box>
        </>
    );
}
