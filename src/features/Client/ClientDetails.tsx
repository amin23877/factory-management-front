import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { GeneralForm } from "./Forms";
import Button from "../../app/Button";

import { editClient } from "../../api/client";

import Snack from "../../app/Snack";
import { BasePaper } from "../../app/Paper";

import BaseDataGrid from "../../app/BaseDataGrid";

const EditClientForm = ({ clientTypes, data, onDone }: { clientTypes: any; data: any; onDone: () => void }) => {
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

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

    const activityCols = [
        { field: "name" },
        { field: "subject" },
        { field: "location" },
        { field: "startTime", width: 180 },
        { field: "endTime", width: 180 },
        { field: "ActivityPriority", valueGetter: ({ data }: any) => data.ActivityPriority.name, width: 180 },
        { field: "ActivityStatus", valueGetter: ({ data }: any) => data.ActivityStatus.name, width: 180 },
        { field: "notes" },
    ];

    const noteCols = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    const addrCols = [{ field: "address" }, { field: "city" }, { field: "state" }, { field: "zip" }, { field: "main" }];

    const agencyCols = [{ field: "name", width: 220 }];

    const phoneCols = [{ field: "ext" }, { field: "phone" }, { field: "main" }, { field: "PhoneTypeId" }];

    const emailCols = [{ field: "email" }, { field: "main" }];

    const contactsCols = [
        { field: "firstName" },
        { field: "lastName" },
        { field: "title" },
        { field: "department" },
        { field: "instagram" },
        { field: "website" },
        { field: "active" },
        { field: "main" },
    ];

    return (
        <BasePaper
            style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", border: "0px solid black", borderRadius: "5px" }}
        >
            <EditClientForm onDone={onDone} data={selectedRow} clientTypes={clientTypes} />

            <Tabs value={activeTab} textColor="primary" onChange={(e, v) => setActiveTab(v)} variant="scrollable">
                <Tab label="Activities" />
                <Tab label="Notes" />
                <Tab label="Documents" />
                <Tab label="Addresses" />
                <Tab label="Agencies" />
                <Tab label="Divisions" />
                <Tab label="Phones" />
                <Tab label="Emails" />
                <Tab label="Contacts" />
            </Tabs>
            <Box p={3}>
                {activeTab === 0 && (
                    <BaseDataGrid height={250} cols={activityCols} rows={activities} onRowSelected={() => {}} />
                )}
                {activeTab === 1 && (
                    <BaseDataGrid height={250} cols={noteCols} rows={notes} onRowSelected={(v) => onNoteSelected(v)} />
                )}
                {activeTab === 2 && (
                    <BaseDataGrid height={250} cols={docCols} rows={docs} onRowSelected={(v) => onDocSelected(v)} />
                )}
                {activeTab === 3 && (
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
                )}
                {activeTab === 8 && (
                    <BaseDataGrid height={250} cols={contactsCols} rows={contacts} onRowSelected={onContactSelected} />
                )}
            </Box>
        </BasePaper>
    );
}
