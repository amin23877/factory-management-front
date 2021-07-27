import React, { useState, useEffect } from "react";
import { Box, Paper } from "@material-ui/core";
import { DataGrid, GridColumns, GridRowsProp, GridToolbar } from "@material-ui/data-grid";
import { AddCircleOutline } from "@material-ui/icons";
import { toast } from "react-toastify";
import useSWR from "swr";

import ColumnModal from "./ColumnModal";
import RowModal from "./RowModal";

import Button from "../../../../app/Button";

import { createStep, deleteStep, stepType } from "../../../../api/steps";
import { CustomFooterStatusComponent } from "../../../../components/Datagrid/FooterStatus";

function StepTable({ taskId, type }: { taskId: string; type: stepType }) {
    const { data: rows, mutate: mutateRows } = useSWR<GridRowsProp>(`/engineering/manufacturing/step?TaskId=${taskId}`);

    const [columnModal, setColumnModal] = useState(false);
    const [rowModal, setRowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>();
    const [selectedColumn, setSelectedColumn] = useState<string>();

    const [table, setTable] = useState<{ columns: GridColumns; rows: GridRowsProp }>({
        columns: [],
        rows: [],
    });
    const [changedRows, setChangedRows] = useState<any[]>([]);
    const [renamedColumns, setRenamedColumns] = useState<{ [key: string]: string }>();
    const [unsetColumns, setUnsetColumns] = useState<{ [key: string]: string }>();

    useEffect(() => {
        if (rows) {
            const dtColumns = new Set<string>();
            dtColumns.add("number");
            rows.map((row) => Object.keys(row).map((k) => dtColumns.add(k)));

            const dtRows = rows.map((r, i) => ({ id: i, ...r }));

            setTable({ columns: Array.from(dtColumns).map((c) => ({ field: c, flex: 1 })), rows: dtRows });
        }
    }, [rows]);

    const handleAddColumn = ({ name, formerName }: { name: string; formerName?: string }) => {
        if (selectedColumn && formerName) {
            setRenamedColumns((prev) => {
                const temp = { ...prev };
                temp[formerName] = name;

                return temp;
            });

            setTable((prev) => {
                const refactoredColumns = prev.columns.slice();
                const index = refactoredColumns.findIndex((c) => c.field === formerName);
                refactoredColumns[index] = { field: name, flex: 1 };

                let refactoredRows = prev.rows.slice();
                refactoredRows = refactoredRows.map((row) => {
                    const prev = row[formerName];
                    delete row[formerName];

                    return { ...row, [name]: prev };
                });

                return { columns: refactoredColumns, rows: refactoredRows };
            });

            setColumnModal(false);
        } else {
            const columnToAdd = { field: name };

            setTable((prev) => ({ ...prev, columns: prev.columns.concat(columnToAdd) }));
            setColumnModal(false);
        }
    };

    const handleAddRow = (row: any) => {
        const numbers: any = table.rows.length > 0 ? table.rows.map((row) => row.number) : [-1, 0];
        const number = Math.max(...numbers) + 1;
        console.log(numbers, number);

        let refactoredRows = table.rows ? table.rows.slice() : [];
        refactoredRows.push({ ...row, number });
        refactoredRows = refactoredRows.map((r, i) => ({ ...r, id: i }));

        setTable((prev) => ({ ...prev, rows: refactoredRows }));
        setChangedRows(refactoredRows);
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
            requestRows.forEach((r) => delete r.id);

            // console.log(type, { TaskId: taskId, steps: requestRows, rename: renamedColumns, unset: unsetColumns });
            await createStep(type, { TaskId: taskId, steps: requestRows, rename: renamedColumns, unset: unsetColumns });
            setChangedRows([]);
            setRenamedColumns(undefined);
            setUnsetColumns(undefined);

            await mutateRows();

            toast.success("Changes submitted");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteRow = async (row: any) => {
        try {
            const refactoredRows = table.rows.slice();
            const index = refactoredRows.findIndex((r) => r.id === row.id);
            if (index > -1) {
                refactoredRows.splice(index, 1);
            }

            setTable((prev) => ({ ...prev, rows: refactoredRows }));
            await deleteStep(type, taskId, row.number);
            mutateRows();

            setRowModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteColumn = (columnName: string) => {
        setUnsetColumns((prev) => ({ ...prev, [columnName]: columnName }));
        setTable((prev) => ({ ...prev, columns: prev.columns.filter((c) => c.field !== columnName) }));

        setSelectedColumn(undefined);
        setColumnModal(false);
    };

    return (
        <>
            <ColumnModal
                open={columnModal}
                columnName={selectedColumn}
                onClose={() => setColumnModal(false)}
                onDone={handleAddColumn}
                onDelete={handleDeleteColumn}
            />
            <RowModal
                type={type}
                taskId={taskId}
                initialValues={selectedRow}
                open={rowModal}
                onClose={() => setRowModal(false)}
                columns={table.columns}
                handleAddRow={handleAddRow}
                handleChangeRow={handleChangeRow}
                handleDelete={handleDeleteRow}
                mutateRows={mutateRows}
            />

            <Paper style={{ padding: "1em" }}>
                <Box my={1}>
                    <Button
                        onClick={() => {
                            setSelectedColumn(undefined);
                            setColumnModal(true);
                        }}
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                    >
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
                    <Button
                        kind="add"
                        disabled={!(changedRows.length > 0) && !renamedColumns && !unsetColumns}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>

                <Box height={470}>
                    <DataGrid
                        components={{ Toolbar: GridToolbar, Footer: CustomFooterStatusComponent }}
                        componentsProps={{
                            footer: { submited: Boolean(changedRows.length > 0 || renamedColumns || unsetColumns) },
                        }}
                        onColumnHeaderClick={(th) => {
                            setSelectedColumn(th.field);
                            setColumnModal(true);
                        }}
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
