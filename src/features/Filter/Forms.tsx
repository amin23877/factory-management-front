import React from "react";
import { Box } from "@material-ui/core";
import { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import TextField from "../../app/TextField";
import { IFilter } from "../../api/filter";
import { basePost } from "../../api";

export default function FilterForm() {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        valid: Yup.string().required(),
    });

    const handleSubmit = async (d: any) => {
        try {
            await basePost("/filter", d);
            mutate("/filter");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Formik initialValues={{} as IFilter} validationSchema={schema} onSubmit={handleSubmit}>
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
                        <Button type="submit" kind="add">
                            Add
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
