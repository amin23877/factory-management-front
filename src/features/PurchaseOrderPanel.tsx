import React, { useState } from "react";
import { Box, Grid, List, ListItem, Typography, Button, TextField, MenuItem, Tabs, Tab } from "@material-ui/core";

import { BaseSelect } from "../app/Inputs";
import { TabTable } from "../app/Table";
import { BasePaper } from "../app/Paper";

export const PurchaseOrderPanel = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <List>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Client ID
                        </Button>
                    </ListItem>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Add Purchase Order
                        </Button>
                    </ListItem>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Remove Purchase Order
                        </Button>
                    </ListItem>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Show All POs
                        </Button>
                    </ListItem>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Print Report
                        </Button>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <BasePaper>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {["Quote Number", "Entry Date", "Expiration Date", "Create By"].map((item) => (
                                <Box key={item}>
                                    <Typography color="textSecondary">{item}</Typography>
                                    <TextField variant="outlined" fullWidth placeholder={item} />
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
                                <Tab label="Line Items" />
                                <Tab label="Recieving" />
                                <Tab label="Documents" />
                                <Tab label="Notes" />
                                <Tab label="Auditing" />
                            </Tabs>
                            <Box p={3}>
                                {activeTab === 0 && (
                                    <TabTable
                                        tableHead={["Date", "Item No.", "Description", "Item"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "Dessscription", "Item 1"],
                                            ["2020-10-16", "1234", "Dessscription", "Item 2"],
                                        ]}
                                        title="Line Items"
                                    />
                                )}
                                {activeTab === 1 && (
                                    <TabTable
                                        tableHead={["Date", "PO No.", "Description", "Client", "Note"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "Dessscription", "Space X", "..."],
                                            ["2020-10-16", "1234", "Dessscription", "NASA", "..."],
                                        ]}
                                        title="Recieving"
                                    />
                                )}
                                {activeTab === 2 && (
                                    <TabTable
                                        tableHead={["Date", "Document ID", "Document"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "File.docx"],
                                            ["2020-10-16", "1234", "File2.xslx"],
                                        ]}
                                        title="Documents"
                                    />
                                )}
                                {activeTab === 3 && (
                                    <TabTable
                                        tableHead={["Date", "Note no.", "Note"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "Nooooooote."],
                                            ["2020-10-16", "1234", "A lot of notes here..."],
                                        ]}
                                        title="Notes"
                                    />
                                )}
                                {activeTab === 4 && <code>This is Auditing</code>}
                            </Box>
                        </Grid>
                    </Grid>
                </BasePaper>
            </Grid>
        </Grid>
    );
};
