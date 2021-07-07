import React, { useMemo, useState, useRef } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Snackbar from "../../app/Snack";

import Button from "../../app/Button";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
// import VendorsTable from "./VandorsTable";

import { DynamicFilterAndFields } from "../Items/Forms";
import { General } from "./Forms";
import { SalesReport } from "../Items/Reports";

// import ManualCountModal from "./ManualCountModal";
// import SOTable from "./SOTable";
// import UpdateQuantityModal from "./Quantity";

import { INote } from "../../api/note";
import { IDocument } from "../../api/document";
import { AddItemSchema, updateAnItem, addImage } from "../../api/items";
import { IBom } from "../../api/bom";

function ItemsDetails({
    selectedRow,
    onNoteSelected,
    onDocSelected,
    onStepSelected,
    onDone,
}: {
    selectedRow: any;
    onDone?: () => void;
    onNoteSelected: (a: any) => void;
    onDocSelected: (a: any) => void;
    onStepSelected: (a: any) => void;
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

    const { data: notes } = useSWR<INote[]>(activeTab === 12 ? `/note/item/${selectedRow.id}` : null);
    const { data: docs } = useSWR<IDocument[]>(activeTab === 0 ? `/document/item/${selectedRow.id}` : null);
    const { data: uses } = useSWR(activeTab === 2 ? `/item/${selectedRow.id}/uses` : null);
    const { data: boms } = useSWR<IBom[]>(activeTab === 1 ? `/bom?ItemId=${selectedRow.id}` : null);
    const { data: manSteps } = useSWR(activeTab === 3 ? `/manStep?ItemId=${selectedRow.id}` : null);
    const { data: evalSteps } = useSWR(activeTab === 4 ? `/evalStep?ItemId=${selectedRow.id}` : null);
    const { data: testSteps } = useSWR(activeTab === 5 ? `/testStep?ItemId=${selectedRow.id}` : null);
    const { data: fieldSteps } = useSWR(activeTab === 6 ? `/fieldStartUpStep?ItemId=${selectedRow.id}` : null);
    const { data: vendors } = useSWR(activeTab === 4 ? `/item/${selectedRow.id}/vendors` : null);
    const { data: itemQuotes } = useSWR(activeTab === 5 ? `/item/${selectedRow.id}/quote` : null);
    const { data: itemSOs } = useSWR(activeTab === 6 ? `/item/${selectedRow.id}/so` : null);
    const { data: itemPOs } = useSWR(activeTab === 7 ? `/item/${selectedRow.id}/purchasepo` : null);
    const { data: itemUsage } = useSWR(activeTab === 8 ? `/unit?ItemId=${selectedRow.id}` : null);
    const { data: services } = useSWR(activeTab === 10 ? `/service?ItemId=${selectedRow.id}` : null);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    // const [manualCountModal, setManualCountModal] = useState(false);
    // const [quantityModal, setQuantityModal] = useState(false);

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

    const serviceCols = useMemo(
        () => [
            { field: "name", headerName: "Name" },
            { field: "price", headerName: "Price" },
            { field: "length", headerName: "length" },
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
    const manCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "step number" },
            { field: "name", headerName: "Name" },
            { field: "description", headerName: "description", flex: 1 },
            { field: "hours", headerName: "Hours" },
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
            {/* <ManualCountModal
                open={manualCountModal}
                onClose={() => setManualCountModal(false)}
                itemId={selectedRow.id}
                onDone={() => {
                    setSnackMsg("Record added");
                    setShowSnack(true);
                }}
                /> */}
            {/* <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selectedRow.id} /> */}

            <Snackbar onClose={() => setShowSnack(false)} open={showSnack}>
                {snackMsg}
            </Snackbar>

            <Formik initialValues={selectedRow} validationSchema={AddItemSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item md={5} xs={12}>
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
                            <Grid item md={7} xs={12}>
                                <BasePaper
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <DynamicFilterAndFields
                                        values={values}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        touched={touched}
                                    />
                                </BasePaper>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BasePaper style={{ maxWidth: "71.5vw" }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            textColor="primary"
                            variant="scrollable"
                        >
                            <Tab label="Documents" />
                            {/* <Tab label="BOM allocated" /> */}
                            <Tab label="BOM" />
                            <Tab label="Warranties" />
                            <Tab label="Manufacturing" />
                            <Tab label="Evaluation" />
                            <Tab label="Test" />
                            <Tab label="Field Start-up" />
                            <Tab label="Label" />
                            <Tab label="Unit History" />
                            {/* <Tab label="Vendors" /> */}
                            {/* <Tab label="Quote History" /> */}
                            {/* <Tab label="Sales order History" /> */}
                            {/* <Tab label="Purchase order History" /> */}
                            <Tab label="Sales Report" />
                            <Tab label="Field Service" />
                            <Tab label="Quality Control" />
                            {/* <Tab label="Usage" /> */}
                            <Tab label="Notes" />
                            <Tab label="Auditing" />
                            {/* <Tab label="Quantity history" /> */}
                        </Tabs>
                        <Box p={3}>
                            {activeTab === 0 && (
                                <BaseDataGrid cols={docCols} rows={docs || []} onRowSelected={onDocSelected} />
                            )}
                            {/* {activeTab === 2 && <BaseDataGrid cols={usesCols} rows={uses || []} onRowSelected={() => { }} />} */}
                            {activeTab === 1 && (
                                <BaseDataGrid cols={bomCols} rows={boms || []} onRowSelected={() => {}} />
                            )}
                            {activeTab === 3 && (
                                <BaseDataGrid
                                    cols={manCols}
                                    rows={manSteps || []}
                                    onRowSelected={(d) => {
                                        onStepSelected({ ...d, tab: 0 });
                                    }}
                                />
                            )}
                            {activeTab === 4 && (
                                <BaseDataGrid
                                    cols={manCols}
                                    rows={evalSteps || []}
                                    onRowSelected={(d) => {
                                        onStepSelected({ ...d, tab: 1 });
                                    }}
                                />
                            )}
                            {activeTab === 5 && (
                                <BaseDataGrid
                                    cols={manCols}
                                    rows={testSteps || []}
                                    onRowSelected={(d) => {
                                        onStepSelected({ ...d, tab: 2 });
                                    }}
                                />
                            )}
                            {activeTab === 6 && (
                                <BaseDataGrid
                                    cols={manCols}
                                    rows={fieldSteps || []}
                                    onRowSelected={(d) => {
                                        onStepSelected({ ...d, tab: 3 });
                                    }}
                                />
                            )}
                            {/* {activeTab === 4 && (
                                <VendorsTable selectedItem={selectedRow} rows={vendors || []} onRowSelected={() => { }} />
                            )} */}
                            {/* {activeTab === 5 && (
                                <BaseDataGrid cols={quoteCols} rows={itemQuotes || []} onRowSelected={() => { }} />
                            )} */}
                            {/* {activeTab === 6 && <SOTable rows={itemSOs || []} />} */}
                            {/* {activeTab === 7 && <BaseDataGrid cols={poCols} rows={itemPOs || []} onRowSelected={() => { }} />} */}
                            {activeTab === 8 && (
                                <BaseDataGrid cols={usageCols} rows={itemUsage || []} onRowSelected={() => {}} />
                            )}
                            {activeTab === 9 && <SalesReport quotes={itemQuotes} salesOrders={itemSOs || []} />}
                            {activeTab === 10 && (
                                <BaseDataGrid cols={serviceCols} rows={services || []} onRowSelected={() => { }} />
                            )}
                            {activeTab === 12 && (
                                <BaseDataGrid cols={noteCols} rows={notes || []} onRowSelected={onNoteSelected} />
                            )}
                            {/* {activeTab === 10 && (
                                <BaseDataGrid cols={qtyHistoryCols} rows={itemQtyHistory || []} onRowSelected={() => { }} />
                            )} */}
                        </Box>
                    </BasePaper>
                </Grid>
            </Grid>
        </Box>
    );
}
export default ItemsDetails;
