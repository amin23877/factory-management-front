import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";

import { createFieldService, IFieldService } from "../../api/fieldService";
import FieldServiceForm from "./Forms";

export default function AddServiceModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.string().required(),
        ItemId: Yup.string().required(),
    });

    const handleSubmit = async (data: any) => {
        try {
            const resp = await createFieldService(data);
            if (resp) {
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Add new field service" fullWidth maxWidth="sm">
            <Box p={2}>
                <Formik initialValues={{} as IFieldService} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                <FieldServiceForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                                <Button style={{ margin: "0.5em 0" }} type="submit" kind="add">
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
