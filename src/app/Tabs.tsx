import React from "react";
import { Tabs, Tab, TabProps, withStyles, createStyles, Theme } from "@material-ui/core";

export const MyTabs = withStyles({
    root: {
        border: "1px solid #848484",
        borderRadius: "0.5em",
    },
    indicator: {
        backgroundColor: "#ccc",
        height: 0,
    },
})(Tabs);

export const MyTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: "none",
            minWidth: "2em",
            "&:hover": {
                color: "#aaa",
                opacity: 1,
            },
            "&$selected": {
                backgroundColor: "#1a73e8",
                color: "#fff",
            },
            "&:active": {
                color: "#aaa",
            },
            "&:focus": {
                color: "#fff",
            },
        },
        selected: {},
    })
)((props: TabProps) => <Tab disableRipple {...props} />);
