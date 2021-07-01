import { createMuiTheme } from "@material-ui/core";

export const Gradients = {
    warning: "linear-gradient(60deg, #ffa726, #fb8c00)",
    error: "linear-gradient(60deg, #ef5350, #e53935)",
    success: "linear-gradient(90deg, rgba(103,214,73,1) 0%, rgba(5,208,23,1) 100%)",
    info: "linear-gradient(60deg, #26c6da, #00acc1)",
};

export const theme = createMuiTheme({
    props: {
        MuiTabs: {
            indicatorColor: "primary",
        },
        MuiTab: {
            style: {
                minWidth: 72,
                fontSize: 12,
                fontWeight: "bold",
            },
        },
        MuiLink: {
            color: "textSecondary",
            style: {
                textDecoration: "none",
            },
        },
        MuiTextField: {
            variant: "outlined",
        },
    },
    palette: {
        divider: "#4f4f4f",
        primary: {
            main: "#3389ff",
            contrastText: "#fff",
        },
        secondary: {
            main: "#373a4d",
            contrastText: "#fff",
        },
        // warning: {
        //     main: "#ffdb2e",
        //     contrastText: "#545454",
        // },
        // error: {
        //     main: "#ff0000",
        //     contrastText: "#ff0000",
        // },
        // success: {
        //     main: "#4da851",
        //     contrastText: "#fff",
        // },
        // info: {
        //     main: "#ebefff",
        //     contrastText: "#545454",
        // },
        background: {
            default: "#f9f9f9",
        },
    },
});
