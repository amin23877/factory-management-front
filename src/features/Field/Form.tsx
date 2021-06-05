import React from "react";
import { Checkbox, FormControlLabel, Box } from "@material-ui/core";
import useSWR from "swr";

import TextField from "../../app/TextField";
import { ArraySelect } from "../../app/Inputs";

import { IFilter } from "../../api/filter";
import { IField } from "../../api/field";
import { Formik, Form } from "formik";

import Button from "../../app/Button";
import * as Yup from "yup";
import { basePost } from "../../api";
import { mutate } from "swr";

const schema = Yup.object().shape({
    filterName: Yup.string().required(),
    filterValue: Yup.string().required(),
    type: Yup.string().required(),
    name: Yup.string().required(),
    required: Yup.boolean().required(),
    default: Yup.string(),
    valid: Yup.string(),
});

export default function FieldForm({
    initial
}: {
    initial?: IField;

}) {
    const { data: filters } = useSWR<IFilter[]>("/filter");
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        setSubmitting(true);
        try {
            const resp = await basePost("/field", values);
            if (resp) {
                mutate("/field");
                setSubmitting(false);
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Formik initialValues={initial ? initial : {} as IField} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleBlur, handleChange, isSubmitting, setValues, setTouched }) => (
                    <Form >

                        <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={12} gridColumnGap={12} style={{ marginTop: "10px" }}  >
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
                                        items={initial ? initial.filterValue : filters?.find((f) => f.name === values.filterName)?.valid}
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
                            <Button type="submit" disabled={isSubmitting} kind="add">
                                Save
                            </Button>
                        </Box>
                    </Form>)}
            </Formik>
        </>
    );
}
