import React, { useRef } from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { getContacts } from "../../api/contact";
import { getAllEmployees } from "../../api/employee";
import { getVendors } from "../../api/vendor";
import { createPurchaseSO, IPurchaseSO } from "../../api/purchaseSO";

import TextField from "../../app/TextField";
import Dialog from "../../app/Dialog";
import { FieldSelect, ArraySelect } from "../../app/Inputs";
import Button from "../../app/Button";

export default function AddPOModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const uploader = useRef<HTMLInputElement | null>();

    const schema = Yup.object().shape({
        requester: Yup.number().required(),
        VendorId: Yup.number().required(),
        ContactId: Yup.number().required(),
    });

    const handleSubmit = async (d: IPurchaseSO) => {
        try {
            const resp = await createPurchaseSO(d);
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
                <Formik initialValues={{} as IPurchaseSO} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto" gridGap={8}>
                                <input
                                    hidden
                                    type="file"
                                    name="file"
                                    ref={(e) => (uploader.current = e)}
                                    onChange={(e) => setFieldValue("file", e.target.files ? e.target.files[0] : null)}
                                />
                                <Button fullWidth variant="outlined" onClick={() => uploader.current && uploader.current.click()}>
                                    File
                                </Button>
                                <Box my={1}>
                                    <Typography variant="caption">{values.file?.name}</Typography>
                                </Box>
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
                                <TextField
                                    style={{ width: "100%" }}
                                    type="date"
                                    name="estimatedObtainDate"
                                    label="Estimated obtain date"
                                    value={values.estimatedObtainDate?.slice(0, 10)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.estimatedObtainDate)}
                                />
                                <ArraySelect
                                    style={{ width: "100%" }}
                                    items={["completed", "ready to ship", "pending"]}
                                    name="status"
                                    label="Status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.status)}
                                />
                                <FormControlLabel
                                    style={{ width: "100%" }}
                                    checked={values.obtained}
                                    name="obtained"
                                    label="Obtained"
                                    onChange={handleChange}
                                    control={<Checkbox />}
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
