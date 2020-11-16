import React from "react";
import { Typography, Box } from "@material-ui/core";

import { BasePaper } from "../app/Paper";
import { BaseTable } from "../app/Table";

export const NumbersCard = ({
    title,
    iconBg,
    icon,
    number,
    total,
    unit,
}: {
    title: string;
    iconBg?: string;
    icon?: any;
    number: number;
    total: number;
    unit?: string;
}) => {
    return (
        <BasePaper>
            <div style={{ flexGrow: 1 }} />
            <Box display="flex" alignItems="center">
                {icon && iconBg && (
                    <Box display="flex" style={{ backgroundColor: iconBg, padding: 8, borderRadius: 100 }}>
                        {icon}
                    </Box>
                )}
                <Typography style={{ margin: "0 1em" }} variant="h6">
                    {title}
                </Typography>
            </Box>
            <div style={{ flexGrow: 2 }} />
            <Box display="flex" alignItems="center" justifyContent="space-around">
                <Typography variant="h5">
                    {number}/{total} <span style={{ fontSize: 16 }}>{unit || "units"}</span>
                </Typography>
            </Box>
            <div style={{ flexGrow: 1 }} />
        </BasePaper>
    );
};

export const TableCard = ({ title, tableHeads, tableRows }: { title: string; tableHeads: string[]; tableRows: any }) => {
    return (
        <BasePaper>
            <Box display="flex" justifyContent="center">
                <Typography>{title}</Typography>
            </Box>
            <BaseTable tableHeads={tableHeads} tableRows={tableRows} />
        </BasePaper>
    );
};
