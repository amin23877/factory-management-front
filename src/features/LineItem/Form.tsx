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

export default function MainForm({
    initialValues,
    onDone,
    record,
    recordId,
}: {
    initialValues?: ILineItem;
    onDone: () => void;
    record: "purchaseSO" | "purchasePO";
    recordId: string;
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
            const createLine = record === "purchasePO" ? createPurchasePOLine : createPurchaseSOLine;
            const updateLine = record === "purchasePO" ? updatePurchasePOLine : updatePurchaseSOLine;

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
                        name="ItemId"
                        fullWidth
                        disabled
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
                        disabled
                        style={{ width: "100%" }}
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.description)}
                    />
                    <BootstrapTextField
                        disabled
                        style={{ width: "100%" }}
                        name="quantity"
                        label="Quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.quantity)}
                    />
                    <BootstrapTextField
                        disabled
                        style={{ width: "100%" }}
                        name="price"
                        label="Price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.price)}
                    />
                    <BootstrapTextField
                        disabled
                        style={{ width: "100%" }}
                        name="index"
                        label="Index"
                        value={values.index}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.index)}
                    />
                    <FormControlLabel
                        disabled
                        style={{ width: "100%" }}
                        checked={values.tax}
                        label="Tax"
                        name="tax"
                        onChange={handleChange}
                        control={<CheckBox />}
                    />
                    {/* <Box display="flex">
                        <Button style={{ flex: 3 }} type="submit" kind={initialValues && initialValues.id ? "edit" : "add"} fullWidth>
                            Submit
                        </Button>
                        {initialValues && initialValues.id && (
                            <Button style={{ flex: 1, margin: "0 0.5em" }} kind="delete" onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                    </Box> */}
                </Form>
            )}
        </Formik>
    );
}
