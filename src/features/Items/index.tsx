import React, { useMemo, useState } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Snackbar from "../../app/Snack";

import Button from "../../app/Button";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import VendorsTable from "./VandorsTable";

import { MoreInfo, Quantity, Shipping, General, DynamicFilterAndFields } from "./Forms";
import { SalesReport } from "./Reports";

import ManualCountModal from "./ManualCountModal";
import SOTable from "./SOTable";
import { INote } from "../../api/note";
import { IDocument } from "../../api/document";
import { addImage, AddItemSchema, updateAnItem } from "../../api/items";
import { useEffect } from "react";

function ItemsDetails({
    selectedRow,
    onNoteSelected,
    onDocSelected,
    onDone,
}: {
    selectedRow: any;
    onDone?: () => void;
    onNoteSelected: (a: any) => void;
    onDocSelected: (a: any) => void;
}) {
    const { data: vendors } = useSWR([`/item/${selectedRow.id}/venors`, selectedRow]);
    const { data: itemQuotes } = useSWR([`/item/${selectedRow.id}/so`, selectedRow]);
    const { data: itemSOs } = useSWR([`/item/${selectedRow.id}/quote`, selectedRow]);
    const { data: notes, mutate: mutateNotes } = useSWR<INote[]>([`/note/item/${selectedRow.id}`, selectedRow]);
    const { data: docs, mutate: mutateDocs } = useSWR<IDocument[]>([`/document/item/${selectedRow.id}`, selectedRow]);


    const [img, setImg] = useState<any>();

    const handleFileChange = async (e: any) => {
        if (!e.target.files) {
            return;
        }
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        const resp = await addImage(selectedRow.id, file)
        if (resp) {
            setImg(url);
        }
    }
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [manualCountModal, setManualCountModal] = useState(false);

    const quoteCols = useMemo(
        () => [
            { field: "number", headerName: "Number" },
            { field: "location", headerName: "Location", width: 180 },
            { field: "department", headerName: "Department" },
            { field: "entryDate", headerName: "Entry date", width: 180 },
            { field: "expireDate", headerName: "Expire date", width: 180 },
        ],
        []
    );

    const noteCols = useMemo(
        () => [
            { field: "subject", headerName: "Subject" },
            { field: "url", headerName: "URL" },
            { field: "note", headerName: "Note", width: 300 },
        ],
        []
    );

    const docCols = useMemo(
        () => [
            { field: "name", headerName: "Name" },
            { field: "EmployeeId", headerName: "Employee" },
            { field: "description", headerName: "Description", width: 250 },
            { field: "createdAt", headerName: "Date", width: 300 },
        ],
        []
    );

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            const resp = await updateAnItem(selectedRow.id, data);
            if (resp) {
                setSubmitting(false);
                setShowSnack(true);
                setSnackMsg(`Updated item ${data.id}...`);
                onDone && onDone();
            }
        } catch (error) {
            setShowSnack(true);
            setSnackMsg(`Error: ${error.error}`);
        }
    };

    return (
        <Box>
            <ManualCountModal
                open={manualCountModal}
                onClose={() => setManualCountModal(false)}
                itemId={selectedRow.id}
                onDone={() => {
                    setSnackMsg("Record added");
                    setShowSnack(true);
                }}
            />

            <Snackbar onClose={() => setShowSnack(false)} open={showSnack}>
                {snackMsg}
            </Snackbar>

            <Formik initialValues={selectedRow} validationSchema={AddItemSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item md={8} xs={12}>
                                <BasePaper>
                                    <General
                                        values={values}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        touched={touched}
                                    />

                                    <Button style={{ margin: "1.3em 43% 0.5em 43%" }} kind="edit" type="submit">
                                        Save
                                    </Button>
                                </BasePaper>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <BasePaper
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Tabs
                                        value={moreInfoTab}
                                        variant="scrollable"
                                        textColor="primary"
                                        onChange={(e, v) => setMoreInfoTab(v)}
                                    >
                                        <Tab label="More Info." />
                                        <Tab label="Quantity" />
                                        <Tab label="Shipping" />
                                        <Tab label="Clusters and Levels" />
                                        <Tab label="Image" />
                                    </Tabs>
                                    {moreInfoTab === 0 && (
                                        <MoreInfo
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {moreInfoTab === 1 && (
                                        <Quantity
                                            handleManualCount={() => setManualCountModal(true)}
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {moreInfoTab === 2 && (
                                        <Shipping
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {moreInfoTab === 3 && (
                                        <DynamicFilterAndFields
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {moreInfoTab === 4 && (
                                        <Box mt={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                                            <img
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                alt={selectedRow?.photo}
                                                src={img ? img : `http://zarph.ir:3100${selectedRow?.photo}`}
                                                
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <label htmlFor="file">
                                                    <div style={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        Upload Image
                                                    </div>
                                                    <input
                                                        id='file'
                                                        name='file'
                                                        style={{ display: "none" }}
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        accept='image/*'
                                                    />
                                                </label>
                                            </div>
                                        </Box>
                                    )}
                                </BasePaper>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <BasePaper style={{ margin: "1em 0" }}>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary" variant="scrollable">
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                    <Tab label="Vendors" />
                    <Tab label="Quote History" />
                    <Tab label="Sales order History" />
                    <Tab label="Sales Report" />
                </Tabs>
                <Box p={3}>
                    {activeTab === 0 && (
                        <BaseDataGrid height={250} cols={noteCols} rows={notes || []} onRowSelected={onNoteSelected} />
                    )}
                    {activeTab === 1 && (
                        <BaseDataGrid height={250} cols={docCols} rows={docs || []} onRowSelected={onDocSelected} />
                    )}
                    {activeTab === 2 && (
                        <VendorsTable selectedItem={selectedRow} rows={vendors || []} onRowSelected={() => { }} />
                    )}
                    {activeTab === 3 && (
                        <BaseDataGrid height={250} cols={quoteCols} rows={itemQuotes || []} onRowSelected={() => { }} />
                    )}
                    {activeTab === 4 && <SOTable rows={itemSOs || []} />}
                    {activeTab === 5 && <SalesReport quotes={itemQuotes} salesOrders={itemSOs || []} />}
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsDetails;
