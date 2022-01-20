import React, { useState, useEffect } from "react";
import { LinearProgress, Box, makeStyles } from "@material-ui/core";
import { GridPagination, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";

import DataGrid from "@inovua/reactdatagrid-community";

import AddPartModal from "./AddPartModal";
import ChangePartModal from "./ChangePartModal";
import RenamePart from "./RenamePart";

import Button from "../../../app/Button";
import Toast from "../../../app/Toast";

import { IMatrix, postMatrixData } from "../../../api/matrix";
import { CustomFooterStatusComponent } from "../../../components/Datagrid/FooterStatus";
import {
    extractLevels,
    generateDataGridColumns,
    generateDataGridFilterValues,
    generateRows,
    extractColumns,
} from "../../../logic/matrix";

const useStyles = makeStyles({
    root: {
        "& .InovuaReactDataGrid__column-header": {
            background: "#202731",
            color: "#fff",
        },
    },
});

type ITableChangeCell = {
    ItemId: string;
    usage: number;
    location?: string;
    uom?: string;
    fixedQty?: boolean;
};

type ITableChangeRow = {
    device: string;
    cells: ITableChangeCell[];
};

export default function NewBomTable({ productFamily }: { productFamily: string }) {
    const { data: tableData, mutate: mutateTableData } = useSWR<IMatrix>(`/matrice/${productFamily}`);

    const classes = useStyles();

    const [addPart, setAddPart] = useState(false);
    const [changePart, setChangePart] = useState(false);
    const [renamePart, setRenamePart] = useState(false);

    const [selectedRow, setSelectedRow] = useState<any>();
    const [selectedPart, setSelectedPart] = useState<{ formerName: string; newName: string }>();
    const [selectedRowName, setSelectedRowName] = useState<string>();
    const [changes, setChanges] = useState<ITableChangeRow[]>([]);

    const [table, setTable] = useState<{ columns: any; rows: any[]; defaultFilterValues: any[] | null }>({
        columns: [],
        rows: [],
        defaultFilterValues: null,
    });

    useEffect(() => {
        if (tableData) {
            const levels = extractLevels(tableData);
            const columns = generateDataGridColumns(extractColumns({ tableData, levels }));
            const rows = generateRows({ tableData, levels });
            const defaultFilterValues = generateDataGridFilterValues(extractColumns({ tableData, levels }));

            setTable({ columns, rows, defaultFilterValues });
        }
    }, [productFamily, tableData]);

    const handleAddPart = (name: string) => {
        setTable((prev) => ({ ...prev, columns: [...prev.columns, { field: name, flex: 1, sortable: false }] }));
        setAddPart(false);
    };

    const handleChangePart = (d: ITableChangeRow) => {
        setChanges((prev) => {
            let clone = prev?.concat();
            const index = clone.findIndex((i) => i.device === d.device);

            if (index < 0) {
                clone.push(d);
            } else {
                clone[index].cells = [...clone[index].cells, ...d.cells];
            }

            return clone;
        });

        setChangePart(false);
    };

    const submitChanges = async () => {
        try {
            await postMatrixData(productFamily, { matrice: [...changes] });
            mutateTableData();
            Toast("Submitted", "success");
            setChanges([]);
        } catch (error) {
            console.log(error);
        }
    };

    if (!tableData || !table.defaultFilterValues) {
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
                    <Button variant="outlined" disabled style={{ margin: "0.5em 0" }} onClick={() => setAddPart(true)}>
                        Add part
                    </Button>
                    <Button
                        kind="add"
                        disabled={changes.length < 1}
                        style={{ margin: "0.5em" }}
                        onClick={submitChanges}
                    >
                        Submit changes
                    </Button>

                    <Box display="flex" height="70vh">
                        <DataGrid
                            className={classes.root}
                            rowHeight={20}
                            columns={table.columns}
                            dataSource={table.rows}
                            defaultFilterValue={table.defaultFilterValues}
                            pagination
                            defaultLimit={250}
                            // @ts-ignore
                            onCellClick={(_, { data, id: partName }) => {
                                setSelectedRowName(partName);
                                setSelectedRow(data);
                                setChangePart(true);
                            }}
                            pageSizes={[50, 100, 250, 500]}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
