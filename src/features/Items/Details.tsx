import React, { useMemo, useState, useRef, Fragment } from "react";
import { Box, Grid, Tabs, Tab, LinearProgress, Typography } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Button from "../../app/Button";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import VendorsTable from "./VandorsTable";

import { MoreInfo, Quantity, Shipping, General, DynamicFilterAndFields, LastUsed, Pricing } from "./Forms";
import { SalesReport } from "./Reports";

import ManualCountModal from "./ManualCountModal";
import UpdateQuantityModal from "./Quantity";

import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import { VendorModal } from "../Modals/AddVendor";
import BOMModal from "../BOM/BomModal";

import { INote } from "../../api/note";
import { IDocument } from "../../api/document";
import { AddItemSchema, updateAnItem, addImage } from "../../api/items";
import { IBom } from "../../api/bom";
// import SODatagrid from "../Sales/SO/Datagrid";
import QuoteDatagrid from "../Sales/Quote/Datagrid";
import SOTable from "./SOTable";
import Toast from "../../app/Toast";
import UploadButton from "../../app/FileUploader";
import { exportPdf } from "../../logic/pdf";
import QRCode from "./QRCode";
import { fileType } from "../../logic/fileType";
import { formatTimestampToDate } from "../../logic/date";
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
    const qrCode = useRef<HTMLElement | null>(null);

    const [img, setImg] = useState<any>();

    const handleFileChange = async (e: any) => {
        if (selectedRow && selectedRow.id) {
            if (!e.target.files) {
                return;
            }
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            const resp = await addImage(selectedRow.id, file);
            if (resp) {
                setImg(url);
            }
        }
    };
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const { data: docs } = useSWR<IDocument[]>(
        activeTab === 0 ? (selectedRow && selectedRow.id ? `/document/item/${selectedRow.id}` : null) : null
    );

    const { data: boms } = useSWR<IBom[]>(
        activeTab === 1 ? (selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null) : null
    );
    const { data: vendors } = useSWR(
        activeTab === 2 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/vendors` : null) : null
    );

    const { data: itemSOs } = useSWR(
        activeTab === 3 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/so` : null) : null
    );

    const { data: itemPOs } = useSWR(
        activeTab === 4 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/purchasepo` : null) : null
    );
    const { data: itemUsage } = useSWR(
        activeTab === 5 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/uses` : null) : null
    );
    const { data: notes } = useSWR<INote[]>(
        activeTab === 6 ? (selectedRow && selectedRow.id ? `/note/item/${selectedRow.id}` : null) : null
    );
    // const { data: itemQtyHistory } = useSWR(
    //     activeTab === 10 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/qty` : null) : null
    // );

    const [manualCountModal, setManualCountModal] = useState(false);
    const [quantityModal, setQuantityModal] = useState(false);
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);
    const [addVendorModal, setAddVendorModal] = useState(false);
    const [bomModal, setBomModal] = useState(false);

    const poCols = useMemo<GridColDef[]>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 100,
            },
            { field: "number", headerName: "Number", flex: 1 },
            { field: "vendor", headerName: "Vendor", width: 100 },
            { field: "ordered", headerName: "QTY Ordered", width: 120 },
            { field: "received", headerName: "QTY Received", width: 120 },
            { field: "sold", headerName: "QTY Sold", width: 100 },
            { field: "uom", headerName: "PO UOM", width: 100 },
            {
                field: "dateReceived",
                headerName: "Date Received",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 120,
            },
            { field: "cost", headerName: "Cost", width: 80 },
            {
                field: "totalCost",
                headerName: "Total Cost",
                width: 100,
                valueFormatter: (params) => params.row?.cost * params.row?.ordered,
            },
            { field: "status", headerName: "Status", width: 80 },
        ],
        []
    );

    const noteCols = useMemo(
        () => [
            { field: "subject", headerName: "Subject", flex: 1 },
            { field: "url", headerName: "URL", flex: 1 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );
    // File 	Date	Creator	File Name 	File ID	File Description	File Type

    const docCols = useMemo<GridColDef[]>(
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
    // Items	Revision	Revision Date	BOM Name	Note	Current
    const bomCols = useMemo<GridColDef[]>(
        () => [
            { field: "items", headerName: "Items", width: 100 },
            { field: "revision", headerName: "Revision", width: 100 },
            {
                field: "date",
                headerName: "Revision Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 120,
            },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "note", headerName: "Note", flex: 1 },
            { field: "current", headerName: "Current", type: "boolean", width: 100 },
        ],
        []
    );

    const usesCols = useMemo<GridColDef[]>(
        () => [
            { field: "no", headerName: "NO.", width: 120 },
            { field: "name", headerName: "Name", width: 180 },
            { field: "note", headerName: "Note", flex: 1 },
            { field: "current", headerName: "Current", type: "boolean" },
        ],
        []
    );

    const usageCols = useMemo<GridColDef[]>(
        () => [
            {
                field: "soDate",
                headerName: "SO Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.so.createdAt),
                flex: 1,
            },
            {
                field: "unit",
                headerName: "Unit",
                valueFormatter: (params) => params.row?.unit.number,
                flex: 1,
            },
            {
                field: "deviceNumber",
                headerName: "Device Number",
                valueFormatter: (params) => params.row?.item.no,
                flex: 1,
            },
            {
                field: "so",
                headerName: "SO",
                valueFormatter: (params) => params.row?.so.number,
                flex: 1,
            },
            {
                field: "estShipDate",
                headerName: "Est Shipping Date",
                valueFormatter: (params) => params.row?.so.estimatedShipDate,
                flex: 1,
            },
            {
                field: "qty",
                headerName: "QTY",
                valueFormatter: (params) => params.row?.lir.quantity,
                flex: 1,
            },
            {
                field: "client",
                headerName: "Client",
                valueFormatter: (params) => params.row?.client.name,
                flex: 1,
            },
        ],
        []
    );

    // const qtyHistoryCols = useMemo<GridColDef[]>(
    //     () => [
    //         { field: "before", headerName: "Before" },
    //         { field: "after", headerName: "After" },
    //         { field: "fieldName", headerName: "Level name" },
    //         { field: "description", headerName: "description", flex: 1 },
    //     ],
    //     []
    // );

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            if (selectedRow && selectedRow.id) {
                const resp = await updateAnItem(selectedRow.id, data);
                if (resp) {
                    setSubmitting(false);
                    mutate("/item?device=false");

                    Toast("Record updated successfully", "success");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!selectedRow) {
        return <LinearProgress />;
    }

    return (
        <Box>
            <NoteModal
                itemId={selectedRow.id as any}
                model="item"
                open={addNoteModal}
                onClose={() => setAddNoteModal(false)}
            />
            <DocumentModal
                open={addDocModal}
                onClose={() => setAddDocModal(false)}
                itemId={selectedRow.id as any}
                model="item"
            />
            <VendorModal
                open={addVendorModal}
                onClose={() => setAddVendorModal(false)}
                itemId={selectedRow.id as any}
            />

            <BOMModal itemId={selectedRow.id} open={bomModal} onClose={() => setBomModal(false)} />

            <ManualCountModal
                open={manualCountModal}
                onClose={() => setManualCountModal(false)}
                itemId={selectedRow.id}
            />
            <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selectedRow.id} />

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
                                        <Tab label="Image" />
                                        <Tab label="QR Code" />
                                        <Tab label="More Info." />
                                        <Tab label="Quantity" />
                                        <Tab label="Pricing" />
                                        <Tab label="Shipping" />
                                        {/* <Tab label="Last Used" /> */}
                                        <Tab label="Clusters and Levels" />
                                    </Tabs>
                                    {moreInfoTab === 0 && (
                                        <Box mt={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                                            {selectedRow?.photo && (
                                                <img
                                                    style={{
                                                        maxWidth: "100%",
                                                        height: "auto",
                                                        maxHeight: 400,
                                                        margin: "0px auto",
                                                    }}
                                                    alt=""
                                                    src={img ? img : `http://digitalphocus.ir${selectedRow?.photo}`}
                                                />
                                            )}
                                            <UploadButton onChange={handleFileChange} accept="image/*" />
                                        </Box>
                                    )}
                                    {moreInfoTab === 1 && (
                                        <Box display="flex" justifyContent="space-around" alignItems="center">
                                            <div ref={(e) => (qrCode.current = e)}>
                                                <QRCode number={selectedRow.no} />
                                                <Typography variant="subtitle1">
                                                    Device Number: {selectedRow.no}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    Device Name: {selectedRow.name}
                                                </Typography>
                                            </div>
                                            <Button
                                                variant="contained"
                                                onClick={async () => {
                                                    if (qrCode.current) {
                                                        await exportPdf(qrCode.current);
                                                    }
                                                }}
                                            >
                                                Print
                                            </Button>
                                        </Box>
                                    )}

                                    {moreInfoTab === 2 && (
                                        <MoreInfo
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {moreInfoTab === 3 && (
                                        <Fragment>
                                            <LastUsed
                                                values={values}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                setFieldValue={setFieldValue}
                                                errors={errors}
                                                touched={touched}
                                            />
                                            <hr style={{ width: "100%" }} />
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
                                        </Fragment>
                                    )}
                                    {moreInfoTab === 4 && (
                                        <Pricing
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {moreInfoTab === 5 && (
                                        <Shipping
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                    {/* {moreInfoTab === 3 && (
                                        <LastUsed
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )}
                                     */}
                                    {moreInfoTab === 6 && (
                                        <DynamicFilterAndFields
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                            selectedItem={selectedRow}
                                        />
                                    )}
                                </BasePaper>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <BasePaper style={{ margin: "1em 0" }}>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary" variant="scrollable">
                    <Tab label="Document" />
                    {/* <Tab label="BOM allocated" /> */}
                    <Tab label="BOM" />
                    <Tab label="Vendor" />
                    <Tab label="Sales order History" />
                    <Tab label="PO History" />
                    {/* <Tab label="Sales Report" /> */}
                    <Tab label="Usage" />
                    <Tab label="Note" />
                    {/* <Tab label="Quantity history" /> */}
                    <Tab label="Auditing" />
                </Tabs>
                <Box p={3}>
                    {activeTab === 0 && (
                        <Fragment>
                            <Button
                                onClick={() => {
                                    setAddDocModal(true);
                                }}
                            >
                                + Add Document
                            </Button>
                            <BaseDataGrid cols={docCols} rows={docs || []} onRowSelected={onDocSelected} />
                        </Fragment>
                    )}
                    {/* {activeTab === 2 && <BaseDataGrid cols={usesCols} rows={uses || []} onRowSelected={() => {}} />} */}
                    {activeTab === 1 && (
                        <Fragment>
                            <Button
                                onClick={() => {
                                    setBomModal(true);
                                }}
                            >
                                + Add Bill of Material
                            </Button>
                            <BaseDataGrid cols={bomCols} rows={boms || []} onRowSelected={() => {}} />
                        </Fragment>
                    )}
                    {activeTab === 2 && (
                        <Fragment>
                            <Button
                                onClick={() => {
                                    setAddVendorModal(true);
                                }}
                            >
                                + Add Vendor
                            </Button>
                            <VendorsTable selectedItem={selectedRow} rows={vendors || []} onRowSelected={() => {}} />
                        </Fragment>
                    )}

                    {activeTab === 3 && <SOTable rows={itemSOs} />}
                    {activeTab === 4 && <BaseDataGrid cols={poCols} rows={itemPOs || []} onRowSelected={() => {}} />}
                    {/* {activeTab === 8 && <SalesReport quotes={itemQuotes} salesOrders={itemSOs || []} />} */}
                    {activeTab === 5 && (
                        <BaseDataGrid cols={usageCols} rows={itemUsage || []} onRowSelected={() => {}} />
                    )}
                    {activeTab === 6 && (
                        <Fragment>
                            <Button
                                onClick={() => {
                                    setAddNoteModal(true);
                                }}
                            >
                                + Add Note
                            </Button>
                            <BaseDataGrid cols={noteCols} rows={notes || []} onRowSelected={onNoteSelected} />
                        </Fragment>
                    )}
                    {activeTab === 7 && <div>Auditing</div>}
                    {/* {activeTab === 10 && (
                        <BaseDataGrid cols={qtyHistoryCols} rows={itemQtyHistory || []} onRowSelected={() => {}} />
                    )} */}
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsDetails;
