import React, { useState, useEffect } from "react";
import { Select, SelectProps, FormControl, Typography, InputLabel, MenuItem } from "@material-ui/core";
import { BootstrapInput } from "./TextField";

interface IOS extends SelectProps {
    items: any[];
    itemValueField: string;
    itemTitleField: string;
    keyField?: string;
}
export const ObjectSelect = ({ items, itemTitleField, itemValueField, keyField, ...props }: IOS) => {
    return (
        <FormControl style={{ margin: "0.5em" }} fullWidth={props.fullWidth}>
            <Typography style={{ margin: "2px 0" }} variant="caption" id="field-select-label">
                {props.label}
            </Typography>
            <Select name={props.name} input={<BootstrapInput />} {...props} labelId="object-select-label">
                <MenuItem value={undefined}>None</MenuItem>
                {items.map((item: any, i) => (
                    <MenuItem
                        key={keyField ? item[keyField] : i}
                        value={itemValueField === "id" ? parseInt(item[itemValueField]) : item[itemValueField]}
                    >
                        {item[itemTitleField]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

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
            })
            .catch((e) => console.log(e));
    }, []);

    return <ObjectSelect {...props} itemTitleField={itemTitleField} itemValueField={itemValueField} items={items} />;
};

interface IArraySelect extends SelectProps {
    items: any[];
}
export const ArraySelect = ({ items, ...props }: IArraySelect) => {
    return <ObjectSelect itemTitleField="item" itemValueField="item" items={items.map((item) => ({ item: item }))} {...props} />;
};

export const BaseSelect = (props: SelectProps) => {
    return (
        <FormControl fullWidth={props.fullWidth}>
            <InputLabel id="field-select-label">{props.label}</InputLabel>
            <Select name={props.name} input={<BootstrapInput />} {...props} labelId="object-select-label">
                {props.children}
            </Select>
        </FormControl>
    );
};
