import React from "react";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
} from "@material-ui/core";
import { AddRounded, DeleteRounded, EditRounded } from "@material-ui/icons";

import TextField from "../../app/TextField";

export type tableLineItemType = {
    index: number;
    name?: string;
    description?: string;
    quantity: number;
    price: number;
    tax?: boolean;
};

export default function LineItemsTable({
    items,
    onDescriptionChange,
    onPriceChange,
    onTaxChange,
    onDelete,
    onEdit,
    onAdd,
}: {
    items: tableLineItemType[];
    onDescriptionChange: (index: number, value: string) => void;
    onPriceChange: (index: number, value: number) => void;
    onTaxChange: (index: number, value: boolean) => void;
    onDelete?: (index: number) => void;
    onEdit?: (index: number, data: any) => void;
    onAdd?: (data: any) => void;
}) {
    return (
        <TableContainer component={Paper} style={{ maxHeight: 500, overflowY: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Tax</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, i) => (
                        <TableRow>
                            <TableCell>{item.index}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                                <TextField
                                    name="description"
                                    placeholder="Description"
                                    value={item.description}
                                    multiline
                                    rows={3}
                                    onChange={(e) => onDescriptionChange(i, e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={item.price}
                                    onChange={(e) => onPriceChange(i, parseInt(e.target.value, 10))}
                                />
                            </TableCell>
                            <TableCell>
                                <Checkbox checked={item.tax} onChange={(e) => onTaxChange(i, e.target.checked)} />
                            </TableCell>
                            {onDelete && (
                                <TableCell>
                                    <IconButton onClick={() => onDelete(i)}>
                                        <DeleteRounded htmlColor="red" />
                                    </IconButton>
                                </TableCell>
                            )}
                            {onEdit && (
                                <TableCell>
                                    {/* TODO: onEdit */}
                                    <IconButton onClick={() => {}}>
                                        <EditRounded htmlColor="yellow" />
                                    </IconButton>
                                </TableCell>
                            )}
                            {onAdd && (
                                <TableCell>
                                    {/* TODO: onAdd */}
                                    <IconButton onClick={() => {}}>
                                        <AddRounded htmlColor="green" />
                                    </IconButton>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
