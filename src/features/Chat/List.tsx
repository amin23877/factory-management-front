import React from "react";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "95%",
    },
}));

export default function EmployeeList({ value, onChange }: { value: number; onChange: (e: any, nv: number) => void }) {
    const classes = useStyles();

    return (
        <div>
            <Typography style={{ textAlign: "center" }} variant="h6">
                Employee List
            </Typography>
            <Divider style={{ margin: "10px 0" }} />
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={onChange}
                aria-label="Employee list"
                className={classes.tabs}
            >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Seven" />
            </Tabs>
        </div>
    );
}
