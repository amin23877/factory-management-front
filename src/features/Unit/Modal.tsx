import React, { useMemo, useState } from "react";
import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import useSWR from "swr";

import TextField from "../../app/TextField";
import Dialog from "../../app/Dialog";

import { Expense, Status, Shipping } from "./HistoryForms";
import { DynamicFilterAndFields } from "../Items/Forms";

import { IUnitHistory } from "../../api/units";
import { IItem } from "../../api/items";
import BaseDataGrid from "../../app/BaseDataGrid";

function Modal({ open, onClose, unit }: { open: boolean; onClose: () => void; unit: IUnitHistory }) {
    const [activeTab, setActiveTab] = useState(0);
    const [footerActiveTab, setFooterActiveTab] = useState(0);

    const { data: item } = useSWR<IItem>(`/item/${unit.unit.ItemId}`);
    const { data: warranties } = useSWR(
        footerActiveTab === 1 ? `/service?ItemId=${unit.item.id}&ServiceFamilyId=60efd0bcca0feadc84be6618` : null
    );
    const { data: soLineItems } = useSWR(footerActiveTab === 5 ? `/lineitem?SOId=${unit.SOId}` : null);

    const warCols = useMemo(
        () => [
            { field: "name", headerName: "Name" },
            { field: "price", headerName: "Price" },
            { field: "period", headerName: "length" },
            { field: "description", headerName: "Description" },
        ],
        []
    );

    const LICols = useMemo(
        () => [
            { field: "index" },
            { field: "ItemId", valueFormatter: (r: any) => r.row.ItemId.name },
            { field: "description", width: 200 },
            { field: "quantity" },
            { field: "price" },
            { field: "tax" },
        ],
        []
    );

    const bomRecordCols = useMemo(
        () => [
            { field: "no", headerName: "No.", valueFormatter: (params: any) => params.row?.ItemId?.no },
            { field: "name", headerName: "Name", valueFormatter: (params: any) => params.row?.ItemId?.name },
            { field: "revision", headerName: "Revision" },
            { field: "usage", headerName: "Usage" },
            { field: "fixedQty", headerName: "fixed Qty", type: "boolean" },
        ],
        []
    );

    const docCols = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    const noteCols = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    return (
        <Dialog open={open} onClose={onClose} title="Unit history" fullWidth maxWidth="md">
            <Box m={2} height={500}>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} mb={2}>
                    <Paper>
                        <Typography style={{ margin: 8 }} variant="h6">
                            General
                        </Typography>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} m={1}>
                            <TextField label="Name" value={item?.name} disabled style={{ gridColumnEnd: "span 2" }} />
                            <TextField
                                label="Description"
                                value={item?.description}
                                disabled
                                multiline
                                rows={2}
                                style={{ gridColumnEnd: "span 2" }}
                            />
                            <TextField label="Serial number" value={unit.serialNumber} disabled />
                            <TextField label="Status" value={unit.status} disabled />
                            <TextField label="ID" value={unit.id} disabled />
                            <TextField label="SO" value={unit.SOId} disabled />
                        </Box>
                    </Paper>
                    <Paper>
                        <Box m={1} height={200}>
                            <Tabs
                                variant="scrollable"
                                value={activeTab}
                                onChange={(e, nv) => setActiveTab(nv)}
                                style={{ marginBottom: 8 }}
                            >
                                <Tab label="Image" />
                                <Tab label="Status" />
                                <Tab label="Expense" />
                                <Tab label="Shipping" />
                                <Tab label="Cluster & level" />
                            </Tabs>
                            {activeTab === 0 && <h3>Image</h3>}
                            {activeTab === 1 && <Status unit={unit} />}
                            {activeTab === 2 && <Expense unit={unit} />}
                            {activeTab === 3 && <Shipping />}
                            {activeTab === 4 && <DynamicFilterAndFields />}
                        </Box>
                    </Paper>
                </Box>
                <Box>
                    <Paper>
                        <Box m={1} height={550}>
                            <Tabs
                                variant="scrollable"
                                value={footerActiveTab}
                                onChange={(e, nv) => setFooterActiveTab(nv)}
                                style={{ marginBottom: 8 }}
                            >
                                <Tab label="Phocus monitor" />
                                <Tab label="Warranties" />
                                <Tab label="Job" />
                                <Tab label="Documents" />
                                <Tab label="Quality control" />
                                <Tab label="Sales order items" />
                                <Tab label="Field service history" />
                                <Tab label="Note" />
                                <Tab label="Auditing" />
                            </Tabs>
                            {footerActiveTab === 1 && (
                                <BaseDataGrid cols={warCols} rows={warranties || []} onRowSelected={() => {}} />
                            )}
                            {footerActiveTab === 2 && (
                                <BaseDataGrid cols={bomRecordCols} rows={[]} onRowSelected={() => {}} />
                            )}
                            {footerActiveTab === 3 && (
                                <BaseDataGrid cols={docCols} rows={[]} onRowSelected={() => {}} />
                            )}
                            {footerActiveTab === 4 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />}
                            {footerActiveTab === 5 && (
                                <BaseDataGrid cols={LICols} rows={soLineItems || []} onRowSelected={() => {}} />
                            )}
                            {footerActiveTab === 6 && <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />}
                            {footerActiveTab === 7 && (
                                <BaseDataGrid cols={noteCols} rows={[]} onRowSelected={() => {}} />
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Dialog>
    );
}

export default Modal;
