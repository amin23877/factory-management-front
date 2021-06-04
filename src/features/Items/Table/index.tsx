import React, { useState } from "react";

import { Button, IconButton, makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";

import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import { IItem } from "../../../api/items";
import MenuFilters, { IFilters } from "./Filters";
import Sort, { IOrder } from "./Sorts";


import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export const useStyles = makeStyles((theme) => ({
    tableCont: {
        borderRadius: 10,
        maxHeight: 550,
        // maxWidth: '77vw'
    },
    root: {
        backgroundColor: "#f9f9f9",
        border: "none",
        borderRadius: 15,

        "& .MuiTableHead-root": {
            position: ["sticky", "-webkit-sticky"],
            top: 0,
        },
        "& .MuiTableCell-sizeSmall": {
            padding: '15px 0px'
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
            textAlign: 'center',
            // width:'5px',
            // backgroundColor:'red',
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
        "& .MuiBox-root , .MuiBox-root-295": {
            justifyContent: 'space-between'
        }

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
    page,
    setPage,
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
    page: number;
    setPage: any;
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
                <Table size="small" stickyHeader aria-label="Items table" className={classes.root}>
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
                                        Item no.
                                    </Button>
                                    <Sort field="no" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell style={{ padding: '15px 6px ' }}>
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
                            <TableCell style={{ padding: '15px 6px ' }}>
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
                            {/* <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("cat");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Cat.
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
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("family");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Fam.
                                    </Button>
                                    <Sort field="ItemFamilyId" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell> */}
                            <TableCell size='small' >
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("salesApproved");
                                        }}
                                        className={classes.tableHeadBtn}
                                        title='Sales Approved'
                                    >
                                        S.A.
                                    </Button>
                                    <Sort field="salesApproved" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("engineeringApproved");
                                        }}
                                        className={classes.tableHeadBtn}
                                        title="Engineering Approved"
                                    >
                                        E.A.
                                    </Button>
                                    <Sort field="engineeringApproved" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("totalQoh");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        QOH
                                    </Button>
                                    <Sort field="totalQoh" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("usedInLastQuarter");
                                        }}
                                        className={classes.tableHeadBtn}
                                        title=" Last Used in 90 days"
                                    >
                                        L.U.90
                                    </Button>
                                    <Sort field="usedInLastQuarter" order={order} setOrder={setOrder} />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        onClick={(e) => {
                                            setMenuAnchorEl(e.target);
                                            setFilterBy("resellCost");
                                        }}
                                        className={classes.tableHeadBtn}
                                    >
                                        Re.Co.
                                    </Button>
                                    <Sort field="resellCost" order={order} setOrder={setOrder} />
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
                                    <TableCell style={{ padding: '15px 6px ' }}>{item.name}</TableCell>
                                    <TableCell style={{ padding: '15px 6px ' }}>{item.description}</TableCell>
                                    <TableCell>{item.cost} </TableCell>
                                    {/* <TableCell>{item.ItemCategory ? item.ItemCategory.name : ""}</TableCell>
                                    <TableCell>{item.ItemType ? item.ItemType.name : ""}</TableCell>
                                    <TableCell>{item.ItemFamily ? item.ItemFamily.name : ""}</TableCell> */}
                                    <TableCell >{!item.salesApproved ? <div style={{ color: '#4caf50', backgroundColor: 'rgb(237, 247, 237)', width: '25px', height: '25px', borderRadius: '100%', fontSize: 'small', margin: '0px auto',display:'flex' , alignItems:'center', justifyContent:'center'}}>
                                        <CheckRoundedIcon />
                                    </div> : <div style={{ color: '#f44336', backgroundColor: 'rgb(253, 236, 234)', width: '25px', height: '25px', borderRadius: '100%', fontSize: 'small', margin: '0px auto',display:'flex' , alignItems:'center', justifyContent:'center'}}>
                                        <ClearRoundedIcon />
                                    </div>}</TableCell>
                                    <TableCell>{item.engineeringApproved ? <div style={{ color: '#4caf50', backgroundColor: 'rgb(237, 247, 237)', width: '25px', height: '25px', borderRadius: '100%', fontSize: 'small', margin: '0px auto',display:'flex' , alignItems:'center', justifyContent:'center'}}>
                                        <CheckRoundedIcon />
                                    </div> : <div style={{ color: '#f44336', backgroundColor: 'rgb(253, 236, 234)', width: '25px', height: '25px', borderRadius: '100%', fontSize: 'small', margin: '0px auto',display:'flex' , alignItems:'center', justifyContent:'center'}}>
                                        <ClearRoundedIcon />
                                    </div>}</TableCell>
                                    <TableCell>{item.totalQoh ? item.totalQoh : ""}</TableCell>
                                    <TableCell>{item.usedInLastQuarter ? item.usedInLastQuarter : ""}</TableCell>
                                    <TableCell>{item.resellCost ? item.resellCost : ""}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5} />
                            <TableCell>Page: {page}</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <IconButton onClick={() => setPage((prev: any) => prev - 1)}>
                                        <ChevronLeft />
                                    </IconButton>
                                    <IconButton onClick={() => setPage((prev: any) => prev + 1)}>
                                        <ChevronRight />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
