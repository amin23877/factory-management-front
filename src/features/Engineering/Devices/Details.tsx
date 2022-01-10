import React, { useMemo, useRef, useState } from "react";
import { Box, Grid, Tabs, Tab, LinearProgress, Typography, useMediaQuery } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import SalesReport from "./SalesReport";

import Button from "../../../app/Button";
import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import { DynamicFilterAndFields } from "../../Items/Forms";
import { General, Photo } from "./Forms";
import AddServiceModal from "./AddServiceModal";
import UnitHistoryModal from "../../Unit/Modal";

import { INote } from "../../../api/note";
import { IDocument } from "../../../api/document";
import { AddItemSchema, updateAnItem } from "../../../api/items";
import { IBom } from "../../../api/bom";
import Parts from "../../BOM/Parts";
import { formatTimestampToDate } from "../../../logic/date";
import { IUnitHistory } from "../../../api/units";

import Toast from "../../../app/Toast";
import { exportPdf } from "../../../logic/pdf";
import { EditTaskModal } from "./TaskModal";
import { getModifiedValues } from "../../../logic/utils";

import DeviceQRCode from "../../../app/QRCode";

function ItemsDetails({
    sales,
    selectedRow,
    onNoteSelected,
    onDocSelected,
    onStepSelected,
    onFlagSelected,
    onDone,
    addNote,
    addDoc,
}: {
    sales?: boolean;
    selectedRow: any;
    onDone?: () => void;
    onNoteSelected: (a: any) => void;
    onDocSelected: (a: any) => void;
    onStepSelected: (a: any) => void;
    onFlagSelected: (a: any) => void;
    addNote: (a: any) => void;
    addDoc: (a: any) => void;
}) {
    const qrCode = useRef<HTMLElement | null>(null);

    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [bom, setBom] = useState<any>();
    const [AddService, setAddService] = useState(false);
    const [unitHistoryModal, setUnitHistoryModal] = useState(false);

    const [selectedStep] = useState<any>();
    const [selectedUnit, setSelectedUnit] = useState<IUnitHistory>();

    const [stepModal, setStepModal] = useState(false);

    const { data: docs } = useSWR<IDocument[]>(
        activeTab === 0 ? (selectedRow && selectedRow.id ? `/document/item/${selectedRow.id}` : null) : null
    );
    const { data: boms } = useSWR<IBom[]>(
        activeTab === 1 ? (selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null) : null
    );
    const { data: services, mutate: mutateServices } = useSWR(
        activeTab === 2 ? (selectedRow && selectedRow.id ? `item/${selectedRow.id}/service` : null) : null
    );
    const { data: manSteps } = useSWR(
        activeTab === 3
            ? selectedRow && selectedRow.id
                ? `/engineering/manufacturing/task?ItemId=${selectedRow.id}`
                : null
            : null
    );
    const { data: evalSteps } = useSWR(
        activeTab === 4
            ? selectedRow && selectedRow.id
                ? `/engineering/eval/task?ItemId=${selectedRow.id}`
                : null
            : null
    );
    const { data: testSteps } = useSWR(
        activeTab === 5
            ? selectedRow && selectedRow.id
                ? `/engineering/test/task?ItemId=${selectedRow.id}`
                : null
            : null
    );
    const { data: fieldSteps } = useSWR(
        activeTab === 6
            ? selectedRow && selectedRow.id
                ? `/engineering/fieldstartup/task?ItemId=${selectedRow.id}`
                : null
            : null
    );
    const { data: uniteHistory } = useSWR(
        activeTab === 8 ? (selectedRow && selectedRow.id ? `/unitehistory` : null) : null
    );

    const { data: flags } = useSWR(
        activeTab === 10 ? (selectedRow && selectedRow.id ? `/qccase/item/${selectedRow.id}` : null) : null
    );
    const { data: notes } = useSWR<INote[]>(
        activeTab === 11 ? (selectedRow && selectedRow.id ? `/note/item/${selectedRow.id}` : null) : null
    );

    const [bomPartsModal, setBomPartsModal] = useState(false);

    const serviceCols = useMemo<GridColumns>(
        () => [
            { field: "no", headerName: "ID", width: 150 },
            { field: "name", headerName: "Name", flex: 1 },
            {
                field: "ServiceCategoryId",
                headerName: "Category",
                valueFormatter: (params) => params.row?.ServiceCategoryId?.name,
                width: 120,
            },
            {
                field: "ServiceClassId",
                headerName: "Class",
                valueFormatter: (params) => params.row?.ServiceClassId?.name,

                width: 120,
            },
            { field: "retailPrice", headerName: "Price", width: 90 },
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
    const flagCols = useMemo(
        () => [
            { field: "date", headerName: "Date", flex: 2 },
            { field: "number", headerName: "Flag ID", flex: 2 },
            { field: "name", headerName: "Name", flex: 4 },
            { field: "serial", headerName: "Serial", flex: 2 },
            { field: "section", headerName: "Section", flex: 2 },
            { field: "id", headerName: "ID", flex: 2 },
            { field: "note", headerName: "Note", flex: 4 },
            { field: "auditing", headerName: "Auditing", flex: 2 },
        ],
        []
    );

    const docCols = useMemo(
        () => [
            { field: "file", headerName: "File" },
            { field: "date", headerName: "Date", width: 180, type: "date" },
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
            {
                field: "priority",
                headerName: "Priority",
                width: 70,
                disableColumnMenu: true,
            },
            { field: "name", headerName: "Name", flex: 2 },
            { field: "id", headerName: "ID", width: 160, disableColumnMenu: true },
            { field: "description", headerName: "Description", flex: 2 },
            { field: "document", headerName: "Document", flex: 2 },
            {
                field: "hours",
                headerName: " Hours",
                width: 70,
                disableColumnMenu: true,
            },
            {
                field: "buildToStock",
                headerName: "Build To Stock",
                type: "boolean",
                width: 100,
                disableColumnMenu: true,
            },
            {
                field: "engAP",
                headerName: "Eng AP.",
                type: "boolean",
                width: 70,
                disableColumnMenu: true,
            },
            { field: "desc", headerName: "Note", width: 100 },
        ],
        []
    );

    const evalCols = useMemo<GridColDef[]>(
        () => [
            {
                field: "priority",
                headerName: "Priority",
                width: 70,
                disableColumnMenu: true,
            },
            { field: "name", headerName: "Name", flex: 2 },
            { field: "id", headerName: "ID", width: 150, disableColumnMenu: true },
            { field: "description", headerName: "Description", flex: 2 },
            { field: "document", headerName: "Document", flex: 2 },
            {
                field: "hours",
                headerName: " Hours",
                width: 70,
                disableColumnMenu: true,
            },
            {
                field: "engAP",
                headerName: "Eng AP.",
                type: "boolean",
                width: 70,
                disableColumnMenu: true,
            },
            { field: "desc", headerName: "Note", width: 100 },
        ],
        []
    );

    const unitHistoryCols = useMemo<GridColDef[]>(
        () => [
            {
                field: "estimatedShipDate",
                headerName: "Estimated Ship Date",
                flex: 1,
                disableColumnMenu: true,
            },
            { field: "actualShipDate", headerName: "Actual Ship Date", flex: 1 },
            { field: "serialNumber", headerName: "Device Serial NO.", flex: 1 },
            { field: "status", headerName: "Status", flex: 1 },
            {
                field: "warrantyStatus",
                headerName: "Warranty Status",
                type: "boolean",
                flex: 1,
            },
            { field: "warrantyEndDate", headerName: "Warranty End Date", flex: 1 },
            { field: "SOId", headerName: "SO ID", flex: 1 },
            {
                field: "SODate",
                headerName: "SO Date",
                valueFormatter: (r) => formatTimestampToDate(r.row.so.date),
                flex: 1,
            },
        ],
        []
    );

    const handleSubmit = async (data: any, { setSubmitting }: any) => {
        try {
            if (selectedRow) {
                const resp = await updateAnItem(selectedRow.id, getModifiedValues(data, selectedRow));
                if (resp) {
                    setSubmitting(false);
                    Toast("Record updated successfully", "success");

                    onDone && onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const phone = useMediaQuery("(max-width:900px)");

    if (!selectedRow) {
        return <LinearProgress />;
    }

    return (
        <Box>
            {selectedStep && selectedRow && selectedRow.id && (
                <EditTaskModal
                    device={selectedRow}
                    tab={selectedStep.tab}
                    task={selectedStep}
                    itemId={selectedRow.id as any}
                    open={stepModal}
                    onClose={() => setStepModal(false)}
                />
            )}
            {bom && <Parts open={bomPartsModal} onClose={() => setBomPartsModal(false)} bom={bom} />}
            <AddServiceModal
                device={selectedRow.id}
                open={AddService}
                onClose={() => setAddService(false)}
                onDone={() => {
                    mutateServices();
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
                        <Box display="flex" flexDirection={phone ? "column" : "row"} gridGap={10}>
                            <Box flex={5}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    style={phone ? { gap: 10 } : { gap: 10, height: "77.3vh" }}
                                >
                                    <BasePaper>
                                        <General
                                            sales={sales}
                                            values={values}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                        />
                                        {!sales && (
                                            <Box
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Button
                                                    style={{ margin: "0.5em auto", width: "200px" }}
                                                    kind="edit"
                                                    type="submit"
                                                >
                                                    Save
                                                </Button>
                                            </Box>
                                        )}
                                    </BasePaper>
                                    <BasePaper style={{ flex: 1, overflowY: "auto" }}>
                                        <Tabs
                                            value={moreInfoTab}
                                            variant="scrollable"
                                            scrollButtons={phone ? "on" : "auto"}
                                            style={
                                                phone
                                                    ? { maxWidth: "calc(100vw - 63px)", marginBottom: 16 }
                                                    : { marginBottom: 16 }
                                            }
                                            textColor="primary"
                                            onChange={(e, v) => setMoreInfoTab(v)}
                                        >
                                            <Tab label="Image" />
                                            <Tab label="QR Code" />
                                            {!sales && <Tab label="Clusters and Levels" />}
                                        </Tabs>
                                        {moreInfoTab === 0 && <Photo device={selectedRow} />}
                                        {moreInfoTab === 1 && (
                                            <Box
                                                display="flex"
                                                justifyContent="space-around"
                                                alignItems="center"
                                                maxWidth="83vw"
                                            >
                                                <div ref={(e) => (qrCode.current = e)}>
                                                    <DeviceQRCode
                                                        value={JSON.stringify({
                                                            type: "device",
                                                            no: selectedRow.no,
                                                        })}
                                                    />
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
                                        {moreInfoTab === 2 && !sales && (
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
                                </Box>
                            </Box>
                            <Box flex={7}>
                                <BasePaper>
                                    <Box display="flex" mb={1}>
                                        {!sales ? (
                                            <Tabs
                                                value={activeTab}
                                                onChange={(e, v) => setActiveTab(v)}
                                                textColor="primary"
                                                variant="scrollable"
                                                scrollButtons={phone ? "on" : "auto"}
                                                style={
                                                    phone ? { maxWidth: "calc(100vw - 63px)" } : { maxWidth: "50vw" }
                                                }
                                            >
                                                <Tab label="Design documents" /> 0
                                                <Tab label="BOM" /> 1
                                                <Tab label="Services" /> 2
                                                <Tab label="Manufacturing" /> 3
                                                <Tab label="Evaluation" /> 4
                                                <Tab label="Test" /> 5
                                                <Tab label="Field Start-up" /> 6
                                                <Tab label="Label" /> 7
                                                <Tab label="Unit History" /> 8
                                                <Tab label="Sales Report" /> 9
                                                <Tab label="Quality Control" /> 10
                                                <Tab label="Notes" /> 11
                                                <Tab label="Auditing" /> 12
                                            </Tabs>
                                        ) : (
                                            <Tabs
                                                value={activeTab}
                                                onChange={(e, v) => setActiveTab(v)}
                                                textColor="primary"
                                                variant="scrollable"
                                                scrollButtons={phone ? "on" : "auto"}
                                                style={
                                                    phone ? { maxWidth: "calc(100vw - 63px)" } : { maxWidth: "50vw" }
                                                }
                                            >
                                                <Tab label="Design documents" />
                                                <Tab label="Services" />
                                                <Tab label="Sales Report" />
                                                <Tab label="Notes" />
                                                <Tab label="Auditing" />
                                            </Tabs>
                                        )}
                                    </Box>
                                    {!sales ? (
                                        <Box>
                                            {activeTab === 0 && (
                                                <>
                                                    <Button
                                                        onClick={addDoc}
                                                        variant="outlined"
                                                        style={{ marginBottom: "10px" }}
                                                    >
                                                        Add Document
                                                    </Button>
                                                    <BaseDataGrid
                                                        height={"66.8vh"}
                                                        cols={docCols}
                                                        rows={docs || []}
                                                        onRowSelected={() => {}}
                                                    />
                                                </>
                                            )}
                                            {activeTab === 1 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
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
                                                    <Button
                                                        onClick={() => setAddService(true)}
                                                        variant="outlined"
                                                        style={{ marginBottom: "10px" }}
                                                    >
                                                        Add Service
                                                    </Button>
                                                    <BaseDataGrid
                                                        height={"62.7vh"}
                                                        cols={serviceCols}
                                                        rows={services || []}
                                                        onRowSelected={(d) => {}}
                                                    />
                                                </Box>
                                            )}
                                            {activeTab === 3 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={manCols}
                                                    rows={manSteps || []}
                                                    onRowSelected={(d) => {
                                                        onStepSelected({ ...d, tab: 0 });
                                                    }}
                                                />
                                            )}
                                            {activeTab === 4 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={evalCols}
                                                    rows={evalSteps || []}
                                                    onRowSelected={(d) => {
                                                        onStepSelected({ ...d, tab: 1 });
                                                    }}
                                                />
                                            )}
                                            {activeTab === 5 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={evalCols}
                                                    rows={testSteps || []}
                                                    onRowSelected={(d) => {
                                                        onStepSelected({ ...d, tab: 2 });
                                                    }}
                                                />
                                            )}
                                            {activeTab === 6 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={evalCols}
                                                    rows={fieldSteps || []}
                                                    onRowSelected={(d) => {
                                                        onStepSelected({ ...d, tab: 3 });
                                                    }}
                                                />
                                            )}
                                            {activeTab === 8 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={unitHistoryCols}
                                                    rows={
                                                        uniteHistory
                                                            ? uniteHistory.map((item: any, i: any) => ({
                                                                  id: i,
                                                                  ...item,
                                                              }))
                                                            : []
                                                    }
                                                    onRowSelected={(d) => {
                                                        setSelectedUnit(d);
                                                        setUnitHistoryModal(true);
                                                    }}
                                                />
                                            )}
                                            {activeTab === 9 && <SalesReport />}
                                            {activeTab === 10 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={flagCols}
                                                    rows={flags || []}
                                                    onRowSelected={onFlagSelected}
                                                />
                                            )}
                                            {activeTab === 11 && (
                                                <>
                                                    <Button
                                                        onClick={addNote}
                                                        variant="outlined"
                                                        style={{ marginBottom: "10px" }}
                                                    >
                                                        Add Note
                                                    </Button>
                                                    <BaseDataGrid
                                                        height={"66.8vh"}
                                                        cols={noteCols}
                                                        rows={notes || []}
                                                        onRowSelected={onNoteSelected}
                                                    />
                                                </>
                                            )}
                                        </Box>
                                    ) : (
                                        <Box>
                                            {activeTab === 0 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={docCols}
                                                    rows={docs || []}
                                                    onRowSelected={() => {}}
                                                />
                                            )}

                                            {activeTab === 1 && (
                                                <>
                                                    <BaseDataGrid
                                                        height={"62.7vh"}
                                                        cols={serviceCols}
                                                        rows={services || []}
                                                        onRowSelected={(d) => {}}
                                                    />
                                                </>
                                            )}

                                            {activeTab === 2 && <SalesReport />}

                                            {activeTab === 3 && (
                                                <BaseDataGrid
                                                    height={"66.8vh"}
                                                    cols={noteCols}
                                                    rows={notes || []}
                                                    onRowSelected={onNoteSelected}
                                                />
                                            )}
                                        </Box>
                                    )}
                                </BasePaper>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
export default ItemsDetails;
