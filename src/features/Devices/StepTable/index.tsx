import React, { useState, useEffect } from "react";
import { Box, Paper } from "@material-ui/core";
import { DataGrid, GridColumns, GridRowsProp } from "@material-ui/data-grid";
import { AddCircleOutline } from "@material-ui/icons";
import useSWR from "swr";

import ColumnModal from "./ColumnModal";
import RowModal from "./RowModal";

import Button from "../../../app/Button";
import { Toast } from "../../../app/Toast";

import { createStep, deleteStep, addFileToStep, deleteFileFromStep, stepType } from "../../../api/steps";

function StepTable({ taskId, type }: { taskId: string; type: stepType }) {
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
        let refactoredRows = table.rows ? table.rows.slice() : [];
        refactoredRows.push(row);
        refactoredRows = refactoredRows.map((r, i) => ({ ...r, id: i }));

        setTable((prev) => ({ ...prev, rows: refactoredRows }));
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

            await createStep(type, { TaskId: taskId, steps: requestRows });
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
                type={type}
                taskId={taskId}
                initialValues={selectedRow}
                open={rowModal}
                onClose={() => setRowModal(false)}
                columns={table.columns}
                handleAddRow={handleAddRow}
                handleChangeRow={handleChangeRow}
            />

            <Paper style={{ padding: "1em" }}>
                <Box my={1}>
                    <Button onClick={() => setColumnModal(true)} variant="outlined" startIcon={<AddCircleOutline />}>
                        Add Column
                    </Button>
                    <Button
                        onClick={() => {
                            setRowModal(true);
                            setSelectedRow(undefined);
                        }}
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        style={{ margin: "0 0.5em" }}
                    >
                        Add Row
                    </Button>
                    <Button kind="add" disabled={changedRows.length == 0} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>

                <Box height={470}>
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
