import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import FieldServiceForm from "./Forms";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";

import { IFieldService, updateFieldService } from "../../api/fieldService";
import Toast from "../../app/Toast";

const schema = Yup.object().shape({
    name: Yup.string().required(),
    price: Yup.string().required(),
    length: Yup.string().required(),
    ItemId: Yup.string().required(),
});

export default function FieldServiceDetails({
    selectedFieldService,
    onDone,
}: {
    selectedFieldService: IFieldService;
    onDone: () => void;
}) {
    const handleSubmit = async (d: any) => {
        try {
            if (selectedFieldService.id) {
                const resp = await updateFieldService(selectedFieldService.id, d);
                if (resp) {
                    Toast("Updated successfully !!!");
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box display="flex" style={{ gap: 5 }} flex={1}>
            <BasePaper style={{ flex: 1 }}>
                <Formik initialValues={selectedFieldService} onSubmit={handleSubmit} validationSchema={schema}>
                    {({ values, handleBlur, handleChange, errors }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                                <FieldServiceForm
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                />
                                <Button type="submit" kind="edit">
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </BasePaper>
            <BasePaper style={{ flex: 2 }}>
                <BaseDataGrid height="100%" cols={[]} rows={[]} onRowSelected={() => {}} />
            </BasePaper>
        </Box>
    );
}
