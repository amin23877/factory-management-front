import React, { useMemo, useState } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Snackbar from "../../../app/Snack";

import Button from "../../../app/Button";
import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import { DynamicFilterAndFields } from "../../Items/Forms";
import { General, Photo } from "./Forms";
import { SalesReport } from "../../Items/Reports";
import AddServiceModal from "../../FieldService/AddServiceModal";
import UnitHistoryModal from "../../Unit/Modal";

import { INote } from "../../../api/note";
import { IDocument } from "../../../api/document";
import { AddItemSchema, updateAnItem } from "../../../api/items";
import { IBom } from "../../../api/bom";
import Parts from "../../BOM/Parts";
import { formatTimestampToDate } from "../../../logic/date";
import { IUnitHistory } from "../../../api/units";

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
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [bom, setBom] = useState<any>();
    const [AddService, setAddService] = useState(false);
    const [unitHistoryModal, setUnitHistoryModal] = useState(false);

    const [selectedUnit, setSelectedUnit] = useState<IUnitHistory>();

    const { data: notes } = useSWR<INote[]>(activeTab === 12 ? `/note/item/${selectedRow.id}` : null);
    const { data: docs } = useSWR<IDocument[]>(activeTab === 0 ? `/document/item/${selectedRow.id}` : null);
    const { data: boms } = useSWR<IBom[]>(activeTab === 1 ? `/bom?ItemId=${selectedRow.id}` : null);
    const { data: warranties } = useSWR(
        activeTab === 2 ? `/service?ItemId=${selectedRow.id}&ServiceFamilyId=60efd0bcca0feadc84be6618` : null
    );
    const { data: manSteps } = useSWR(
        activeTab === 3 ? `/engineering/manufacturing/task?ItemId=${selectedRow.id}` : null
    );
    const { data: evalSteps } = useSWR(activeTab === 4 ? `/engineering/eval/task?ItemId=${selectedRow.id}` : null);
    const { data: testSteps } = useSWR(activeTab === 5 ? `/engineering/test/task?ItemId=${selectedRow.id}` : null);
    const { data: fieldSteps } = useSWR(
        activeTab === 6 ? `/engineering/fieldstartup/task?ItemId=${selectedRow.id}` : null
    );
    const { data: itemQuotes } = useSWR(activeTab === 5 ? `/item/${selectedRow.id}/quote` : null);
    const { data: itemSOs } = useSWR(activeTab === 6 ? `/item/${selectedRow.id}/so` : null);

    const { data: uniteHistory } = useSWR(activeTab === 8 ? `/unitehistory` : null);
    const { data: services } = useSWR(activeTab === 10 ? `/service?ItemId=${selectedRow.id}` : null);

    const [showSnack, setShowSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [bomPartsModal, setBomPartsModal] = useState(false);

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
    const serviceCols = useMemo(
        () => [
            { field: "name", headerName: "Name", flex: 1 },
            { field: "price", headerName: "Price", flex: 1 },
            { field: "period", headerName: "Length", flex: 1 },
            { field: "description", headerName: "Description", flex: 1 },
        ],
        []
    );

    const noteCols = useMemo(
        () => [
            { field: "subject", headerName: "Subject", flex: 1 },
            { field: "url", headerName: "URL", flex: 1 },
            { field: "note", headerName: "Note", flex: 2 },
        ],
        []
    );

    const docCols = useMemo(
        () => [
            { field: "file", headerName: "File" },
            { field: "createdAt", headerName: "Date", flex: 1 },
            { field: "EmployeeId", headerName: "Creator", flex: 1 },
            { field: "name", headerName: "File Name", flex: 1 },
            { field: "id", headerName: "File ID", flex: 1 },
            { field: "description", headerName: "Description", flex: 1 },
            { field: "type", headerName: "File Type" },
        ],
        []
    );

    const bomCols = useMemo<GridColDef[]>(
        () => [
            { field: "items", headerName: "Items", width: 80 },
            { field: "revision", headerName: "Revision" },
            { field: "date", headerName: "Revision Date", type: "date", width: 180 },
            { field: "name", headerName: "BOM Name", width: 180 },
            { field: "note", headerName: "Note", flex: 1 },
            { field: "current", headerName: "Current", type: "boolean" },
        ],
        []
    );
    const manCols = useMemo<GridColDef[]>(
        () => [
            { field: "priority", headerName: "Priority", width: 70, disableColumnMenu: true },
            { field: "name", headerName: "Name", flex: 2 },
            { field: "id", headerName: "ID", width: 160, disableColumnMenu: true },
            { field: "description", headerName: "Description", flex: 2 },
            { field: "document", headerName: "Document", flex: 2 },
            { field: "hours", headerName: " Hours", width: 70, disableColumnMenu: true },
            {
                field: "buildToStock",
                headerName: "Build To Stock",
                type: "boolean",
                width: 100,
                disableColumnMenu: true,
            },
            { field: "engAP", headerName: "Eng AP.", type: "boolean", width: 70, disableColumnMenu: true },
            { field: "desc", headerName: "Note", width: 100 },
        ],
        []
    );

    const evalCols = useMemo<GridColDef[]>(
        () => [
            { field: "priority", headerName: "Priority", width: 70, disableColumnMenu: true },
            { field: "name", headerName: "Name", flex: 2 },
            { field: "id", headerName: "ID", width: 150, disableColumnMenu: true },
            { field: "description", headerName: "Description", flex: 2 },
            { field: "document", headerName: "Document", flex: 2 },
            { field: "hours", headerName: " Hours", width: 70, disableColumnMenu: true },
            { field: "engAP", headerName: "Eng AP.", type: "boolean", width: 70, disableColumnMenu: true },
            { field: "desc", headerName: "Note", width: 100 },
        ],
        []
    );

    const unitHistoryCols = useMemo<GridColDef[]>(
        () => [
            { field: "estimatedShipDate", headerName: "Estimated Ship Date", flex: 1, disableColumnMenu: true },
            { field: "actualShipDate", headerName: "Actual Ship Date", flex: 1 },
            { field: "serialNumber", headerName: "Device Serial No.", flex: 1 },
            { field: "status", headerName: "Status", flex: 1 },
            { field: "warrantyStatus", headerName: "Warranty Status", type: "boolean", flex: 1 },
            { field: "warrantyEndDate", headerName: "Warranty End Date", flex: 1 },
            { field: "SOId", headerName: "SO ID", flex: 1 },
            {
                field: "SODate",
                headerName: "SO Date",
                valueFormatter: (r) => formatTimestampToDate(r.row.SODate),
                flex: 1,
            },
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
            console.log(error);
        }
    };

    return (
        <Box>
            <Snackbar onClose={() => setShowSnack(false)} open={showSnack}>
                {snackMsg}
            </Snackbar>
            {bom && <Parts open={bomPartsModal} onClose={() => setBomPartsModal(false)} bom={bom} />}
            <AddServiceModal
                device={selectedRow.id}
                open={AddService}
                onClose={() => setAddService(false)}
                onDone={() => {
                    mutate(`/service?ItemId=${selectedRow.id}&ServiceFamilyId=60efd0bcca0feadc84be6618`);
                }}
            />
            {selectedUnit && (
                <UnitHistoryModal
                    open={unitHistoryModal}
                    onClose={() => setUnitHistoryModal(false)}
                    unit={selectedUnit}
                />
            )}

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

                                    <Button style={{ margin: "0.5em auto" }} kind="edit" type="submit">
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
                                    <Tabs
                                        style={{ marginBottom: 16 }}
                                        value={moreInfoTab}
                                        variant="scrollable"
                                        textColor="primary"
                                        onChange={(e, v) => setMoreInfoTab(v)}
                                    >
                                        <Tab label="Image" />
                                        <Tab label="Clusters and Levels" />
                                    </Tabs>
                                    {moreInfoTab === 0 && <Photo device={selectedRow} />}
                                    {moreInfoTab === 1 && (
                                        <DynamicFilterAndFields
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                            selectedItem={selectedRow}
                                            device={true}
                                        />
                                    )}
                                </BasePaper>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BasePaper>
                        <Box display="flex" maxWidth="850px">
                            <Tabs
                                value={activeTab}
                                onChange={(e, v) => setActiveTab(v)}
                                textColor="primary"
                                variant="scrollable"
                            >
                                <Tab label="Design documents" />
                                <Tab label="BOM" />
                                <Tab label="Warranties" />
                                <Tab label="Manufacturing" />
                                <Tab label="Evaluation" />
                                <Tab label="Test" />
                                <Tab label="Field Start-up" />
                                <Tab label="Label" />
                                <Tab label="Unit History" />
                                <Tab label="Sales Report" />
                                <Tab label="Field Service" />
                                <Tab label="Quality Control" />
                                <Tab label="Notes" />
                                <Tab label="Auditing" />
                            </Tabs>
                        </Box>
                        <Box p={3}>
                            {activeTab === 0 && (
                                <BaseDataGrid cols={docCols} rows={docs || []} onRowSelected={onDocSelected} />
                            )}
                            {activeTab === 1 && (
                                <BaseDataGrid
                                    cols={bomCols}
                                    rows={boms || []}
                                    onRowSelected={(d) => {
                                        setBom(d);
                                        setBomPartsModal(true);
                                    }}
                                />
                            )}
                            {activeTab === 2 && (
                                <Box>
                                    <Button onClick={() => setAddService(true)}>Add Warranty</Button>
                                    <BaseDataGrid cols={warCols} rows={warranties || []} onRowSelected={(d) => {}} />
                                </Box>
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
                                    cols={evalCols}
                                    rows={evalSteps || []}
                                    onRowSelected={(d) => {
                                        onStepSelected({ ...d, tab: 1 });
                                    }}
                                />
                            )}
                            {activeTab === 5 && (
                                <BaseDataGrid
                                    cols={evalCols}
                                    rows={testSteps || []}
                                    onRowSelected={(d) => {
                                        onStepSelected({ ...d, tab: 2 });
                                    }}
                                />
                            )}
                            {activeTab === 6 && (
                                <BaseDataGrid
                                    cols={evalCols}
                                    rows={fieldSteps || []}
                                    onRowSelected={(d) => {
                                        onStepSelected({ ...d, tab: 3 });
                                    }}
                                />
                            )}
                            {activeTab === 8 && (
                                <BaseDataGrid
                                    cols={unitHistoryCols}
                                    rows={
                                        uniteHistory
                                            ? uniteHistory.map((item: any, i: any) => ({ id: i, ...item }))
                                            : []
                                    }
                                    onRowSelected={(d) => {
                                        setSelectedUnit(d);
                                        setUnitHistoryModal(true);
                                    }}
                                />
                            )}
                            {activeTab === 9 && <SalesReport quotes={itemQuotes} salesOrders={itemSOs || []} />}
                            {activeTab === 10 && (
                                <BaseDataGrid cols={serviceCols} rows={services || []} onRowSelected={() => {}} />
                            )}
                            {activeTab === 12 && (
                                <BaseDataGrid cols={noteCols} rows={notes || []} onRowSelected={onNoteSelected} />
                            )}
                        </Box>
                    </BasePaper>
                </Grid>
            </Grid>
        </Box>
    );
}
export default ItemsDetails;
