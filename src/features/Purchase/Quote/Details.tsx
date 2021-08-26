import React, { Fragment, useMemo, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";
import { Tab, Tabs } from "@material-ui/core";
import TextField from "../../../app/TextField";

import { FieldSelect } from "../../../app/Inputs";
import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";

import { getAllEmployees } from "../../../api/employee";
import { getVendors } from "../../../api/vendor";
import { getContacts } from "../../../api/contact";
import { IPurchaseQuote, updatePurchaseQuote } from "../../../api/purchaseQuote";

import NoteModal from "../../Modals/NoteModals";
import DocumentsModal from "../../Modals/DocumentModals";
import { DocumentsDataGrid, NotesDataGrid } from "../../common/DataGrids";
import { GridColumns } from "@material-ui/data-grid";
import BaseDataGrid from "../../../app/BaseDataGrid";
import { formatTimestampToDate } from "../../../logic/date";

const style = {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "3px 0px 10px 5px ",
};

export default function Details({
    onDone,
    initialValues,
    notes,
    docs,
    onDocumentSelected,
    onNoteSelected,
}: {
    onDone?: () => void;
    initialValues: IPurchaseQuote;
    notes: any;
    docs: any;
    onNoteSelected: (d: any) => void;
    onDocumentSelected: (d: any) => void;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const uploader = useRef<HTMLInputElement | null>();
    const [file, setFile] = useState<File | null>(null);
    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const schema = Yup.object().shape({
        // VendorId: Yup.number().required(),
    });

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "ItemId", headerName: "Item No.", valueFormatter: (r) => r.row.ItemId.no, width: 120 },
            { field: "ItemName", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId.name, flex: 1 },
            {
                field: "Vendor P.NO.",
                valueFormatter: (r) => r.row.ItemId.vendorPartNumber,
                width: 120,
            },
            { field: "quantity", headerName: "QTY", width: 90 },
            {
                field: "UOM",
                valueFormatter: (r) => r.row.ItemId.uom,
                width: 100,
            },
            { field: "price", headerName: "Cost", width: 100 }, //check
            { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row.quantity, width: 100 },
        ],
        []
    );

    const handleSubmit = async (d: any) => {
        try {
            if (initialValues.id) {
                const resp = await updatePurchaseQuote(initialValues.id, { ...d, file });
                if (resp) {
                    onDone && onDone();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Fragment>
            {initialValues && initialValues.id && (
                <NoteModal
                    itemId={initialValues.id}
                    model="purchaseQuote"
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                />
            )}
            {initialValues && initialValues.id && (
                <DocumentsModal
                    itemId={initialValues.id}
                    model="purchaseQuote"
                    open={docModal}
                    onClose={() => setDocModal(false)}
                />
            )}
            <Box display="flex" m={1}>
                <BasePaper style={{ flex: 1 }}>
                    <Box display="flex" flexDirection="column">
                        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
                            {({ values, errors, handleChange, handleBlur }: any) => (
                                <Form>
                                    {/* <input
                                        hidden
                                        type="file"
                                        name="file"
                                        ref={(e) => (uploader.current = e)}
                                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                    /> */}
                                    {/* <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => uploader.current && uploader.current.click()}
                                    >
                                        <CloudUploadOutlinedIcon style={{ marginRight: "3px" }} />
                                        File
                                    </Button> */}
                                    {/* <Box my={1}>
                                        <Typography variant="caption">{file?.name}</Typography>
                                        {initialValues.path && (
                                            <Link download rel="noopenner norefferer" href={initialValues?.path}>
                                                Donwload file
                                            </Link>
                                        )}
                                    </Box> */}

                                    <Box display="grid" gridTemplateColumns="1fr 1fr" my={2} gridGap={10}>
                                        <TextField
                                            style={{ gridColumnEnd: "span 2" }}
                                            name="senderNumber"
                                            value={values.senderNumber}
                                            label="Quote Number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <TextField
                                            name="date"
                                            value={formatTimestampToDate(values.createdAt)}
                                            label="Date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled
                                        />
                                        {/* <FieldSelect
                                            request={getAllEmployees}
                                            itemTitleField="username"
                                            itemValueField="id"
                                            name="requester"
                                            label="Requester"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.requester}
                                            error={Boolean(errors.requester)}
                                        /> */}
                                        <FieldSelect
                                            request={getVendors}
                                            itemTitleField="name"
                                            itemValueField="id"
                                            name="VendorId"
                                            label="Vendor Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={
                                                typeof values.VendorId === "string"
                                                    ? values.VendorId
                                                    : values.VendorId?.id
                                            }
                                            error={Boolean(errors.VendorId)}
                                        />
                                        <FieldSelect
                                            request={getVendors}
                                            itemTitleField="number"
                                            itemValueField="id"
                                            name="VendorId"
                                            label="Vendor Number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={
                                                typeof values.VendorId === "string"
                                                    ? values.VendorId
                                                    : values.VendorId?.id
                                            }
                                            error={Boolean(errors.VendorId)}
                                        />

                                        <FieldSelect
                                            request={getVendors}
                                            itemTitleField="website"
                                            itemValueField="id"
                                            name="VendorId"
                                            label="Vendor Website"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={
                                                typeof values.VendorId === "string"
                                                    ? values.VendorId
                                                    : values.VendorId?.id
                                            }
                                            error={Boolean(errors.VendorId)}
                                        />
                                        <TextField
                                            name="companyName"
                                            value={values.companyName}
                                            label="Company Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <TextField
                                            name="companyWebsite"
                                            value={values.companyWebsite}
                                            label="Company Website"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <TextField
                                            name="contactName"
                                            value={values.contactName}
                                            label="Contact Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <TextField
                                            name="contactNumber"
                                            value={values.contactNumber}
                                            label="Contact Number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {/* <FieldSelect
                                            style={{ flex: 1 }}
                                            request={getContacts}
                                            itemTitleField="lastName"
                                            itemValueField="id"
                                            name="ContactId"
                                            label="Contact"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ContactId}
                                            error={Boolean(errors.ContactId)}
                                        /> */}
                                    </Box>
                                    <Box textAlign="left" display="flex">
                                        <Button style={{ margin: "0.5em 1em", flex: 1 }} type="submit" kind="edit">
                                            Save
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </BasePaper>
            </Box>
            <Box>
                <BasePaper style={{ marginLeft: "1em", flex: 1 }}>
                    <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ margin: "0.5em 0" }}>
                        <Tab label="Line Items" />
                        <Tab label="Documents" />
                        <Tab label="Notes" />
                        <Tab label="Auditing" />
                    </Tabs>
                    {activeTab === 0 && <BaseDataGrid rows={[]} cols={LICols} />}
                    {activeTab === 1 && (
                        <Fragment>
                            <Button
                                onClick={() => {
                                    setDocModal(true);
                                }}
                                style={style}
                            >
                                + Add Document
                            </Button>
                            <DocumentsDataGrid documents={docs} onDocumentSelected={onDocumentSelected} />
                        </Fragment>
                    )}
                    {activeTab === 2 && (
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
                </BasePaper>
            </Box>
        </Fragment>
    );
}
