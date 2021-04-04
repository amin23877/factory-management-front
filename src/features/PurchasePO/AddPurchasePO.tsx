import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { getContacts } from "../../api/contact";
import { getAllEmployees } from "../../api/employee";
import { createPurchasePO, IPurchasePO } from "../../api/purchasePO";
import { getVendors } from "../../api/vendor";

import Dialog from "../../app/Dialog";
import { FieldSelect } from "../../app/Inputs";
import Button from "../../app/Button";

export default function AddPOModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const schema = Yup.object().shape({
        requester: Yup.number().required(),
        VendorId: Yup.number().required(),
        ContactId: Yup.number().required(),
    });

    const handleSubmit = async (d: IPurchasePO) => {
        try {
            const resp = await createPurchasePO(d);
            if (resp) {
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Add new purchase po">
            <Box p={2}>
                <Formik initialValues={{} as IPurchasePO} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto" gridGap={8}>
                                <FieldSelect
                                    style={{ width: "100%" }}
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    name="requester"
                                    label="Requester"
                                    value={values.requester}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.requester)}
                                />
                                <FieldSelect
                                    style={{ width: "100%" }}
                                    request={getVendors}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="VendorId"
                                    label="Vendor"
                                    value={values.VendorId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.VendorId)}
                                />
                                <FieldSelect
                                    style={{ width: "100%" }}
                                    request={getContacts}
                                    itemTitleField="lastName"
                                    itemValueField="id"
                                    name="ContactId"
                                    label="Contact"
                                    value={values.ContactId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.ContactId)}
                                />
                                <Button type="submit" kind="add" style={{ margin: "0.5em 0" }}>
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
