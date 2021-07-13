import React from "react";
import { makeStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
    root: {
        padding: 10,
        display: "flex",
    },
    green: {
        marginRight: 2,
        color: "#4caf50",
    },
    red: {
        marginRight: 2,
        color: "#d9182e",
    },
});

export function CustomFooterStatusComponent({ submited }: { submited: boolean }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FiberManualRecordIcon fontSize="small" className={!submited ? classes.green : classes.red} />
            {!submited ? "Submited" : "Not submited"}
        </div>
    );
}
