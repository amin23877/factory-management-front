import React, { useMemo, useState, Fragment } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import { General, Status, Expense, Shipping } from "./Forms";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

import { IUnit, updateUnit } from "../../../api/units";

import { Formik, Form } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";
import Toast from "../../../app/Toast";
import { IDocument } from "../../../api/document";
import { formatTimestampToDate } from "../../../logic/date";
import { fileType } from "../../../logic/fileType";
import DocumentModal from "../../Modals/DocumentModals";
import { getModifiedValues } from "../../../logic/utils";
import { DynamicFilterAndFields } from "../../Items/Forms";

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

    const { data: warranties } = useSWR(
        gridActiveTab === 0
            ? unit && unit.ItemId.id
                ? `/service?ItemId=${unit.ItemId.id}&ServiceFamilyId=60efd0bcca0feadc84be6618`
                : null
            : null
    );
    const { data: documents } = useSWR<IDocument[]>(gridActiveTab === 1 ? `/document/unit/${unit.id}` : null);
    const { data: unitBoms } = useSWR(`/ubom?UnitId=${unit.id}`);

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

    const optionCols = useMemo<GridColumns>(
        () => [
            { field: "Option Number", valueFormatter: (params) => params.row?.ItemId?.no, flex: 1 },
            { field: "Option Name", valueFormatter: (params) => params.row?.ItemId?.name, flex: 1 },
            { field: "Option Description", valueFormatter: (params) => params.row?.ItemId?.description, flex: 1 },
            { field: "quantity", headerName: "Quantity", width: 100 },
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
        <>
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
                                                src={`http://digitalphocus.ir${unit?.item?.photo}`}
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
                    <Tab label="Quality Control" />
                    <Tab label="Sales Order Items" />
                    <Tab label="Field Service History" />
                    <Tab label="Note" />
                    <Tab label="Auditing" />
                </Tabs>
                {gridActiveTab === 1 && (
                    <Box>
                        <BaseDataGrid cols={warCols} rows={warranties || []} onRowSelected={(d) => {}} />
                    </Box>
                )}
                {gridActiveTab === 2 && <BaseDataGrid cols={bomCols} rows={unitBoms || []} onRowSelected={(r) => {}} />}
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
            </BasePaper>
        </>
    );
}

export default Details;
