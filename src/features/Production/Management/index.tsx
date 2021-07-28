import React from "react";
import { Box, Typography } from "@material-ui/core";

import Form from "./Form";

import { BasePaper } from "../../../app/Paper";

function Management() {
    return (
        <Box display="grid" gridTemplateColumns="2fr 3fr" gridGap={10}>
            <BasePaper>
                <Typography variant="h5">Manage labor costs</Typography>
                <Form />
            </BasePaper>
        </Box>
    );
}

export default Management;
