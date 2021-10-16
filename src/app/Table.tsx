import React from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box,
    makeStyles,
} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    tableCont: {
        borderRadius: 10,
        maxHeight: 550,
    },
    root: {
        backgroundColor: "#f9f9f9",
        border: "none",
        borderRadius: 15,

        "& .MuiTableHead-root": {
            position: ["sticky", "-webkit-sticky"],
            top: 0,
        },
        "& .MuiTableRow-head, .MuiTableCell-stickyHeader": {
            backgroundColor: "#202731",
        },
        "& .MuiTableCell-head": {
            cursor: "pointer",
            color: "#fff",
            border: "1px solid #333b44",
        },
        "& .MuiTableSortLabel-icon ": {
            fill: "white",
        },
        "& .MuiTableCell-head:hover": {
            backgroundColor: "#333b44",
        },
        "& tbody .MuiTableCell-root": {
            border: "1px solid #dddddd",
            fontSize: "0.700rem",
        },
        "& .MuiButton-root": {
            fontSize: "0.700rem",
        },
        "& tbody tr:hover": {
            backgroundColor: "#f3f3f3",
            cursor: "pointer",
        },
        "& .Mui-selected": {
            boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "#fff !important",
        },
        "& .MuiDataGrid-sortIcon": {
            fill: "white",
        },
    },
    tableHeadBtn: {
        color: "white",
        padding: 0,
    },
}));

export const MinimalTable = ({ cols, rows }: { cols: any[]; rows: any }) => {
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
                    {/* {rows?.result.map((tr: any, i: number) => (
                        <TableRow style={{ borderBottom: "none" }} key={i}>
                            {cols.map((col) => (
                                <TableCell style={{ borderBottom: "none" }} key={col.field}>
                                    {tr[col.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))} */}
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
