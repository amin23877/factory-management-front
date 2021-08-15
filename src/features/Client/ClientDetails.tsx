import React, { useState, useMemo, Fragment } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { CommissionForm, GeneralForm, MainContactForm, MoreInfoForm } from "./Forms";
import Button from "../../app/Button";

import { editClient } from "../../api/client";

import Snack from "../../app/Snack";
import { BasePaper } from "../../app/Paper";

import BaseDataGrid from "../../app/BaseDataGrid";
import { formatTimestampToDate } from "../../logic/date";
import { fileType } from "../../logic/fileType";
import SOTable from "../Items/SOTable";

const EditClientForm = ({ clientTypes, data, onDone }: { clientTypes: any; data: any; onDone: () => void }) => {
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const schema = Yup.object().shape({
        ClientTypeId: Yup.string().required(),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const resp = await editClient(data.id, values);
            console.log(resp);

            if (resp.id) {
                setShowSnack(true);
                setMsg("Success");
            } else {
                setShowSnack(true);
                setMsg("Error " + resp.error);
            }

            onDone();
            setSubmitting(false);
        } catch (error) {
            setShowSnack(true);
            setMsg("Error " + error);
        }
    };

    return (
        <Box>
            <Snack open={showSnack} onClose={() => setShowSnack(false)}>
                {msg}
            </Snack>

            <Formik initialValues={data} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="flex" style={{ justifyContent: "space-between" }}>
                            <Box flex={3}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}>
                                    <GeneralForm
                                        values={values}
                                        errors={errors}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        touched={touched}
                                    />
                                    <Button type="submit" kind="edit">
                                        Save
                                    </Button>
                                </BasePaper>
                            </Box>
                            <Box flex={2}>
                                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}>
                                    <Tabs
                                        textColor="primary"
                                        value={activeTab}
                                        onChange={(e, nv) => setActiveTab(nv)}
                                        variant="scrollable"
                                        style={{ maxWidth: 700 }}
                                    >
                                        <Tab label="More Info" />
                                        <Tab label="Main Contact" />
                                        <Tab label="Commission" />
                                    </Tabs>
                                    <Box>
                                        {activeTab === 0 && (
                                            <MoreInfoForm
                                                values={values}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                touched={touched}
                                            />
                                        )}
                                        {activeTab === 1 && (
                                            <MainContactForm
                                                values={values}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                touched={touched}
                                            />
                                        )}
                                        {activeTab === 2 && (
                                            <CommissionForm
                                                values={values}
                                                errors={errors}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                touched={touched}
                                            />
                                        )}
                                    </Box>
                                </BasePaper>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default function ClientDetails({
    selectedRow,
    onNoteSelected,
    onDocSelected,
    onAddrSelected,
    onAgencySelected,
    onContactSelected,
    onDivSelected,
    onEmailSelected,
    onPhoneSelected,
    agencies,
    activities,
    addrs,
    notes,
    docs,
    divisions,
    phones,
    emails,
    contacts,
    clientTypes,
    onDone,
}: {
    selectedRow: any;
    onDone: () => void;
    onNoteSelected: (v: any) => void;
    onDocSelected: (v: any) => void;
    onAddrSelected: (v: any) => void;
    onAgencySelected: (v: any) => void;
    onDivSelected: (v: any) => void;
    onPhoneSelected: (v: any) => void;
    onEmailSelected: (v: any) => void;
    onContactSelected: (v: any) => void;
    agencies: any;
    activities: any;
    addrs: any;
    notes: any;
    docs: any;
    divisions: any;
    phones: any;
    emails: any;
    contacts: any;
    clientTypes: any;
}) {
    const [activeTab, setActiveTab] = useState(0);

    const activityCols = useMemo<GridColumns>(
        () => [
            { field: "startTime", headerName: "Entry Date", width: 150, type: "date" },
            { field: "number", headerName: "Quote ID", flex: 1 },
            { field: "project", headerName: "Project Name", flex: 1 },
            { field: "quotedBy", headerName: "Quoted By", flex: 1 },
            { field: "requestedBy", headerName: "Requested By", flex: 1 },
            { field: "note", headerName: "Note" },
        ],
        []
    );
    const noteCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 120,
            },
            { field: "creator", headerName: "Creator", width: 180 },
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
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
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
    // First Name	Last Name	Phone	Ext	Email	Title	Department	Main	Active

    const contactsCols = [
        { field: "firstName", headerName: "First Name", width: 110 },
        { field: "lastName", headerName: "Last Name" },
        { field: "phone", headerName: "Phone" },
        { field: "ext", headerName: "Ext" },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "title", headerName: "Title" },
        { field: "department", headerName: "Department", width: 120 },
        { field: "main", headerName: "Main", type: "boolean" },
        { field: "active", headerName: "Active", type: "boolean" },
    ];

    return (
        <Fragment>
            <EditClientForm onDone={onDone} data={selectedRow} clientTypes={clientTypes} />

            <Tabs value={activeTab} textColor="primary" onChange={(e, v) => setActiveTab(v)} variant="scrollable">
                <Tab label="Contacts" />
                <Tab label="Documents" />
                <Tab label="Activities" />
                <Tab label="Sales History" />
                <Tab label="Work Orders" />
                <Tab label="Notes" />
                <Tab label="Auditing" />
            </Tabs>
            <Box p={3}>
                {activeTab === 0 && (
                    <BaseDataGrid height={250} cols={contactsCols} rows={contacts} onRowSelected={onContactSelected} />
                )}
                {activeTab === 1 && (
                    <BaseDataGrid height={250} cols={docCols} rows={docs} onRowSelected={(v) => onDocSelected(v)} />
                )}
                {activeTab === 2 && (
                    <BaseDataGrid height={250} cols={activityCols} rows={activities} onRowSelected={() => {}} />
                )}
                {activeTab === 3 && <SOTable rows={[]} />}
                {activeTab === 5 && (
                    <BaseDataGrid height={250} cols={noteCols} rows={notes} onRowSelected={(v) => onNoteSelected(v)} />
                )}

                {/* {activeTab === 3 && (
                    <BaseDataGrid height={250} cols={addrCols} rows={addrs} onRowSelected={(v) => onAddrSelected(v)} />
                    )}
                    {activeTab === 4 && (
                        <BaseDataGrid
                        height={250}
                        cols={agencyCols}
                        rows={agencies}
                        onRowSelected={(v) => onAgencySelected(v)}
                        />
                        )}
                        {activeTab === 5 && (
                            <BaseDataGrid height={250} cols={agencyCols} rows={divisions} onRowSelected={onDivSelected} />
                            )}
                            {activeTab === 6 && (
                                <BaseDataGrid height={250} cols={phoneCols} rows={phones} onRowSelected={onPhoneSelected} />
                                )}
                                {activeTab === 7 && (
                                    <BaseDataGrid height={250} cols={emailCols} rows={emails} onRowSelected={onEmailSelected} />
                                )} */}
            </Box>
        </Fragment>
    );
}
