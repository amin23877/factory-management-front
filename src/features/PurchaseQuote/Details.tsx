import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Tab, Tabs } from "@material-ui/core";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";

import { FieldSelect } from "../../app/Inputs";
import Button from "../../app/Button";
import { BasePaper } from "../../app/Paper";

import { getAllEmployees } from "../../api/employee";
import { getVendors } from "../../api/vendor";
import { getContacts } from "../../api/contact";
import { IPurchaseQuote, updatePurchaseQuote } from "../../api/purchaseQuote";

import { DocumentsDataGrid, NotesDataGrid } from "../common/DataGrids";

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

    const schema = Yup.object().shape({
        VendorId: Yup.number().required(),
    });

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
        <Box display="flex">
            <BasePaper>
                <Box display="flex" flexDirection="column">
                    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
                        {({ values, errors, handleChange, handleBlur }: any) => (
                            <Form>
                                <input
                                    hidden
                                    type="file"
                                    name="file"
                                    ref={(e) => (uploader.current = e)}
                                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                />
                                <Button fullWidth variant="outlined" onClick={() => uploader.current && uploader.current.click()}>
                                    <CloudUploadOutlinedIcon style={{ marginRight: "3px" }} />
                                    File
                                </Button>
                                <Box my={1}>
                                    <Typography variant="caption">{file?.name}</Typography>
                                    {initialValues.path && (
                                        <Link download rel="noopenner norefferer" href={initialValues?.path}>
                                            Donwload file
                                        </Link>
                                    )}
                                </Box>
                                <Box display="flex" flexDirection="column" my={2}>
                                    <FieldSelect
                                        style={{ flex: 1 }}
                                        request={getAllEmployees}
                                        itemTitleField="username"
                                        itemValueField="id"
                                        name="requester"
                                        label="Requester"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.requester}
                                        error={Boolean(errors.requester)}
                                    />
                                    <FieldSelect
                                        style={{ flex: 1 }}
                                        request={getVendors}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        name="VendorId"
                                        label="Vendor"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.VendorId}
                                        error={Boolean(errors.VendorId)}
                                    />
                                    <FieldSelect
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
                                    />
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
            <BasePaper style={{ marginLeft: "1em", flex: 1 }}>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ margin: "0.5em 0" }}>
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                </Tabs>
                {activeTab === 0 && <NotesDataGrid notes={notes} onNoteSelected={onNoteSelected} />}
                {activeTab === 1 && <DocumentsDataGrid documents={docs} onDocumentSelected={onDocumentSelected} />}
            </BasePaper>
        </Box>
    );
}
