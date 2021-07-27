import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { BasePaper } from "../../app/Paper";
import { ILabor, postLabor } from "../../api/labor";
import Toast from "../../app/Toast";
import useSWR from "swr";

const schema = Yup.object().shape({
    TPH: Yup.number().required().min(0.1),
    EPH: Yup.number().required().min(0.1),
    MPH: Yup.number().required().min(0.1),
});

function Management() {
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
        <Box display="grid" gridTemplateColumns="2fr 3fr" gridGap={10}>
            <BasePaper>
                <Typography variant="h5">Manage labor costs</Typography>
                <Formik
                    initialValues={laborCosts ? laborCosts : ({} as ILabor)}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ getFieldProps, errors, touched }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridGap={10} mt={2}>
                                <TextField
                                    label="Test Per Hour"
                                    {...getFieldProps("TPH")}
                                    type="number"
                                    error={Boolean(errors.TPH && touched.TPH)}
                                    helperText={errors.TPH}
                                />
                                <TextField
                                    label="Evaluation Per Hour"
                                    {...getFieldProps("EPH")}
                                    type="number"
                                    error={Boolean(errors.EPH && touched.EPH)}
                                    helperText={errors.EPH}
                                />
                                <TextField
                                    label="Manufacturing Per Hour"
                                    {...getFieldProps("MPH")}
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
            </BasePaper>
        </Box>
    );
}

export default Management;
