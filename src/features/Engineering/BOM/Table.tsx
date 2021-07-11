import React, { useState, useEffect } from "react";
import { LinearProgress, Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import useSWR from "swr";

import AddPartModal from "./AddPartModal";
import ChangePartModal from "./ChangePartModal";
import RenamePart from "./RenamePart";

import Button from "../../../app/Button";
import { Toast } from "../../../app/Toast";

import { IMatrice, postMatriceData } from "../../../api/bomMatrice";

export default function NewBomTable({ productFamily }: { productFamily: string }) {
    const { data: tableData, mutate: mutateTableData } = useSWR<IMatrice>(`/matrice?productfamily=${productFamily}`);

    const [addPart, setAddPart] = useState(false);
    const [changePart, setChangePart] = useState(false);
    const [renamePart, setRenamePart] = useState(false);

    const [selectedRow, setSelectedRow] = useState<any>();
    const [selectedPart, setSelectedPart] = useState<{ formerName: string; newName: string }>();
    const [selectedRowName, setSelectedRowName] = useState<string>();

    const [levels, setLevels] = useState<string[]>();

    const [table, setTable] = useState<{ columns: any; rows: any[] }>({ columns: [], rows: [] });

    // Generate Levels
    useEffect(() => {
        if (tableData) {
            const levels = new Set<string>();

            const rows = tableData.map((item) => ({ ...item.row }));

            rows.map((r) => Object.keys(r).map((k) => levels.add(k)));
            setLevels(Array.from(levels));
        }
    }, [tableData]);

    // Generate table COLUMNS and ROWS
    useEffect(() => {
        if (tableData) {
            const cols = new Set();

            const rows = tableData.map((item, i) => {
                const levels = item.row;

                const parts = item.data.reduce((obj, part) => {
                    return { ...obj, [part.name || ""]: part.partNumber } as any;
                }, {});

                return { id: i, ...levels, ...parts, "Product family": productFamily };
            });

            rows.map((r) => Object.keys(r).map((k) => cols.add(k)));

            const dtCols: any[] = [];
            cols.forEach((c: any) => c !== "Product family" && dtCols.push({ field: c, flex: 1, sortable: false }));
            dtCols[0].hide = true;
            dtCols.unshift({ field: "Product family", flex: 1, sortable: false });

            setTable({ columns: dtCols, rows });
        }
    }, [tableData]);

    const handleAddPart = (name: string) => {
        setTable((prev) => ({ ...prev, columns: [...prev.columns, { field: name, flex: 1, sortable: false }] }));
        setAddPart(false);
    };

    const handleChangePart = async (d: any) => {
        try {
            Object.keys(d.row).map((r) => {
                if (!levels?.includes(r)) {
                    delete d.row[r];
                }
            });
            // console.log(d);

            await postMatriceData(productFamily, { lines: [d] });
            mutateTableData();

            Toast.fire({ icon: "success", title: "Record changed." });
            setChangePart(false);
        } catch (error) {
            Toast.fire({ icon: "error", title: JSON.stringify(error) });
        }
    };

    if (!tableData) {
        return <LinearProgress />;
    }

    return (
        <>
            {selectedPart && (
                <RenamePart
                    open={renamePart}
                    onClose={() => setRenamePart(false)}
                    initialValue={selectedPart}
                    onDone={() => {}}
                />
            )}
            <AddPartModal open={addPart} onClose={() => setAddPart(false)} onDone={handleAddPart} />
            {selectedRowName !== undefined && (
                <ChangePartModal
                    open={changePart}
                    onClose={() => setChangePart(false)}
                    partName={selectedRowName}
                    row={selectedRow}
                    onDone={handleChangePart}
                />
            )}

            <Box height={500} width="100%">
                <Button variant="outlined" style={{ margin: "0.5em 0" }} onClick={() => setAddPart(true)}>
                    Add part
                </Button>
                <DataGrid
                    columns={table.columns}
                    rows={table.rows}
                    onColumnHeaderClick={(params) => {
                        setSelectedPart({ formerName: params.field, newName: "" });
                        setRenamePart(true);
                    }}
                    onCellClick={(params) => {
                        setSelectedRow(params.row);
                        setSelectedRowName(params.field);
                        setChangePart(true);
                    }}
                />
            </Box>
        </>
    );
}
