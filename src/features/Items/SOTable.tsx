import React from "react";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./Table";

export default function SOTable({ rows }: { rows: any[] }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.tableCont} style={{ height: 250 }}>
            <Table aria-label="Items table" className={classes.root}>
                <TableHead>
                    <TableRow>
                        <TableCell>SO Number</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Quantity usage</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows &&
                        rows.map((row: any, i) => (
                            <TableRow key={i}>
                                <TableCell>{row?.SO?.number}</TableCell>
                                <TableCell>{row?.LineItemRecord?.description}</TableCell>
                                <TableCell>{row?.SO?.Client?.name}</TableCell>
                                <TableCell>{row?.LineItemRecord?.quantity}</TableCell>
                                <TableCell>{row?.LineItemRecord?.price}</TableCell>
                                <TableCell>{row?.LineItemRecord?.createdAt}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
