import React, { useMemo, useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { mutate } from "swr";
import { Form, Formik } from "formik";

import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import Snack from "../../app/Snack";
import JobForm, { ContactForm, EntitiesForm, TechnicianForm } from "./Forms";
import SODatagrid from "../Sales/SO/Datagrid";

import { ITicket, schema, updateTicket } from "../../api/ticket";
// import { fetcher } from "../../api";
import QuoteDatagrid from "../Sales/Quote/Datagrid";
import { getModifiedValues } from "../../logic/utils";
import { formatTimestampToDate } from "../../logic/date";
import { fileType } from "../../logic/fileType";

export default function Details({
    initialValue,
    onDocumentSelected,
    onNoteSelected,
}: {
    initialValue: ITicket;
    onNoteSelected: (a: any) => void;
    onDocumentSelected: (a: any) => void;
}) {
    const notes: any[] = [],
        documents: any[] = [],
        itemDocuments: any[] = [];
    // const { data: notes } = useSWR(`/note/job/${initialValue.id}`, fetcher);
    // const { data: documents } = useSWR(`/document/job/${initialValue.id}`, fetcher);

    // const { data: lineItem } = useSWR(`/lineitem/${initialValue.LineServiceRecordId.LineItemRecordId}`);
    // // const { data: itemNotes } = useSWR(lineItem ? `/note/item/${lineItem.ItemId}` : null);
    // const { data: itemDocuments } = useSWR(lineItem ? `/document/item/${lineItem.ItemId}` : null);

    const [activeTab, setActiveTab] = useState(0);
    const [moreActiveTab, setMoreActiveTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");

    const noteCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
                width: 120,
            },
            {
                field: "creator",
                headerName: "Creator",
                width: 180,
                valueFormatter: (params) => params.row?.EmployeeId?.username,
            },
            { field: "subject", headerName: "Subject", width: 300 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    const docCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
                width: 120,
            },
            {
                field: "EmployeeId",
                headerName: "Creator",
                valueFormatter: (params) => params.row?.employee?.username,
                width: 120,
            },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "id", headerName: "ID", width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            {
                field: "type",
                headerName: "File Type",
                valueFormatter: (params) => fileType(params.row?.path),
                width: 120,
            },
        ],
        []
    );

    const handleSubmit = async (d: any) => {
        try {
            // console.log(d);
            const data = getModifiedValues(d, initialValue);
            const resp = await updateTicket(initialValue.id, data);
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

            <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10}>
                <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            <Box display="flex" flexDirection="column" style={{ gap: 10 }} height="78.5vh">
                                <BasePaper>
                                    <JobForm
                                        errors={errors}
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                </BasePaper>
                                <BasePaper style={{ flex: 1, overflowY: "auto" }}>
                                    <Tabs
                                        onChange={(e, nv) => setMoreActiveTab(nv)}
                                        value={moreActiveTab}
                                        textColor="primary"
                                    >
                                        <Tab label="Contact" />
                                        <Tab label="Entities" />
                                        <Tab label="Technician" />
                                    </Tabs>
                                    {moreActiveTab === 0 && (
                                        <ContactForm
                                            values={values}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />
                                    )}
                                    {moreActiveTab === 1 && (
                                        <EntitiesForm
                                            values={values}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                    {moreActiveTab === 2 && (
                                        <TechnicianForm
                                            errors={errors}
                                            values={values}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                </BasePaper>
                            </Box>
                        </Form>
                    )}
                </Formik>
                <Box>
                    <Tabs
                        variant="scrollable"
                        value={activeTab}
                        onChange={(e, nv) => setActiveTab(nv)}
                        textColor="primary"
                        style={{ marginBottom: "10px" }}
                    >
                        <Tab label="Filed Service History" />
                        <Tab label="Device Document" />
                        <Tab label="Device Quote History" />
                        <Tab label="Device SO History" />
                        <Tab label="Device Forms" />
                        <Tab label="Ticket Documents" />
                        <Tab label="Device RMA History" />
                        <Tab label="Notes" />
                        <Tab label="Auditing" />
                    </Tabs>
                    <BasePaper>
                        {activeTab === 1 && (
                            <BaseDataGrid
                                cols={docCols}
                                rows={itemDocuments ? itemDocuments : []}
                                onRowSelected={() => {}}
                                height={500}
                            />
                        )}
                        {activeTab === 2 && (
                            <QuoteDatagrid params={{ JobId: initialValue.id }} onRowSelected={() => {}} />
                        )}
                        {activeTab === 3 && <SODatagrid params={{ JobId: initialValue.id }} onRowSelected={() => {}} />}
                        {/* {activeTab === 2 && (
                        <BaseDataGrid cols={noteCols} rows={itemNotes ? itemNotes : []} onRowSelected={() => {}} />
                    )} */}
                        {activeTab === 4 && (
                            <BaseDataGrid cols={docCols} rows={[]} onRowSelected={() => {}} height={500} />
                        )}

                        {activeTab === 5 && (
                            <BaseDataGrid
                                cols={docCols}
                                rows={documents ? documents : []}
                                onRowSelected={(d) => {
                                    onDocumentSelected(d);
                                }}
                                height={500}
                            />
                        )}
                        {activeTab === 6 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} height={500} />}
                        {activeTab === 7 && (
                            <BaseDataGrid
                                cols={noteCols}
                                rows={notes ? notes : []}
                                onRowSelected={(n) => {
                                    onNoteSelected(n);
                                }}
                                height={500}
                            />
                        )}
                    </BasePaper>
                </Box>
            </Box>
        </>
    );
}
