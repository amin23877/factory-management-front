import React, { useState, useEffect } from "react";
import { Select, SelectProps, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { BootstrapInput } from "./TextField";

interface IOS extends SelectProps {
    items: any[];
    itemValueField: string;
    itemTitleField: string;
    keyField?: string;
}
export const ObjectSelect = ({ items, itemTitleField, itemValueField, keyField, ...props }: IOS) => {
    return (
        <FormControl style={{ margin: "0.5em", minWidth: 243, ...props.style }} fullWidth={props.fullWidth}>
            {props.label && (
                <InputLabel shrink htmlFor="object-select">
                    {props.label}
                </InputLabel>
            )}
            <Select id="object-select" name={props.name} input={<BootstrapInput />} value={props.value} {...props} displayEmpty={true}>
                <MenuItem value={undefined}>None</MenuItem>
                {items &&
                    items.map((item: any, i) => (
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
            {props.label && (
                <InputLabel shrink id="base-select-label">
                    {props.label}
                </InputLabel>
            )}
            <Select style={{ minWidth: 150 }} name={props.name} input={<BootstrapInput />} {...props} labelId="base-select-label">
                {props.children}
            </Select>
        </FormControl>
    );
};
