import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useSWR from "swr";

import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import Toast from "../../../app/Toast";

import { ILabor, postLabor } from "../../../api/labor";

const schema = Yup.object().shape({
    TPH: Yup.number().required().min(0.1),
    EPH: Yup.number().required().min(0.1),
    MPH: Yup.number().required().min(0.1),
});

export default function ManagementForm() {
    const { data: laborCosts } = useSWR("/labor");

    const handleSubmit = async (values: ILabor) => {
        try {
            await postLabor(values);

            Toast("Data uploaded successfully", "success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik
            initialValues={laborCosts ? laborCosts : ({} as ILabor)}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ getFieldProps, errors, touched, values }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns="1fr" gridGap={10} mt={2}>
                        <TextField
                            label="Test Per Hour"
                            placeholder="Test Per Hour"
                            {...getFieldProps("TPH")}
                            value={values.TPH}
                            type="number"
                            error={Boolean(errors.TPH && touched.TPH)}
                            helperText={errors.TPH}
                        />
                        <TextField
                            label="Evaluation Per Hour"
                            placeholder="Evaluation Per Hour"
                            {...getFieldProps("EPH")}
                            value={values.EPH}
                            type="number"
                            error={Boolean(errors.EPH && touched.EPH)}
                            helperText={errors.EPH}
                        />
                        <TextField
                            label="Manufacturing Per Hour"
                            placeholder="Manufacturing Per Hour"
                            {...getFieldProps("MPH")}
                            value={values.MPH}
                            type="number"
                            error={Boolean(errors.MPH && touched.MPH)}
                            helperText={errors.MPH}
                        />
                        <Button kind="add" type="submit">
                            Save
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
