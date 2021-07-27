import React, { useMemo, useState } from "react";
import {
    Box,
    Grid,
    Tabs,
    Tab,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    useTheme,
} from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import { General } from "./Forms";
import { IMonitorRule } from "../../../api/monitor";
import { useEffect } from "react";
import HistoryInfo from "./HistoryInfo";

function ItemsDetails({ selectedRow }: { selectedRow: IMonitorRule }) {
    const { data: historyItems } = useSWR(`/monitor/${selectedRow.id}/history`);

    const [activeTab, setActiveTab] = useState(0);
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [assertions, setAssertions] = useState<string[][]>();
    const [table, setTable] = useState<{ columns: number }>({ columns: 0 });
    const [historyInfo, setHistoryInfo] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState<any>();

    const theme = useTheme();

    useEffect(() => {
        setAssertions((prev) => {
            let res: any = selectedRow.assertion;
            res = res
                .replaceAll("||", " OR ")
                .replaceAll("&&", " AND ")
                .replaceAll("(", "")
                .replaceAll(")", "")
                .replaceAll("'", "")
                .replaceAll("==", "=");

            selectedRow.vars.forEach((v) => {
                res = res?.replaceAll(v.name + "=", `${v.target}'s ${v.lname} = `);
            });

            res = res.split(" OR ");
            res = res.map((r: any) => r.split(" AND "));

            const lengths = res.map((r: any) => r.length);
            setTable({ columns: Math.max(...lengths) });

            return res;
        });
    }, [selectedRow]);

    const gridColumns = useMemo<GridColDef[]>(() => {
        const res: GridColDef[] = [
            { field: "date", headerName: "Date", width: 130 },
            { field: "itemName", headerName: "Unit Name", flex: 3 },
            { field: "itemNumber", headerName: "Unit Number", flex: 2 },
            { field: "number", headerName: "Unit Serial NO.", flex: 2 },
            { field: "so", headerName: "SO", width: 100, valueFormatter: (params) => params.row.so?.number },
            { field: "po", headerName: "PO", width: 100, valueFormatter: (params) => params.row.po?.number },
            // { field: "enable", headerName: "Pass/Fail", type: "boolean", width: 100 },
        ];
        return res;
    }, []);

    return (
        <Box>
            {selectedHistory && (
                <HistoryInfo open={historyInfo} onClose={() => setHistoryInfo(false)} data={selectedHistory} />
            )}

            <Grid container spacing={2}>
                <Grid item md={5} xs={12}>
                    <BasePaper>
                        <General rule={selectedRow} />
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
                            <Tab label="Equation factors modifications" />
                        </Tabs>
                        {moreInfoTab === 0 && (
                            <TableContainer style={{ maxHeight: 250 }}>
                                <Table>
                                    <TableHead style={{ backgroundColor: theme.palette.secondary.main }}>
                                        <TableRow>
                                            {Array.from({ length: table.columns }, (_, i) => i + 1).map((c: any) => (
                                                <TableCell key={c}></TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assertions?.map((row, i) => (
                                            <TableRow key={i}>
                                                {row.map((cell, i) => (
                                                    <TableCell key={i}>{cell}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </BasePaper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BasePaper>
                        <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            textColor="primary"
                            variant="scrollable"
                        >
                            <Tab label="Rule History" />
                        </Tabs>
                        <Box p={3}>
                            {activeTab === 0 && (
                                <BaseDataGrid
                                    cols={gridColumns}
                                    rows={historyItems || []}
                                    onRowSelected={(d) => {
                                        setSelectedHistory(d);
                                        setHistoryInfo(true);
                                    }}
                                />
                            )}
                        </Box>
                    </BasePaper>
                </Grid>
            </Grid>
        </Box>
    );
}
export default ItemsDetails;
