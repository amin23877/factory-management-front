import React from "react";
import { createStyles, Theme, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import TextField, { StandardTextFieldProps } from "@material-ui/core/TextField";

import { SearchRounded } from "@material-ui/icons";

import styles from "./TextField.module.css";

export const SearchBar = () => {
    return (
        <div className={styles.searchBarRoot}>
            <InputBase className={styles.searchInput} placeholder="type the biller you want to pay here" />
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
            fontSize: 14,
            padding: "8px 10px",
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

export default function BaseTextField(props: StandardTextFieldProps) {
    return (
        // <FormControl style={{ ...props.style, marginTop: 5, marginBottom: 5 }}>
        //     {props.label && (
        //         <InputLabel shrink htmlFor="bootstrap-input">
        //             {props.label}
        //         </InputLabel>
        //     )}
        //     <BootstrapInput inputProps={{ style: { borderColor: props.error ? "red" : "#ced4da" } }} {...props} id="bootstrap-input" />
        //     {props.helperText && <Typography variant="caption">{props.helperText}</Typography>}
        // </FormControl>
        <TextField variant="outlined" size="small" {...props} />
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
