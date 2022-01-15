import React, { useState, useEffect } from "react";
import { LinearProgress, Box, makeStyles } from "@material-ui/core";
import { DataGrid, GridPagination, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";

import AddPartModal from "./AddPartModal";
import ChangePartModal from "./ChangePartModal";
import RenamePart from "./RenamePart";

import Button from "../../../app/Button";
import Toast from "../../../app/Toast";

import { IMatrix, postMatrixData } from "../../../api/matrix";
import { CustomFooterStatusComponent } from "../../../components/Datagrid/FooterStatus";
import { extractLevels, generateDataGridColumns, generateRows, extractColumns } from "../../../logic/matrix";

const useStyles = makeStyles({
    root: {
        "& .MuiDataGrid-colCellWrapper": {
            backgroundColor: "#c8c8c8",
        },
    },
});

export default function NewBomTable({ productFamily }: { productFamily: string }) {
    const { data: tableData, mutate: mutateTableData } = useSWR<IMatrix>(`/matrice/${productFamily}`);

    const classes = useStyles();

    const [addPart, setAddPart] = useState(false);
    const [changePart, setChangePart] = useState(false);
    const [renamePart, setRenamePart] = useState(false);

    const [selectedRow, setSelectedRow] = useState<any>();
    const [selectedPart, setSelectedPart] = useState<{ formerName: string; newName: string }>();
    const [selectedRowName, setSelectedRowName] = useState<string>();

    const [levels, setLevels] = useState<string[]>();
    const [lines, setLines] = useState<any[]>();

    const [table, setTable] = useState<{ columns: any; rows: any[] }>({ columns: [], rows: [] });

    useEffect(() => {
        if (tableData) {
            const levels = extractLevels(tableData);
            const columns = generateDataGridColumns(extractColumns({ tableData, levels }));
            const rows = generateRows({ tableData, productFamily, levels });

            setTable({ columns, rows });
            setLevels(levels);
        }
    }, [productFamily, tableData]);

    const handleAddPart = (name: string) => {
        setTable((prev) => ({ ...prev, columns: [...prev.columns, { field: name, flex: 1, sortable: false }] }));
        setAddPart(false);
    };

    const handleChangePart = (d: any) => {
        // setTable((prev) => {
        //     const res = { ...prev };
        //     const index = res.rows.findIndex((r: any) => r.id === d.row.id);
        //     const header = d.data[0].name;
        //     res.rows[index][header] = d.data[0].partNumber;
        //     return res;
        // });
        // const row = JSON.parse(JSON.stringify(d));
        // Object.keys(row.row).forEach((r) => {
        //     if (!levels?.includes(r)) {
        //         delete row.row[r];
        //     }
        // });
        // setLines((prev) => {
        //     if (prev) {
        //         let res = prev.slice();
        //         const index = res.findIndex((r) => JSON.stringify(r.row) === JSON.stringify(row.row));
        //         if (index > -1) {
        //             const dataIndex = res[index].data.findIndex((d: any) => d.name === row.data[0].name);
        //             if (dataIndex > -1) {
        //                 res[index].data[dataIndex] = row.data[0];
        //             } else {
        //                 res[index].data.push(row.data[0]);
        //             }
        //         } else {
        //             res = [...prev, row];
        //         }
        //         return res;
        //     } else {
        //         return [row];
        //     }
        // });
        // setChangePart(false);
    };

    const submitChanges = async () => {
        // try {
        //     await postMatrixData(productFamily, { lines });
        //     mutateTableData();
        //     Toast("Submitted", "success");
        //     setLines(undefined);
        // } catch (error) {
        //     console.log(error);
        // }
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

            <Box display="flex" alignItems="flex-top" width="100%">
                <Box width="100%">
                    <Button variant="outlined" style={{ margin: "0.5em 0" }} onClick={() => setAddPart(true)}>
                        Add part
                    </Button>
                    <Button kind="add" disabled={!lines} style={{ margin: "0.5em" }} onClick={submitChanges}>
                        Submit changes
                    </Button>

                    <Box height="70vh">
                        <DataGrid
                            pagination
                            rowsPerPageOptions={[100, 250, 500]}
                            density="compact"
                            rowHeight={36}
                            className={classes.root}
                            columns={table.columns}
                            rows={table.rows}
                            // components={{
                            //     Toolbar: GridToolbar,
                            //     Footer: CustomFooterStatusComponent,
                            //     Pagination: GridPagination,
                            // }}
                            // componentsProps={{ footer: { submitted: Boolean(lines) } }}
                            // onColumnHeaderClick={(params) => {
                            //     setSelectedPart({ formerName: params.field, newName: "" });
                            //     setRenamePart(true);
                            // }}
                            // onCellClick={(params) => {
                            //     setSelectedRow(params.row);
                            //     setSelectedRowName(params.field);
                            //     setChangePart(true);
                            // }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
