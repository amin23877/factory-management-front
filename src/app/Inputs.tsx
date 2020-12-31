import React from "react";
import { Select, SelectProps, TextField, InputBase, InputBaseProps, withStyles, fade } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export const BaseSelect = withStyles({
    root: {
        borderRadius: 20,
    },
})((props: SelectProps) => <Select variant="outlined" {...props} />);

export const BaseTextInput = withStyles((theme) => ({
    root: {
        backgroundColor: fade(theme.palette.common.black, 0.05),
        padding: "4px 1em",
        borderRadius: 10,
        width: "100%",
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
    },
}))((props: InputBaseProps) => <InputBase {...props} />);

export const ComboBox = ({
    value,
    inputValue,
    onChange,
    onInputChange,
    onBlur,
    options,
    name,
}: {
    value?: string;
    inputValue: string;
    onChange?: any;
    onInputChange: any;
    onBlur: any;
    options: string[];
    name: string;
}) => {
    return (
        <Autocomplete
            componentName={name}
            value={value}
            onBlur={onBlur}
            inputValue={inputValue}
            onChange={(e, nv) => onChange(name, nv)}
            onInputChange={(e, nv) => {
                onInputChange(name, nv);
                console.log(name, nv);
            }}
            options={options}
            renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
        />
    );
};
