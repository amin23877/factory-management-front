import React from "react";
import { Formik, Form } from "formik";

import Box from "@material-ui/core/Box";

import Dialog from "../../../app/Dialog";
import { FieldSelect } from "../../../app/Inputs";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { getVendors } from "../../../api/vendor";
import { createPurchaseQuote } from "../../../api/purchaseQuote";
import { getAllEmployees } from "../../../api/employee";

export default function AddPQModal({
    open,
    onClose,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    onDone: () => void;
}) {
    // const uploader = useRef<HTMLInputElement | null>();
    // const [file, setFile] = useState<File | null>(null);

    return (
        <Dialog open={open} onClose={onClose} title="Add new quote">
            <Box p={2}>
                <Formik
                    initialValues={{}}
                    onSubmit={async (d: any) => {
                        try {
                            // console.log(d);

                            const resp = await createPurchaseQuote({ ...d });
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
                            <Box display="grid" gridTemplateColumns="1fr 1fr" my={2} gridGap={10}>
                                <TextField
                                    name="senderNumber"
                                    value={values.senderNumber}
                                    label="Quote Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FieldSelect
                                    request={getVendors}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    name="VendorId"
                                    label="Vendor Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={typeof values.VendorId === "string" ? values.VendorId : values.VendorId?.id}
                                    error={Boolean(errors.VendorId)}
                                    getOptionList={(data) => data?.result}
                                />
                                <FieldSelect
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    name="requester"
                                    label="Requester"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                        typeof values.requester === "string" ? values.requester : values.requester?.id
                                    }
                                    error={Boolean(errors.requester)}
                                    // getOptionList={(data) => data?.result}
                                />
                                <TextField
                                    name="companyName"
                                    value={values.companyName}
                                    label="Company Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    name="companyWebsite"
                                    value={values.companyWebsite}
                                    label="Company Website"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    name="contactName"
                                    value={values.contactName}
                                    label="Contact Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    name="contactNumber"
                                    value={values.contactNumber}
                                    label="Contact Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Button type="submit" kind="add" style={{ gridColumnEnd: "span 2" }}>
                                Add
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
