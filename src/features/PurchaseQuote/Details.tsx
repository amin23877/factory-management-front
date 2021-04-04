import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

import Dialog from "../../app/Dialog";
import { FieldSelect } from "../../app/Inputs";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { getAllEmployees } from "../../api/employee";
import { getVendors } from "../../api/vendor";
import { getContacts } from "../../api/contact";
import { Typography } from "@material-ui/core";
import { createPurchaseQuote } from "../../api/purchaseQuote";

import { BasePaper } from "../../app/Paper";

export default function Details({ onDone }: { onDone?: () => void }) {
    const uploader = useRef<HTMLInputElement | null>();
    const [file, setFile] = useState<File | null>(null);

    return (
        <Box display='flex'>
            <BasePaper  >
                <Box display="flex" flexDirection="column">
                    <Formik
                        initialValues={{}}
                        onSubmit={async (d: any) => {
                            try {
                                const resp = await createPurchaseQuote({ ...d, file });
                                if (resp) {
                                    onDone && onDone();
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
                                <Button fullWidth  variant="outlined" onClick={() => uploader.current && uploader.current.click()}>
                                    < CloudUploadOutlinedIcon style={{marginRight:'3px'}}/>
                                    File
                            </Button>
                                <Box my={1}>
                                    <Typography variant="caption">{file?.name}</Typography>
                                </Box>
                                <Box display="flex" flexDirection="column" my={2}>
                                    <FieldSelect
                                        style={{ flex: 1 }}
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
                                        style={{ flex: 1}}
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
                                        style={{ flex: 1 }}
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
                                <Box textAlign="left" display='flex'>
                                    <Button  style={{marginLeft:'20px',marginRight:'20px',flex:1}} type="submit" kind="add">
                                        Add
                                </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </BasePaper>
            <BasePaper style={{marginLeft:'1em' ,flex:1}}>
                <h1>Datagrid</h1>
            </BasePaper>
        </Box>
    );
}
