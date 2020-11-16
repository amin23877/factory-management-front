import React, { useState } from "react";
import { Tabs, Tab, withStyles, fade } from "@material-ui/core";

interface MyTabsProps {
    value: number;
    onChange: any;
}

const MyTabs = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            maxWidth: 40,
            width: "100%",
            backgroundColor: "#fff",
        },
    },
})((props: MyTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const MyTab = withStyles((theme) => ({
    root: {
        margin: "0 0.5em",
        borderRadius: 10,
        color: theme.palette.primary.main,
        fontWeight: "bold",
        border: "3px solid" + theme.palette.primary.main,
    },
    selected: {
        color: "#fff",
        backgroundColor: theme.palette.primary.main,
    },
}))(Tab);

export const MainTabs = ({ currentTab, onChange, tabs }: { currentTab: number; onChange: any; tabs: string[] }) => {
    return (
        <MyTabs value={currentTab} onChange={(e: any, v: number) => onChange(v)}>
            {tabs.map((tab) => (
                <MyTab label={tab} key={tab} />
            ))}
        </MyTabs>
    );
};
