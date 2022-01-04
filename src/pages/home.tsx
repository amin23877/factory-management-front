import React, { ReactNode } from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
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

import "../styles/dashboard.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const useStyles = makeStyles({
    topHeader: {
        textAlign: "center",
        margin: "2em 0",
    },
    itemCont: {
        width: "90%",
        height: "95%",
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
        // padding: "4em 5em",
        borderRadius: "1em",
        transition: "all 300ms",
        "& > svg": {
            fontSize: "6em",
        },
    },
});

const ItemCard = ({
    icon,
    title,
    href,
    handleChange,
}: {
    icon: ReactNode;
    title: string;
    href: string;
    handleChange: any;
}) => {
    const classes = useStyles();
    return (
        <Link to={href} style={{ color: "#555", textDecoration: "none" }} onClick={() => handleChange(null, href)}>
            <Box className={classes.itemCont}>
                <div className={classes.itemIcon}>{icon}</div>
                <Typography style={{ margin: "1em 0" }}>{title}</Typography>
            </Box>
        </Link>
    );
};

export default function Home({ handleChange }: { handleChange: any }) {
    const phone = useMediaQuery("(max-width:1200px)");

    return (
        <Box style={{ zIndex: 5 }} display="flex" alignItems="center">
            <Box
                display="grid"
                gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"}
                height="calc(100vh - 100px)"
                flex={1}
            >
                <ItemCard icon={<AssessmentRounded />} title="Sales" href="/panel/sales" handleChange={handleChange} />
                <ItemCard
                    icon={<PaymentRounded />}
                    title="Purchase"
                    href="/panel/purchase"
                    handleChange={handleChange}
                />
                <ItemCard
                    icon={<GpsFixedRounded />}
                    title="Inventory"
                    href="/panel/inventory"
                    handleChange={handleChange}
                />
                <ItemCard
                    icon={<AlternateEmailRounded />}
                    title="Engineering"
                    href="/panel/engineering"
                    handleChange={handleChange}
                />
                <ItemCard
                    icon={<PersonRounded />}
                    title="Production"
                    href="/panel/production"
                    handleChange={handleChange}
                />
                <ItemCard
                    icon={<LocalActivityRounded />}
                    title="Shipping"
                    href="/panel/shipping"
                    handleChange={handleChange}
                />
                <ItemCard
                    icon={<AccountBoxRounded />}
                    title="Service"
                    href="/panel/fieldservice"
                    handleChange={handleChange}
                />
                <ItemCard icon={<AccountTreeRounded />} title="Roles" href="/panel/roles" handleChange={handleChange} />
            </Box>
        </Box>
    );
}
