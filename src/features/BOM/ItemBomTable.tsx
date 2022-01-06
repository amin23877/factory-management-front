import React from "react";
import useSWR from "swr";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Check, Clear, LaptopWindows } from "@material-ui/icons";

import { IBom, IBomRecord } from "../../api/bom";
import { formatTimestampToDate } from "../../logic/date";
import { openRequestedSinglePopup } from "../../logic/window";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
});

export const useTableStyles = makeStyles((theme) => ({
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

        "& tbody .MuiTableCell-root": {
            border: "1px solid #dddddd",
            fontSize: "0.700rem",
        },
        "& .MuiButton-root": {
            fontSize: "0.700rem",
        },

        "& .Mui-selected": {
            boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "#fff !important",
        },
        "& .MuiDataGrid-sortIcon": {
            fill: "white",
        },
    },
}));

function Row({ row }: { row: IBom }) {
    let history = useHistory();
    const phone = useMediaQuery("(max-width:900px)");
    const { data: bomRecords } = useSWR<IBomRecord[]>(`/bomrecord?BOMId=${row.id}`);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const tableClasses = useTableStyles();

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand BOM row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton
                        onClick={() => {
                            phone
                                ? history.push(`/panel/bom/${row.id}/parts`)
                                : openRequestedSinglePopup({ url: `/panel/bom/${row.id}/parts` });
                        }}
                    >
                        <LaptopWindows />
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.items}
                </TableCell>
                <TableCell align="right">{row.no}</TableCell>
                <TableCell align="right">{formatTimestampToDate(row.updatedAt)}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.note}</TableCell>
                <TableCell align="right">
                    {row.current ? <Check htmlColor="#888" /> : <Clear htmlColor="#888" />}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                BOM Parts
                            </Typography>
                            <TableContainer className={tableClasses.tableCont} style={{ maxHeight: 300 }}>
                                <Table className={tableClasses.root} size="small" aria-label="BOM Parts">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Uom</TableCell>
                                            <TableCell align="right">Location</TableCell>
                                            <TableCell align="right">Usage</TableCell>
                                            <TableCell align="right">Fixed QTY</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bomRecords ? (
                                            bomRecords.map((part) => (
                                                <TableRow
                                                    key={part.id}
                                                    onClick={() => {
                                                        history.push(`/panel/inventory/${part.ItemId.id}`);
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {part.ItemId.no}
                                                    </TableCell>
                                                    <TableCell>{part.ItemId.name}</TableCell>
                                                    <TableCell align="right">{part?.uom}</TableCell>
                                                    <TableCell align="right">{part?.location}</TableCell>
                                                    <TableCell align="right">{part.usage}</TableCell>
                                                    <TableCell align="right">
                                                        {part.fixedQty ? (
                                                            <Check htmlColor="#888" />
                                                        ) : (
                                                            <Clear htmlColor="#888" />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <LinearProgress />
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function ItemBomTable({ boms }: { boms: IBom[] | undefined }) {
    const classes = useTableStyles();

    return (
        <TableContainer className={classes.tableCont} component={Paper} style={{ maxHeight: 700, minHeight: 500 }}>
            <Table className={classes.root} size="small" aria-label="collapsible BOM table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell>Items</TableCell>
                        <TableCell align="right">Rev. No.</TableCell>
                        <TableCell align="right">Revision Date</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Note</TableCell>
                        <TableCell align="right">Current</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{boms ? boms.map((row) => <Row key={row.id} row={row} />) : <LinearProgress />}</TableBody>
            </Table>
        </TableContainer>
    );
}
