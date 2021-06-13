import React, { useCallback, useRef } from "react";
import { Box, TextField, Link } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";

import { createAModelDocument, updateAModelDocument, deleteAModelDocument, IDocument } from "../../api/document";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PDFPreview from "../../components/PDFPreview";

interface IDocumentModal {
    open: boolean;
    model: string;
    itemId: string;
    docData?: any;
    onDone?: () => void;
    onClose: () => void;
}

export default function DocumentModal({ open, onClose, model, itemId, onDone, docData }: IDocumentModal) {
    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (docData && docData.id) {
                await deleteAModelDocument(docData.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (docData && docData.id) {
            updateAModelDocument(docData.id, values.file, values.description)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAModelDocument(model, itemId as any, values.file, values.description)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            title={`${docData ? "Edit" : "Add"} Document to ${model}`}
        >
            <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10}>
                <Box>{docData?.path && <PDFPreview pdf={"http://digitalphocus.ir" + docData?.path} />}</Box>
                <Formik initialValues={docData ? docData : ({} as IDocument)} onSubmit={handleSubmit}>
                    {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                        <Form>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <input
                                    type="file"
                                    ref={(e) => (fileUploader.current = e)}
                                    hidden
                                    onChange={(e) =>
                                        e.target.files !== null && setFieldValue("file", e.target.files[0])
                                    }
                                />
                                <Button
                                    color="primary"
                                    style={{
                                        backgroundColor: "#fff",
                                        color: " rgb(43,140,255) ",
                                        border: "1px solid rgb(43,140,255) ",
                                        width: "100%",
                                    }}
                                    variant="contained"
                                    onClick={() => fileUploader.current?.click()}
                                >
                                    <PhotoSizeSelectActualOutlinedIcon style={{ marginRight: "7px" }} />
                                    Upload file
                                </Button>

                                <div style={{ margin: "1em 0" }}>
                                    {values.file ? (
                                        // String((values.file as any).name)
                                        <p>ads</p>
                                    ) : docData ? (
                                        <Link download href={docData.path}>
                                            Download previous file
                                        </Link>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <TextField
                                    style={{ marginBottom: "20px" }}
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
                                <Box style={{ display: "flex", width: "100%" }}>
                                    <Button
                                        type="submit"
                                        kind={docData ? "edit" : "add"}
                                        disabled={isSubmitting}
                                        style={{ flex: 1 }}
                                    >
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
