import React from "react";
import { Dialog, useTheme, DialogTitle, Box, Button, TextField, CircularProgress } from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createAModelNote, updateAModelNote, deleteAModelNote } from "../../api/note";

const AddModelNoteSchema = Yup.object().shape({
    subject: Yup.string().min(1, "Too short!").required(),
    note: Yup.string().required(),
});

export const NoteModal = ({
    open,
    onClose,
    model,
    itemId,
    noteData,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    model: string;
    itemId: string;
    noteData?: { id: any; subject: string; note: string; url?: string };
    onDone?: () => void;
}) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {noteData?.id ? "Edit" : "Add"} a note to {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Formik
                    initialValues={{ subject: noteData?.subject || "", url: noteData?.url || "", note: noteData?.note || "" }}
                    validationSchema={AddModelNoteSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (noteData) {
                            updateAModelNote(itemId, values)
                                .then((d) => {
                                    console.log(d, values);
                                    onClose();
                                    onDone && onDone();
                                })
                                .catch((e) => console.log(e))
                                .finally(() => setSubmitting(false));
                        } else {
                            // console.log(values);
                            createAModelNote(model, itemId, values)
                                .then((d) => {
                                    console.log(d);
                                    onDone && onDone();
                                    onClose();
                                })
                                .catch((e) => console.log(e))
                                .finally(() => setSubmitting(false));
                        }
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <TextField
                                name="subject"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.subject && touched.subject)}
                                helperText={errors.subject && touched.subject}
                                value={values.subject}
                                label="subject"
                                fullWidth
                            />
                            <TextField
                                name="url"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.url}
                                error={Boolean(errors.url && touched.url)}
                                helperText={errors.url && touched.url}
                                label="url"
                                fullWidth
                            />
                            <TextField
                                name="note"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.note}
                                error={Boolean(errors.note && touched.note)}
                                helperText={errors.note && touched.note}
                                label="note"
                                fullWidth
                                multiline
                                rows={4}
                            />
                            <Box my={2} textAlign="center">
                                <Button type="submit" color="primary" disabled={isSubmitting} variant="contained">
                                    Save Note
                                    {isSubmitting && <CircularProgress style={{ margin: "0 0.5em" }} />}
                                </Button>
                                {noteData?.subject && (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        style={{ margin: "0 1em", background: theme.palette.error.main }}
                                        onClick={() => {
                                            if (noteData.subject) {
                                                deleteAModelNote(noteData.id)
                                                    .then((d) => console.log(d))
                                                    .catch((e) => console.log(e));
                                            }
                                        }}
                                    >
                                        Delete this note
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
