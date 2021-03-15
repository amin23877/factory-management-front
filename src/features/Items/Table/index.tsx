import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { IItem } from "../../../api/items";
import { FilterByValue, FilterByWord } from "./Filters";

const useStyles = makeStyles((theme) => ({
    tableCont: {
        borderRadius: 10,
    },
    root: {
        backgroundColor: "#f9f9f9",
        border: "none",
        borderRadius: 15,

        "& .MuiTableRow-head": {
            backgroundColor: "#202731",
            borderRadius: " 10px 10px 0 0",
        },
        "& .MuiTableCell-head": {
            cursor: "pointer",
            color: "#fff",
            border: "1px solid #333b44",
        },
        "& .MuiTableCell-head:hover": {
            backgroundColor: "#333b44",
        },
        "& tbody .MuiTableCell-root": {
            border: "1px solid #dddddd",
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
}));

export default function DataTable({ rows, onRowSelected }: { rows: IItem[]; onRowSelected: (item: IItem) => void }) {
    // const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);
    const [filterBy, setFilterBy] = useState("");
    const classes = useStyles();

    return (
        <>
            <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)}>
                <Box width={300}>
                    {(filterBy === "itemNo" ||
                        filterBy === "name" ||
                        filterBy === "desc" ||
                        filterBy === "cat" ||
                        filterBy === "type" ||
                        filterBy === "family") && <FilterByWord />}
                    {filterBy === "cost" && <FilterByValue />}
                </Box>
            </Menu>

            <TableContainer component={Paper} className={classes.tableCont}>
                <Table aria-label="Items table" className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={(e) => {
                                    setMenuAnchorEl(e.target);
                                    setFilterBy("itemNo");
                                }}
                            >
                                Item number
                            </TableCell>
                            <TableCell
                                onClick={(e) => {
                                    setMenuAnchorEl(e.target);
                                    setFilterBy("name");
                                }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                onClick={(e) => {
                                    setMenuAnchorEl(e.target);
                                    setFilterBy("desc");
                                }}
                            >
                                Description
                            </TableCell>
                            <TableCell
                                onClick={(e) => {
                                    setMenuAnchorEl(e.target);
                                    setFilterBy("cost");
                                }}
                            >
                                Cost
                            </TableCell>
                            <TableCell
                                onClick={(e) => {
                                    setMenuAnchorEl(e.target);
                                    setFilterBy("cat");
                                }}
                            >
                                Category
                            </TableCell>
                            <TableCell
                                onClick={(e) => {
                                    setMenuAnchorEl(e.target);
                                    setFilterBy("type");
                                }}
                            >
                                Types
                            </TableCell>
                            <TableCell
                                onClick={(e) => {
                                    setMenuAnchorEl(e.target);
                                    setFilterBy("family");
                                }}
                            >
                                Family
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((item) => (
                            <TableRow key={item.id} onClick={() => onRowSelected(item)}>
                                <TableCell component="th" scope="row">
                                    {item.no}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.cost} </TableCell>
                                <TableCell>{item.ItemCategory ? item.ItemCategory.name : ""}</TableCell>
                                <TableCell>{item.ItemType ? item.ItemType.name : ""}</TableCell>
                                <TableCell>{item.ItemFamily ? item.ItemFamily.name : ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
