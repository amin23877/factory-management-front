import React, { useRef } from "react";
import { Box, TextField, Typography, Link } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";

import { createAModelDocument, updateAModelDocument, deleteAModelDocument } from "../../api/document";

interface IDocumentModal {
    open: boolean;
    model: string;
    onDone?: () => void;
    itemId: number;
    onClose: () => void;
    docData?: any;
}

export default function DocumentModal({ open, onClose, model, itemId, onDone, docData }: IDocumentModal) {
    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = async () => {
        try {
            if (docData) {
                await deleteAModelDocument(docData.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" title={`${docData ? "Edit" : "Add"} Document to ${model}`}>
            <Box m={3}>
                <Formik
                    initialValues={{
                        file: undefined as any,
                        description: docData?.description ? docData?.description : "",
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (docData) {
                            updateAModelDocument(docData.id, values.file, values.description)
                                .then((d) => {
                                    console.log(d);
                                    onDone && onDone();
                                    onClose();
                                })
                                .catch((e) => console.log(e))
                                .finally(() => setSubmitting(false));
                        } else {
                            createAModelDocument(model, itemId, values.file, values.description)
                                .then((d) => {
                                    console.log(d);
                                    setSubmitting(false);
                                    onDone && onDone();
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        }
                    }}
                >
                    {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                        <Form>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <input
                                    type="file"
                                    ref={(e) => (fileUploader.current = e)}
                                    hidden
                                    onChange={(e) => e.target.files !== null && setFieldValue("file", e.target.files[0])}
                                />
                                <Button color="primary" variant="contained" onClick={() => fileUploader.current?.click()}>
                                    Upload file
                                </Button>

                                <div style={{ margin: "1em 0" }}>
                                    {values.file ? (
                                        values.file?.name
                                    ) : docData ? (
                                        <Link download href={docData.path}>
                                            Download previous file
                                        </Link>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <TextField
                                    fullWidth
                                    value={values.description}
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Box>
                                    <Button type="submit" kind={docData ? "edit" : "add"} disabled={isSubmitting}>
                                        Save
                                    </Button>
                                    {docData && (
                                        <Button
                                            style={{ marginLeft: "1em" }}
                                            onClick={deleteDocument}
                                            kind="delete"
                                            disabled={isSubmitting}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
