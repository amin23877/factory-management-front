import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Box } from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import BootstrapTextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { createPurchaseSOLine, deletePurchaseSOLine, updatePurchaseSOLine } from "../../api/purchaseSO";
import { createPurchasePOLine, deletePurchasePOLine, updatePurchasePOLine } from "../../api/purchasePO";
import { ILineItem } from "../../api/lineItem";
import { getItems } from "../../api/items";
import { createLineItem, editLineItem } from "../../api/so";

export default function MainForm({
    initialValues,
    onDone,
    record,
    recordId,
    readOnly,
}: {
    initialValues?: ILineItem;
    onDone: () => void;
    record: "purchaseSO" | "purchasePO" | "SO";
    recordId: string;
    readOnly?: boolean;
}) {
    const [items, setItems] = useState([]);

    const schema = Yup.object().shape({
        ItemId: Yup.string().required(),
        quantity: Yup.number().required().min(1),
        price: Yup.number().required().min(0.1),
    });

    useEffect(() => {
        getItems()
            .then((d) => d && setItems(d))
            .catch((e) => console.log(e));
    }, []);

    const handleSubmit = async (d: ILineItem) => {
        try {
            let createLine: any, updateLine: any;
            switch (record) {
                case "purchasePO":
                    createLine = createPurchasePOLine;
                    updateLine = updatePurchasePOLine;
                    break;
                case "purchaseSO":
                    createLine = createPurchaseSOLine;
                    updateLine = updatePurchaseSOLine;
                    break;
                case "SO":
                    createLine = createLineItem;
                    updateLine = editLineItem;
                    break;
                default:
                    break;
            }

            if (initialValues && initialValues.id) {
                const resp = await updateLine(initialValues.id, d);
                if (resp) {
                    onDone();
                }
            } else {
                const resp = await createLine(recordId, d);
                if (resp) {
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        const deleteLine = record === "purchasePO" ? deletePurchasePOLine : deletePurchaseSOLine;

        try {
            if (initialValues && initialValues.id) {
                const resp = await deleteLine(initialValues.id);
                resp && onDone();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={initialValues ? initialValues : ({} as ILineItem)} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
                <Form>
                    <FieldSelect
                        request={getItems}
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
                    {/* <Autocomplete
                        value={values?.ItemId as any}
                        options={items}
                        getOptionLabel={(item: any) => item.name}
                        onChange={(e, nv) => setFieldValue("ItemId", nv.id)}
                        onBlur={handleBlur}
                        renderInput={(params) => <TextField {...params} label="Item" name="ItemId" variant="outlined" />}
                        fullWidth
                    /> */}
                    <BootstrapTextField
                        style={{ width: "100%" }}
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.description)}
                        disabled={Boolean(readOnly)}
                    />
                    <BootstrapTextField
                        style={{ width: "100%" }}
                        name="quantity"
                        label="Quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.quantity)}
                        disabled={Boolean(readOnly)}
                    />
                    <BootstrapTextField
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
                </Form>
            )}
        </Formik>
    );
}
