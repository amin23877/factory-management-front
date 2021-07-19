import React, { useState } from "react";
import { Box, Paper } from "@material-ui/core";
import { DataGrid, GridColumns, GridRowsProp } from "@material-ui/data-grid";
import useSWR from "swr";

import ColumnModal from "./ColumnModal";
import RowModal from "./RowModal";

import Button from "../../../app/Button";
import { createAManStep } from "../../../api/steps";
import { Toast } from "../../../app/Toast";
import { useEffect } from "react";

function StepTable({ taskId }: { taskId: string }) {
    const { data: rows } = useSWR<GridRowsProp>(`/engineering/manufacturing/step?TaskId=${taskId}`);

    const [columnModal, setColumnModal] = useState(false);
    const [rowModal, setRowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>();

    const [table, setTable] = useState<{ columns: GridColumns; rows: GridRowsProp }>({
        columns: [],
        rows: [],
    });
    const [changedRows, setChangedRows] = useState<any[]>([]);

    useEffect(() => {
        if (rows) {
            const dtColumns = new Set<string>();
            dtColumns.add("number");
            rows.map((row) => Object.keys(row).map((k) => dtColumns.add(k)));

            const dtRows = rows.map((r, i) => ({ id: i, ...r }));

            setTable({ columns: Array.from(dtColumns).map((c) => ({ field: c, flex: 1 })), rows: dtRows });
        }
    }, [rows]);

    const handleAddColumn = (cn: string) => {
        const columnToAdd = { field: cn };

        setTable((prev) => ({ ...prev, columns: prev.columns.concat(columnToAdd) }));
        setColumnModal(false);
    };

    const handleAddRow = (row: any) => {
        let refactoredRows = rows ? rows.concat(row) : [row];
        refactoredRows = refactoredRows.map((r, i) => ({ ...r, id: i }));

        setTable((prev) => ({ ...prev, refactoredRows }));
        setChangedRows((prev) => [...prev, refactoredRows]);
        setRowModal(false);
    };

    const handleChangeRow = (row: any) => {
        let refactoredRows = table.rows.slice();
        const index = refactoredRows.findIndex((r) => r.id === row.id);
        refactoredRows[index] = row;

        setTable((prev) => ({ columns: prev.columns, rows: refactoredRows }));
        setChangedRows((prev) => prev.concat(refactoredRows[index]));
        setRowModal(false);
    };

    const handleSubmit = async () => {
        try {
            const requestRows = changedRows.slice();
            requestRows.map((r) => delete r.id);

            // console.log(requestRows);
            await createAManStep({ TaskId: taskId, steps: requestRows });
            setChangedRows([]);

            Toast.fire({ icon: "success", title: "Changes submited" });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ColumnModal open={columnModal} onClose={() => setColumnModal(false)} onDone={handleAddColumn} />
            <RowModal
                taskId={taskId}
                initialValues={selectedRow}
                open={rowModal}
                onClose={() => setRowModal(false)}
                columns={table.columns}
                handleAddRow={handleAddRow}
                handleChangeRow={handleChangeRow}
            />

            <Paper style={{ padding: "1em" }}>
                <Button onClick={() => setColumnModal(true)}>Add Column</Button>
                <Button
                    onClick={() => {
                        setRowModal(true);
                        setSelectedRow(undefined);
                    }}
                >
                    Add Row
                </Button>
                <Button kind="add" disabled={changedRows.length == 0} onClick={handleSubmit}>
                    Submit
                </Button>

                <Box height={500}>
                    <DataGrid
                        columns={table.columns}
                        rows={table.rows || []}
                        onRowSelected={(d) => {
                            setSelectedRow(d.data);
                            setRowModal(true);
                        }}
                    />
                </Box>
            </Paper>
        </>
    );
}

export default StepTable;
