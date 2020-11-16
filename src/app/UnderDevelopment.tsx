import React from "react";
import { Box, Typography } from "@material-ui/core";
import { BuildRounded } from "@material-ui/icons";

import { Gradients } from "../theme";
import { BasePaper, IconPaper } from "./Paper";

export default function UnderDevelopment() {
    return (
        <BasePaper style={{ margin: "1em 0" }}>
            <IconPaper style={{ background: Gradients.error }}>
                <BuildRounded fontSize="large" />
            </IconPaper>
            <Typography style={{ textAlign: "center", margin: "5em 0" }} variant="h5">
                This section is under Development
            </Typography>
        </BasePaper>
    );
}
