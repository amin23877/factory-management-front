import React from "react";
import {
    Tabs,
    Tab,
    TabProps,
    withStyles,
    createStyles,
    Theme,
    makeStyles,
    ExtendButtonBase,
    TabTypeMap,
} from "@material-ui/core";

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
    },
    indicator: {
        backgroundColor: "#ccc",
        height: 0,
    },
})(Tabs);
// ExtendButtonBase<TabTypeMap<{}, "div">>
// export const MyTab = (props: any) => {
//     const classes = useStyles();

//     return <Tab className={classes.root} disableRipple {...props} />;
// };

export const MyTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: "none",
            minWidth: "2em",
            minHeight: "45px",
            "&:hover": {
                color: "#aaa",
                opacity: 1,
            },
            "&$selected": {
                backgroundColor: "#1a73e8",
                borderRadius: "0.5em",
                color: "#fff",
            },
            "&:active": {
                borderRadius: "0.5em",
                color: "#aaa",
            },
            "&:focus": {
                borderRadius: "0.5em",
                color: "#fff",
            },
        },
        selected: {},
    })
)((props: any) => <Tab disableRipple {...props} />);
