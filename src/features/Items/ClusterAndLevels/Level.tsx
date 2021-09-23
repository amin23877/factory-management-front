import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import TextField from "../../../app/TextField";
import { ArraySelect } from "../../../app/Inputs";

import { getVisibilityState, splitLevelName } from "../../../logic/levels";
import { IField } from "../../../api/field";

export default function Level({
    level,
    handleBlur,
    handleChange,
    values,
    device,
}: {
    device: boolean;
    level: IField;
    values: any;
    handleChange: any;
    handleBlur: any;
}) {
    const visible = getVisibilityState(level, values);

    if (!visible) {
        return null;
    }

    if (level.filterName[0] !== "Product Family" && !device) {
        return null;
    }

    if (level.type === "string" || level.type === "number") {
        return (
            <TextField
                required={level.required}
                name={level.name}
                label={splitLevelName(level.name)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[level.name]}
            />
        );
    } else if (level.type === "enum") {
        return (
            <ArraySelect
                required={level.required}
                name={level.name}
                label={splitLevelName(level.name)}
                items={level.valid}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[level.name]}
            />
        );
    } else if (level.type === "boolean") {
        return (
            <FormControlLabel
                checked={values[level.name]}
                control={<Checkbox required={level.required} />}
                name={level.name}
                label={splitLevelName(level.name)}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        );
    }

    return (
        <TextField
            required={level.required}
            name={level.name}
            label={splitLevelName(level.name)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[level.name]}
        />
    );
}
