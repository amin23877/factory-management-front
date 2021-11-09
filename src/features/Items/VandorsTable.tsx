import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import { updateAnItem } from "../../api/items";
import Snack from "../../app/Snack";

export const useStyles = makeStyles((theme) => ({
    tableCont: {
        borderRadius: 10,
        height: 350,
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
            // cursor: "pointer",
            color: "#fff",
            border: "1px solid #333b44",
        },
        "& .MuiTableSortLabel-icon ": {
            fill: "white",
        },
        "& .MuiTableCell-head:hover": {
            // backgroundColor: "#333b44",
        },
        "& tbody .MuiTableCell-root": {
            border: "1px solid #dddddd",
            fontSize: "0.700rem",
        },
        "& .MuiButton-root": {
            fontSize: "0.700rem",
        },
        "& tbody tr:hover": {
            // backgroundColor: "#f3f3f3",
            // cursor: "pointer",
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

export default function VendorsTable({
    rows,
    onRowSelected,
    selectedItem,
}: {
    selectedItem: any;
    rows: any[];
    onRowSelected: (vendor: any) => void;
}) {
    const classes = useStyles();
    const [vendors, setVendors] = useState(rows);
    const [prefVendor, setPrefVendor] = useState<number>();
    const [snack, setSnack] = useState(false);

    const handleChangePreferred = async (vendorId: number) => {
        try {
            setPrefVendor(vendorId);
            const resp = await updateAnItem(selectedItem.id, { preffered: vendorId });
            if (resp) {
                setSnack(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setVendors(rows);
    }, [rows, vendors]);

    useEffect(() => {
        setPrefVendor(selectedItem?.prefVendor);
    }, [selectedItem]);

    return (
        <>
            <Snack open={snack} onClose={() => setSnack(false)}>
                Preferred vendor changes successfully
            </Snack>

            <TableContainer component={Paper} className={classes.tableCont}>
                <Table stickyHeader size="small" aria-label="Items table" className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendor </TableCell>
                            <TableCell>Vendor Item Number </TableCell>
                            <TableCell>Vendor Description </TableCell>
                            <TableCell>Last Replenish Time</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Last Quantity Ordered</TableCell>
                            <TableCell>Preferred</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendors &&
                            vendors.map((item) => (
                                <TableRow key={item.id} onClick={() => onRowSelected(item)}>
                                    <TableCell>{item.VendorId?.name}</TableCell>
                                    <TableCell>{item.vendorSKU}</TableCell>
                                    <TableCell>{item.vendorPartName}</TableCell>
                                    <TableCell>{item.leadTime}</TableCell>
                                    <TableCell>{item.cost}</TableCell>
                                    <TableCell>{item.lastQuantityOrdered}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            value={prefVendor === item.id}
                                            checked={prefVendor === item.id}
                                            onChange={(e, c) => {
                                                if (c) {
                                                    handleChangePreferred(item.id);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
