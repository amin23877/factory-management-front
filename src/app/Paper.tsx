import React from "react";
import { Paper, withStyles, PaperProps } from "@material-ui/core";

export const BasePaper = withStyles((theme) => ({
    root: {
        borderRadius: 20,
        height: "100%",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}))((props: PaperProps) => <Paper {...props} elevation={0} />);

export const IconPaper = withStyles((theme) => ({
    root: {
        borderRadius: 10,
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
    },
}))((props: PaperProps) => <Paper {...props} elevation={5} />);
