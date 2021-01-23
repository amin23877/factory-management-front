import React, { useState } from "react";
import { Box, Grid, List, ListItem, Typography, Button, TextField, Tabs, Tab } from "@material-ui/core";

import { AddRounded, RemoveRounded, SearchRounded, PrintRounded } from "@material-ui/icons";

import { TabTable } from "../app/Table";
import { BasePaper } from "../app/Paper";

export const QuotePanel = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Grid container spacing={3}>
            <Grid item xs={1}>
                <Box px={1} display="flex" flexDirection="column" my={2}>
                    <Button title="Add item" variant="outlined">
                        <AddRounded />
                    </Button>
                    <Button title="Delete item" variant="outlined" style={{ margin: "1em 0" }}>
                        <RemoveRounded />
                    </Button>
                    <Button title="Payment" variant="outlined">
                        <SearchRounded />
                    </Button>
                    <Button title="Print a report" variant="outlined" style={{ margin: "1em 0" }}>
                        <PrintRounded />
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={11}>
                <BasePaper>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {["Quote Number", "Entry Date", "Expiration Date", "Create By"].map((item) => (
                                <Box key={item}>
                                    <Typography color="textSecondary">{item}</Typography>
                                    <TextField variant="outlined" fullWidth placeholder={item} />
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={4}>
                            <List style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <ListItem style={{ justifyContent: "center" }}>
                                    <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                                        Client ID
                                    </Button>
                                </ListItem>
                                <ListItem style={{ justifyContent: "center" }}>
                                    <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                                        Project Name
                                    </Button>
                                </ListItem>
                                <ListItem style={{ justifyContent: "center" }}>
                                    <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                                        Entity
                                    </Button>
                                </ListItem>
                                <ListItem style={{ justifyContent: "center" }}>
                                    <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                                        Sales Order Number
                                    </Button>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
                                <Tab label="Line Items" />
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
                                        tableHead={["Date", "Document ID", "Document"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "File.docx"],
                                            ["2020-10-16", "1234", "File2.xslx"],
                                        ]}
                                        title="Documents"
                                    />
                                )}
                                {activeTab === 2 && (
                                    <TabTable
                                        tableHead={["Date", "Note no.", "Note"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "Nooooooote."],
                                            ["2020-10-16", "1234", "A lot of notes here..."],
                                        ]}
                                        title="Notes"
                                    />
                                )}
                                {activeTab === 3 && <code>This is Auditing</code>}
                            </Box>
                        </Grid>
                    </Grid>
                </BasePaper>
            </Grid>
        </Grid>
    );
};
