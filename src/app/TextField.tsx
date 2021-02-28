import React from "react";
import { createStyles, Theme, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

import { SearchRounded } from "@material-ui/icons";

const useStyles = makeStyles({
    searchBarRoot: {
        height: "45px",
        borderLeft: "3px solid rgb(43,140,255)",
        borderRadius: "0px  4px 4px 0px",
        width: "400px",
        display: "flex",
        alignItems: "center",
        padding: "0px 3px",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
    },
    sinput: {
        flexGrow: 1,
        padding: "0 0.5em",
        boxSizing: "border-box",
    },
});
export const SearchBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.searchBarRoot}>
            <InputBase className={classes.sinput} placeholder="type the biller you want to pay here" />
            <SearchRounded htmlColor="gray" />
        </div>
    );
};

export const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "label + &": {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            border: "1px solid #ced4da",
            fontSize: 16,
            padding: "10px 26px 10px 12px",
            transition: theme.transitions.create(["border-color", "box-shadow"]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
            "&:focus": {
                borderRadius: 4,
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },
        },
    })
)(InputBase);

export interface IBaseTextField extends InputBaseProps {
    label?: string;
    helperText?: React.ReactNode;
}

export default function BaseTextField(props: IBaseTextField) {
    return (
        <FormControl style={{ margin: "0.5em", ...props.style }}>
            <InputLabel shrink htmlFor="bootstrap-input">
                {props.label}
            </InputLabel>
            <BootstrapInput inputProps={{ style: { borderColor: props.error ? "red" : "#ced4da" } }} {...props} id="bootstrap-input" />
            {props.helperText && <Typography variant="caption">{props.helperText}</Typography>}
        </FormControl>
    );
}

export const ValidationTextField = withStyles({
    root: {
        "& input:valid + fieldset": {
            borderColor: "green",
            borderWidth: 2,
        },
        "& input:invalid + fieldset": {
            borderColor: "red",
            borderWidth: 2,
        },
        "& input:valid:focus + fieldset": {
            borderLeftWidth: 6,
            padding: "4px !important", // override inline-style
        },
    },
})(TextField);
