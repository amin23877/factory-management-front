import React, { useMemo, useRef, useState } from "react";
import { Box, Typography, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import UnitInfo from "./UnitInfo";
import { General as ItemGeneral } from "../Items/Forms";
import { GeneralForm as SOGeneral } from "../Sales/SO/Forms";

import Button from "../../app/Button";
import { BasePaper } from "../../app/Paper";
import BaseDataGrid from "../../app/BaseDataGrid";
import MyQRCode from "../../app/QRCode";

import { IUnit } from "../../api/units";

import { exportPdf } from "../../logic/pdf";

function Details({ unit }: { unit: IUnit }) {
    const qrCode = useRef<HTMLElement | null>(null);
    const { data: unitBoms } = useSWR(`/ubom?UnitId=${unit.id}`);

    const [infoActiveTab, setInfoActiveTab] = useState(0);
    const [gridActiveTab, setGridActiveTab] = useState(0);

    const bomCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "Serial No." },
            { field: "laborCost", headerName: "Labor Cost" },
            { field: "dueDate", headerName: "Due Date", flex: 1 },
            { field: "status", headerName: "Status" },
        ],
        []
    );

    return (
        <Box>
            <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                <BasePaper>
                    <Typography variant="h5">Unit Info</Typography>
                    <UnitInfo unit={unit} />
                </BasePaper>
                <BasePaper>
                    <Tabs value={infoActiveTab} onChange={(e, nv) => setInfoActiveTab(nv)}>
                        <Tab label="Item" />
                        <Tab label="SO" />
                        <Tab label="QR Code" />
                    </Tabs>
                    {infoActiveTab === 0 && (
                        <ItemGeneral
                            values={unit.item}
                            errors={{}}
                            touched={{}}
                            handleBlur={() => {}}
                            handleChange={() => {}}
                            setFieldValue={() => {}}
                        />
                    )}
                    {infoActiveTab === 1 && (
                        <SOGeneral
                            values={unit.so}
                            onChangeInit={() => {}}
                            handleBlur={() => {}}
                            handleChange={() => {}}
                        />
                    )}
                    {infoActiveTab === 2 && (
                        <Box mt={1} display="flex" justifyContent="space-around" alignItems="center">
                            <div ref={(e) => (qrCode.current = e)} style={{ flex: 1 }}>
                                <MyQRCode value={unit.item.no} />
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
                </BasePaper>
            </Box>
            <BasePaper>
                <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
                    <Tab label="Warranties" />
                    <Tab label="Documents" />
                    <Tab label="Notes" />
                    <Tab label="BOM" />
                    <Tab label="QC Items" />
                    <Tab label="Field service" />
                    <Tab label="Time logs" />
                    <Tab label="Auditing" />
                </Tabs>
                {gridActiveTab === 3 && <BaseDataGrid cols={bomCols} rows={unitBoms || []} onRowSelected={() => {}} />}
            </BasePaper>
        </Box>
    );
}

export default Details;
