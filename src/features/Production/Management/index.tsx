import React from "react";
import { Box, IconButton, ListItem, Typography } from "@material-ui/core";

import Form from "./Form";

import List from "../../../app/SideUtilityList";
import { BasePaper } from "../../../app/Paper";
import { AddRounded, DeleteRounded, FormatListNumberedRounded } from "@material-ui/icons";

function Management() {
    return (
        <Box display="grid" gridTemplateColumns="80px 8fr" gridGap={10}>
            <Box>
                <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
                    <ListItem>
                        <IconButton>
                            <AddRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton>
                            <FormatListNumberedRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton>
                            <DeleteRounded />
                        </IconButton>
                    </ListItem>
                </List>
            </Box>
            <Box display="grid" gridTemplateColumns="2fr 3fr" gridGap={10}>
                <BasePaper>
                    <Typography variant="h5">Manage labor costs</Typography>
                    <Form />
                </BasePaper>
            </Box>
        </Box>
    );
}

export default Management;
