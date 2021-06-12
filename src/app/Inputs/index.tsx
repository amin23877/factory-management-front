import React, { useState, useEffect } from "react";
import {
    Select,
    SelectProps,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
    OutlinedTextFieldProps,
    TextFieldProps,
    StandardTextFieldProps,
} from "@material-ui/core";
import { BootstrapInput } from "../TextField";

import styles from "./inputs.module.css";
import { Autocomplete } from "@material-ui/lab";
import { CSSProperties } from "@material-ui/styles";

interface IMFS {
    request: () => Promise<any>;
    limit?: number;
    label?: string;
    getOptionLabel: (option: any) => string;
    getOptionValue: (option: any) => string;
    onChange?: (e: React.ChangeEvent<{}>, newValue: any) => void;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    error?: boolean;
    placeholder?: string;
    style?: CSSProperties;
    value?: any;
}
export const MaterialFieldSelect = ({ request, limit, getOptionLabel, getOptionValue, onChange, value, ...props }: IMFS) => {
    const [options, setOptions] = useState([]);
    const [findValue, setFindValue] = useState<any>();

    useEffect(() => {
        const t = options.find((o) => getOptionValue(o) === value);
        setFindValue(t);
    }, [value, options]);

    useEffect(() => {
        request()
            .then((data) => {
                if (limit && limit > 0) {
                    setOptions(data.slice(0, limit));
                } else {
                    setOptions(data);
                }
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <Autocomplete
            style={props.style as any}
            getOptionLabel={getOptionLabel}
            options={options}
            onChange={onChange}
            onBlur={props.onBlur}
            value={findValue}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props?.label}
                    error={props.error}
                    placeholder={props.placeholder}
                    size="small"
                    variant="outlined"
                />
            )}
        />
    );
};

interface IOS extends StandardTextFieldProps {
    items: any[];
    itemValueField: string;
    itemTitleField: string;
    keyField?: string;
    inputStyle?: any;
}
export const ObjectSelect = ({ inputStyle, items, itemTitleField, itemValueField, keyField, ...props }: IOS) => {
    return (
        // <FormControl className={styles.objectSelect} style={{ ...props.style }} fullWidth={props.fullWidth}>
        //     {props.label && (
        //         <InputLabel shrink htmlFor="object-select">
        //             {props.label}
        //         </InputLabel>
        //     )}
        //     <Select id="object-select" name={props.name} style={{ ...inputStyle }} input={<BootstrapInput />} {...props}>
        //         <MenuItem value={undefined}>None</MenuItem>
        //         {items &&
        //             items.map((item: any, i) => (
        //                 <MenuItem key={keyField ? item[keyField] : i} value={item[itemValueField]}>
        //                     {item[itemTitleField]}
        //                 </MenuItem>
        //             ))}
        //     </Select>
        // </FormControl>
        <TextField {...props} variant="outlined" size="small" select>
            <MenuItem value={undefined}>None</MenuItem>
            {items &&
                items.map((item: any, i) => (
                    <MenuItem key={keyField ? item[keyField] : i} value={item[itemValueField]}>
                        {item[itemTitleField]}
                    </MenuItem>
                ))}
        </TextField>
    );
};

interface IFieldSelect extends StandardTextFieldProps {
    request: () => Promise<any>;
    itemValueField: string;
    itemTitleField: string;
    limit?: number;
    keyField?: string;
}
export const FieldSelect = ({ keyField, request, itemValueField, itemTitleField, limit, ...props }: IFieldSelect) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        request()
            .then((data) => {
                if (limit && limit > 0) {
                    setItems(data.slice(0, limit));
                } else {
                    setItems(data);
                }
            })
            .catch((e) => console.log(e));
    }, []);

    return <ObjectSelect {...props} itemTitleField={itemTitleField} itemValueField={itemValueField} items={items} />;
};

interface IArraySelect extends StandardTextFieldProps {
    items?: any[];
}
export const ArraySelect = ({ items, ...props }: IArraySelect) => {
    return (
        <ObjectSelect itemTitleField="item" itemValueField="item" items={items ? items.map((item) => ({ item: item })) : []} {...props} />
    );
};

export const BaseSelect = (props: StandardTextFieldProps) => {
    return (
        <TextField {...props} variant="outlined" size="small" select>
            {props.children}
        </TextField>
    );
};
