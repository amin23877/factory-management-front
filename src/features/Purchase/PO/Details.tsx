import React, { Fragment, useMemo, useState } from "react";
import { Form, Formik } from "formik";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BaseDataGrid from "../../../app/BaseDataGrid";
import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";
import { updatePurchasePO, IPurchasePO } from "../../../api/purchasePO";
import { BasePaper } from "../../../app/Paper";
import Button from "../../../app/Button";
import { AddressesForm, UpdateForm, MoreInfoForm, VendorForm } from "./Forms";
import Snack from "../../../app/Snack";
import { DocumentsDataGrid, NotesDataGrid } from "../../common/DataGrids";
import { GridColumns } from "@material-ui/data-grid";

const style = {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "3px 0px 10px 5px ",
};

export default function Details({
    initialValues,
    onDone,
    lines,
    onLineSelected,
    notes,
    docs,
    onNoteSelected,
    onDocumentSelected,
}: {
    initialValues: IPurchasePO;
    onDone: () => void;
    lines: any[];
    notes: any;
    docs: any;
    onNoteSelected: (d: any) => void;
    onDocumentSelected: (d: any) => void;
    onLineSelected: (v: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [activeMoreTab, setActiveMoreTab] = useState(0);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "index", headerName: "Sort" },
            { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row.ItemId.name, width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "quantity", headerName: "QTY", width: 90 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
            { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row.quantity, width: 200 },
        ],
        []
    );

    const handleSubmit = async (d: any) => {
        try {
            if (initialValues.id && d.status) {
                const resp = await updatePurchasePO(initialValues.id, { status: d.status } as any);
                if (resp) {
                    setMsg("Record updated");
                    setSnack(true);
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BasePaper>
            {initialValues && initialValues.id && (
                <NoteModal
                    itemId={initialValues.id}
                    model="purchasePO"
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                />
            )}
            {initialValues && initialValues.id && (
                <DocumentModal
                    itemId={initialValues.id}
                    model="purchasePO"
                    open={docModal}
                    onClose={() => setDocModal(false)}
                />
            )}
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>
            <Box>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
                        <Form>
                            <Box display="flex" style={{ justifyContent: "space-evenly" }}>
                                <Box flex={2}>
                                    <BasePaper
                                        style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", margin: "0 1em " }}
                                    >
                                        <UpdateForm
                                            values={values}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />
                                    </BasePaper>
                                </Box>
                                <Box flex={3}>
                                    <BasePaper
                                        style={{
                                            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                                            margin: "0 1em",
                                            height: "100%",
                                        }}
                                    >
                                        <Tabs
                                            textColor="primary"
                                            value={activeMoreTab}
                                            onChange={(e, nv) => setActiveMoreTab(nv)}
                                            variant="scrollable"
                                            style={{ maxWidth: 700 }}
                                        >
                                            <Tab label="More Info" />
                                            <Tab label="Vendor" />
                                            <Tab label="Addresses" />
                                        </Tabs>
                                        <Box>
                                            {activeMoreTab === 0 && (
                                                <MoreInfoForm
                                                    errors={errors}
                                                    values={values}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                    setFieldValue={setFieldValue}
                                                />
                                            )}
                                            {activeMoreTab === 1 && (
                                                <VendorForm
                                                    values={values}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                />
                                            )}
                                            {activeMoreTab === 2 && (
                                                <AddressesForm
                                                    values={values}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                />
                                            )}
                                        </Box>
                                    </BasePaper>
                                </Box>
                            </Box>
                            <Box textAlign="left" display="flex">
                                <Button style={{ margin: "1em auto" }} type="submit" kind="edit">
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box>
                <Tabs
                    textColor="primary"
                    style={{ marginBottom: "1em" }}
                    value={activeTab}
                    onChange={(e, nv) => setActiveTab(nv)}
                >
                    {/* Line Items	Documents	Receiving	Notes	Auditing */}
                    <Tab label="Line items" />
                    <Tab label="Documents" />
                    <Tab label="Receiving" />
                    <Tab label="Notes" />
                    <Tab label="Auditing" />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid rows={lines} cols={LICols} onRowSelected={(d) => onLineSelected(d)} height={300} />
                )}
                {activeTab === 1 && (
                    <Fragment>
                        <Button
                            onClick={() => {
                                setDocModal(true);
                            }}
                            style={style}
                        >
                            + Add Document
                        </Button>{" "}
                        <DocumentsDataGrid documents={docs} onDocumentSelected={onDocumentSelected} />
                    </Fragment>
                )}
                {activeTab === 3 && (
                    <Fragment>
                        <Button
                            onClick={() => {
                                setNoteModal(true);
                            }}
                            style={style}
                        >
                            + Add Note
                        </Button>
                        <NotesDataGrid notes={notes} onNoteSelected={onNoteSelected} />
                    </Fragment>
                )}
            </Box>
        </BasePaper>
    );
}
