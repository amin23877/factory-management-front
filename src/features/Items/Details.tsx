import React, { useMemo, useState, useRef } from "react";
import { Box, Tabs, Tab, LinearProgress, Typography } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";
import { host } from "../../host";
import Button from "../../app/Button";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import VendorsTable from "./VandorsTable";

import { MoreInfo, Quantity, Shipping, General, DynamicFilterAndFields, LastUsed, Pricing } from "./Forms";
// import { SalesReport } from "./Reports";

import ManualCountModal from "./ManualCountModal";
import UpdateQuantityModal from "./Quantity";

import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import { VendorModal } from "../Modals/AddVendor";
import BOMModal from "../BOM/BomModal";
import Parts from "../BOM/Parts";

import { INote } from "../../api/note";
import { IDocument } from "../../api/document";
import { AddItemSchema, updateAnItem, addImage } from "../../api/items";
import { IBom } from "../../api/bom";
// import SODatagrid from "../Sales/SO/Datagrid";
// import QuoteDatagrid from "../Sales/Quote/Datagrid";
import SOTable from "./SOTable";
import Toast from "../../app/Toast";
import UploadButton from "../../app/FileUploader";
import { exportPdf } from "../../logic/pdf";
import { fileType } from "../../logic/fileType";
import { formatTimestampToDate } from "../../logic/date";
import { getModifiedValues } from "../../logic/utils";
import ItemBomTable from "../BOM/ItemBomTable";

import QRCode from "../../app/QRCode";

