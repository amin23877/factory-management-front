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

import { ILineService } from "../../api/lineService";
import { getItems } from "../../api/items";
import { createSOLineService, deleteSOLineService, editSOLineService, getLineItems as getSOLineItems } from "../../api/so";
import { createQuoteLineService, deleteQuoteLineService, editQuoteLineService, getLineItems as getQuoteLineItems } from "../../api/quote";
import { getServers } from "dns";
import { getFieldServices } from "../../api/fieldService";
import useSWR from "swr";
import { RemoveFromQueueOutlined } from "@material-ui/icons";
import { fetcher } from "../../api";

export default function MainForm({
    initialValues,
    onDone,
    record,
    recordId,
    readOnly,
}: {
    initialValues?: ILineService;
    onDone: () => void;
    record: "Quote" | "SO";
    recordId: string;
    readOnly?: boolean;
}) {
    const { data: lineItems } = useSWR(() => {
        switch (record) {
            case "Quote":
                return `/lineitem?QuoteId=${recordId}`;
            case "SO":
                return `/lineitem?SOId=${recordId}`;
            default:
                return null;
        }
    }, fetcher);
    // const [lineItems, setLineItems] = useState([]);

    const schema = Yup.object().shape({
        ServiceId: Yup.string().required(),
        LineItemRecordId: Yup.string().required(),
        quantity: Yup.number().required().min(1),
        price: Yup.number().required().min(0.1),
    });

    // useEffect(() => {
    //     switch (record) {
    //         case "Quote":
    //             getQuoteLineItems(recordId)
    //                 .then((d) => d && setLineItems(d))
    //                 .catch((e) => console.log(e));
    //             break;
    //         case "SO":
    //             getSOLineItems(recordId)
    //                 .then((d) => d && setLineItems(d))
    //                 .catch((e) => console.log(e));
    //             break;
    //         default:
    //             break;
    //     }
    // }, []);

    const handleSubmit = async (d: ILineService) => {
        try {
            let createLine: any, updateLine: any;
            switch (record) {
                case "Quote":
                    createLine = createQuoteLineService;
                    updateLine = editQuoteLineService;
                    break;
                case "SO":
                    createLine = createSOLineService;
                    updateLine = editSOLineService;
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
        let deleteLine: any;
        switch (record) {
            case "Quote":
                deleteLine = deleteQuoteLineService;
                break;
            case "SO":
                deleteLine = deleteSOLineService;
                break;
            default:
                break;
        }

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
        <Formik initialValues={initialValues ? initialValues : ({} as ILineService)} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
                <Form>
                    <Box display="grid" gridRowGap={16}>
                        <FieldSelect
                            request={getFieldServices}
                            itemTitleField="name"
                            itemValueField="id"
                            value={values?.ServiceId as any}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.ServiceId)}
                            name="ServiceId"
                            label="Service"
                            fullWidth
                            disabled={Boolean(readOnly)}
                        />
                        <Autocomplete
                            disabled={!lineItems}
                            value={values?.LineItemRecordId as any}
                            options={lineItems.length ? lineItems : []}
                            getOptionLabel={(item: any) => item.description}
                            onChange={(e, nv) => setFieldValue("LineItemRecordId", nv?.id)}
                            onBlur={handleBlur}
                            fullWidth
                            renderInput={(params) => (
                                <TextField {...params} size="small" label="Line Item" name="LineItemRecordId" variant="outlined" />
                            )}
                        />
                        <TextField
                            size="small"
                            name="description"
                            label="Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.description)}
                            disabled={Boolean(readOnly)}
                        />
                        <TextField
                            size="small"
                            name="quantity"
                            label="Quantity"
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.quantity)}
                            disabled={Boolean(readOnly)}
                        />
                        <TextField
                            size="small"
                            name="price"
                            label="Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.price)}
                            disabled={Boolean(readOnly)}
                        />
                        <FormControlLabel
                            checked={values.tax}
                            label="Tax"
                            name="tax"
                            onChange={handleChange}
                            control={<CheckBox />}
                            disabled={Boolean(readOnly)}
                        />
                    </Box>
                    {!Boolean(readOnly) && (
                        <Box display="flex">
                            <Button
                                style={{ flex: 3 }}
                                type="submit"
                                onClick={() => console.log(errors, values)}
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
