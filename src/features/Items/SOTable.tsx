import React, { useEffect } from "react";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { formatTimestampToDate } from "../../logic/date";

import { useStyles } from "../../app/Table";

export default function SOTable({ rows }: { rows: any[] }) {
    const classes = useStyles();
    useEffect(() => {
        console.log(rows);
    }, [rows]);
    return (
        <TableContainer component={Paper} className={classes.tableCont} style={{ maxHeight: 700, minHeight: 457 }}>
            <Table aria-label="Items table" className={classes.root}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>SO Number</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Date Iinvoiced</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows &&
                        rows.map((row: any, i) => {
                            console.log(row);
                            return (
                                <TableRow key={i}>
                                    <TableCell>{formatTimestampToDate(row?.so?.date)}</TableCell>
                                    <TableCell>{row?.so?.number}</TableCell>
                                    <TableCell>{row?.so?.clientName}</TableCell>
                                    <TableCell>{formatTimestampToDate(row?.so?.invoicedDate)}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
