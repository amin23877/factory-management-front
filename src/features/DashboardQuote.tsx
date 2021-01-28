import React, { useState } from "react";
import { Box, Grid, List, ListItem, ListItemText, Typography, Button, MenuItem } from "@material-ui/core";
import { CalendarTodayRounded, UpdateRounded, SearchRounded, RefreshRounded, SettingsRounded } from "@material-ui/icons";

import { BaseSelect, BaseTextInput } from "../app/Inputs";
import { BaseTable } from "../app/Table";
import { BasePaper, IconPaper } from "../app/Paper";
import { Gradients } from "../theme";

const UnitsDueDateList = () => {
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <div style={{ backgroundColor: "#ebefff", padding: 8, paddingBottom: 2, borderRadius: 100 }}>
                    <UpdateRounded htmlColor="#006cff" />
                </div>
                <Typography style={{ margin: "0 1em" }}>Units due date</Typography>
            </Box>
            <List>
                {["this-week", "week-1", "week-2", "week-3"].map((item) => (
                    <ListItem key={item} style={{ borderLeft: "3px solid #006cff", paddingBottom: 2, margin: "4px 0" }}>
                        <ListItemText style={{ borderBottom: "1px solid #f5f5f5" }}>10 units due {item}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </BasePaper>
    );
};

const SearchForSO = () => {
    const [val, setVal] = useState("");
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <div style={{ backgroundColor: "#ebefff", padding: 8, paddingBottom: 2, borderRadius: 100 }}>
                    <SearchRounded htmlColor="#006cff" />
                </div>
                <Typography style={{ margin: "0 1em" }}>Search for SO</Typography>
            </Box>
            <div style={{ flexGrow: 2 }} />
            <BaseSelect style={{ margin: "1em 0" }} value={val} onChange={(e) => setVal(e.target.value as string)}>
                <MenuItem value="item">item</MenuItem>
                <MenuItem value="item1">item1</MenuItem>
                <MenuItem value="item2">item2</MenuItem>
                <MenuItem value="item3">item3</MenuItem>
            </BaseSelect>
            <BaseTextInput placeholder="Search for..." />
            <div style={{ flexGrow: 1 }} />
        </BasePaper>
    );
};

const UnitsOverDue = () => {
    return (
        <BasePaper style={{ justifyContent: "space-between" }}>
            <Box display="flex" justifyContent="space-between">
                <BaseTextInput placeholder="Overdue Units as of..." />
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary" style={{ margin: "0 1em" }}>
                    <RefreshRounded />
                </Button>
                <Button variant="contained" color="primary">
                    <SettingsRounded />
                </Button>
            </Box>
            <BaseTable
                tableHeads={["Ship date", "SO no.", "Unit Serial", "Status"]}
                tableRows={[
                    ["2020-11-14", "1", "1234", "OK"],
                    ["2020-11-14", "1", "1234", "OK"],
                ]}
            />
        </BasePaper>
    );
};

const Manufacturing = () => {
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Box mr={2} display="flex" style={{ backgroundColor: "#ebefff", padding: 8, borderRadius: 100 }}>
                    <CalendarTodayRounded style={{ color: "#006cff" }} />
                </Box>
                <Typography variant="h6" color="textSecondary">
                    Manufacturing
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary">
                    SO Report
                </Button>
            </Box>
            <BaseTable
                tableHeads={["Ship date", "Serial no.", "Description", "Status", "Note"]}
                tableRows={[
                    ["2020-11-14", "1234", "Audi - RS7", "Assembling", "..."],
                    ["2020-11-14", "1234", "Benz - S500", "Test and Evaluation", "..."],
                ]}
            />
        </BasePaper>
    );
};

const Servicing = () => {
    return (
        <BasePaper>
            <Box display="flex" alignItems="center">
                <Box mr={2} display="flex" style={{ backgroundColor: "#ebefff", padding: 8, borderRadius: 100 }}>
                    <CalendarTodayRounded style={{ color: "#006cff" }} />
                </Box>
                <Typography variant="h6" color="textSecondary">
                    Servicing
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary">
                    Services
                </Button>
            </Box>
            <BaseTable
                tableHeads={["Ship date", "Serial no.", "Description", "Assigned", "Status", "Note"]}
                tableRows={[
                    ["2020-11-14", "1234", "Airbag problem", "Airbag dep", "Maintance", "..."],
                    ["2020-11-14", "1234", "Airbag problem", "Airbag dep", "Maintance", "..."],
                ]}
            />
        </BasePaper>
    );
};

export default function Quote() {
    return (
        <Grid container spacing={4}>
            <Grid item md={3} sm={6}>
                <UnitsDueDateList />
            </Grid>
            <Grid item md={3} sm={6}>
                <SearchForSO />
            </Grid>
            <Grid item md={6} xs={12}>
                <UnitsOverDue />
            </Grid>
            <Grid item xs={12}>
                <Manufacturing />
            </Grid>
            <Grid item xs={12}>
                <Servicing />
            </Grid>
        </Grid>
    );
}
