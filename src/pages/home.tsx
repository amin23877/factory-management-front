import React, { ReactNode } from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
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
}: {
  icon: ReactNode;
  title: string;
  href: string;
}) => {
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
  return (
    <div style={{ zIndex: 5 }}>
      <div className="Homebg"></div>
      <div className="HomeContain"></div>
      <Box style={{ height: "87vh" }}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<PaymentRounded />}
              title="Dashboard"
              href="/panel/dashboard"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<PersonRounded />}
              title="Production"
              href="/panel/production"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<AssessmentRounded />}
              title="Sales"
              href="/panel/sales"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<GpsFixedRounded />}
              title="Inventory"
              href="/panel/inventory"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<AccountBoxRounded />}
              title="Roles"
              href="/panel/roles"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<AlternateEmailRounded />}
              title="Engineering"
              href="/panel/engineering"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<LocalActivityRounded />}
              title="Activity"
              href="/panel/activity"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              icon={<AccountTreeRounded />}
              title="Projects"
              href="/panel/projects"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
