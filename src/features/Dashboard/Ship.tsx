import React from "react";
import { Typography, Grid, Box, List, ListItem, ListItemText } from "@material-ui/core";
import { SettingsRounded, OpenInBrowserRounded, CachedRounded, InboxRounded } from "@material-ui/icons";

import { BasePaper } from "../../app/Paper";
import { NumbersCard, TableCard } from "../../app/Cards";

const TotleShipped = () => {
    return (
        <BasePaper style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
            <Box display="flex" alignItems="center">
                <Typography variant="h6">Total Shipped</Typography>
                <div style={{ flexGrow: 1 }} />
                <Box display="flex" style={{ backgroundColor: "#ebefff", padding: 8, borderRadius: 100 }}>
                    <InboxRounded style={{ color: "#476bff" }} />
                </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-around">
                <List>
                    <ListItem>
                        <ListItemText>1816 Shipped total</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>1 on hold</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>35 Backroder</ListItemText>
                    </ListItem>
                </List>
            </Box>
        </BasePaper>
    );
};

export const Ship = () => {
    return (
        <Grid container spacing={2}>
            <div style={{ display: "flex", width: "100%", height: "230px" }}>
                <div style={{ flexGrow: 1, margin: "10px", width: "22%" }}>
                    <NumbersCard
                        title="Number"
                        iconBg="#fff"
                        number={50}
                        total={70}
                        numcolor={"rgb(93,210,172)"}
                        discription="total productions number"
                        icon={<SettingsRounded style={{ color: "rgb(76,158,255)" }} />}
                    />
                </div>
                <div style={{ flexGrow: 1, margin: "10px", width: "22%" }}>
                    <NumbersCard
                        title="Ready"
                        iconBg="#fff"
                        number={20}
                        total={70}
                        numcolor={"rgb(231,99,101)"}
                        discription="total ready to ship number"
                        icon={<OpenInBrowserRounded style={{ color: "rgb(255,194,102)" }} />}
                    />
                </div>
                <div style={{ flexGrow: 1, margin: "10px", width: "22%" }}>
                    <NumbersCard
                        title="progress"
                        iconBg="#fff"
                        number={50}
                        total={70}
                        numcolor={"rgb(93,210,172)"}
                        discription="total in progressing  number"
                        icon={<CachedRounded style={{ color: "rgb(38,212,155)" }} />}
                    />
                </div>
                <div style={{ flexGrow: 3, width: "34%", margin: "10px" }}>
                    <TotleShipped />
                </div>
            </div>
            <Grid item md={6}>
                <TableCard
                    title="Sales Order - In Production"
                    tableHeads={["SO date", "SO no.", "Description", "Client", "Price", "Note"]}
                    tableRows={[
                        ["2020-11-14", "1234", "lorem", "Space x", "1000", "note..."],
                        ["2020-11-14", "1234", "lorem", "BMW", "1000", "note..."],
                    ]}
                />
            </Grid>
            <Grid item md={6}>
                <TableCard
                    title="Sales Order - Ready To Ship"
                    tableHeads={["SO date", "SO no.", "Description", "Client", "Price", "Note"]}
                    tableRows={[
                        ["2020-11-14", "1234", "lorem", "Space x", "1000", "note..."],
                        ["2020-11-14", "1234", "lorem", "BMW", "1000", "note..."],
                    ]}
                />
            </Grid>
            <Grid item md={6}>
                <TableCard
                    title="Shipments - In Progress"
                    tableHeads={["Ship date", "Ship no.", "Expiration Date", "Client", "Status", "Description"]}
                    tableRows={[
                        ["2020-11-14", "1234", "2020-12-20", "Benz", "Packing", "..."],
                        ["2020-11-14", "1234", "2020-12-20", "Uber", "Maintance", "..."],
                    ]}
                />
            </Grid>
            <Grid item md={6}>
                <TableCard
                    title="Shipments - Shipped"
                    tableHeads={["Ship date", "Ship no.", "Expiration Date", "Client", "Status", "Description"]}
                    tableRows={[
                        ["2020-11-14", "1234", "2020-12-20", "Benz", "Packing", "..."],
                        ["2020-11-14", "1234", "2020-12-20", "Uber", "Maintance", "..."],
                    ]}
                />
            </Grid>
        </Grid>
    );
};
