import React, { useState } from "react";
import { Box } from "@material-ui/core";

import TextField from "../../app/TextField";

import { IUnitHistory } from "../../api/units";
import { formatTimestampToDate } from "../../logic/date";

export const Status = ({ unit }: { unit: IUnitHistory }) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
            <TextField label="Warranty exp date" disabled />
            <TextField label="Purchase date" value={formatTimestampToDate(unit.SODate)} disabled />
            <TextField label="Estimated ship date" value={unit.estimatedShipDate} disabled />
            <TextField label="Actual ship date" value={unit.actualShipDate} disabled />
            <TextField label="Estimated lead time" disabled />
            <TextField label="Actual lead time" disabled />
        </Box>
    );
};

export const Expense = ({ unit }: { unit: IUnitHistory }) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
            <TextField label="Item labor time" value={unit.unit.laborTime} disabled />
            <TextField label="Item labor cost" value={unit.unit.laborCost} disabled />
            <TextField label="Item bom cost" value={unit.unit.bomCost} disabled />
            <TextField label="Item total cost" value={unit.unit.totalCost} disabled />
        </Box>
    );
};

export const Shipping = () => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
            <TextField label="Entity" disabled />
            <TextField label="Shipping address" disabled />
            <TextField label="Contact person" disabled />
            <TextField label="Contact person email" disabled />
            <TextField label="Contact person phone number" disabled />
            <TextField label="Unit location" disabled />
        </Box>
    );
};
