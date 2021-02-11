import React, { useState } from "react";
import { Dialog, DialogTitle, Box, TextField, Button, Typography, useTheme } from "@material-ui/core";
import { Formik, Form } from "formik";

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
    const deleteDocument = async () => {
        try {
            if (docData) {
                const resp = await deleteAModelDocument(docData.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs">
            <DialogTitle>
                {docData ? "Edit" : "Add"} Document to {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Formik
                    initialValues={{ file: "", description: docData?.description || "" }}
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
                                <input type="file" onChange={(e) => e.target.files !== null && setFieldValue("file", e.target.files[0])} />
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
                                <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                                    Save
                                </Button>
                                {docData && (
                                    <Button
                                        onClick={deleteDocument}
                                        style={{ backgroundColor: "red", color: "#fff" }}
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
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

export const EditDocumentModal = ({
    open,
    onClose,
    model,
    itemId,
    docData,
    onDone,
}: {
    open: boolean;
    model: string;
    itemId: string;
    onClose: () => void;
    docData?: any;
    onDone?: () => void;
}) => {
    const [newFile, setNewFile] = useState<File>();
    const [desc, setDesc] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = () => {
        setIsSubmitting(true);
        updateAModelDocument(docData.id, newFile, desc)
            .then((d) => {
                console.log(d);
                onDone && onDone();
                onClose();
            })
            .catch((e) => console.log(e))
            .finally(() => setIsSubmitting(false));
    };

    const handleDelete = () => {
        setIsSubmitting(true);
        deleteAModelDocument(docData.id)
            .then((d) => {
                console.log(d);
                onDone && onDone();
                onClose();
            })
            .catch((e) => console.log(e))
            .finally(() => setIsSubmitting(false));
    };

    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add / Edit Document to {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Typography>{docData.name}</Typography>
                <Typography>{docData.path}</Typography>
                <input type="file" onChange={(e) => e.target.files !== null && setNewFile(e.target.files[0])} />
                <TextField
                    value={desc}
                    name="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <Box>
                    <Button onClick={handleUpdate} color="primary" variant="contained" disabled={isSubmitting}>
                        Save
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        style={{ backgroundColor: theme.palette.error.main, margin: "0 1em" }}
                        variant="contained"
                        color="primary"
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};
