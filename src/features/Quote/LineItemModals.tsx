import React from "react";
import {
    Dialog,
    DialogTitle,
    TextField,
    Button,
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { FieldSelect } from "../../app/Inputs";
import { getItems } from "../../api/items";
import { ILineItem, LineItemInit, createLineItem, editLineItem, deleteLineItem } from "../../api/quote";

export default function LineItemModal({
    open,
    onClose,
    onDone,
    quoteId,
    LIData,
}: {
    quoteId?: number | null;
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    LIData?: ILineItem;
}) {
    const schema = Yup.object().shape({
        index: Yup.number(),
        ItemId: Yup.number().required(),
        quantity: Yup.number().min(1),
        price: Yup.number(),
    });

    const handleDelete = async () => {
        try {
            if (LIData && LIData.id) {
                const resp = await deleteLineItem(LIData?.id);
                if (resp) {
                    console.log(resp);
                    onDone();
                    onClose();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            if (LIData && LIData.id) {
                const resp = await editLineItem(LIData.id, data);
                if (resp) {
                    console.log(resp);
                    onDone();
                    onClose();
                }
                setSubmitting(false);
            } else {
                if (quoteId) {
                    const resp = await createLineItem(quoteId, data);
                    if (resp) {
                        console.log(resp);
                        onDone();
                        onClose();
                    }
                    setSubmitting(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {quoteId ? "Edit" : "Add"} line item to Quote {quoteId}
            </DialogTitle>
            <Box m={2} mr={3}>
                <Formik validationSchema={schema} initialValues={LIData ? LIData : LineItemInit} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, isSubmitting, errors, touched }) => (
                        <Form>
                            <FieldSelect
                                label="Item"
                                name="ItemId"
                                value={values.ItemId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                request={getItems}
                                itemTitleField="name"
                                itemValueField="id"
                                error={Boolean(errors.ItemId && touched.ItemId)}
                                fullWidth
                            />

                            <TextField
                                placeholder="description"
                                label="description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />
                            <TextField
                                placeholder="quantity"
                                label="quantity"
                                name="quantity"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                error={Boolean(errors.quantity && touched.quantity)}
                                helperText={errors.quantity}
                            />
                            <TextField
                                placeholder="price"
                                label="price"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                error={Boolean(errors.price && touched.price)}
                                helperText={errors.price}
                            />
                            <TextField
                                placeholder="index"
                                label="index"
                                name="index"
                                value={values.index}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                error={Boolean(errors.index && touched.index)}
                                helperText={errors.index}
                            />

                            <FormControl style={{ margin: "0.5em" }} fullWidth>
                                <FormLabel>Has this item tax?</FormLabel>
                                <RadioGroup value={values.tax} name="tax" onChange={handleChange} style={{ flexDirection: "row" }}>
                                    <FormControlLabel control={<Radio />} label="Yes" value="true" />
                                    <FormControlLabel control={<Radio />} label="No" value="false" />
                                </RadioGroup>
                            </FormControl>

                            <Box textAlign="center">
                                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" size="large">
                                    {LIData ? "Save" : "Add"}
                                </Button>
                                {LIData && (
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: "red", color: "#fff", margin: "0 1em" }}
                                        size="large"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
