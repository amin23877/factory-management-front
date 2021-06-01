import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import FieldServiceForm from "./Forms";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import Snack from "../../app/Snack";

import { IFieldService, updateFieldService } from "../../api/fieldService";

export default function FieldServiceDetails({ selectedFieldService, onDone }: { selectedFieldService: IFieldService; onDone: () => void }) {
    const [snack, setSnack] = useState(false);

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.string().required(),
        length: Yup.string().required(),
        ItemId: Yup.string().required(),
    });

    const handleSubmit = async (d: any) => {
        try {
            if (selectedFieldService.id) {
                const resp = await updateFieldService(selectedFieldService.id, d);
                if (resp) {
                    setSnack(true);
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <BasePaper>
                    <Snack open={snack} onClose={() => setSnack(false)}>
                        Record updated.
                    </Snack>

                    <Formik initialValues={selectedFieldService} onSubmit={handleSubmit} validationSchema={schema}>
                        {({ values, handleBlur, handleChange, errors }) => (
                            <Form>
                                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                    <FieldServiceForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                                    <Button type="submit" kind="edit">
                                        Save
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </BasePaper>
            </Grid>
            <Grid item xs={12} md={9}>
                <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />
            </Grid>
        </Grid>
    );
}
