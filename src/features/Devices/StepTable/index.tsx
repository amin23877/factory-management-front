import React, { useState } from "react";
import { Box, Paper } from "@material-ui/core";
import { DataGrid, GridColumns, GridRowsProp } from "@material-ui/data-grid";

import ColumnModal from "./ColumnModal";
import RowModal from "./RowModal";

import Button from "../../../app/Button";
import { createAManStep } from "../../../api/steps";
import { Toast } from "../../../app/Toast";

function StepTable({ taskId }: { taskId: string }) {
    const [columnModal, setColumnModal] = useState(false);
    const [rowModal, setRowModal] = useState(false);

    const [table, setTable] = useState<{ rows: GridRowsProp; columns: GridColumns }>({
        rows: [],
        columns: [],
    });
    const [changedRows, setChangedRows] = useState<any[]>([]);

    const handleAddColumn = (cn: string) => {
        const columnToAdd = { field: cn };

        setTable((prev) => ({ ...prev, columns: prev.columns.concat(columnToAdd) }));
        setColumnModal(false);
    };

    const handleAddRow = (row: any) => {
        let rows = table.rows.concat(row);
        rows = rows.map((r, i) => ({ ...r, id: i }));

        setTable((prev) => ({ ...prev, rows }));
        setChangedRows((prev) => [...prev, row]);
        setRowModal(false);
    };

    const handleSubmit = async () => {
        try {
            // console.log({ TaskId: taskId, steps: changedRows });
            const resp = await createAManStep({ TaskId: taskId, steps: changedRows });
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
                open={rowModal}
                onClose={() => setRowModal(false)}
                columns={table.columns}
                onDone={handleAddRow}
            />

            <Paper style={{ padding: "1em" }}>
                <Button onClick={() => setColumnModal(true)}>Add Column</Button>
                <Button onClick={() => setRowModal(true)}>Add Row</Button>
                <Button kind="add" disabled={changedRows.length == 0} onClick={handleSubmit}>
                    Submit
                </Button>

                <Box height={500}>
                    <DataGrid columns={table.columns} rows={table.rows} />
                </Box>
            </Paper>
        </>
    );
}

export default StepTable;
