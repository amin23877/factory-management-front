import React, { useMemo, useState, useRef } from "react";
import { Box, Tabs, Tab, Typography } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { host } from "../../../host";

import { General, Warranty, Battery, Inverter, Control } from "./Forms";
import MyQRCode from "../../../app/QRCode";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

import { IDocument } from "../../../api/document";
import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";
import DocumentModal from "../../Modals/DocumentModals";
import { exportPdf } from "../../../logic/pdf";
import BatteryDiagram from "./BatteryDiagram";

const schema = Yup.object().shape({});

function Details({ up }: { up: any }) {
    const handleSubmit = async (data: any) => {
        // try {
        //     if (up?.id) {
        //         await updateup(up.id, getModifiedValues(data, up));
        //         await mutate("/up");
        //         Toast("up updated", "success");
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    };

    const qrCode = useRef<HTMLElement | null>(null);
    const [infoActiveTab, setInfoActiveTab] = useState(0);
    const [gridActiveTab, setGridActiveTab] = useState(0);
    const [batteryTab, setBatteryTab] = useState(0);
    const [addDocModal, setAddDocModal] = useState(false);

    const { data: documents } = useSWR<IDocument[]>(gridActiveTab === 1 ? `/document/up/${up.id}` : null);

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

    // const warCols = useMemo<GridColumns>(
    //     () => [
    //         { field: "date", headerName: "Date", type: "date", width: 120 },
    //         { field: "number", headerName: "Warranty Number", width: 160 },
    //         { field: "name", headerName: "Name", width: 160 },
    //         { field: "description", headerName: "Note", flex: 1 },
    //         { field: "term", headerName: "Term", flex: 1 },
    //         { field: "status", headerName: "Status", width: 150 },
    //     ],
    //     []
    // );
    const UnitLogsCols = useMemo<GridColumns>(
        () => [
            { field: "date", headerName: "Timestamp", type: "date", width: 120 },
            { field: "number", headerName: "Error Number", width: 160 },
            { field: "description", headerName: "Error Description", flex: 1 },
        ],
        []
    );
    const optionCols = useMemo<GridColumns>(
        () => [
            {
                field: "Option Number",
                valueFormatter: (params) => params.row?.ItemId?.no,
                flex: 1,
            },
            {
                field: "Option Name",
                valueFormatter: (params) => params.row?.ItemId?.name,
                flex: 1,
            },
            {
                field: "Option Description",
                valueFormatter: (params) => params.row?.ItemId?.description,
                flex: 1,
            },
            { field: "quantity", headerName: "Quantity", width: 100 },
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
            <DocumentModal open={addDocModal} onClose={() => setAddDocModal(false)} itemId={up?.id} model="up" />
            <Formik initialValues={up} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
                    <Form style={{ height: "90%" }}>
                        <Box height="100%" display="grid" gridTemplateColumns="3fr 4fr" gridGap={10}>
                            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
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
                                <BasePaper>
                                    <Tabs
                                        value={infoActiveTab}
                                        onChange={(e, nv) => setInfoActiveTab(nv)}
                                        style={{ marginBottom: "0.5em" }}
                                        variant="scrollable"
                                    >
                                        <Tab label="Image" />
                                        <Tab label="UPC" />
                                        {/* <Tab label="Unit Info" /> */}
                                        <Tab label="Options" />
                                        <Tab label="Battery Info" />
                                        <Tab label="Warranty Info" />
                                        <Tab label="Control" />
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
                                            {up?.item?.photo && (
                                                <img
                                                    style={{
                                                        maxWidth: "100%",
                                                        height: "auto",
                                                        maxHeight: 400,
                                                        margin: "0px auto",
                                                    }}
                                                    alt=""
                                                    src={`http://${host}${up?.item?.photo}`}
                                                />
                                            )}
                                        </Box>
                                    )}
                                    {infoActiveTab === 1 && (
                                        <Box mt={1} display="flex" justifyContent="space-around" alignItems="center">
                                            <div ref={(e) => (qrCode.current = e)} style={{ flex: 1 }}>
                                                <MyQRCode value={String(up.number)} />
                                                <Typography variant="subtitle1">Unit Number: {up.item.no}</Typography>
                                                <Typography variant="subtitle1">Unit Name: {up.item.name}</Typography>
                                                <Typography variant="subtitle1">
                                                    Sales Order NO.: {up.number}
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
                                    {infoActiveTab === 2 && (
                                        <BaseDataGrid
                                            height={200}
                                            rows={up.options || []}
                                            cols={optionCols}
                                            onRowSelected={() => {}}
                                        />
                                    )}
                                    {infoActiveTab === 3 && (
                                        <Battery
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                    {infoActiveTab === 4 && (
                                        <Warranty
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                    {infoActiveTab === 5 && (
                                        <Control
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                </BasePaper>
                            </Box>
                            <Box>
                                <Box display="flex" maxWidth="700px">
                                    <Tabs
                                        value={gridActiveTab}
                                        onChange={(e, nv) => setGridActiveTab(nv)}
                                        textColor="primary"
                                        variant="scrollable"
                                    >
                                        <Tab label="Documents" />
                                        <Tab label="Job" />
                                        <Tab label="Field Service History" />
                                        <Tab label="Unit Images" />
                                        <Tab label="Inverter measurements" />
                                        <Tab label="Battery Measurements" />
                                        <Tab label="Unit Logs" />
                                        <Tab label="Note" />
                                        <Tab label="Auditing" />
                                    </Tabs>
                                </Box>
                                <BasePaper style={{ height: "91.5%" }}>
                                    {gridActiveTab === 0 && (
                                        <>
                                            <BaseDataGrid
                                                cols={docCols}
                                                rows={documents && documents.length ? documents : []}
                                                onRowSelected={(v) => {}}
                                            />
                                        </>
                                    )}
                                    {gridActiveTab === 1 && (
                                        <BaseDataGrid cols={bomCols} rows={[]} onRowSelected={(r) => {}} />
                                    )}
                                    {gridActiveTab === 3 && (
                                        <BaseDataGrid cols={docCols} rows={[]} onRowSelected={(r) => {}} />
                                    )}
                                    {gridActiveTab === 4 && (
                                        <Inverter
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                    )}
                                    {gridActiveTab === 5 && (
                                        <>
                                            <Tabs
                                                value={batteryTab}
                                                onChange={(e, nv) => setBatteryTab(nv)}
                                                style={{ marginBottom: "0.5em" }}
                                            >
                                                <Tab label="List" />
                                                <Tab label="Diagram" />
                                            </Tabs>
                                            {batteryTab === 1 && <BatteryDiagram />}
                                        </>
                                    )}
                                    {gridActiveTab === 6 && (
                                        <BaseDataGrid cols={UnitLogsCols} rows={[]} onRowSelected={(r) => {}} />
                                    )}
                                    {gridActiveTab === 7 && (
                                        <BaseDataGrid cols={noteCols} rows={[]} onRowSelected={(r) => {}} />
                                    )}
                                </BasePaper>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Details;
