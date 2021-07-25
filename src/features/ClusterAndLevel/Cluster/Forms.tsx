import React from "react";
import { Box, MenuItem } from "@material-ui/core";
import useSWR, { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../../../app/Button";
import TextField from "../../../app/TextField";
import { BaseSelect } from "../../../app/Inputs";
import Snack from "../../../app/Snack";

import { IFilter } from "../../../api/filter";
import { delete_, patch, post } from "../../../api";

export default function FilterForm({ initialValues }: { initialValues?: IFilter }) {
    const schema = Yup.object().shape({
        name: Yup.string()
            .required()
            .test(
                "Does not have underline",
                "Name should not have underline (_)",
                (value) => !value?.includes("_") || false
            ),
        valid: Yup.string().required(),
    });

    const handleDelete = async (id: string) => {
        try {
            await delete_(`/filter/${id}`);
            mutate("/filter");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (d: any) => {
        try {
            if (initialValues) {
                await patch(`/filter/${initialValues.id}`, d);
            } else {
                await post("/filter", d);
            }
        } catch (error) {
            console.log(error);
        } finally {
            mutate("/filter");
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues ? initialValues : ({} as IFilter)}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                            <TextField
                                name="name"
                                label="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                            <TextField
                                name="valid"
                                label="Valid values"
                                value={values.valid}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.valid)}
                                helperText={errors.valid ? errors.valid : "Comma seprated valid values"}
                            />
                            {!initialValues && (
                                <Button type="submit" kind="add">
                                    Add
                                </Button>
                            )}
                            {initialValues && (
                                <Box display="flex">
                                    <Button type="submit" kind="edit">
                                        Save
                                    </Button>
                                    <Button onClick={() => handleDelete} kind="delete">
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export const ApplyFilterForm = ({ applyFilter }: { applyFilter: (a: any) => void }) => {
    const { data: filters } = useSWR<IFilter[]>("/filter");

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        valid: Yup.string().required(),
    });

    const handleSubmit = async (d: any) => {
        try {
            console.log(d);
            // applyFilter((prev: any) => ({ ...prev, ...d }));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={{} as IFilter} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, handleChange, handleBlur }) => (
                <Form style={{ width: "250px" }}>
                    <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                        <BaseSelect
                            name="name"
                            id="name"
                            label="Name"
                            value={values.name}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            {filters &&
                                filters.map((i: any) => (
                                    <MenuItem key={i.id} value={i.name}>
                                        {i.name}
                                    </MenuItem>
                                ))}
                        </BaseSelect>
                        <BaseSelect
                            disabled={!values.name}
                            label="Value"
                            name="valid"
                            value={values.valid}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            {filters
                                ?.find((f) => f.name === values.name)
                                ?.valid.map((i: any) => (
                                    <MenuItem key={i} value={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                        </BaseSelect>
                        <Button type="submit" kind="add">
                            Apply
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
