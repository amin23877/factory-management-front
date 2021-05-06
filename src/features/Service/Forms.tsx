import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";
import Button from "../../app/Button";
import { BasePaper } from "../../app/Paper";

import { getItems } from "../../api/items";
import { IFieldService, updateFieldService } from "../../api/fieldService";
import { Box } from "@material-ui/core";
import Snack from "../../app/Snack";

export default function FieldServiceForm({
    errors,
    handleBlur,
    handleChange,
    values,
}: {
    values: IFieldService;
    handleChange: any;
    handleBlur: any;
    errors: any;
}) {
    return (
        <>
            <FieldSelect
                request={getItems}
                itemTitleField="name"
                itemValueField="id"
                label="Item"
                name="ItemId"
                value={values.ItemId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.ItemId)}
                fullWidth
            />
            <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name)}
                fullWidth
            />
            <TextField
                label="Period"
                name="period"
                value={values.period}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.period)}
                fullWidth
            />
            <TextField
                label="Price"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.price)}
                fullWidth
            />
            <TextField
                label="description"
                name="description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.description)}
                fullWidth
            />
        </>
    );
}

export const EditForm = ({ initialValues, onDone }: { initialValues: IFieldService; onDone: () => void }) => {
    const [snack, setSnack] = useState(false);

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.string().required(),
        length: Yup.string().required(),
        ItemId: Yup.string().required(),
    });

    const handleSubmit = async (d: any) => {
        try {
            if (initialValues.id) {
                const resp = await updateFieldService(initialValues.id, d);
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
        <BasePaper>
            <Snack open={snack} onClose={() => setSnack(false)}>
                Record updated.
            </Snack>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                {({ values, handleBlur, handleChange, errors }) => (
                    <Form>
                        <Box display="flex" flexDirection="column">
                            <FieldServiceForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                            <Button type="submit" kind="edit">
                                Save
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </BasePaper>
    );
};
