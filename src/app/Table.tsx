import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from "@material-ui/core";

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
                <TableBody>
                    {tableRows.map((tr: string[], i: number) => (
                        <TableRow key={i}>
                            {tr.map((item: string) => (
                                <TableCell key={item}>{item}</TableCell>
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
