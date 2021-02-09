import React, { useState, useEffect } from "react";
import {
    Select,
    MenuItem,
    SelectProps,
    TextField,
    InputBase,
    InputBaseProps,
    withStyles,
    fade,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

interface IFieldSelect extends SelectProps {
    request: () => Promise<any>;
    itemValueField: string;
    itemTitleField: string;
    keyField?: string;
}
export const FieldSelect = ({ keyField, request, itemValueField, itemTitleField, ...props }: IFieldSelect) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        request()
            .then((data) => {
                setItems(data);
                console.log(data);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <FormControl fullWidth={props.fullWidth}>
            <InputLabel id="field-select-label" style={{ margin: "0 1.2em" }}>
                {props.label}
            </InputLabel>
            <BaseSelect variant="outlined" {...props} labelId="field-select-label">
                {items.map((item: any, i) => (
                    <MenuItem key={keyField ? item[keyField] : i} value={item[itemValueField]}>
                        {item[itemTitleField]}
                    </MenuItem>
                ))}
            </BaseSelect>
        </FormControl>
    );
};

interface IArraySelect extends SelectProps {
    items: string[];
}
export const ArraySelect = ({ items, ...props }: IArraySelect) => {
    return (
        <FormControl fullWidth={props.fullWidth}>
            <InputLabel id="field-select-label" style={{ margin: "0 1.2em" }}>
                {props.label}
            </InputLabel>
            <BaseSelect variant="outlined" {...props} labelId="field-select-label">
                {items.map((item: any, i) => (
                    <MenuItem key={i} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </BaseSelect>
        </FormControl>
    );
};

export const BaseSelect = withStyles({
    root: {
        borderRadius: 20,
    },
})((props: SelectProps) => <Select style={{ ...props.style, minWidth: 220, margin: "0.4em" }} variant="outlined" {...props} />);

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
