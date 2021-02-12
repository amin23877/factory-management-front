import React, { useState } from "react";
import { Box, Grid, List, ListItem, Typography, Button, MenuItem, FormControlLabel, Checkbox, Tabs, Tab } from "@material-ui/core";

import TextField from "../app/TextField";
import { ArraySelect } from "../app/Inputs";
import { TabTable } from "../app/Table";
import { BasePaper } from "../app/Paper";

export const SalesOrderPanel = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <List>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Approvals
                        </Button>
                    </ListItem>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Add a Sales Order
                        </Button>
                    </ListItem>
                    <ListItem style={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                            Remove a Sales Order
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
                        <Grid item xs={8}>
                            {["Sales Order Number", "Sales Order Date", "Lead Time", "Aknowledgement Date"].map((item) => (
                                <Box key={item}>
                                    <Typography color="textSecondary">{item}</Typography>
                                    <TextField fullWidth placeholder={item} />
                                </Box>
                            ))}
                            <Box display="flex" justifyContent="space-between" my={1}>
                                <ArraySelect items={["test"]} />
                                <FormControlLabel style={{ marginLeft: "1em" }} control={<Checkbox />} label="Expedited" />
                            </Box>
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
                                        Quote Number
                                    </Button>
                                </ListItem>
                                <ListItem style={{ justifyContent: "center" }}>
                                    <Button variant="contained" color="primary" style={{ padding: "1em 2em" }} fullWidth>
                                        Invoice Number
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
