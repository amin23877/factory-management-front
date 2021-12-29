import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../../../app/Button";
import Dialog from "../../../app/Dialog";

import { addServiceToItem, IFieldService } from "../../../api/fieldService";
import { FieldSelect } from "../../../app/Inputs";
import { getServiceClasses } from "../../../api/serviceClass";
import { getServiceCategories } from "../../../api/serviceCategories";

export default function AddServiceModal({
    open,
    onClose,
    onDone,
    device,
}: {
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    device: string;
}) {
    let schema = Yup.object().shape({
        ServiceCategoryId: Yup.string().required(),
        ServiceClassId: Yup.string().required(),
    });

    const handleSubmit = async (data: any) => {
        try {
            const resp = await addServiceToItem(data, device);
            if (resp) {
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Add Service" fullWidth maxWidth="sm">
            <Box p={2}>
                <Formik initialValues={{} as IFieldService} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                <FieldSelect
                                    request={getServiceCategories}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    label="Category"
                                    name="ServiceCategoryId"
                                    value={
                                        typeof values.ServiceCategoryId == "string"
                                            ? values.ServiceCategoryId
                                            : values.ServiceCategoryId?.id
                                    }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ServiceCategoryId)}
                                    fullWidth
                                />
                                <FieldSelect
                                    request={getServiceClasses}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    label="Class"
                                    name="ServiceClassId"
                                    value={
                                        typeof values.ServiceClassId == "string"
                                            ? values.ServiceClassId
                                            : values.ServiceClassId?.id
                                    }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ServiceClassId)}
                                    fullWidth
                                />

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
