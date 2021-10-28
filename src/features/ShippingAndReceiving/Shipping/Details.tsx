import React, { useMemo, useState, Fragment } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// import {} from "./Forms";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import { fileType } from "../../../logic/fileType";
import { formatTimestampToDate } from "../../../logic/date";

const schema = Yup.object().shape({});

function Details({ ship }: { ship: any }) {
    const handleSubmit = async (data: any) => {};

    const [infoActiveTab, setInfoActiveTab] = useState(0);
    const [gridActiveTab, setGridActiveTab] = useState(0);

    // Target Date	Actual Date	Shipment No	Carrier	Delivery Method	Tracking Number

    const unitCols: GridColumns = useMemo(
        () => [
            { field: "number", headerName: "Unit ID", width: 100 },
            {
                field: "UnitSerialNo",
                headerName: "Unit Serial No.",
                valueFormatter: (r) => r.row?.device?.number,
                width: 130,
            },
            // { field: "LineItemRecordId",  width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "model", headerName: "Model", width: 120 },
            { field: "shippingDate", headerName: "Estimated SD.", width: 150 },
        ],
        []
    );

    const FSCols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.date),
                width: 120,
            },
            { field: "number", headerName: "Ticket ID", width: 130 },
            { field: "subject", headerName: "Subject", flex: 1 },
            {
                field: "unit",
                headerName: "Unit",
                valueFormatter: (params) => params.row?.unit?.number,
                width: 120,
            },
            { field: "AssignedTo", headerName: "Assigned To", width: 120 },
            { field: "contact", headerName: "Contact", width: 120 },
            { field: "status", headerName: "Status", width: 120 },
        ],
        []
    );

    const LICols = useMemo<GridColumns>(
        () => [
            { field: "index", headerName: "Sort" },
            { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row?.ItemId?.name, width: 200 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "quantity", headerName: "QTY", width: 90 },
            { field: "price", headerName: "Price", width: 100 },
            { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
            { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row?.quantity, width: 200 },
            { field: "invoice", headerName: "Invoice", width: 200 },
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

    return (
        <>
            <Formik initialValues={ship} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
                    <Form>
                        <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                            <BasePaper>
                                <Box textAlign="center" my={1}>
                                    <Button disabled={isSubmitting} kind="add" type="submit">
                                        Save
                                    </Button>
                                </Box>
                            </BasePaper>
                            <BasePaper>
                                <Tabs
                                    value={infoActiveTab}
                                    onChange={(e, nv) => setInfoActiveTab(nv)}
                                    style={{ marginBottom: "0.5em" }}
                                >
                                    <Tab label="Approvals" />
                                    <Tab label="Accounting" />
                                    <Tab label="Shipping" />
                                    <Tab label="Entities" />
                                    <Tab label="Addresses" />
                                </Tabs>
                            </BasePaper>
                        </Box>

                        <BasePaper>
                            <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
                                <Tab label="Line Item" /> 0
                                <Tab label="Units" /> 1
                                <Tab label="Documents" /> 2
                                <Tab label="Activities" /> 3
                                <Tab label="Shipments" /> 4
                                <Tab label="Filed Service" /> 5
                                <Tab label="Unit Pictures" /> 6
                                <Tab label="Note" /> 7
                                <Tab label="Auditing" /> 8
                            </Tabs>
                        </BasePaper>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Details;
