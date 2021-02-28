import React, { ReactNode } from "react";
import { Grid, Typography, Box, Button, Avatar, makeStyles } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";

import { BasePaper } from "../../app/Paper";
import { BaseTable } from "../../app/Table";

import person from "../../assets/icons/person.svg";
import chat from "../../assets/icons/chat.svg";
import activity from "../../assets/icons/activity.svg";
import quote from "../../assets/icons/quote.svg";
import speaker from "../../assets/icons/speaker.svg";
import badge from "../../assets/icons/badge.svg";
import percent from "../../assets/icons/percent.svg";

const useStyles = makeStyles({
    statusCard: {
        boxShadow: "  7px 7px 14px #bebebe, -7px -7px 14px #ffffff",
        "&:hover": {
            boxShadow: " 20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
        },
    },
});

const StatusCard = ({ children, title, value, icon }: { title: string; value: string; children?: ReactNode; icon: string }) => {
    const classes = useStyles();

    return (
        <Box m={1} display="inline-flex" flex={1} height={90}>
            <BasePaper title="title" style={{ width: "100%" }} className={classes.statusCard}>
                <Box display="flex" width="100%" alignItems="center">
                    <Box>
                        <img style={{ backgroundColor: "#f7f7fc", borderRadius: 200, padding: 8 }} src={icon} alt={title} />
                    </Box>
                    <Box flex={2} ml={1} style={{ marginRight: "auto" }}>
                        <Typography variant="body1">{value}</Typography>
                        <Typography variant="caption">{title}</Typography>
                    </Box>
                    {/* <Box flex={2} ml={1} display="flex">
                        {children}
                    </Box> */}
                </Box>
            </BasePaper>
        </Box>
    );
};

const Activities = () => {
    return (
        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
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
        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
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
        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
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
        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
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
                <Box display="flex">
                    <StatusCard icon={person} title="Activities" value="2899">
                        {/* <Avatar>1</Avatar>
                        <Avatar>1</Avatar>
                        <Avatar>1</Avatar> */}
                    </StatusCard>
                    <StatusCard icon={chat} title="Emails" value="2899">
                        {/* <h1 style={{ color: "#00b2d6" }}>+123</h1> */}
                    </StatusCard>
                    <StatusCard icon={activity} title="Sales Orders" value="2899">
                        {/* <img src={percent} alt="percent" /> */}
                    </StatusCard>
                </Box>
                <Box display="flex">
                    <StatusCard icon={quote} title="Quotes" value="2899"></StatusCard>
                    <StatusCard icon={speaker} title="Expiring waranties" value="2899">
                        {/* <h2 style={{ color: "blueviolet" }}>+95</h2> */}
                    </StatusCard>
                    <StatusCard icon={badge} title="Shippings" value="2899"></StatusCard>
                </Box>
            </Grid>
            <Grid item md={4}>
                <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
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
