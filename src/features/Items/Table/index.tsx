import React, { useState, useEffect } from "react";

import { Button, IconButton, makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

import SortRounded from "@material-ui/icons/SortRounded";

import { IItem } from "../../../api/items";
import MenuFilters, { IFilters } from "./Filters";
import Sort, { IOrder } from "./Sorts";

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
        "& .MuiTableSortLabel-icon ": {
            fill: "white",
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
    tableHeadBtn: {
        color: "white",
        padding: 0,
    },
}));

export default function DataTable({
    rows,
    onRowSelected,
    cats,
    types,
    families,
    filters,
    setFilters,
    order,
    setOrder,
}: {
    filters?: IFilters;
    setFilters: any;
    rows: IItem[];
    onRowSelected: (item: IItem) => void;
    cats: any[];
    types: any[];
    families: any[];
    order?: IOrder;
    setOrder: (v: IOrder) => void;
}) {
    const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);
    const [filterBy, setFilterBy] = useState("");
    const classes = useStyles();

    return (
        <>
            <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)}>
                <Box width={300}>
                    <MenuFilters
                        cats={cats}
                        types={types}
                        families={families}
                        filterBy={filterBy}
                        filters={filters}
                        onFilterChange={setFilters}
                    />
                    <Button onClick={() => setFilters(undefined)}>clear</Button>
                </Box>
            </Menu>

            <TableContainer component={Paper} className={classes.tableCont}>
                <Table aria-label="Items table" className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("itemNo");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Item number
                                    </Button>
                                    <Sort field="no" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("name");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Name
                                    </Button>
                                    <Sort field="name" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("desc");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Description
                                    </Button>
                                    <Sort field="description" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("cost");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Cost
                                    </Button>
                                    <Sort field="cost" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("cat");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Category
                                    </Button>
                                    <Sort field="ItemCategoryId" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("type");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Type
                                    </Button>
                                    <Sort field="ItemTypeId" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box>
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("family");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Family
                                    </Button>
                                    <Sort field="ItemFamilyId" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows.map((item) => (
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
