import React from "react";
import { Tabs, Tab, withStyles, createStyles, Theme } from "@material-ui/core";
import tabBG from "../assets/tabBG.png";
// const useStyles = makeStyles({
//     root: {
//         textTransform: "none",
//         minWidth: "2em",
//         minHeight: "45px",
//         "&:hover": {
//             color: "#aaa",
//             opacity: 1,
//         },
//         "&$selected": {
//             backgroundColor: "#1a73e8",
//             borderRadius: "0.5em",
//             color: "#fff",
//         },
//         "&:active": {
//             borderRadius: "0.5em",
//             color: "#aaa",
//         },
//         "&:focus": {
//             borderRadius: "0.5em",
//             color: "#fff",
//         },
//     },
// });

export const MyTabs = withStyles({
    root: {
        minHeight: "45px",
        border: "1px solid #848484",
        borderRadius: "0.5em",
        backgroundImage: `url(${tabBG})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    indicator: {
        backgroundColor: "#ccc",
        height: 0,
    },
    vertical: {
        textAlign: "left",
        width: "125px",
        backgroundImage: `url(${tabBG})`,
        backgroundColor: "black",
        height: "90vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: "30px",

        "& .MuiTabs-indicator": {
            backgroundColor: "rgb(230,128,49)",
        },
    },
})(Tabs);

export const MyTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "left",
            textTransform: "none",
            minWidth: "2em",
            minHeight: "45px",
            color: "white",
            marginRight: "auto",
            "& .MuiTab-wrapper": {
                alignItems: "normal",
            },
            "&:hover": {
                color: "#aaa",
                opacity: 1,
            },
            "&$selected": {
                backgroundColor: "rgb(42,49,59)",
                borderRadius: "0.5em",
                color: "rgb(230,128,49)",
                // width: "100%",
            },
            "&:active": {
                borderRadius: "0.5em",
                color: "rgb(230,128,49)",
            },
            "&:focus": {
                borderRadius: "0.5em",
                color: "rgb(230,128,49)",
            },
        },
        selected: {},
    })
)((props: any) => <Tab disableRipple {...props} />);
