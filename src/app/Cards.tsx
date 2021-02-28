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
    discription,
    numcolor,
}: {
    title: string;
    iconBg?: string;
    icon?: any;
    number: number;
    total: number;
    unit?: string;
    discription?: string;
    numcolor?: string;
}) => {
    return (
        <BasePaper
            style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
            }}
        >
            <Box display="flex" alignItems="center">
                {icon && iconBg && (
                    <Box
                        display="flex"
                        style={{
                            backgroundColor: iconBg,
                            padding: 8,
                            borderRadius: "30%",
                            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box display="flex" alignItems="center" justifyContent="space-around">
                    <Typography variant="body1" style={{ color: numcolor, marginLeft: "15px" }}>
                        {number}/{total} <span style={{ fontSize: 16 }}>{unit || "units"}</span>
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h5" style={{ color: "rgb(33,56,100)", fontWeight: "bold", margin: "1em 0" }}>
                {title}
            </Typography>
            <Typography variant="h6" style={{ color: "rgb(123,123,123)" }}>
                {discription}
            </Typography>
        </BasePaper>
    );
};

export const TableCard = ({ title, tableHeads, tableRows }: { title: string; tableHeads: string[]; tableRows: any }) => {
    return (
        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
            <Box display="flex" justifyContent="center">
                <Typography>{title}</Typography>
            </Box>
            <BaseTable tableHeads={tableHeads} tableRows={tableRows} />
        </BasePaper>
    );
};