const style = {
    border: "1px solid gray ",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "3px 0px 10px 5px ",
};

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

    const { data: boms } = useSWR<IBom[]>(selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null);

    // const { data: boms } = useSWR<IBom[]>(
    //     activeTab === 1 ? (selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null) : null
    // );
    const { data: vendors } = useSWR(
        activeTab === 1 ? (selectedRow && selectedRow.id ? `/vending?ItemId=${selectedRow.id}` : null) : null
    );

    const { data: itemSOs } = useSWR(
        activeTab === 2 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/so` : null) : null
    );

    const { data: itemPOs } = useSWR(
        activeTab === 3 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/purchasepo` : null) : null
    );
    const { data: itemUsage } = useSWR(
        activeTab === 4 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/uses` : null) : null
    );
    const { data: notes } = useSWR<INote[]>(
        activeTab === 5 ? (selectedRow && selectedRow.id ? `/note/item/${selectedRow.id}` : null) : null
    );
    // const { data: itemQtyHistory } = useSWR(
    //     activeTab === 10 ? (selectedRow && selectedRow.id ? `/item/${ selectedRow.id}/qty` : null) : null
    // );

    const [manualCountModal, setManualCountModal] = useState(false);
    const [quantityModal, setQuantityModal] = useState(false);
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);
    const [addVendorModal, setAddVendorModal] = useState(false);
    const [bomModal, setBomModal] = useState(false);
    const [bomPartsModal, setBomPartsModal] = useState(false);
    const [selectedBom] = useState<IBom>();

    const poCols = useMemo<GridColDef[]>(
        () => [
            {
                field: "Date",
                valueFormatter: (params) => formatTimestampToDate(params?.row?.purchasePO.date),
                width: 100,
            },
            {
                field: "Number",
                flex: 1,
                valueFormatter: (params) => params.row?.purchasePO.number,
            },
            {
                field: "Vendor",
                width: 100,
                valueFormatter: (params) => params?.row?.vendor.name,
            },
            {
                field: "Qty Ord.",
                width: 120,
                valueFormatter: (params) => params.row?.lir.quantity,
            },
            {
                field: "Qty Received",
                width: 120,
                valueFormatter: (params) => params.row?.lir?.received,
            },
            {
                field: "Received Date",
                width: 100,
                valueFormatter: (params) => formatTimestampToDate(params.row?.lir.receivedDate),
            },
            {
                field: "UOM ",
                valueFormatter: (params) => params.row?.lir.uom,
                width: 120,
            },
            {
                field: "Cost",
                width: 80,
                valueFormatter: (params) => params.row?.lir.cost,
            },
            {
                field: "Total Cost",
                width: 100,
                valueFormatter: (params) => params?.row?.lir.cost * params?.row?.lir.quantity,
            },
            {
                field: "Status",
                width: 80,
                valueFormatter: (params) => params.row?.lir.status,
            },
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

    const docCols = useMemo<GridColDef[]>(
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

    const usageCols = useMemo<GridColDef[]>(
        () => [
            {
                field: "soDate",
                headerName: "SO Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.so.date),
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

    const pricingCols = useMemo<GridColDef[]>(
        () => [
            { field: "label", headerName: "Label" },
            { field: "price", headerName: "Price" },
            { field: "nonCommissionable", headerName: "no Com." },
        ],
        []
    );

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            if (selectedRow && selectedRow.id) {
                const reqData = getModifiedValues(data, selectedRow);
                // console.log(reqData);
                const resp = await updateAnItem(selectedRow.id, reqData);
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
        <>
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
            {selectedBom && <Parts open={bomPartsModal} onClose={() => setBomPartsModal(false)} bom={selectedBom} />}

            <ManualCountModal
                open={manualCountModal}
                onClose={() => setManualCountModal(false)}
                itemId={selectedRow.id}
            />
            <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selectedRow.id} />

            <Formik initialValues={selectedRow} validationSchema={AddItemSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Box
                            pb="8px"
                            display="grid"
                            gridTemplateColumns="1fr 2fr"
                            gridTemplateRows="340px 1fr"
                            gridGap={5}
                        >
                            <BasePaper style={{ maxHeight: 340 }}>
                                <General
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    setFieldValue={setFieldValue}
                                    errors={errors}
                                    touched={touched}
                                />

                                <Button style={{ margin: "10px 0px", width: "100%" }} kind="edit" type="submit">
                                    Save
                                </Button>
                            </BasePaper>
                            <BasePaper
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Tabs
                                    style={{ marginBottom: 16, maxWidth: "35vw" }}
                                    value={moreInfoTab}
                                    variant="scrollable"
                                    textColor="primary"
                                    onChange={(e, v) => setMoreInfoTab(v)}
                                >
                                    <Tab label="Image" /> 0
                                    <Tab label="UPC" /> 1
                                    <Tab label="More Info." /> 2
                                    <Tab label="Quantity" /> 3
                                    <Tab label="Pricing" /> 4
                                    <Tab label="Shipping" /> 5
                                    <Tab label="Clusters and Levels" /> 6
                                </Tabs>
                                {moreInfoTab === 0 && (
                                    <Box
                                        mt={1}
                                        height="100%"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        flexDirection="column"
                                        gridGap={10}
                                    >
                                        {selectedRow?.photo && (
                                            <img
                                                style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                    maxHeight: 400,
                                                    margin: "0px auto",
                                                }}
                                                alt=""
                                                src={img ? img : `http://${host}${selectedRow?.photo}`}
                                            />
                                        )}
                                        <div
                                            style={{
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <UploadButton onChange={handleFileChange} accept="image/*" />
                                        </div>
                                    </Box>
                                )}
                                {moreInfoTab === 1 && (
                                    <Box display="flex" justifyContent="space-around" alignItems="center">
                                        <div ref={(e) => (qrCode.current = e)}>
                                            <QRCode
                                                value={JSON.stringify({
                                                    type: "item",
                                                    panel: "inventory",
                                                    no: selectedRow.no,
                                                    id: selectedRow.id,
                                                })}
                                            />
                                            <Typography variant="subtitle1">Device Number: {selectedRow.no}</Typography>
                                            <Typography variant="subtitle1">Device Name: {selectedRow.name}</Typography>
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
                                    <>
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
                                    </>
                                )}
                                {moreInfoTab === 4 && (
                                    <>
                                        <BaseDataGrid
                                            rows={selectedRow?.pricing || []}
                                            cols={pricingCols}
                                            height={220}
                                            filter
                                            pagination
                                        />
                                        <Pricing
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                            boms={boms?.length === 0 ? false : true}
                                        />
                                    </>
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
                            <BasePaper style={{ gridRow: 1, gridColumn: 2, gridRowEnd: "span 2" }}>
                                <Tabs
                                    value={activeTab}
                                    onChange={(e, v) => setActiveTab(v)}
                                    textColor="primary"
                                    variant="scrollable"
                                >
                                    <Tab label="Document" /> 0{/* <Tab label="BOM allocated" /> */}
                                    {boms?.length === 0 ? <Tab label="Vendor" /> : <Tab label="BOM" />}
                                    <Tab label="Sales order History" />2
                                    <Tab label="PO History" />3{/* <Tab label="Sales Report" /> */}
                                    <Tab label="Usage" />4
                                    <Tab label="Note" />5{/* <Tab label="Quantity history" /> */}
                                    <Tab label="Auditing" />6
                                </Tabs>
                                <Box p={1}>
                                    {activeTab === 0 && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setAddDocModal(true);
                                                }}
                                                style={style}
                                            >
                                                + Add Document
                                            </Button>
                                            <BaseDataGrid
                                                cols={docCols}
                                                rows={docs || []}
                                                onRowSelected={onDocSelected}
                                            />
                                        </>
                                    )}
                                    {activeTab === 1 && boms && <ItemBomTable boms={boms} />}
                                    {activeTab === 1 && !boms && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setAddVendorModal(true);
                                                }}
                                                style={style}
                                            >
                                                + Add Vendor
                                            </Button>
                                            <VendorsTable
                                                selectedItem={selectedRow}
                                                rows={vendors || []}
                                                onRowSelected={() => {}}
                                            />
                                        </>
                                    )}

                                    {activeTab === 2 && itemSOs && <SOTable rows={itemSOs} />}
                                    {activeTab === 3 && (
                                        <BaseDataGrid cols={poCols} rows={itemPOs || []} onRowSelected={() => {}} />
                                    )}
                                    {/* {activeTab === 8 && <SalesReport quotes={itemQuotes} salesOrders={itemSOs || []} />} */}
                                    {activeTab === 4 && (
                                        <BaseDataGrid
                                            cols={usageCols}
                                            rows={itemUsage || []}
                                            onRowSelected={() => {}}
                                        />
                                    )}
                                    {activeTab === 5 && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setAddNoteModal(true);
                                                }}
                                                style={style}
                                            >
                                                + Add Note
                                            </Button>
                                            <BaseDataGrid
                                                cols={noteCols}
                                                rows={notes || []}
                                                onRowSelected={onNoteSelected}
                                            />
                                        </>
                                    )}
                                    {activeTab === 6 && <div>Auditing</div>}
                                </Box>
                            </BasePaper>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ItemsDetails;
