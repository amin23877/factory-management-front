import React from "react";
import { Grid, Typography, Box, Button, List, ListItem, ListItemText } from "@material-ui/core";
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

const StatusCard = ({ children, title, icon, iconBg }: { title: string; children: any; iconBg: string; icon: any }) => {
    return (
        <Box m={1} style={{ flex: 1 }}>
            <BasePaper title={title}>
                <IconPaper style={{ padding: 4, background: iconBg }}>{icon}</IconPaper>
                <div style={{ flexGrow: 1 }} />
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
                <Box display="flex" justifyContent="space-between" style={{ height: "50%" }}>
                    <StatusCard title="Activites" icon={<SettingsRounded fontSize="large" />} iconBg={Gradients.warning}>
                        1
                    </StatusCard>
                    <StatusCard title="Emails" icon={<EmailRounded fontSize="large" />} iconBg={Gradients.info}>
                        23
                    </StatusCard>
                    <StatusCard title="Sales Orders" icon={<PaymentRounded fontSize="large" />} iconBg={Gradients.success}>
                        123
                    </StatusCard>
                </Box>
                <Box display="flex" justifyContent="space-between" style={{ height: "50%" }}>
                    <StatusCard title="Quotes" icon={<ChatRounded fontSize="large" />} iconBg={Gradients.info}>
                        132
                    </StatusCard>
                    <StatusCard title="Expiring Waranties" icon={<UpdateRounded fontSize="large" />} iconBg={Gradients.error}>
                        458
                    </StatusCard>
                    <StatusCard title="Opportunities" icon={<EmojiObjectsRounded fontSize="large" />} iconBg={Gradients.warning}>
                        963
                    </StatusCard>
                </Box>
            </Grid>
            <Grid item md={4}>
                <BasePaper>
                    <IconPaper style={{ background: Gradients.error }}>
                        <UpdateRounded fontSize="large" />
                    </IconPaper>
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
