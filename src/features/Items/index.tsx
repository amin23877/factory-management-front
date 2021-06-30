import React, { useMemo, useState, useRef } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Snackbar from "../../app/Snack";

import Button from "../../app/Button";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import VendorsTable from "./VandorsTable";

import { MoreInfo, Quantity, Shipping, General, DynamicFilterAndFields, LastUsed } from "./Forms";
import { SalesReport } from "./Reports";

import ManualCountModal from "./ManualCountModal";
import SOTable from "./SOTable";
import UpdateQuantityModal from "./Quantity";

import { INote } from "../../api/note";
import { IDocument } from "../../api/document";
import { AddItemSchema, updateAnItem, addImage } from "../../api/items";
import { IBom } from "../../api/bom";

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
    const imageUploader = useRef<HTMLElement | null>(null);
    const [img, setImg] = useState<any>();

    const handleFileChange = async (e: any) => {
        if (!e.target.files) {
            return;
        }
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        const resp = await addImage(selectedRow.id, file);
        if (resp) {
            setImg(url);
        }
    };
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const { data: notes } = useSWR<INote[]>(activeTab === 0 ? `/note/item/${selectedRow.id}` : null);
    const { data: docs } = useSWR<IDocument[]>(activeTab === 1 ? `/document/item/${selectedRow.id}` : null);
    const { data: uses } = useSWR(activeTab === 2 ? `/item/${selectedRow.id}/uses` : null);
    const { data: boms } = useSWR<IBom[]>(activeTab === 3 ? `/bom?ItemId=${selectedRow.id}` : null);
    const { data: vendors } = useSWR(activeTab === 4 ? `/item/${selectedRow.id}/vendors` : null);
    const { data: itemQuotes } = useSWR(activeTab === 5 ? `/item/${selectedRow.id}/quote` : null);
    const { data: itemSOs } = useSWR(activeTab === 6 ? `/item/${selectedRow.id}/so` : null);
    const { data: itemPOs } = useSWR(activeTab === 7 ? `/item/${selectedRow.id}/purchasepo` : null);
    const { data: itemUsage } = useSWR(activeTab === 9 ? `/item/${selectedRow.id}/uses` : null);
    const { data: itemQtyHistory } = useSWR(activeTab === 10 ? `/item/${selectedRow.id}/qty` : null);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [manualCountModal, setManualCountModal] = useState(false);
    const [quantityModal, setQuantityModal] = useState(false);

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

    const poCols = useMemo(
        () => [
            { field: "number", headerName: "Number" },
            { field: "status", headerName: "Status", width: 180 },
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

    const bomCols = useMemo<GridColDef[]>(
        () => [
            { field: "no", headerName: "no." },
            { field: "name", headerName: "Name" },
            { field: "note", headerName: "note", flex: 1 },
            { field: "current", headerName: "current", type: "boolean" },
        ],
        []
    );

    const usesCols = useMemo<GridColDef[]>(
        () => [
            { field: "no", headerName: "no." },
            { field: "name", headerName: "Name" },
            { field: "note", headerName: "note", flex: 1 },
            { field: "current", headerName: "current", type: "boolean" },
        ],
        []
    );

    const usageCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "Serial No." },
            { field: "laborCost", headerName: "Labor Cost" },
            { field: "dueDate", headerName: "Due Date", flex: 1 },
            { field: "status", headerName: "Status" },
        ],
        []
    );

    const qtyHistoryCols = useMemo<GridColDef[]>(
        () => [
            { field: "before", headerName: "Before" },
            { field: "after", headerName: "After" },
            { field: "fieldName", headerName: "Field name" },
            { field: "description", headerName: "description", flex: 1 },
        ],
        []
    );

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            const resp = await updateAnItem(selectedRow.id, data);
            if (resp) {
                setSubmitting(false);
                setShowSnack(true);
                setSnackMsg("Item updated !");
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
            <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selectedRow.id} />

            <Snackbar onClose={() => setShowSnack(false)} open={showSnack}>
                {snackMsg}
            </Snackbar>

            <Formik initialValues={selectedRow} validationSchema={AddItemSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item md={7} xs={12}>
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
                            <Grid item md={5} xs={12}>
                                <BasePaper
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Tabs
                                        style={{ marginBottom: 16 }}
                                        value={moreInfoTab}
                                        variant="scrollable"
                                        textColor="primary"
                                        onChange={(e, v) => setMoreInfoTab(v)}
                                    >
                                        <Tab label="More Info." />
                                        <Tab label="Quantity" />
                                        <Tab label="Shipping" />
                                        <Tab label="Last Used" />
                                        <Tab label="Image" />
                                        <Tab label="Clusters and Levels" />
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
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                            itemId={selectedRow.id}
                                            handleManualCount={() => setManualCountModal(true)}
                                            handleUpdateQuantity={() => setQuantityModal(true)}
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
                                        <LastUsed
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {moreInfoTab === 5 && (
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
                                            {selectedRow?.photo && (
                                                <img
                                                    style={{ maxWidth: "100%", height: "auto", maxHeight: 400 }}
                                                    alt={selectedRow?.photo}
                                                    src={img ? img : `http://zarph.ir:3100${selectedRow?.photo}`}
                                                />
                                            )}
                                            <div>
                                                <Box textAlign="center">
                                                    <Button
                                                        onClick={() =>
                                                            imageUploader.current && imageUploader.current.click()
                                                        }
                                                    >
                                                        Upload Image
                                                    </Button>
                                                </Box>
                                                <input
                                                    id="file"
                                                    name="file"
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    ref={(e) => (imageUploader.current = e)}
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
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
                    <Tab label="BOM allocated" />
                    <Tab label="BOM" />
                    <Tab label="Vendors" />
                    <Tab label="Quote History" />
                    <Tab label="Sales order History" />
                    <Tab label="Purchase order History" />
                    <Tab label="Sales Report" />
                    <Tab label="Usage" />
                    <Tab label="Quantity history" />
                </Tabs>
                <Box p={3}>
                    {activeTab === 0 && (
                        <BaseDataGrid cols={noteCols} rows={notes || []} onRowSelected={onNoteSelected} />
                    )}
                    {activeTab === 1 && <BaseDataGrid cols={docCols} rows={docs || []} onRowSelected={onDocSelected} />}
                    {activeTab === 2 && <BaseDataGrid cols={usesCols} rows={uses || []} onRowSelected={() => {}} />}
                    {activeTab === 3 && <BaseDataGrid cols={bomCols} rows={boms || []} onRowSelected={() => {}} />}
                    {activeTab === 4 && (
                        <VendorsTable selectedItem={selectedRow} rows={vendors || []} onRowSelected={() => {}} />
                    )}
                    {activeTab === 5 && (
                        <BaseDataGrid cols={quoteCols} rows={itemQuotes || []} onRowSelected={() => {}} />
                    )}
                    {activeTab === 6 && <SOTable rows={itemSOs || []} />}
                    {activeTab === 7 && <BaseDataGrid cols={poCols} rows={itemPOs || []} onRowSelected={() => {}} />}
                    {activeTab === 8 && <SalesReport quotes={itemQuotes} salesOrders={itemSOs || []} />}
                    {activeTab === 9 && (
                        <BaseDataGrid cols={usageCols} rows={itemUsage || []} onRowSelected={() => {}} />
                    )}
                    {activeTab === 10 && (
                        <BaseDataGrid cols={qtyHistoryCols} rows={itemQtyHistory || []} onRowSelected={() => {}} />
                    )}
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsDetails;
