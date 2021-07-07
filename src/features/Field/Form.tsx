import React, { useEffect } from "react";
import { Checkbox, FormControlLabel, TextField, Box } from "@material-ui/core";
import useSWR from "swr";

// import TextField from "../../app/TextField";
import { ArraySelect } from "../../app/Inputs";

import { IFilter } from "../../api/filter";
import { IField } from "../../api/field";
import { Formik, Form } from "formik";

import Button from "../../app/Button";
import * as Yup from "yup";
import { basePost } from "../../api";
import { mutate } from "swr";
import { Autocomplete } from "@material-ui/lab";

const schema = Yup.object().shape({
    filterName: Yup.string().required(),
    filterValue: Yup.string().required(),
    type: Yup.string().required(),
    name: Yup.string().required(),
    required: Yup.boolean(),
    default: Yup.string(),
    valid: Yup.string(),
});

export default function FieldForm({ initial, setActive }: { initial?: IField; setActive: () => void }) {
    const { data: filters } = useSWR<IFilter[]>("/filter");
    const { data: fields } = useSWR<IField[]>("/field");

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        setSubmitting(true);
        try {
            // console.log(values);
            const resp = await basePost("/field", values);
            if (resp) {
                mutate("/field");
                setSubmitting(false);
                setActive();
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log(filters);
    }, [])

    return (
        <>
            <Formik
                initialValues={initial ? initial : ({ type: "string" } as any)}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
                    <Form>
                        <Box
                            display="grid"
                            gridTemplateColumns="1fr 1fr"
                            gridRowGap={12}
                            gridColumnGap={12}
                            style={{ marginTop: "10px" }}
                        >
                            {/* <TextField
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.name && touched.name)}
                                helperText={errors.name && touched.name}
                                value={values.name}
                                label="Name"
                            /> */}
                            <Autocomplete
                                onBlur={handleBlur}
                                onInputChange={(e, v) => setFieldValue("name", v)}
                                value={values.name}
                                freeSolo
                                options={fields?.map((f) => f.name) || []}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Name"
                                        name="name"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                )}
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
                                style={{ alignSelf: "center", marginTop: 6 }}
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
                                        value={String(values.filterName)}
                                        label="Cluster Name"
                                    />
                                    <Autocomplete
                                        multiple
                                        options={
                                            initial
                                                ? initial.filterValue
                                                : (filters?.find((f) => f.name === values.filterName)?.valid)?.concat(['all']) || []
                                        }
                                        getOptionLabel={(option) => option}
                                        filterSelectedOptions
                                        onChange={(e, v) => setFieldValue("filterValue", v.join())}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Cluster Values"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                </>
                            )}
                            <TextField
                                variant="outlined"
                                size="small"
                                name="default"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.default && touched.default)}
                                helperText={errors.default && touched.default}
                                value={values.default}
                                label="Default"
                            />
                            <TextField
                                size="small"
                                variant="outlined"
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
                                label="Add this Level for all items in this Clusters"
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
                            <Button
                                onClick={() => console.log(errors)}
                                type="submit"
                                disabled={isSubmitting}
                                kind="add"
                            >
                                Save
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
}
