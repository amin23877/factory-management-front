import React, { ReactNode } from "react";
import { Grid, Typography, Box, Button, makeStyles, LinearProgress } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LineChart from "../../app/Chart/LineChart";
import { BasePaper } from "../../app/Paper";
import { BaseTable, MinimalTable } from "../../app/Table";

import person from "../../assets/icons/person.svg";
import chat from "../../assets/icons/chat.svg";
import activity from "../../assets/icons/activity.svg";
import quote from "../../assets/icons/quote.svg";
import speaker from "../../assets/icons/speaker.svg";
import badge from "../../assets/icons/badge.svg";
import { selectActivities } from "../Activity/activitySlice";
import { selectSOs } from "../SO/soSlice";
import { selectPOs } from "../PO/poSlice";
import useSWR from "swr";

const useStyles = makeStyles({
    statusCard: {
        boxShadow: "  7px 7px 14px #bebebe, -7px -7px 14px #ffffff",
        "&:hover": {
            boxShadow: " 20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
        },
    },
});

const StatusCard = ({
    title,
    value,
    icon,
    children,
}: {
    title: string;
    value: string;
    children?: ReactNode;
    icon: string;
}) => {
    const classes = useStyles();

    return (
        <Box m={1} display="inline-flex" flex={1} height={90}>
            <BasePaper
                title="title"
                style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -10px" }}
                className={classes.statusCard}
            >
                <Box display="flex" width="100%" alignItems="center">
                    <Box>
                        <img
                            style={{ backgroundColor: "#f7f7fc", borderRadius: 200, padding: 8 }}
                            src={icon}
                            alt={title}
                        />
                    </Box>
                    <Box flex={2} ml={1} style={{ marginRight: "auto" }}>
                        <Typography variant="body1">{value}</Typography>
                        <Typography variant="caption">{title}</Typography>
                    </Box>
                    {children}
                </Box>
            </BasePaper>
        </Box>
    );
};

const Activities = () => {
    const activities = useSelector(selectActivities);

    const cols = [{ field: "name" }, { field: "subject" }, { field: "startTime" }, { field: "endTime" }];

    if (!activities) {
        return <LinearProgress />;
    }

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
                <Link to="/activity">
                    <Button variant="contained" color="primary">
                        <AddRounded />
                    </Button>
                </Link>
            </Box>
            <MinimalTable cols={cols} rows={activities} />
        </BasePaper>
    );
};

const Quotes = () => {
    const { data: quotes } = useSWR("/quote");

    const cols = [{ field: "number" }, { field: "expireDate" }];

    if (!quotes) {
        return <LinearProgress />;
    }

    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">Quotes</Typography>
                <div style={{ flexGrow: 1 }} />
                <Link to="/sales">
                    <Button variant="contained" color="primary">
                        <AddRounded />
                    </Button>
                </Link>
            </Box>
            <MinimalTable cols={cols} rows={quotes} />
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
    const SOs = useSelector(selectSOs);

    const cols = [{ field: "number" }, { field: "estShipDate" }, { field: "actShipDate" }];

    if (!SOs) {
        return <LinearProgress />;
    }

    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">Sales Orders</Typography>
                <div style={{ flexGrow: 1 }} />
            </Box>
            <MinimalTable cols={cols} rows={SOs} />
        </BasePaper>
    );
};

export const Sales = () => {
    const { data: quotes } = useSWR("/quote");
    const activities = useSelector(selectActivities);
    const POs = useSelector(selectPOs);
    const SOs = useSelector(selectSOs);
    return (
        <Grid container spacing={2}>
            <Grid item md={8}>
                <Box display="flex">
                    <StatusCard icon={quote} title="Quotes" value={quotes ? quotes.length : 0}>
                        <div style={{ padding: "0.5em" }}>
                            <LineChart
                                data={[
                                    { createdAt: "2021-03-2", count: 10 },
                                    { createdAt: "2021-03-7", count: 5 },
                                    { createdAt: "2021-03-10", count: 16 },
                                ]}
                                xDataKey="createdAt"
                                barDataKey="count"
                            />
                        </div>
                    </StatusCard>
                    <StatusCard icon={chat} title="Purchase orders" value={POs ? POs.length : 0} />
                    <StatusCard icon={activity} title="Sales Orders" value={SOs ? SOs.length : 0} />
                </Box>
                <Box display="flex">
                    <StatusCard icon={person} title="Activities" value={activities ? activities.length : 0} />
                    <StatusCard icon={speaker} title="Expiring waranties" value="2899"></StatusCard>
                    <StatusCard icon={badge} title="Shippings" value="2899"></StatusCard>
                </Box>
            </Grid>
            <Grid item md={4}>
                <Quotes />
            </Grid>
            <Grid item md={8}>
                <Activities />
            </Grid>
            <Grid item md={4}>
                <Emails />
            </Grid>
            <Grid item md={8}>
                <SalesOrders />
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
        </Grid>
    );
};
