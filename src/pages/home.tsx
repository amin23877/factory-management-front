import React from "react";
import { Typography, Button, Box, Container, Grid, makeStyles } from "@material-ui/core";
import {
    DashboardRounded,
    PersonRounded,
    PaymentRounded,
    InboxRounded,
    AssessmentRounded,
    SettingsRounded,
    LoyaltyRounded,
    AccountBalanceRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import { BasePaper } from "../app/Paper";

const useStyles = makeStyles({
    homeCard: {
        transition: "600ms all",
        position: "relative",
        top: 0,
        "&:hover": {
            top: -50,
        },
    },
});

const HomeCard = ({ children, bg, href, title }: { children: any; bg: string; href: string; title: string }) => {
    const classes = useStyles();

    return (
        <BasePaper style={{ padding: 0 }}>
            <Link to={href} style={{ color: "#000", textDecoration: "none", height: "100%" }}>
                <Button
                    className={classes.homeCard}
                    style={{ borderRadius: 20, color: "#fff", width: "100%", height: "100%", background: bg }}
                >
                    {children}
                </Button>
                <Typography style={{ textAlign: "center", marginTop: -40 }}>{title}</Typography>
            </Link>
        </BasePaper>
    );
};

const home = () => {
    return (
        <Container>
            <Box my={1} display="flex" flexDirection="column" flexWrap="wrap" style={{ width: "100%", height: "85vh" }}>
                <Grid container spacing={3} style={{ height: "100%" }}>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/dashboard" title="Dashboard">
                            <DashboardRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/clients" title="Clients">
                            <PersonRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/sales" title="Sales">
                            <PaymentRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/inventory" title="Inventory">
                            <InboxRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/report" title="Report">
                            <AssessmentRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/admin" title="Administration">
                            <SettingsRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/vendors" title="Vendors">
                            <LoyaltyRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={12} style={{ minHeight: 120 }}>
                        <HomeCard bg="#373a4d" href="/accounting" title="Accounting">
                            <AccountBalanceRounded fontSize="large" />
                        </HomeCard>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default home;
