import React, { useState, useEffect } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    LinearProgress,
    Box,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import useSWR from "swr";

import { IMatrice, postMatriceData } from "../../../api/BomMatrice";
import AddPartModal from "./AddPartModal";
import ChangePartModal from "./ChangePartModal";
import { Toast } from "../../../app/Toast";

export default function NewBomTable({ productFamily }: { productFamily: string }) {
    const { data: tableData, mutate: mutateTableData } = useSWR<IMatrice>(`/matrice?productfamily=${productFamily}`);

    const [addPart, setAddPart] = useState(false);
    const [changePart, setChangePart] = useState(false);

    const [selectedRow, setSelectedRow] = useState<any>();
    const [selectedRowName, setSelectedRowName] = useState<string>();
    const [columns, setColumns] = useState(tableData ? Object.keys(tableData[0].row) : []);
    const [newColumns, setNewColumns] = useState<string[]>([]);

    const [table, setTable] = useState<{ columns: any; rows: any[] }>({ columns: [], rows: [] });

    useEffect(() => {
        if (tableData) {
            const cols = new Set();

            const rows = tableData.map((item, i) => {
                const levels = item.row;

                const parts = item.data.reduce((obj, part) => {
                    return { ...obj, [part.name || ""]: part.partNumber } as any;
                }, {});

                return { id: i, ...levels, ...parts };
            });

            rows.map((r) => Object.keys(r).map((k) => cols.add(k)));
            const dtCols: any[] = [];
            cols.forEach((c) => dtCols.push({ field: c, flex: 1 }));
            console.log(rows, cols);

            setTable({ columns: dtCols, rows });
            console.log(table);
        }
    }, [tableData]);

    const handleAddPart = (name: string) => {
        setColumns((prev) => [...prev, name]);
        setNewColumns((prev) => [...prev, name]);
        setAddPart(false);
    };

    const handleChangePart = async (d: any) => {
        try {
            // console.log({ lines: [d] });
            await postMatriceData(productFamily, { lines: [d] });
            mutateTableData();

            Toast.fire({ icon: "success", title: "Record changed." });
            setChangePart(false);
        } catch (error) {
            console.log(JSON.stringify(error.response));
            Toast.fire({ icon: "error", title: JSON.stringify(error) });
        }
    };

    if (!tableData) {
        return <LinearProgress />;
    }

    return (
        <>
            <AddPartModal open={addPart} onClose={() => setAddPart(false)} onDone={handleAddPart} />
            {selectedRowName && (
                <ChangePartModal
                    open={changePart}
                    onClose={() => setChangePart(false)}
                    partName={selectedRowName}
                    row={selectedRow}
                    onDone={handleChangePart}
                />
            )}

            <Box height={500} width="100%">
                <DataGrid columns={table.columns} rows={table.rows} />
            </Box>
            {/* <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Family</TableCell>
                            {table.columns.map((c: any) => (
                                <TableCell key={c}>{c}</TableCell>
                            ))}
                            <TableCell>
                                <IconButton onClick={() => setAddPart(true)}>
                                    <AddRounded />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{productFamily}</TableCell>
                                {Object.keys(row.row).map((r) => (
                                    <TableCell key={r}>{row.row[r]}</TableCell>
                                ))}
                                {row.data.map((data) => (
                                    <TableCell
                                        key={data.id}
                                        onClick={() => {
                                            setSelectedRow(row);
                                            setSelectedRowName(data.name);
                                            setChangePart(true);
                                        }}
                                    >
                                        {data.partNumber}
                                    </TableCell>
                                ))}
                                {newColumns.map((c, i) => (
                                    <TableCell
                                        key={i}
                                        onClick={() => {
                                            setSelectedRow(row);
                                            setSelectedRowName(c);
                                            setChangePart(true);
                                        }}
                                    ></TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </>
    );
}
