import React, { useMemo, useRef, useState } from "react";
import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

// import UnitInfo from "./UnitInfo";
// import { General as ItemGeneral } from "../../../Items/Forms";
// import { GeneralForm as SOGeneral } from "../../../Sales/SO/Forms";
import { General, UnitInfo } from "./Forms";

import Button from "../../../../app/Button";
import { BasePaper } from "../../../../app/Paper";
import BaseDataGrid from "../../../../app/BaseDataGrid";
import MyQRCode from "../../../../app/QRCode";

import { IUnit, updateUnit } from "../../../../api/units";

import { exportPdf } from "../../../../logic/pdf";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";
import Toast from "../../../../app/Toast";
import { IDocument } from "../../../../api/document";
import { formatTimestampToDate } from "../../../../logic/date";
import { fileType } from "../../../../logic/fileType";
import DocumentModal from "../../../Modals/DocumentModals";
import UnitWorkFlow, { ProductionWorkFlow } from "./WorkFlows";
import { getModifiedValues } from "../../../../logic/utils";

const schema = Yup.object().shape({
    // laborCost: Yup.number().required(),
    // status: Yup.string().required(),
    // dueDate: Yup.string().required(),
    // assignee: Yup.string().required(),
});

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

    const qrCode = useRef<HTMLElement | null>(null);
    const [infoActiveTab, setInfoActiveTab] = useState(0);
    const [gridActiveTab, setGridActiveTab] = useState(0);
    const [addDocModal, setAddDocModal] = useState(false);

    const { data: warranties } = useSWR(
        gridActiveTab === 0
            ? unit && unit.id
                ? `/service?ItemId=${unit.item.id}&ServiceFamilyId=60efd0bcca0feadc84be6618`
                : null
            : null
    );
    const { data: documents } = useSWR<IDocument[]>(gridActiveTab === 1 ? `/document/unit/${unit.id}` : null);
    const { data: unitBoms } = useSWR(`/ubom?UnitId=${unit.id}`);
    const bomCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "Serial No." },
            { field: "laborCost", headerName: "Labor Cost" },
            { field: "dueDate", headerName: "Due Date", flex: 1 },
            { field: "status", headerName: "Status" },
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
    const docCols = useMemo<GridColumns>(
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
    return (
        <BasePaper>
            <DocumentModal open={addDocModal} onClose={() => setAddDocModal(false)} itemId={unit?.id} model="unit" />
            <Formik initialValues={unit as IUnit} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
                    <Form>
                        <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
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
                                <Tabs value={infoActiveTab} onChange={(e, nv) => setInfoActiveTab(nv)}>
                                    <Tab label="Image" />
                                    <Tab label="QR Code" />
                                    <Tab label="Unit Info" />
                                    <Tab label="Options" />
                                    <Tab label="Battery Info" />
                                    {/* <Tab label="SO" /> */}
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
                                                src={`http://digitalphocus.ir${unit?.item?.photo}`}
                                            />
                                        )}
                                    </Box>
                                )}
                                {/* {infoActiveTab === 0 && (
                        <ItemGeneral
                            values={unit.item}
                            errors={{}}
                            touched={{}}
                            handleBlur={() => {}}
                            handleChange={() => {}}
                            setFieldValue={() => {}}
                        />
                    )} */}
                                {/* {infoActiveTab === 2 && (
                        <SOGeneral
                            values={unit.so}
                            onChangeInit={() => {}}
                            handleBlur={() => {}}
                            handleChange={() => {}}
                        />
                    )} */}
                                {infoActiveTab === 1 && (
                                    <Box mt={1} display="flex" justifyContent="space-around" alignItems="center">
                                        <div ref={(e) => (qrCode.current = e)} style={{ flex: 1 }}>
                                            <MyQRCode value={String(unit.number)} />
                                            <Typography variant="subtitle1">Unit Number: {unit.item.no}</Typography>
                                            <Typography variant="subtitle1">Unit Name: {unit.item.name}</Typography>
                                            <Typography variant="subtitle1">Sales Order NO.: {unit.number}</Typography>
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
                                    <UnitInfo
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
                    </Form>
                )}
            </Formik>
            <h1 style={{ marginLeft: "3em" }}>Unit Work Flow</h1>
            <UnitWorkFlow />
            <ProductionWorkFlow unitId={unit.id} />
            <BasePaper>
                <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
                    <Tab label="Warranties" />
                    <Tab label="Documents" />
                    <Tab label="BOM" />
                    <Tab label="Wire List" />
                    <Tab label="Forms" />
                    <Tab label="Time logs" />
                </Tabs>

                {gridActiveTab === 0 && (
                    <Box>
                        <BaseDataGrid cols={warCols} rows={warranties || []} onRowSelected={(d) => {}} />
                    </Box>
                )}
                {gridActiveTab === 1 && (
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
                {gridActiveTab === 2 && <BaseDataGrid cols={bomCols} rows={unitBoms || []} onRowSelected={() => {}} />}
            </BasePaper>
        </BasePaper>
    );
}

export default Details;
