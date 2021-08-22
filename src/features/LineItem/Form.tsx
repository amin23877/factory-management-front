import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Box } from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { createLineItem, editLineItem, deleteLineItem, records, ILineItem } from "../../api/lineItem";
import { getItems } from "../../api/items";

const schema = Yup.object().shape({
    ItemId: Yup.string().required(),
    quantity: Yup.number().required().min(1),
    price: Yup.number().required().min(0.1),
});

export default function MainForm({
    initialValues,
    onDone,
    record,
    recordId,
    readOnly,
}: {
    initialValues?: ILineItem;
    onDone?: () => void;
    record: records;
    recordId: string;
    readOnly?: boolean;
}) {
    const handleSubmit = async (d: ILineItem) => {
        try {
            if (initialValues && initialValues.id) {
                await editLineItem(initialValues.id, d);
                onDone && onDone();
            } else {
                await createLineItem(record, recordId, d);
                onDone && onDone();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (initialValues && initialValues.id) {
                await deleteLineItem(initialValues.id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={initialValues || ({} as ILineItem)} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, errors }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                        <FieldSelect
                            request={getItems}
                            getOptionList={(data) => data.result}
                            itemTitleField="name"
                            itemValueField="id"
                            value={values?.ItemId as any}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.ItemId)}
                            name="ItemId"
                            label="Item"
                            fullWidth
                            disabled={Boolean(readOnly)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            name="description"
                            label="Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.description)}
                            disabled={Boolean(readOnly)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            name="quantity"
                            label="Quantity"
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.quantity)}
                            disabled={Boolean(readOnly)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            name="price"
                            label="Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.price)}
                            disabled={Boolean(readOnly)}
                        />
                        <FormControlLabel
                            style={{ width: "100%" }}
                            checked={values.tax}
                            label="Tax"
                            name="tax"
                            onChange={handleChange}
                            control={<CheckBox />}
                            disabled={Boolean(readOnly)}
                        />
                        {!Boolean(readOnly) && (
                            <Box display="flex">
                                <Button
                                    style={{ flex: 3 }}
                                    type="submit"
                                    // onClick={() => console.log(errors, values)}
                                    kind={initialValues && initialValues.id ? "edit" : "add"}
                                    fullWidth
                                >
                                    Submit
                                </Button>
                                {initialValues && initialValues.id && (
                                    <Button style={{ flex: 1, margin: "0 0.5em" }} kind="delete" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
