import React, { useState, useEffect } from "react";
import { LinearProgress, Box, makeStyles } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";

import AddPartModal from "./AddPartModal";
import ChangePartModal from "./ChangePartModal";
import RenamePart from "./RenamePart";

import Button from "../../../app/Button";
import { Toast } from "../../../app/Toast";
import { BasePaper } from "../../../app/Paper";

import { IMatrice, postMatriceData } from "../../../api/matrice";
import { CustomFooterStatusComponent } from "../../../components/Datagrid/FooterStatus";
import { splitColumnNames, extractLevels, generateDatagridColumns, generateRows } from "../../../logic/matrice";
import { toast } from "react-toastify";

const useStyles = makeStyles({
    root: {
        "& .MuiDataGrid-colCellWrapper": {
            backgroundColor: "#c8c8c8",
        },
    },
});

export default function NewBomTable({ productFamily }: { productFamily: string }) {
    const { data: tableData, mutate: mutateTableData } = useSWR<IMatrice>(`/matrice?productfamily=${productFamily}`);

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

    // Generate table COLUMNS, ROWS and LEVELS
    useEffect(() => {
        if (tableData) {
            const levels = extractLevels(tableData);
            const rows = generateRows(tableData, productFamily);
            const columns = splitColumnNames(generateDatagridColumns(tableData, productFamily));

            setTable({ columns, rows });
            setLevels(levels);
        }
    }, [tableData]);

    const handleAddPart = (name: string) => {
        setTable((prev) => ({ ...prev, columns: [...prev.columns, { field: name, flex: 1, sortable: false }] }));
        setAddPart(false);
    };

    const handleChangePart = (d: any) => {
        setTable((prev) => {
            const res = { ...prev };
            const index = res.rows.findIndex((r: any) => r.id === d.row.id);
            const header = d.data[0].name;
            res.rows[index][header] = d.data[0].partNumber;

            return res;
        });

        const row = JSON.parse(JSON.stringify(d));

        Object.keys(row.row).map((r) => {
            if (!levels?.includes(r)) {
                delete row.row[r];
            }
        });

        setLines((prev) => (prev ? [...prev, row] : [row]));
        setChangePart(false);
    };

    const submitChanges = async () => {
        try {
            // console.log(lines);

            await postMatriceData(productFamily, { lines });
            mutateTableData();

            toast.success("Submited");
            setLines(undefined);
        } catch (error) {
            Toast.fire({ icon: "error", title: error });
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

            <Box display="flex" alignItems="flex-top" height="75vh" width="100%">
                <BasePaper style={{ width: "100%" }}>
                    <Button variant="outlined" style={{ margin: "0.5em 0" }} onClick={() => setAddPart(true)}>
                        Add part
                    </Button>
                    <Button kind="add" disabled={!lines} style={{ margin: "0.5em" }} onClick={submitChanges}>
                        Submit changes
                    </Button>

                    <Box height={450}>
                        <DataGrid
                            className={classes.root}
                            columns={table.columns}
                            rows={table.rows}
                            components={{ Toolbar: GridToolbar, Footer: CustomFooterStatusComponent }}
                            componentsProps={{ footer: { submited: Boolean(lines) } }}
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
                </BasePaper>
            </Box>
        </>
    );
}
