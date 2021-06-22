import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import Dialog from "../../app/Dialog";

import { getBom, getBomRecord } from "../../api/bom";
import BaseDataGrid from "../../app/BaseDataGrid";

import BomTab from "./BomTab";
import BomRecordTab from "./BomRecordTab";

export default function BOMModal({ open, onClose, itemId }: { itemId: string; open: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(0);
    const [rows, setRows] = useState<any[]>([]);
    const [bomRecords, setBomRecords] = useState([]);

    const [selectedBom, setSelectedBom] = useState<any>();
    const [selectedBomRecord, setSelectedBomRecord] = useState<any>();

    const cols = [
        { field: "name", headerName: "name" },
        { field: "no", headerName: "no" },
        { field: "note", headerName: "note" },
        { field: "current", headerName: "current" },
    ];

    const recordCols = [
        { field: "index", headerName: "index" },
        { field: "ItemId", headerName: "ItemId" },
        { field: "revision", headerName: "revision" },
        { field: "usage", headerName: "usage" },
        { field: "fixedQty", headerName: "fixedQty" },
    ];

    const refreshBoms = async () => {
        try {
            const resp = await getBom(itemId);
            setRows(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshRecords = async () => {
        try {
            if (selectedBom) {
                const resp = await getBomRecord(selectedBom.id);
                setBomRecords(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshBoms();
    }, [open]);

    useEffect(() => {
        refreshRecords();
    }, [selectedBom]);

    return (
        <Dialog open={open} onClose={onClose} title="BOM" maxWidth="lg" fullWidth>
            <Box m={1}>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="BOM" />
                    <Tab label="BOM Record" disabled={!selectedBom} />
                </Tabs>
                {activeTab === 0 && <BomTab refreshBoms={refreshBoms} selectedBom={selectedBom} itemId={itemId} />}
                {activeTab === 1 && (
                    <BomRecordTab
                        itemId={itemId}
                        refreshRecords={refreshRecords}
                        selectedRecord={selectedBomRecord}
                        bomId={selectedBom.id}
                    />
                )}
            </Box>
            <Box m={1}>
                {activeTab === 0 && (
                    <BaseDataGrid
                        height={250}
                        cols={cols}
                        rows={rows}
                        onRowSelected={(d) => {
                            // console.log(d);
                            setSelectedBom(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && (
                    <BaseDataGrid
                        height={250}
                        cols={recordCols}
                        rows={bomRecords}
                        onRowSelected={(d) => {
                            console.log(d);
                            setSelectedBomRecord(d);
                        }}
                    />
                )}
            </Box>
        </Dialog>
    );
}
