import React, { useMemo, useState } from "react";
import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { Form, Formik } from "formik";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";
import Snack from "../../../app/Snack";
import JobForm, { ContactForm, TechnicianForm, EntitiesForm } from "./Forms";
import { ITicket, schema, updateTicket } from "../../../api/ticket";

import { getModifiedValues } from "../../../logic/utils";
import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";
import { IDocument } from "../../../api/document";

export default function Details({
    initialValue,
    onDocumentSelected,
    onNoteSelected,
}: {
    initialValue: ITicket;
    onNoteSelected: (a: any) => void;
    onDocumentSelected: (a: any) => void;
}) {
    const notes: any[] = [];

    const [activeTab, setActiveTab] = useState(0);
    const [moreActiveTab, setMoreActiveTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");
    const phone = useMediaQuery("(max-width:900px)");
    const { data: serviceHistory } = useSWR(activeTab === 0 ? `/ticket?UnitId=${initialValue?.UnitId?.id}` : null);
    const { data: itemDocuments } = useSWR<IDocument[]>(
        activeTab === 1 ? `/document/unit/${initialValue?.UnitId?.id}` : null
    );
    const { data: documents } = useSWR<IDocument[]>(activeTab === 3 ? `/document/ticket/${initialValue.id}` : null);
    const historyCols = useMemo<GridColumns>(
        () => [
            {
                field: "startDate",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.startDate),
                width: 110,
            },
            { field: "number", headerName: "Ticket ID", width: 110 },
            { field: "subject", headerName: "Subject", width: 110 },
            { field: "Company", headerName: "Company", width: 110, valueFormatter: (params) => params.row?.name },
            { field: "contact", headerName: "Contact Name", width: 130 },
            { field: "phone", headerName: "Contact Number", width: 130 },
            { field: "email", headerName: "Contact Email", width: 130 },
            { field: "state", headerName: "State", width: 110, valueFormatter: (params) => params.row?.state },
            {
                field: "Zip Code",
                headerName: "Zip Code",
                width: 110,
                valueFormatter: (params) => params.row?.zipcode,
            },
            {
                field: "assignee",
                headerName: "Assigned to",
                width: 120,
            },
            {
                field: "createdBy",
                headerName: "Created By",
                width: 120,
                valueFormatter: (params) => params.row?.AssignedTo?.username,
            },
            { field: "category", headerName: "Category", width: 110 },
            {
                field: "targetDate",
                headerName: "Target Date",
                width: 120,
                type: "date",
            },
            { field: "status", headerName: "Status", width: 110 },
            { field: "tag", headerName: "tag", width: 110, valueFormatter: (params) => params.row?.tag?.name },
        ],
        []
    );
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

            <Box display="grid" gridTemplateColumns={phone ? "1fr" : "1fr 1fr"} gridGap={10} flex={1}>
                <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            <Box
                                display="flex"
                                flexDirection="column"
                                style={{ gap: 10 }}
                                height={phone ? "" : "78.5vh"}
                            >
                                <BasePaper>
                                    <JobForm
                                        errors={errors}
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                </BasePaper>
                                <BasePaper style={phone ? {} : { flex: 1, overflowY: "auto" }}>
                                    <Tabs
                                        onChange={(e, nv) => setMoreActiveTab(nv)}
                                        value={moreActiveTab}
                                        textColor="primary"
                                        variant="scrollable"
                                        style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
                                        scrollButtons={phone ? "on" : "auto"}
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
                <Box width="100%">
                    <BasePaper>
                        <Tabs
                            variant="scrollable"
                            style={
                                phone
                                    ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" }
                                    : { marginBottom: "10px" }
                            }
                            scrollButtons={phone ? "on" : "auto"}
                            value={activeTab}
                            onChange={(e, nv) => setActiveTab(nv)}
                            textColor="primary"
                        >
                            <Tab label="Filed Service History" /> 0
                            <Tab label="Device Document" /> 1
                            <Tab label="Device Forms" /> 2
                            <Tab label="Ticket Documents" /> 3
                            <Tab label="Device RMA History" /> 4
                            <Tab label="Notes" /> 5
                            <Tab label="Auditing" /> 6
                        </Tabs>
                        {activeTab === 0 && (
                            <BaseDataGrid
                                cols={historyCols}
                                rows={serviceHistory?.result || []}
                                onRowSelected={() => {}}
                                height={500}
                            />
                        )}
                        {activeTab === 1 && (
                            <BaseDataGrid
                                cols={docCols}
                                rows={itemDocuments || []}
                                onRowSelected={() => {}}
                                height={500}
                            />
                        )}
                        {activeTab === 2 && (
                            <BaseDataGrid cols={docCols} rows={[]} onRowSelected={() => {}} height={500} />
                        )}

                        {activeTab === 3 && (
                            <BaseDataGrid
                                cols={docCols}
                                rows={documents || []}
                                onRowSelected={(d) => {
                                    onDocumentSelected(d);
                                }}
                                height={500}
                            />
                        )}
                        {activeTab === 4 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} height={500} />}
                        {activeTab === 5 && (
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
