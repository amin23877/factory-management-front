import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import useSWR from "swr";

import TextField from "../../app/TextField";
import { ArraySelect } from "../../app/Inputs";

import { IFilter } from "../../api/filter";
import { IField } from "../../api/field";

export default function FieldForm({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
}: {
    values: IField;
    errors: any;
    touched: any;
    handleChange: any;
    handleBlur: any;
}) {
    const { data: filters } = useSWR<IFilter[]>("/filter");

    return (
        <>
            <TextField
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.name && touched.name)}
                helperText={errors.name && touched.name}
                value={values.name}
                label="Name"
            />
            <ArraySelect
                items={["string", "boolean", "number", "enum"]}
                defaultValue="string"
                name="type"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.type && touched.type)}
                helperText={errors.type && touched.type}
                value={values.type}
                label="Type"
            />
            {!values.all && (
                <>
                    <ArraySelect
                        items={filters?.map((f) => f.name)}
                        name="filterName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.filterName && touched.filterName)}
                        helperText={errors.filterName && touched.filterName}
                        value={values.filterName}
                        label="Filter Name"
                    />
                    <ArraySelect
                        items={filters?.find((f) => f.name === values.filterName)?.valid}
                        name="filterValue"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(errors.filterValue && touched.filterValue)}
                        helperText={errors.filterValue && touched.filterValue}
                        value={values.filterValue}
                        label="Filter Value"
                    />
                </>
            )}
            <TextField
                name="default"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.default && touched.default)}
                helperText={errors.default && touched.default}
                value={values.default}
                label="Default"
            />
            <TextField
                name="valid"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.valid && touched.valid)}
                helperText={errors.valid && touched.valid}
                value={values.valid}
                label="Valid"
            />
            <FormControlLabel
                style={{ fontSize: "0.7rem" }}
                checked={values.all}
                name="all"
                label="Add this field for all filters"
                onChange={handleChange}
                control={<Checkbox />}
            />
            <FormControlLabel
                style={{ fontSize: "0.7rem" }}
                checked={values.required}
                name="required"
                label="Required"
                onChange={handleChange}
                control={<Checkbox />}
            />
        </>
    );
}
