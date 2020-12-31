import React from "react";
import { Typography, Grid, Box, List, ListItem, ListItemText } from "@material-ui/core";
import { SettingsRounded, OpenInBrowserRounded, CachedRounded, InboxRounded } from "@material-ui/icons";

import { BasePaper } from "../app/Paper";
import { NumbersCard, TableCard } from "../app/Cards";

const TotleShipped = () => {
    return (
        <BasePaper>
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
            <Grid item md={2}>
                <NumbersCard
                    title="In production"
                    iconBg="#bfbdff"
                    number={50}
                    total={70}
                    icon={<SettingsRounded style={{ color: "#3b4cbf" }} />}
                />
            </Grid>
            <Grid item md={2}>
                <NumbersCard
                    title="Ready to ship"
                    iconBg="#ffbdbd"
                    number={50}
                    total={70}
                    icon={<OpenInBrowserRounded style={{ color: "#ff0000" }} />}
                />
            </Grid>
            <Grid item md={2}>
                <NumbersCard
                    title="In progress"
                    iconBg="#dffadd"
                    number={50}
                    total={70}
                    icon={<CachedRounded style={{ color: "#3ad2ce" }} />}
                />
            </Grid>
            <Grid item md={6}>
                <TotleShipped />
            </Grid>
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
