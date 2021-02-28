import React, { ReactNode } from "react";
import { Typography, Box, Container, makeStyles } from "@material-ui/core";
import {
    GpsFixedRounded,
    PersonRounded,
    PaymentRounded,
    AssessmentRounded,
    LocalActivityRounded,
    AlternateEmailRounded,
    AccountBoxRounded,
    AccountTreeRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    topHeader: {
        textAlign: "center",
        margin: "2em 0",
    },
    itemCont: {
        margin: "0 1em",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        borderRadius: "1em",
        "&:hover $itemIcon": {
            backgroundColor: "#1a73e8",
            boxShadow: "0 0 10px 5px rgba(0,0,0,0.1)",
        },
        "&:hover $itemIcon > svg": {
            color: "#fff",
            fontSize: "6em",
        },
    },
    itemIcon: {
        padding: "4em 5em",
        borderRadius: "1em",
        transition: "all 300ms",
        "& > svg": {
            fontSize: "6em",
        },
    },
});

const ItemCard = ({ icon, title, href }: { icon: ReactNode; title: string; href: string }) => {
    const classes = useStyles();

    return (
        <Link to={href} style={{ color: "#555", textDecoration: "none" }}>
            <Box className={classes.itemCont}>
                <div className={classes.itemIcon}>{icon}</div>
                <Typography style={{ margin: "1em 0" }}>{title}</Typography>
            </Box>
        </Link>
    );
};

export default function Home() {
    const classes = useStyles();

    return (
        <Container>
            <Box my={4} display="flex" justifyContent="center">
                <ItemCard icon={<PaymentRounded />} title="Dashboard" href="/dashboard" />
                <ItemCard icon={<PersonRounded />} title="Clients" href="/clients" />
                <ItemCard icon={<AssessmentRounded />} title="Sales" href="/sales" />
                <ItemCard icon={<GpsFixedRounded />} title="Inventory" href="/inventory" />
            </Box>
            <Box my={4} display="flex" justifyContent="center">
                <ItemCard icon={<AccountBoxRounded />} title="Roles" href="/roles" />
                <ItemCard icon={<LocalActivityRounded />} title="Activity" href="/activity" />
                <ItemCard icon={<AccountTreeRounded />} title="Projects" href="/project" />
                <ItemCard icon={<AlternateEmailRounded />} title="Prospects" href="#" />
            </Box>
        </Container>
    );
}
