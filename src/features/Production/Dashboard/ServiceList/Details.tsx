import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";
import useSWR from "swr";

import { General, UnitInfo, Warranty, BatteryInfo } from "./Forms";
import UnitWorkFlow, { ProductionWorkFlow } from "../UnitList/WorkFlows";

import Button from "../../../../app/Button";
import { BasePaper } from "../../../../app/Paper";
import BaseDataGrid from "../../../../app/BaseDataGrid";
import Toast from "../../../../app/Toast";

import Confirm from "../../../Modals/Confirm";
import DocumentModal from "../../../Modals/DocumentModals";

import { formatTimestampToDate } from "../../../../logic/date";
import { fileType } from "../../../../logic/fileType";
import { getModifiedValues } from "../../../../logic/utils";

// import { addOption, deleteOption, IOption } from "../../../../api/options";
// import { IUnit, updateUnit } from "../../../../api/units";
import { deleteOption, IOption } from "../../../../api/options";
import { IDocument } from "../../../../api/document";
import { ITicket, updateTicket } from "../../../../api/ticket";

const schema = Yup.object().shape({});

function ServiceDetails({ ticket }: { ticket: ITicket }) {
    const handleSubmit = async (data: any) => {
        try {
            if (ticket.id) {
                await updateTicket(ticket.id, getModifiedValues(data, ticket));

                await mutate("/ticket");
                Toast("Updated successfully.", "success");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const [infoActiveTab, setInfoActiveTab] = useState(0);
    const [gridActiveTab, setGridActiveTab] = useState(0);
    const [addDocModal, setAddDocModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IOption>();
    const [confirm, setConfirm] = useState(false);
    const [addOption, setAddOption] = useState(false);

    const handleDeleteOption = async () => {
        try {
            if (selectedOption) {
                const resp = await deleteOption(ticket.ItemId.id, selectedOption.ItemId.id);
                if (resp) {
                    Toast("Unit updated", "success");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const { data: documents } = useSWR<IDocument[]>(gridActiveTab === 1 ? `/document/unit/${ticket.ItemId.id}` : null);
    const { data: unitBoms } = useSWR(`/ubom?UnitId=${ticket.ItemId.id}`);

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
        <BasePaper>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDeleteOption} />
            <DocumentModal
                open={addDocModal}
                onClose={() => setAddDocModal(false)}
                itemId={ticket.ItemId.id}
                model="unit"
            />
            <Formik initialValues={ticket} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
                    <Form>
                        <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10}>
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
                            <BasePaper style={{ gridColumnEnd: "span 2" }}>
                                <Tabs
                                    value={infoActiveTab}
                                    onChange={(e, nv) => setInfoActiveTab(nv)}
                                    style={{ marginBottom: "0.5em" }}
                                >
                                    <Tab label="Unit Info" />
                                    <Tab label="Options" />
                                    <Tab label="Battery Info" />
                                    <Tab label="Warranty Info" />
                                </Tabs>
                                {infoActiveTab === 0 && (
                                    <UnitInfo
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                )}
                                {infoActiveTab === 1 && (
                                    <>
                                        <Button kind="add" onClick={() => setAddOption(true)}>
                                            add Option
                                        </Button>
                                        <Button
                                            kind="delete"
                                            onClick={() => setConfirm(true)}
                                            disabled={!selectedOption}
                                            style={{ margin: "0 0.5em" }}
                                        >
                                            Delete Option
                                        </Button>
                                        <Box mb={1}>
                                            <BaseDataGrid
                                                rows={[]}
                                                cols={optionCols}
                                                onRowSelected={() => {}}
                                                height={280}
                                            />
                                        </Box>
                                    </>
                                )}
                                {infoActiveTab === 2 && (
                                    <BatteryInfo
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                )}
                                {infoActiveTab === 3 && (
                                    <Warranty
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
            <ProductionWorkFlow unitId={ticket.ItemId.id} stepper={ticket.productionStatus} />
            <BasePaper>
                <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
                    <Tab label="Documents" />
                    <Tab label="JOB" />
                    <Tab label="Wire List" />
                    <Tab label="Forms" />
                    <Tab label="Time logs" />
                </Tabs>
                {gridActiveTab === 0 && (
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
                {gridActiveTab === 1 && (
                    <BaseDataGrid
                        cols={bomCols}
                        rows={unitBoms || []}
                        onRowSelected={(r) => {
                            setSelectedOption(r);
                        }}
                    />
                )}
            </BasePaper>
        </BasePaper>
    );
}

export default ServiceDetails;
