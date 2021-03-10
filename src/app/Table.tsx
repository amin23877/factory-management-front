import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from "@material-ui/core";
import { ColDef, RowData } from "@material-ui/data-grid";

export const MinimalTable = ({ cols, rows }: { cols: ColDef[]; rows: any[] }) => {
    return (
        <TableContainer style={{ maxHeight: 280, overflow: "auto" }}>
            <Table style={{ background: "#f1f1f1", margin: "1em 0", borderRadius: 10 }}>
                <TableHead style={{ backgroundColor: "#e9e9e9", margin: "1em", borderRadius: 20 }}>
                    <TableRow>
                        {cols.map((th) => (
                            <TableCell style={{ fontWeight: "bold" }} key={th.field}>
                                {th.headerName ? th.headerName : th.field}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody style={{ borderBottom: "none" }}>
                    {rows.map((tr, i: number) => (
                        <TableRow style={{ borderBottom: "none" }} key={i}>
                            {cols.map((col) => (
                                <TableCell style={{ borderBottom: "none" }} key={col.field}>
                                    {tr[col.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const BaseTable = ({ tableHeads, tableRows }: { tableHeads: string[]; tableRows: any }) => {
    return (
        <TableContainer style={{ maxHeight: 280, overflow: "auto" }}>
            <Table style={{ background: "#f1f1f1", margin: "1em 0", borderRadius: 10 }}>
                <TableHead style={{ backgroundColor: "#e9e9e9", margin: "1em", borderRadius: 20 }}>
                    <TableRow>
                        {tableHeads.map((th) => (
                            <TableCell style={{ fontWeight: "bold" }} key={th}>
                                {th}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody style={{ borderBottom: "none" }}>
                    {tableRows.map((tr: string[], i: number) => (
                        <TableRow style={{ borderBottom: "none" }} key={i}>
                            {tr.map((item: string) => (
                                <TableCell style={{ borderBottom: "none" }} key={item}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const TabTable = ({ tableHead, tableRows, title }: { title: string; tableHead: string[]; tableRows: any }) => {
    return (
        <Box>
            <Typography>{title}</Typography>
            <BaseTable tableHeads={tableHead} tableRows={tableRows} />
        </Box>
    );
};
