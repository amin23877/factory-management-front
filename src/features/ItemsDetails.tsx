import React, { useState } from "react";
import {
    Box,
    Grid,
    List,
    ListItem,
    Button,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    Tabs,
    Tab,
    Divider,
    Typography,
} from "@material-ui/core";
import { AddRounded, FileCopyRounded, DeleteRounded, PrintRounded } from "@material-ui/icons";

import { BasePaper } from "../app/Paper";
import { TabTable } from "../app/Table";
import { BaseSelect, BaseTextInput } from "../app/Inputs";

const MoreInfo = ({ itemType, onChangeType }: { itemType: string; onChangeType: (arg0: string) => void }) => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box>
                <BaseTextInput placeholder="Item Version" style={{ margin: "4px 0" }} />
                <BaseTextInput placeholder="Keywords" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="Web URI" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="Item Cost" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="Retail Price" style={{ marginBottom: 3 }} />
                <Divider />
                <Typography style={{ fontWeight: "bold", textAlign: "center" }}> Markup 200 %</Typography>
            </Box>
            <Box mx={2}>
                <RadioGroup name="Item Type Radios" value={itemType} onChange={(e) => onChangeType(e.target.value)}>
                    <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                    <FormControlLabel value="Bundle" control={<Radio />} label="Bundle" />
                    <FormControlLabel value="Kit" control={<Radio />} label="Kit" />
                </RadioGroup>
            </Box>
            <Box>
                <Box style={{ padding: "4em 3em", border: "2px dashed gray", borderRadius: 20 }}></Box>
            </Box>
        </Box>
    );
};

const Quantity = () => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box flex={2} mr={2}>
                <BaseTextInput placeholder="Quantity Adjustment" style={{ margin: "3px 0" }} />
                <BaseTextInput placeholder="Total Qty Recieved" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="Total Qty Sold" style={{ marginBottom: 3 }} />
                <Divider style={{ margin: "1.5em 0" }} />
                <BaseTextInput placeholder="Quantity on Hand" style={{ marginBottom: 3 }} />
            </Box>
            <Box flex={1}>
                <BaseTextInput placeholder="Minimum" style={{ margin: "3px 0" }} />
                <BaseTextInput placeholder="Maximum" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="On Order" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="On BackOrder" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="ReOrded Qty" style={{ marginBottom: 3 }} />
            </Box>
        </Box>
    );
};

const Shipping = () => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Box>
                <BaseTextInput placeholder="Pref vendor" style={{ margin: "3px 0" }} />
                <BaseTextInput placeholder="Item tiers" style={{ marginBottom: 3 }} />
                <BaseTextInput placeholder="Aditional Shipping Fee" style={{ marginBottom: 3 }} />
                <Divider style={{ margin: "1em 0" }} />
                <Box display="flex">
                    <Typography style={{ flex: 1 }}>Item Weight</Typography>
                    <BaseTextInput style={{ flex: 1 }} placeholder="lb" />
                    <BaseTextInput style={{ flex: 1 }} placeholder="oz" />
                </Box>
                <Box display="flex" mt={1}>
                    <Typography style={{ flex: 1 }}>Shipping Weight</Typography>
                    <BaseTextInput style={{ flex: 1 }} placeholder="lb" />
                    <BaseTextInput style={{ flex: 1 }} placeholder="oz" />
                </Box>
            </Box>
        </Box>
    );
};

