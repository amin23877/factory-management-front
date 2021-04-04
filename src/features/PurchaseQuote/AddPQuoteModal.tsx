import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";

import Dialog from "../../app/Dialog";
import { FieldSelect } from "../../app/Inputs";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { getAllEmployees } from "../../api/employee";
import { getVendors } from "../../api/vendor";
import { getContacts } from "../../api/contact";
import { Typography } from "@material-ui/core";
import { createPurchaseQuote } from "../../api/purchaseQuote";

export default function AddPQModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const uploader = useRef<HTMLInputElement | null>();
    const [file, setFile] = useState<File | null>(null);

    return (
        <Dialog open={open} onClose={onClose} title="Add new purchase quote">
            <Box p={2}>
                <Formik
                    initialValues={{}}
                    onSubmit={async (d: any) => {
                        try {
                            const resp = await createPurchaseQuote({ ...d, file });
                            if (resp) {
                                onDone();
                                onClose();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    {({ values, errors, handleChange, handleBlur }: any) => (
                        <Form>
                            <input
                                hidden
                                type="file"
                                name="file"
                                ref={(e) => (uploader.current = e)}
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            />
                            <Button fullWidth variant="outlined" onClick={() => uploader.current && uploader.current.click()}>
                                File
                            </Button>
                            <Box my={1}>
                                <Typography variant="caption">{file?.name}</Typography>
                            </Box>
                            <Box display="flex" my={2}>
                                <FieldSelect
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    name="requester"
                                    label="Requester"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.requester}
                                    error={Boolean(errors.requester)}
                                />
                                <FieldSelect
                                    style={{ marginRight: 5, marginLeft: 5 }}
                                    request={getVendors}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="VendorId"
                                    label="Vendor"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.VendorId}
                                    error={Boolean(errors.VendorId)}
                                />
                                <FieldSelect
                                    request={getContacts}
                                    itemTitleField="lastName"
                                    itemValueField="id"
                                    name="ContactId"
                                    label="Contact"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ContactId}
                                    error={Boolean(errors.ContactId)}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Button type="submit" kind="add" style={{width:'31%'}}>
                                    Add
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
