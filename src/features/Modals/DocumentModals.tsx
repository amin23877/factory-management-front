import React, { useState } from "react";
import { Dialog, DialogTitle, Box, TextField, Button, Typography, useTheme } from "@material-ui/core";
import { Formik, Form } from "formik";

import { createAModelDocument, updateAModelDocument, deleteAModelDocument } from "../../api/document";

export const DocumentModal = ({ open, onClose, model, itemId }: { open: boolean; model: string; itemId: string; onClose: () => void }) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add / Edit Document to {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Formik
                    initialValues={{ file: "", description: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        createAModelDocument("item", itemId, values.file, values.description)
                            .then((d) => {
                                console.log(d);
                                setSubmitting(false);
                            })
                            .catch((e) => console.log(e));
                    }}
                >
                    {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                        <Form>
                            <input type="file" onChange={(e) => e.target.files !== null && setFieldValue("file", e.target.files[0])} />
                            <TextField
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
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};

export const EditDocumentModal = ({
    open,
    onClose,
    model,
    itemId,
    docData,
}: {
    open: boolean;
    model: string;
    itemId: string;
    onClose: () => void;
    docData?: any;
}) => {
    const [newFile, setNewFile] = useState<File>();
    const [desc, setDesc] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = () => {
        setIsSubmitting(true);
        updateAModelDocument(docData.id, newFile, desc)
            .then((d) => {
                console.log(d);
                if (d.status !== 400) {
                    onClose();
                }
            })
            .catch((e) => console.log(e))
            .finally(() => setIsSubmitting(false));
    };

    const handleDelete = () => {
        setIsSubmitting(true);
        deleteAModelDocument(docData.id)
            .then((d) => {
                console.log(d);
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
