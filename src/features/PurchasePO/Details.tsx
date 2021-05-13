import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BaseDataGrid from "../../app/BaseDataGrid";

import { updatePurchasePO, IPurchasePO } from "../../api/purchasePO";
import { BasePaper } from "../../app/Paper";
import Button from "../../app/Button";
import { UpdateForm } from "./Forms";
import Snack from "../../app/Snack";
import { DocumentsDataGrid, NotesDataGrid } from "../common/DataGrids";

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
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const lineCols = [
        { field: "ItemId", headerName: "Item" },
        { field: "description", headerName: "Description" },
        { field: "quantity", headerName: "Quantity" },
        { field: "price", headerName: "Price" },
        { field: "tax", headerName: "Tax" },
        { field: "index", headerName: "Index" },
    ];

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
        <Box display="flex">
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>

            <BasePaper style={{ flex: 1 }}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, errors }) => (
                        <Form>
                            <UpdateForm values={values} errors={errors} handleBlur={handleBlur} handleChange={handleChange} />
                            <Box textAlign="left" display="flex">
                                <Button style={{ margin: "0.5em 1em", flex: 1 }} type="submit" kind="edit">
                                    Save status
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </BasePaper>
            <BasePaper style={{ marginLeft: "1em", flex: 5 }}>
                <Tabs style={{ marginBottom: "1em" }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Line items" />
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                </Tabs>
                {activeTab === 0 && <BaseDataGrid rows={lines} cols={lineCols} onRowSelected={(d) => onLineSelected(d)} height={300} />}
                {activeTab === 1 && <NotesDataGrid notes={notes} onNoteSelected={onNoteSelected} />}
                {activeTab === 2 && <DocumentsDataGrid documents={docs} onDocumentSelected={onDocumentSelected} />}
            </BasePaper>
        </Box>
    );
}
