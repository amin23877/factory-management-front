import React, { useState, useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab, LinearProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";
// import * as Yup from "yup";

import { CommissionForm, GeneralForm, MainContactForm, MoreInfoForm } from "../features/Sales/Customer/Forms";
import Button from "../app/Button";
import { BasePaper } from "../app/Paper";
import BaseDataGrid from "../app/BaseDataGrid";

import { editCustomer, ICustomer } from "../api/customer";
import { INote } from "../api/note";

import SOTable from "../features/Items/SOTable";

import { formatTimestampToDate } from "../logic/date";
import { fileType } from "../logic/fileType";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import { ContactModal } from "../features/Modals/ContactModal";
import Toast from "../app/Toast";
import { IDocument } from "../api/document";
import { getModifiedValues } from "../logic/utils";
import { useParams } from "react-router";

export default function ClientDetails({
    // selectedRow,
    req,
    changeTab,
}: {
    // selectedRow: ICustomer;
    req?: any;
    changeTab: (a: number) => void;
}) {
    const { cusNumber } = useParams<{ cusNumber: string }>();
    const { data: selectedRow } = useSWR<ICustomer>(cusNumber ? `/customer/${cusNumber}` : null);

    const [activeTab, setActiveTab] = useState(0);
    const [activeSubTab, setActiveSubTab] = useState(0);

    const { data: contacts } = useSWR<IDocument[]>(activeTab === 0 ? `/contact/customer/${selectedRow?.id}` : null);
    const { data: documents } = useSWR<IDocument[]>(activeTab === 1 ? `/document/customer/${selectedRow?.id}` : null);
    const { data: activities } = useSWR<IDocument[]>(activeTab === 2 ? `/activity/customer/${selectedRow?.id}` : null);
    const { data: notes } = useSWR<INote[]>(activeTab === 5 ? `/note/customer/${selectedRow?.id}` : null);

    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);
    const [addContact, setAddContact] = useState(false);

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            if (selectedRow) {
                await editCustomer(selectedRow.id, getModifiedValues(values, selectedRow));
                mutate("/customer");
                mutate("/customer?approved=false");
                setSubmitting(false);
                Toast("Record updated", "success");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
    if (!selectedRow) {
        return <LinearProgress />;
    }
    return (
        <Box>
            <ContactModal
                itemId={selectedRow?.id}
                model="customer"
                open={addContact}
                onClose={() => setAddContact(false)}
            />
            <NoteModal
                itemId={selectedRow?.id}
                model="customer"
                open={addNoteModal}
                onClose={() => setAddNoteModal(false)}
            />
            <DocumentModal
                open={addDocModal}
                onClose={() => setAddDocModal(false)}
                itemId={selectedRow?.id}
                model="customer"
            />

            <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <Box pb="8px" display="flex" style={{ gap: 10 }}>
                            <Box flex={3}>
                                <Box display="flex" flexDirection="column" style={{ gap: 10 }}>
                                    <BasePaper>
                                        <GeneralForm
                                            values={values}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched}
                                            req={req}
                                            cId={selectedRow.id}
                                            changeTab={changeTab}
                                        />
                                        <Box textAlign="center" style={{ width: "100%" }}>
                                            <Button type="submit" kind="edit" style={{ width: "100%" }}>
                                                Save
                                            </Button>
                                        </Box>
                                    </BasePaper>
                                    <BasePaper style={{ height: "100%" }}>
                                        <Tabs
                                            textColor="primary"
                                            value={activeSubTab}
                                            onChange={(e, nv) => setActiveSubTab(nv)}
                                            variant="scrollable"
                                            style={{ maxWidth: 700 }}
                                        >
                                            <Tab label="More Info" />
                                            <Tab label="Main Contact" />
                                            <Tab label="Commission" />
                                        </Tabs>
                                        <Box>
                                            {activeSubTab === 0 && (
                                                <MoreInfoForm
                                                    values={values}
                                                    errors={errors}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                    touched={touched}
                                                />
                                            )}
                                            {activeSubTab === 1 && (
                                                <MainContactForm
                                                    values={values}
                                                    errors={errors}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                    touched={touched}
                                                />
                                            )}
                                            {activeSubTab === 2 && (
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
                            <Box flex={4}>
                                <Tabs
                                    value={activeTab}
                                    textColor="primary"
                                    onChange={(e, v) => setActiveTab(v)}
                                    variant="scrollable"
                                >
                                    <Tab label="Contacts" />
                                    <Tab label="Documents" />
                                    <Tab label="Activities" />
                                    <Tab label="Sales History" />
                                    <Tab label="Work Orders" />
                                    <Tab label="Notes" />
                                    <Tab label="Auditing" />
                                </Tabs>
                                <BasePaper>
                                    {activeTab === 0 && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setAddContact(true);
                                                }}
                                                variant="outlined"
                                            >
                                                + Add Contact
                                            </Button>
                                            <BaseDataGrid
                                                height="58.5vh"
                                                cols={contactsCols}
                                                rows={contacts || []}
                                                onRowSelected={(c) => {}}
                                            />
                                        </>
                                    )}
                                    {activeTab === 1 && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setAddDocModal(true);
                                                }}
                                                variant="outlined"
                                            >
                                                + Add Document
                                            </Button>
                                            <BaseDataGrid
                                                height="58.5vh"
                                                cols={docCols}
                                                rows={documents || []}
                                                onRowSelected={(v) => {}}
                                            />
                                        </>
                                    )}
                                    {activeTab === 2 && (
                                        <BaseDataGrid
                                            height="62.5vh"
                                            cols={activityCols}
                                            rows={activities || []}
                                            onRowSelected={() => {}}
                                        />
                                    )}
                                    {activeTab === 3 && <SOTable rows={[]} />}
                                    {activeTab === 5 && (
                                        <>
                                            <Button onClick={() => setAddNoteModal(true)} variant="outlined">
                                                + Add Note
                                            </Button>
                                            <BaseDataGrid
                                                height="58.5vh"
                                                cols={noteCols}
                                                rows={notes || []}
                                                onRowSelected={(v) => {}}
                                            />
                                        </>
                                    )}
                                </BasePaper>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
