import React, { useMemo, useState, Fragment } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { host } from "../../../host";

import { General, Status, Expense, Shipping } from "./Forms";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

import { IUnit, updateUnit } from "../../../api/units";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Toast from "../../../app/Toast";
import { IDocument } from "../../../api/document";
import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";
import DocumentModal from "../../Modals/DocumentModals";
import ShipmentModal, { EditShipModal } from "../../Modals/ShipmentModal";
import { getModifiedValues } from "../../../logic/utils";
import { DynamicFilterAndFields } from "../../Items/Forms";
import { IShipment } from "../../../api/shipment";

const schema = Yup.object().shape({});

function Details({ unit }: { unit: IUnit }) {
    const handleSubmit = async (data: any) => {
        try {
            if (unit?.id) {
                await updateUnit(unit.id, getModifiedValues(data, unit));
                await mutate("/unit");
                Toast("Unit updated", "success");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const [infoActiveTab, setInfoActiveTab] = useState(0);
    const [gridActiveTab, setGridActiveTab] = useState(0);
    const [addDocModal, setAddDocModal] = useState(false);
    const [addShipModal, setAddShipModal] = useState(false);
    const [editShip, setEditShip] = useState(false);
    const [selectedShip, setSelectedShip] = useState<IShipment>();

    // const { data: warranties } = useSWR(gridActiveTab === 1 ? `/lineservice?UnitId=${unit.id}` : null);
    const { data: unitBoms } = useSWR(gridActiveTab === 2 ? `/ubom?UnitId=${unit.id}` : null);
    const { data: documents } = useSWR<IDocument[]>(gridActiveTab === 3 ? `/document/unit/${unit.id}` : null);
    const { data: shipments } = useSWR(gridActiveTab === 4 ? `/shipment?UnitId=${unit.id}` : null);
    // const { data: SOI } = useSWR(gridActiveTab === 6 ? `/unit?SOId=${unit.so.id}` : null);
    // const { data: fsh } = useSWR(gridActiveTab === 7 ? `/ticket?UnitId=${unit.id}` : null);
    const bomCols = useMemo<GridColDef[]>(
        () => [
            { field: "Line", width: 80 },
            { field: "Component", width: 180 },
            { field: "Component Name", width: 180 },
            { field: "Component Location", flex: 1 },
            { field: "UM", width: 120 },
            { field: "QTY", width: 120 },
            { field: "Note", width: 200 },
        ],
        []
    );

    const warCols = useMemo<GridColumns>(
        () => [
            { field: "date", headerName: "Date", type: "date", width: 120 },
            { field: "number", headerName: "Warranty Number", width: 160 },
            { field: "name", headerName: "Name", width: 160 },
            { field: "description", headerName: "Note", flex: 1 },
            { field: "term", headerName: "Term", flex: 1 },
            { field: "status", headerName: "Status", width: 150 },
        ],
        []
    );

    const shipCols = useMemo<GridColumns>(
        () => [
            { field: "targetDate", headerName: "Target Date", type: "date", width: 130 },
            { field: "shipDate", headerName: "Actual Date", width: 130 },
            { field: "shipmentNo", headerName: "Shipment No", width: 130 },
            { field: "carrier", headerName: "Carrier", flex: 1 },
            { field: "deliveryMethod", headerName: "Delivery Method", flex: 1 },
            { field: "trackingNumber", headerName: "Tracking Number", width: 150 },
        ],
        []
    );

    const fshCols = useMemo<GridColumns>(
        () => [
            { field: "Date", valueFormatter: (params) => formatTimestampToDate(params.row?.date), width: 120 },
            { field: "Ticket ID", valueFormatter: (params) => params.row?.number, width: 120 },
            { field: "Subject", valueFormatter: (params) => params.row?.subject, flex: 1 },
            { field: "Unit", valueFormatter: (params) => params.row?.UnitId?.number, width: 150 },
            { field: "Assigned To", valueFormatter: (params) => params.row?.assignee?.username, width: 120 },
            { field: "Contact", valueFormatter: (params) => params.row?.ContactId.lastName, width: 120 },
            { field: "Status", valueFormatter: (params) => params.row?.status, width: 120 },
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
    // Part Number	Description	QTY
    const SOICols = useMemo<GridColumns>(
        () => [
            { field: "Option Number", valueFormatter: (params) => params.row?.ItemId?.no, flex: 1 },
            { field: "Option Description", valueFormatter: (params) => params.row?.ItemId?.description, flex: 1 },
        ],
        []
    );
    return (
        <>
            <DocumentModal open={addDocModal} onClose={() => setAddDocModal(false)} itemId={unit?.id} model="unit" />
            {unit && unit.id && (
                <ShipmentModal open={addShipModal} onClose={() => setAddShipModal(false)} unitId={unit.id} />
            )}
            {unit && unit.id && selectedShip && (
                <EditShipModal
                    open={editShip}
                    onClose={() => setEditShip(false)}
                    unitId={unit.id}
                    init={selectedShip}
                />
            )}
            <Box display="grid" gridTemplateColumns="1fr 2fr" gridGap={10} height="90%">
                <Formik initialValues={unit as IUnit} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
                        <Form>
                            <Box mb={2} display="grid" gridTemplateColumns="1fr" gridGap={10} height="100%">
                                <BasePaper>
                                    <General
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                    <Box textAlign="center" my={1}>
                                        <Button disabled={isSubmitting} kind="add" type="submit">
                                            Save
                                        </Button>
                                    </Box>
                                </BasePaper>
                                <BasePaper style={{ height: "100%" }}>
                                    <Tabs
                                        value={infoActiveTab}
                                        onChange={(e, nv) => setInfoActiveTab(nv)}
                                        style={{ marginBottom: "0.5em" }}
                                    >
                                        <Tab label="Image" />
                                        <Tab label="Status" />
                                        <Tab label="Expense" />
                                        <Tab label="Shipping" />
                                        <Tab label="Cluster & Level" />
                                    </Tabs>
                                    {infoActiveTab === 0 && (
                                        <Box
                                            mt={1}
                                            height="100%"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            flexDirection="column"
                                            gridGap={10}
                                        >
                                            {unit?.item?.photo && (
                                                <img
                                                    style={{
                                                        maxWidth: "100%",
                                                        height: "auto",
                                                        maxHeight: 400,
                                                        margin: "0px auto",
                                                    }}
                                                    alt=""
                                                    src={`http://${host}${unit?.item?.photo}`}
                                                />
                                            )}
                                        </Box>
                                    )}
                                    {infoActiveTab === 1 && (
                                        <Status
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                    {infoActiveTab === 2 && (
                                        <Expense
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                    {infoActiveTab === 3 && (
                                        <Shipping
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                    {infoActiveTab === 4 && (
                                        <DynamicFilterAndFields
                                            values={values.item}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                            selectedItem={unit?.item}
                                        />
                                    )}
                                </BasePaper>
                            </Box>
                        </Form>
                    )}
                </Formik>
                <BasePaper>
                    <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
                        <Tab label="Phocus Monitor" />
                        <Tab label="Warranties" />
                        <Tab label="Job" />
                        <Tab label="Documents" />
                        <Tab label="Shipment" />
                        <Tab label="Quality Control" />
                        <Tab label="Sales Order Items" />
                        <Tab label="Field Service History" />
                        <Tab label="Note" />
                        <Tab label="Auditing" />
                    </Tabs>
                    {gridActiveTab === 1 && (
                        <Box>
                            {/* TODO: fetch warranties */}
                            <BaseDataGrid cols={warCols} rows={[]} onRowSelected={(d) => {}} />
                        </Box>
                    )}
                    {gridActiveTab === 2 && (
                        <BaseDataGrid cols={bomCols} rows={unitBoms || []} onRowSelected={(r) => {}} />
                    )}
                    {gridActiveTab === 3 && (
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
                                height={250}
                                cols={docCols}
                                rows={documents && documents.length ? documents : []}
                                onRowSelected={(v) => {}}
                            />
                        </>
                    )}
                    {gridActiveTab === 4 && (
                        <>
                            <Button
                                onClick={() => {
                                    setAddShipModal(true);
                                }}
                                variant="outlined"
                            >
                                + Add Shipment
                            </Button>
                            <BaseDataGrid
                                cols={shipCols}
                                rows={shipments || []}
                                onRowSelected={(v) => {
                                    setSelectedShip(v);
                                    setEditShip(true);
                                }}
                            />
                        </>
                    )}
                    {gridActiveTab === 6 && (
                        // TODO: fetch sales order items
                        <BaseDataGrid cols={SOICols} rows={[]} onRowSelected={(r) => {}} />
                    )}
                    {/* TODO: fetch fsh */}
                    {gridActiveTab === 7 && <BaseDataGrid cols={fshCols} rows={[]} onRowSelected={(r) => {}} />}
                </BasePaper>
            </Box>
        </>
    );
}

export default Details;
