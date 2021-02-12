import React from "react";
import { createStyles, fade, Theme, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

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
}

export default function BaseTextField(props: IBaseTextField) {
    return (
        <FormControl style={{ margin: "0.5em" }}>
            <InputLabel shrink htmlFor="bootstrap-input">
                {props.label}
            </InputLabel>
            <BootstrapInput {...props} id="bootstrap-input" />
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
