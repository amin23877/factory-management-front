import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { IVendor, getVendors } from "../../api/vendor";
import { createVending, deleteVending, IVending, updateVending } from "../../api/vending";
import { getItems } from "../../api/items";

export default function VendingModal({
    open,
    onClose,
    onDone,
    vendor,
    initialValues,
}: {
    initialValues?: IVending;
    open: boolean;
    vendor?: IVendor;
    onClose: () => void;
    onDone: () => void;
}) {
    const schema = Yup.object().shape({
        ItemId: Yup.string().required(),
        leadTime: Yup.number().required(),
        lastCheckedPrice: Yup.number().required(),
    });

    const handleDelete = async () => {
        try {
            if (initialValues && initialValues.id) {
                const resp = await deleteVending(initialValues?.id);
                if (resp) {
                    onDone();
                    onClose();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            title={initialValues?.id ? "Edit Vending" : `Add new vending to ${vendor?.name}`}
            open={open}
            onClose={onClose}
        >
            <Box p={2}>
                <Formik
                    initialValues={initialValues || {}}
                    validationSchema={schema}
                    onSubmit={async (d: any) => {
                        try {
                            if (initialValues && initialValues.id) {
                                const resp = await updateVending(initialValues.id, d);
                                if (resp) {
                                    onDone();
                                    onClose();
                                }
                            } else {
                                if (vendor && vendor.id) {
                                    const resp = await createVending({ ...d, VendorId: vendor.id });
                                    if (resp) {
                                        onDone();
                                        onClose();
                                    }
                                }
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >
                    {({ values, errors, handleChange, handleBlur }: any) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="0.5em" gridRowGap={8}>
                                <TextField
                                    style={{ width: "100%" }}
                                    name="leadTime"
                                    label="Lead time"
                                    value={values.leadTime}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.leadTime)}
                                />
                                <TextField
                                    style={{ width: "100%" }}
                                    name="lastCheckedPrice"
                                    label="Last checked price"
                                    value={values.lastCheckedPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.lastCheckedPrice)}
                                />
                                <TextField
                                    style={{ width: "100%" }}
                                    name="comment"
                                    label="Comment"
                                    value={values.comment}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.comment)}
                                />
                                <FieldSelect
                                    style={{ width: "100%", justifyContent: "space-around" }}
                                    request={getItems}
                                    getOptionList={(data) => data.items}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="ItemId"
                                    label="Item"
                                    value={values.ItemId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ItemId)}
                                />
                                <div />
                                <div />
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Button
                                    fullWidth
                                    type="submit"
                                    kind={initialValues?.id ? "edit" : "add"}
                                    style={{ margin: "0.5em 0" }}
                                >
                                    {initialValues?.id ? "Save" : "submit"}
                                </Button>
                                {initialValues && initialValues.id && (
                                    <Button kind="delete" style={{ margin: "0.5em" }} onClick={handleDelete}>
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
