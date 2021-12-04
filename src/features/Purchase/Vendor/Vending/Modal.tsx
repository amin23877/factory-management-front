import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { mutate } from "swr";

import Dialog from "../../../../app/Dialog";
import TextField from "../../../../app/TextField";
import Button from "../../../../app/Button";
import { FieldSelect } from "../../../../app/Inputs";

import { IVendor } from "../../../../api/vendor";
import { createVending, deleteVending, updateVending } from "../../../../api/vending";
import { getItems } from "../../../../api/items";

const schema = Yup.object().shape({
    serialNo: Yup.string().required(),
    ItemId: Yup.string().required(),
    leadTime: Yup.number().required(),
    // lastCheckedPrice: Yup.number().required(),
});

export default function VendingModal({
    open,
    onClose,
    onDone,
    vendor,
    initialValues,
}: {
    initialValues?: any;
    open: boolean;
    vendor: IVendor;
    onClose: () => void;
    onDone?: () => void;
}) {
    const handleDelete = async () => {
        try {
            if (initialValues && initialValues.id) {
                const resp = await deleteVending(initialValues?.id);
                if (resp) {
                    onDone && onDone();
                    onClose();
                    mutate(`/vendor/${vendor.id}/items`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (d: any) => {
        try {
            if (initialValues && initialValues.id) {
                const resp = await updateVending(initialValues.id, d);
                if (resp) {
                    onDone && onDone();
                    onClose();
                    mutate(`/vendor/${vendor.id}/items`);
                }
            } else {
                await createVending({ ...d, VendorId: vendor.id });
                onDone && onDone();
                onClose();
                mutate(`/vendor/${vendor.id}/items`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog title={initialValues?.id ? "Edit Item" : `Add New Item `} open={open} onClose={onClose}>
            <Box p={2}>
                <Formik initialValues={initialValues || {}} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur }: any) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="0.5em" gridRowGap={8}>
                                <TextField
                                    name="number"
                                    label="Vendor Number"
                                    value={values.number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.number)}
                                />
                                <TextField
                                    name="leadTime"
                                    label="Lead Time"
                                    value={values.leadTime}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.leadTime)}
                                />
                                <TextField
                                    name="cost"
                                    label="Cost"
                                    value={values.cost}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.cost)}
                                    type="number"
                                />
                                <TextField
                                    name="comment"
                                    label="Comment"
                                    value={values.comment}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.comment)}
                                />
                                <FieldSelect
                                    style={{ gridColumnEnd: "span 2" }}
                                    request={getItems}
                                    getOptionList={(data) => data.result}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="ItemId"
                                    label="Item"
                                    value={values.ItemId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ItemId)}
                                />
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
