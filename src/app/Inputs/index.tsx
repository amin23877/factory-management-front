import React, { useState, useEffect } from "react";
import { Select, SelectProps, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { BootstrapInput } from "../TextField";

import styles from "./inputs.module.css";
import { CSSProperties } from "@material-ui/styles";

interface IOS extends SelectProps {
    items: any[];
    itemValueField: string;
    itemTitleField: string;
    keyField?: string;
    inputStyle?: CSSProperties;
}
export const ObjectSelect = ({ inputStyle, items, itemTitleField, itemValueField, keyField, ...props }: IOS) => {
    return (
        <FormControl className={styles.objectSelect} style={{ ...props.style }} fullWidth={props.fullWidth}>
            {props.label && (
                <InputLabel shrink htmlFor="object-select">
                    {props.label}
                </InputLabel>
            )}
            <Select
                id="object-select"
                name={props.name}
                style={{ ...inputStyle }}
                input={<BootstrapInput />}
                {...props}
            >
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
            <Select className={styles.baseSelect} name={props.name} input={<BootstrapInput />} {...props} labelId="base-select-label">
                {props.children}
            </Select>
        </FormControl>
    );
};
