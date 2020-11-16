import React, { useState } from "react";
import { Container, Box, Grid, List, ListItem, Typography, Button, TextField, MenuItem, Tabs, Tab } from "@material-ui/core";

import { BaseSelect } from "../app/Inputs";
import { TabTable } from "../app/Table";
import { BasePaper } from "../app/Paper";

export default function Clients() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container style={{ padding: "1em 0" }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <List>
                        <ListItem style={{ justifyContent: "center" }}>
                            <Button variant="contained" color="primary" fullWidth>
                                Add Client
                            </Button>
                        </ListItem>
                        <ListItem style={{ justifyContent: "center" }}>
                            <Button variant="contained" color="primary" fullWidth>
                                Remove Client
                            </Button>
                        </ListItem>
                        <ListItem style={{ justifyContent: "center" }}>
                            <Button variant="contained" color="primary" fullWidth>
                                Show All Clients
                            </Button>
                        </ListItem>
                        <ListItem style={{ justifyContent: "center" }}>
                            <Button variant="contained" color="primary" fullWidth>
                                Print Report
                            </Button>
                        </ListItem>
                        <ListItem style={{ justifyContent: "center" }}>
                            <Button variant="contained" color="primary" fullWidth>
                                Enter a Payment
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <BasePaper>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                {["Phazify ID", "Client Name", "Client Address", "Client Phone"].map((item) => (
                                    <Box key={item}>
                                        <Typography color="textSecondary">{item}</Typography>
                                        <TextField variant="outlined" fullWidth placeholder={item} />
                                    </Box>
                                ))}
                            </Grid>
                            <Grid item xs={4}>
                                {["Client Email", "Client Website", "Main Contact"].map((item) => (
                                    <Box key={item}>
                                        <Typography>{item}</Typography>
                                        <TextField variant="outlined" fullWidth placeholder={item} />
                                    </Box>
                                ))}
                                <Box>
                                    <Typography>Client Type</Typography>
                                    <BaseSelect fullWidth>
                                        <MenuItem>1</MenuItem>
                                        <MenuItem>2</MenuItem>
                                        <MenuItem>3</MenuItem>
                                    </BaseSelect>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
                                    <Tab label="Related Sales Order" />
                                    <Tab label="Documents" />
                                    <Tab label="Notes" />
                                    <Tab label="Auditing" />
                                </Tabs>
                                <Box p={3}>
                                    {activeTab === 0 && (
                                        <TabTable
                                            tableHead={["Date", "SO No.", "Description", "Status", "Note"]}
                                            tableRows={[
                                                ["2020-10-16", "1234", "Dessscription", "Pending", "..."],
                                                ["2020-10-16", "1234", "Dessscription", "Pending", "..."],
                                            ]}
                                            title="Related Sales Order"
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
        </Container>
    );
}
