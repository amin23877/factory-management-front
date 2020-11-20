import React from "react";
import { Box, Button, Grid, Table, Typography } from "@material-ui/core";
import { FindInPageRounded, SearchRounded } from "@material-ui/icons";

import { BasePaper } from "../app/Paper";
import { BaseTextInput } from "../app/Inputs";
import { BaseTable } from "../app/Table";

function ItemsList() {
    return (
        <Box my={2}>
            <BasePaper>
                <Box display="flex">
                    <Button color="primary" variant="contained">
                        <FindInPageRounded />
                        Filter
                    </Button>
                    <div style={{ flexGrow: 1 }} />
                    <Box display="flex">
                        <BaseTextInput placeholder="Search here..." />
                        <Button color="primary" variant="contained">
                            <SearchRounded />
                            Find
                        </Button>
                    </Box>
                </Box>
                <Box display="flex">
                    <BaseTable
                        tableHeads={["item no.", "item name", "description", "category", "type", "SubType", "On hand", "Status"]}
                        tableRows={[
                            ["1", "test name", "desssc", "cat 1", "type 1", "sub type 1", "true", "pending"],
                            ["2", "item 2", "dddddesc", "cat 1", "type 1", "sub type 1", "false", "pending"],
                        ]}
                    />
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsList;