function ItemsDetails() {
    const [itemActive, setItemActive] = useState("");
    const [itemType, setItemType] = useState("");
    const [moreInfoTab, setMoreInfoTab] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <List>
                    <ListItem>
                        <Button title="add item" variant="contained" color="primary" fullWidth>
                            <AddRounded />
                            {/* Add Item */}
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button title="copy item" variant="contained" color="primary" fullWidth>
                            <FileCopyRounded />
                            {/* Duplicate Item */}
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button title="delete item" variant="contained" color="primary" fullWidth>
                            <DeleteRounded />
                            {/* Delete Item */}
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button title="print Bill of Material" variant="contained" color="primary" fullWidth>
                            <PrintRounded />
                            BOM
                        </Button>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={10}>
                <BasePaper>
                    <Grid container spacing={1}>
                        <Grid item xs={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <TextField placeholder="Item Name" variant="outlined" fullWidth />
                            <TextField placeholder="UPC" style={{ marginTop: "0.5em" }} variant="outlined" fullWidth />
                            <TextField placeholder="Item SKU" style={{ margin: "0.5em 0" }} variant="outlined" fullWidth />
                            <TextField placeholder="Description" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <TextField placeholder="Item No." variant="outlined" fullWidth />
                            <BaseSelect placeholder="Category" style={{ marginTop: "0.5em" }} fullWidth />
                            <BaseSelect placeholder="Type" style={{ margin: "0.35em 0" }} fullWidth />
                            <BaseSelect placeholder="SubType" fullWidth />
                        </Grid>
                        <Grid item xs={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <TextField placeholder="MFGR" variant="outlined" fullWidth />
                            <TextField placeholder="Color" style={{ marginTop: "0.5em" }} variant="outlined" fullWidth />
                            <TextField placeholder="Size" style={{ margin: "0.5em 0" }} variant="outlined" fullWidth />
                            <TextField placeholder="Variance" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <Tabs value={moreInfoTab} onChange={(e, v) => setMoreInfoTab(v)}>
                                <Tab label="More Info." />
                                <Tab label="Quantity" />
                                <Tab label="Shipping" />
                            </Tabs>
                            {moreInfoTab === 0 && <MoreInfo itemType={itemType} onChangeType={setItemType} />}
                            {moreInfoTab === 1 && <Quantity />}
                            {moreInfoTab === 2 && <Shipping />}
                        </Grid>
                        <Grid item xs={12} style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                            <TextField style={{ marginRight: "1em" }} fullWidth placeholder="Special Notes" variant="outlined" multiline />
                            <RadioGroup name="item active radios" value={itemActive} onChange={(e) => setItemActive(e.target.value)}>
                                <FormControlLabel value="active" control={<Radio />} label="Active" />
                                <FormControlLabel value="inactive" control={<Radio />} label="InActive" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "1em" }}>
                            {/* <Divider /> */}
                            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="scrollable">
                                <Tab label="Kit / Bundle" />
                                <Tab label="Vendors" />
                                <Tab label="Notes" />
                                <Tab label="Documents" />
                                <Tab label="SO History" />
                                <Tab label="PO History" />
                                <Tab label="Auditing" />
                            </Tabs>
                            <Box p={3}>
                                {activeTab === 0 && (
                                    <TabTable
                                        tableHead={["Item no.", "Item Name", "Description", "Type", "Vendor", "Qty", "Cost"]}
                                        tableRows={[
                                            ["1234", "Item 1", "description here", "lorem", "BMW", 500, "1500$"],
                                            ["1235", "Item 1", "description here", "lorem", "BMW", 500, "1500$"],
                                        ]}
                                        title="Kit / Bundle"
                                    />
                                )}
                                {activeTab === 1 && (
                                    <TabTable
                                        tableHead={["Vendor No.", "Vendor", "Comment"]}
                                        tableRows={[
                                            ["1234", "BMW", "comment 1"],
                                            ["1235", "Benz", "comment 2"],
                                        ]}
                                        title="Vendors"
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
                                {activeTab === 3 && (
                                    <TabTable
                                        tableHead={["Date", "Document ID", "Document"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "File.docx"],
                                            ["2020-10-16", "1234", "File2.xslx"],
                                        ]}
                                        title="Documents"
                                    />
                                )}
                                {activeTab === 4 && (
                                    <TabTable
                                        tableHead={[
                                            "Date",
                                            "SO No.",
                                            "Client",
                                            "Desc",
                                            "Date Inv'd",
                                            "Price",
                                            "Qty",
                                            "Total Qty sold",
                                            "Total sales",
                                        ]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "Benz", "desc 1", "2020-10-20", "2000$", 500, 10, 100],
                                            ["2020-10-16", "1234", "Benz", "desc 1", "2020-10-20", "2000$", 500, 10, 100],
                                        ]}
                                        title="SO History"
                                    />
                                )}
                                {activeTab === 5 && (
                                    <TabTable
                                        tableHead={["Date", "PO No.", "Client", "Desc", "Date Inv'd", "Price", "Qty", "Total"]}
                                        tableRows={[
                                            ["2020-10-16", "1234", "Benz", "desc 1", "2020-11-20", "500$", 5000, "10000"],
                                            ["2020-10-16", "1234", "Benz", "desc 1", "2020-11-20", "500$", 5000, "10000"],
                                        ]}
                                        title="PO History"
                                    />
                                )}
                                {activeTab === 6 && <TabTable tableHead={[]} tableRows={[]} title="Auditing" />}
                            </Box>
                        </Grid>
                    </Grid>
                </BasePaper>
            </Grid>
        </Grid>
    );
}

export default ItemsDetails;
