import React, { ReactNode } from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import {
    UpdateRounded,
    SettingsRounded,
    EmailRounded,
    PaymentRounded,
    ChatRounded,
    EmojiObjectsRounded,
    AddRounded,
} from "@material-ui/icons";

import { Gradients } from "../theme";
import { BasePaper, IconPaper } from "../app/Paper";
import { BaseTable } from "../app/Table";

const StatusCard = ({ children, title, value, icon }: { title: string; value: string; children: ReactNode; icon: ReactNode }) => {
    return (
        <Box m={1} display="inline-flex">
            <BasePaper title={title}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6">{children}</Typography>
                </Box>
            </BasePaper>
        </Box>
    );
};

const Activities = () => {
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">Activities</Typography>
                <div style={{ flexGrow: 1 }} />
                <Box>
                    <Button>Today</Button>
                    <Button>This Week</Button>
                    <Button>This Month</Button>
                </Box>
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary">
                    <AddRounded />
                </Button>
            </Box>
            <BaseTable
                tableHeads={["Contract device", "Expiring Date"]}
                tableRows={[
                    ["Test", "2020-11-14"],
                    ["Test", "2020-11-14"],
                ]}
            />
        </BasePaper>
    );
};

const Quotes = () => {
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">Quotes</Typography>
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary">
                    <AddRounded />
                </Button>
            </Box>
            <BaseTable
                tableHeads={["Contract device", "Expiring Date"]}
                tableRows={[
                    ["Test", "2020-11-14"],
                    ["Test", "2020-11-14"],
                ]}
            />
        </BasePaper>
    );
};

const Emails = () => {
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">Emails</Typography>
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary">
                    <AddRounded />
                </Button>
            </Box>
            <BaseTable
                tableHeads={["Contract device", "Expiring Date"]}
                tableRows={[
                    ["Test", "2020-11-14"],
                    ["Test", "2020-11-14"],
                ]}
            />
        </BasePaper>
    );
};

const SalesOrders = () => {
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">Sales Orders</Typography>
                <div style={{ flexGrow: 1 }} />
            </Box>
            <BaseTable
                tableHeads={["Contract device", "Expiring Date"]}
                tableRows={[
                    ["Test", "2020-11-14"],
                    ["Test", "2020-11-14"],
                ]}
            />
        </BasePaper>
    );
};

export const Sales = () => {
    return (
        <Grid container spacing={2}>
            <Grid item md={8}>
                <Box>{/* <StatusCard /> */}</Box>
            </Grid>
            <Grid item md={4}>
                <BasePaper>
                    <Typography style={{ margin: 4, textAlign: "center" }}>Expiring Waranties</Typography>
                    <BaseTable
                        tableHeads={["Contract device", "Expiring Date"]}
                        tableRows={[
                            ["Test", "2020-11-14"],
                            ["Test", "2020-11-14"],
                        ]}
                    />
                </BasePaper>
            </Grid>
            <Grid item md={8}>
                <Activities />
            </Grid>
            <Grid item md={4}>
                <Quotes />
            </Grid>
            <Grid item md={8}>
                <Emails />
            </Grid>
            <Grid item md={4}>
                <SalesOrders />
            </Grid>
        </Grid>
    );
};
